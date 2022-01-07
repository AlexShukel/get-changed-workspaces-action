import minimatch from "minimatch";
import { splitPath } from "./utils";
import { getWorkspacePath } from "./getWorkspacePath";

export const getChangedWorkspace = (file: string, workspace: string): string | null => {
    // check if glob pattern was provided
    if (minimatch(file, workspace)) {
        return getWorkspacePath(file, workspace);
    }

    // check if path was provided
    const splittedFile = splitPath(file);
    const splittedPattern = splitPath(workspace);

    for (let i = 0; i < splittedPattern.length; ++i) {
        if (splittedFile[i] !== splittedPattern[i]) return null;
    }

    return workspace;
};
