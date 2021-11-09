import { SkriptDivider, SkriptDividerComponent } from "../objects/SkriptDivider";
import { SkriptType } from "../objects/skript_object_types";
import { reader_error } from "../system/reader_error";

export function evaluate_variable(script: string, divider: SkriptDivider, parent_type: SkriptType): SkriptDivider {
    // prevent nested variable from causing infinite loop
    let variable_stage = parent_type === "variable" ? -1 : 0, variable_begin = -1;
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
                    //
                    // to be redone using expression
                    //
                    // variable in string must be surrounded by %
                    /*if (parent_type === "string" && script[variable_begin - 1] === "%" && script[script_index + 1] === "%") {
                        divider.add_component({begin_index: variable_begin - 1, end_index: script_index + 1, component_type: "variable"} as SkriptDividerComponent);
                    } else if (parent_type !== "string") {
                        divider.add_component({begin_index: variable_begin, end_index: script_index, component_type: "variable"} as SkriptDividerComponent);
                    }*/
                    divider.add_component({begin_index: variable_begin, end_index: script_index, component_type: "variable"} as SkriptDividerComponent);
                } else if (variable_stage < 0 && parent_type !== "variable") {
                    throw reader_error("unexpected variable enclose character '}'", script.slice(variable_begin, script_index + 1));
                }
                break;
        }
    }
    if (variable_stage > 0) {
        throw reader_error("variable not enclosed", script.slice(variable_begin));
    }
    return divider;
}