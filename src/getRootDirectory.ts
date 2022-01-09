import { exec } from "@actions/exec";

export const getRootDirectory = async () => {
    let res = "";

    await exec("git", ["rev-parse", "--show-toplevel"], {
        listeners: {
            stdout: (path) => {
                res += path.toString();
            },
        },
    });

    return res.trim();
};
