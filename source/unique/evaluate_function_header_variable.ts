import { SkriptDivider, SkriptDividerComponent } from "../objects/SkriptDivider";
import { SkriptObjectTypeOnly } from "../objects/SkriptObject";
import { bracket_length } from "../system/bracket_length";
import { expression_child } from "../system/expression_child";

export function evaluate_function_header_variable(script: string, divider: SkriptDivider): SkriptDivider {
    const function_parameter_matcher = script.match(/^([\w\d]+)\((.*)\)$/);
    if (function_parameter_matcher === null) {
        // somehow caused an invalid match, this should never happen
        return divider;
    }
    const function_parameter = function_parameter_matcher ? function_parameter_matcher[2] : "";
    // split parameter string into parameter groups
    let parameter_begin = 0;
    let function_parameter_groups: string[] = [];
    for (let parameter_index = 0; parameter_index < function_parameter.length; parameter_index++) {
        switch (function_parameter[parameter_index]) {
            case ",":
                function_parameter_groups.push(function_parameter.slice(parameter_begin, parameter_index));
                parameter_begin = parameter_index + 1;
                break;

            case "(":
                // skip default value with brackets
                parameter_index += bracket_length(function_parameter.slice(parameter_index), new SkriptObjectTypeOnly("function")) - 1;
                break;

            case "\"":
                // ignore string in function
                parameter_index += expression_child(function_parameter.slice(parameter_index), new SkriptObjectTypeOnly("function")) - 1;
                break;
    
            case "{":
                // ignore variable in function
                parameter_index += expression_child(function_parameter.slice(parameter_index), new SkriptObjectTypeOnly("function")) - 1;
                break;
        }
    }
    // add last parameter group
    function_parameter_groups.push(function_parameter.slice(parameter_begin));
    // loop through parameter groups for each parameter components
    for (let group_index = 0; group_index < function_parameter_groups.length; group_index++) {
        const group_begin_index = function_parameter_matcher[1].length + 1 + function_parameter_groups.slice(0, group_index).join(",").length + (group_index >= 1 ? 1 : 0);
        // these two lines are used to debugging
        // const group_begin_index_visualized = function_parameter_matcher[1] + "(" + function_parameter_groups.slice(0, group_index).join(",") + (group_index >= 1 ? "," : "");
        // console.log(group_begin_index_visualized + "\n" + group_begin_index_visualized.length + " " + group_begin_index);
        const group_matcher = function_parameter_groups[group_index].match(/^(\s*)([^:]+)(:?\s*)([^=]*)(?:=(.*))?$/);
        if (group_matcher === null) {
            // somehow caused an invalid match, this should never happen, skip to next group
            continue;
        }
        const group_variable_begin = group_begin_index + group_matcher[1].length;
        const group_variable_end = group_variable_begin + group_matcher[2].length - 1;
        divider.add_component({begin_index: group_variable_begin, end_index: group_variable_end, component_type: "function_variable"} as SkriptDividerComponent);
    }
    return divider;
}