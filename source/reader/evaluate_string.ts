import { SkriptDivider, SkriptDividerComponent } from "../objects/SkriptDivider";
import { reader_error } from "../system/reader_error";

export function evaluate_string(script: string, divider: SkriptDivider): SkriptDivider {
    let string_stage = false, string_begin = -1;
    for (let script_index = 0; script_index < script.length; script_index++) {
        if (script[script_index] !== "\"") {
            continue;
        }
        // found "
        if (!string_stage) {
            // currently not in string, begin string
            string_stage = true;
            string_begin = script_index;
        } else if (script[script_index + 1] === "\"") {
            // double " in string, escape character
            script_index++;
        } else {
            // in string and not escape character
            string_stage = false;
            divider.add_component({begin_index: string_begin, end_index: script_index, component_type: "string"} as SkriptDividerComponent);
        }
    }
    if (string_stage === true) {
        // string not closed after looping through script
        throw reader_error("string literal not enclosed", script.slice(string_begin));
    }
    return divider;
}