import minimatch from "minimatch";
import path from "path";

export const isMatches = (file: string, pattern: string) => {
    // check if glob pattern was provided
    if (minimatch(file, pattern)) {
        return true;
    }

    // check if path was provided
    const splittedFile = file.split(path.posix.sep);
    const splittedPattern = pattern.split(path.posix.sep);

    for (let i = 0; i < splittedPattern.length; ++i) {
        if (splittedFile[i] !== splittedPattern[i]) return false;
    }

    return true;
};
