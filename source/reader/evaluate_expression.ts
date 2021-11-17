import { SkriptDivider, SkriptDividerComponent } from "../objects/SkriptDivider";
import { SkriptType } from "../objects/skript_object_types";
import { reader_error } from "../system/reader_error";
import { evaluate_string } from "./evaluate_string";
import { evaluate_variable } from "./evaluate_variable";

export function evaluate_expression(script: string, divider: SkriptDivider, parent_types: SkriptType[]): SkriptDivider {
    let expression_stage = false, expression_begin = -1;
    for (let script_index = 0; script_index < script.length; script_index++) {
        switch (script[script_index]) {
            case "%":
                // found expression begin/ending character
                if (expression_stage === false) {
                    expression_stage = true;
                    expression_begin = script_index;
                } else {
                    expression_stage = false;
                    divider.add_component({begin_index: expression_begin, end_index: script_index, component_type: "expression"} as SkriptDividerComponent);
                }
                break;
            
            case "\"":
                // ignore string
                if (expression_stage === false) {
                    break;
                }
                const ignore_string_component = evaluate_string(script.slice(expression_begin), new SkriptDivider(), parent_types, true).get_component();
                if (ignore_string_component.length <= 0) {
                    throw reader_error("incomplete expression statement", script.slice(expression_begin));
                }
                script_index += ignore_string_component[0].end_index - ignore_string_component[0].begin_index;
                break;

            case "{":
                // ignore variable
                if (expression_stage === false) {
                    break;
                }
                const ignore_variable_component = evaluate_variable(script.slice(expression_begin), new SkriptDivider(), "expression").get_component();
                if (ignore_variable_component.length <= 0) {
                    throw reader_error("incomplete expression statement", script.slice(expression_begin));
                }
                script_index += ignore_variable_component[0].end_index - ignore_variable_component[0].begin_index;
                break;
        }
    }
    if (expression_stage === true) {
        throw reader_error("incomplete expression statement", script.slice(expression_begin));
    }
    return divider;
}