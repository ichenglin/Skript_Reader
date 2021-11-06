import { SkriptObject } from "./SkriptObject";
import { SkriptType } from "./skript_object_types";

export interface SkriptDividerComponent {
    begin_index: number,
    end_index: number,
    component_type: SkriptType
};

export class SkriptDivider {

    private components: SkriptDividerComponent[];

    constructor() {
        this.components = [];
    }

    public add_component(component: SkriptDividerComponent): void {
        const override = this.override_component(component.begin_index, component.end_index);
        if (override.length > 0) {
            // component override
            return;
        }
        // component doesn't override
        this.components.push(component);
    }

    public override_component(begin: number, end: number): SkriptDividerComponent[] {
        return this.components.filter(loop_component => loop_component.begin_index <= end && loop_component.end_index >= begin);
    }

    public export_component(script: string, fallback_type: SkriptType): SkriptObject[] {
        this.sort_component();
        let export_objects = [], next_index = 0;
        for (let component_index = 0; component_index < this.components.length; component_index++) {
            const loop_component = this.components[component_index];
            if (loop_component.begin_index > next_index + 1) {
                export_objects.push(divider_component_to_object(script, {begin_index: next_index, end_index: loop_component.begin_index - 1, component_type: fallback_type}));
            }
            export_objects.push(divider_component_to_object(script, loop_component));
            next_index = loop_component.end_index + 1;
        }
        if (this.components.length > 0 && script.length >= next_index + 1) {
            export_objects.push(divider_component_to_object(script, {begin_index: next_index, end_index: script.length - 1, component_type: fallback_type}));
        }
        return export_objects;
    }

    private sort_component(): void {
        this.components = this.components.sort((component_1, component_2) => component_1.begin_index - component_2.begin_index);
    }

}

function divider_component_to_object(script: string, divider_component: SkriptDividerComponent): SkriptObject {
    const script_component = script.slice(divider_component.begin_index, divider_component.end_index + 1);
    return new SkriptObject(script_component, divider_component.component_type);
}