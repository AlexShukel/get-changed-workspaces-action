import { exec } from "@actions/exec";

export const getRootDirectory = async () => {
    let res = "";

    await exec("git", ["rev-parse", "--show-toplevel"], {
        listeners: {
            stdline: (path) => {
                res = path;
            },
        },
    });

    return res;
};
