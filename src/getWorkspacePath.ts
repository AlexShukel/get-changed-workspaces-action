import path from "path";
import { splitPath } from "./utils";

export const getWorkspacePath = (file: string, workspace: string): string => {
    const splittedFile = splitPath(file);
    const splittedPattern = splitPath(workspace);

    const output: string[] = [];

    for (let i = 0; i < splittedPattern.length; ++i) {
        output.push(splittedFile[i]);

        if (splittedPattern[i] !== splittedFile[i]) {
            break;
        }
    }

    return path.posix.join(...output);
};
