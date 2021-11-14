import { SkriptDivider, SkriptDividerComponent } from "../objects/SkriptDivider";

export function evaluate_indention(script: string, divider: SkriptDivider): SkriptDivider {
    for (let script_index = 0; script_index < script.length; script_index++) {
        if (script[script_index].match(/[ \t]/) === null && script_index === 0) {
            // no indention found
            return divider;
        } else if (script[script_index].match(/[ \t]/) === null && script_index > 0) {
            // indention found
            divider.add_component({begin_index: 0, end_index: script_index - 1, component_type: "indention"} as SkriptDividerComponent);
            return divider;
        }
    }
    // no indention or whole script is indention, count as no indention
    return divider;
}