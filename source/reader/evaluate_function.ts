import { SkriptDivider, SkriptDividerComponent } from "../objects/SkriptDivider";
import { bracket_length } from "../system/bracket_length";
import { reader_error } from "../system/reader_error";
import { evaluate_string } from "./evaluate_string";

export function evaluate_function(script: string, divider: SkriptDivider): SkriptDivider {
    let function_stage = false, function_begin = -1;
    for (let script_index = 0; script_index < script.length; script_index++) {
        switch (script[script_index]) {
            case "(":
                const function_name_matcher = script.slice(0, script_index).match(/(\w+)$/);
                const function_name_length = function_name_matcher === null ? 0 : function_name_matcher[0].length;
                if (function_stage === false && function_name_length > 0) {
                    function_stage = true;
                    function_begin = script_index - function_name_length;
                } else if (function_stage === true) {
                    script_index += bracket_length(script.slice(script_index)) - 1;
                }
                break;

            case ")":
                if (function_stage === true) {
                    function_stage = false;
                    divider.add_component({begin_index: function_begin, end_index: script_index, component_type: "function"} as SkriptDividerComponent);
                }
                break;

            case "\"":
                // ignore function located in string
                const ignore_string = evaluate_string(script.slice(script_index), new SkriptDivider()).get_component()[0];
                const ignore_string_length = ignore_string.end_index - ignore_string.begin_index + 1;
                script_index += ignore_string_length - 1;
                break
        }
    }
    if (function_stage === true) {
        throw reader_error("incomplete function", script.slice(function_begin));
    }
    return divider;
}