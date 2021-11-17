import { SkriptType } from "./skript_object_types";
import { evaluate_string } from "../reader/evaluate_string";
import { SkriptDivider } from "./SkriptDivider";

import { evaluate_variable } from "../reader/evaluate_variable";
import { evaluate_number } from "../reader/evaluate_number";
import { evaluate_expression } from "../reader/evaluate_expression";
import { evaluate_comment } from "../reader/evaluate_comment";
import { evaluate_indention } from "../reader/evaluate_indention";
import { evaluate_function } from "../reader/evaluate_function";

import * as object_type_components from "../data/object_component_types.json";

export class SkriptObject {

    public object_content: string;
    public object_type: SkriptType;
    public object_depth: number;
    public inner_components: SkriptObject[];
    public parent_types: SkriptType[];

    constructor(content: string, type: SkriptType, depth: number, parent_types: SkriptType[]) {
        this.object_content = content;
        this.object_depth = depth;
        this.parent_types = parent_types;

        if (type === "variable_body") {
            // variable_body are variables, but they do not have any components
            this.object_type = "variable";
            this.inner_components = [];
        } else {
            this.object_type = type;
            this.inner_components = this.evaluate_components();
        }
    }
    
    public collapse_components(): SkriptObject[] {
        if (this.inner_components.length <= 0) {
            return [this];
        }
        let inner_component_collapsed: SkriptObject[] = [];
        for (let inner_component_index = 0; inner_component_index < this.inner_components.length; inner_component_index++) {
            inner_component_collapsed = inner_component_collapsed.concat(this.inner_components[inner_component_index].collapse_components());
        }
        return inner_component_collapsed;
    }

    private evaluate_components(): SkriptObject[] {
        if (this.object_content.length <= 0) {
            // no content, therefore no components
            return [];
        }
        const type = this.object_type.toString();
        const type_components = object_type_components[type as keyof typeof object_type_components].child_components as SkriptType[];
        let component_divider = new SkriptDivider();
        for (let type_components_index = 0; type_components_index < type_components.length; type_components_index++) {
            const loop_type_component = type_components[type_components_index];
            const loop_type_maximum_depth = object_type_components[loop_type_component as keyof typeof object_type_components].maximum_depth;
            if (loop_type_maximum_depth !== null && loop_type_maximum_depth < this.object_depth + 1) {
                // maximum depth is reached, skip this type
                continue;
            }
            switch (loop_type_component) {
                case "string":
                    component_divider = evaluate_string(this.object_content, component_divider, this.parent_types);
                    break;

                case "variable":
                    component_divider = evaluate_variable(this.object_content, component_divider, this.object_type);
                    break;

                case "number":
                    component_divider = evaluate_number(this.object_content, component_divider);
                    break;

                case "expression":
                    component_divider = evaluate_expression(this.object_content, component_divider, this.parent_types);
                    break;

                case "function":
                    component_divider = evaluate_function(this.object_content, component_divider, this.parent_types);
                    break;

                case "indention":
                    component_divider = evaluate_indention(this.object_content, component_divider);
                    break;

                case "comment":
                    component_divider = evaluate_comment(this.object_content, component_divider);
                    break;
            }
        }
        return component_divider.export_component(this.object_content, this);
    }

};