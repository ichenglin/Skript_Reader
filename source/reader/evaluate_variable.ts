import { SkriptDivider, SkriptDividerComponent } from "../objects/SkriptDivider";

export function evaluate_variable(script: string, divider: SkriptDivider, parent_is_variable: boolean = false): SkriptDivider {
    // parent_is_variable is used to prevent nested variable from causing infinite loop
    let variable_stage = parent_is_variable ? -1 : 0, variable_begin = -1;
    for (let script_index = 0; script_index < script.length; script_index++) {
        switch (script[script_index]) {
            case "{":
                if (variable_stage === 0) {
                    variable_begin = script_index;
                }
                variable_stage++;
                break;

            case "}":
                variable_stage--;
                if (variable_stage === 0) {
                    divider.add_component({begin_index: variable_begin, end_index: script_index, component_type: "variable"} as SkriptDividerComponent);
                }
                break;
        }
    }
    return divider;
}