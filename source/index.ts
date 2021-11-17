import { SkriptObject } from "./objects/SkriptObject";

function skript_reader(script: string): SkriptObject {
    return new SkriptObject(script, "body", 0, []);
}

export = skript_reader;