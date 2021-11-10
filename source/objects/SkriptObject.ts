import { SkriptType } from "./skript_object_types";
import { evaluate_string } from "../reader/evaluate_string";
import { SkriptDivider } from "./SkriptDivider";
import { evaluate_variable } from "../reader/evaluate_variable";
import { evaluate_number } from "../reader/evaluate_number";

import * as object_type_components from "../data/object_component_types.json";
import { evaluate_expression } from "../reader/evaluate_expression";

export class SkriptObject {

    public object_content: string;
    public object_type: SkriptType;
    public inner_components: SkriptObject[];
    private evaluate_component: boolean;

    constructor(content: string, type: SkriptType, evaluate_component: boolean = true) {
        this.object_content = content;
        this.object_type = type;
        this.evaluate_component = evaluate_component;
        this.inner_components = this.evaluate_components();
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
            return [];
        }
        const type = this.object_type.toString();
        const type_components = object_type_components[type as keyof typeof object_type_components].child_components as string[];
        let component_divider = new SkriptDivider();
        for (let type_components_index = 0; type_components_index < type_components.length; type_components_index++) {
            switch (type_components[type_components_index]) {
                case "string":
                    component_divider = evaluate_string(this.object_content, component_divider);
                    break;

                case "variable":
                    component_divider = evaluate_variable(this.object_content, component_divider, this.object_type);
                    break;

                case "number":
                    component_divider = evaluate_number(this.object_content, component_divider);
                    break;

                case "expression":
                    component_divider = evaluate_expression(this.object_content, component_divider);
                    break;
            }
        }
        return component_divider.export_component(this.object_content, this.object_type === "variable" ? "variable_body" : this.object_type);
    }

};