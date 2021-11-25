import { SkriptDivider } from "../objects/SkriptDivider";
import { SkriptObject, SkriptObjectTypeOnly } from "../objects/SkriptObject";
import { evaluate_string } from "../reader/evaluate_string";
import { evaluate_variable } from "../reader/evaluate_variable";
import { reader_error } from "./reader_error";

export function bracket_length(script: string, parent_object: SkriptObject): number {
    let bracket_depth = 0, bracket_begin = -1;
    for (let script_index = 0; script_index < script.length; script_index++) {
        switch (script[script_index]) {
            case "(":
                if (bracket_depth === 0) {
                    bracket_begin = script_index;
                }
                bracket_depth++;
                break;

            case ")":
                bracket_depth--;
                if (bracket_depth === 0) {
                    // return the length of the bracket
                    return script_index - bracket_begin + 1;
                } else if (bracket_depth < 0) {
                    throw reader_error("unexpected closing bracket", script.slice(bracket_begin === -1 ? 0 : bracket_begin));
                }
                break;

            case "\"":
                // ignore string
                const ignore_string = evaluate_string(script.slice(script_index), new SkriptDivider(), parent_object).get_component()[0];
                const ignore_string_length = ignore_string.end_index - ignore_string.begin_index + 1;
                script_index += ignore_string_length - 1;
                break;

            case "{":
                // ignore variable
                const ignore_variable = evaluate_variable(script.slice(script_index), new SkriptDivider(), new SkriptObjectTypeOnly("body")).get_component()[0];
                const ignore_variable_length = ignore_variable.end_index - ignore_variable.begin_index + 1;
                script_index += ignore_variable_length - 1;
                break;
        }
    }
    throw reader_error("bracket not enclosed", script);
}