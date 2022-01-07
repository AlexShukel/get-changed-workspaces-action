import { getChangedFiles } from "./getChangedFiles";
import { getWorkspaces } from "./getWorkspaces";
import { getWorkspacesFromInput } from "./getWorkspacesFromInput";
import { getChangedWorkspace } from "./getChangedWorkspace";

export const run = async () => {
    const workspaces = getWorkspacesFromInput() || (await getWorkspaces());

    const output: string[] = [];

    const changedFiles = await getChangedFiles();

    changedFiles.forEach((file) => {
        workspaces.forEach((workspace) => {
            const changedWorkspace = getChangedWorkspace(file, workspace);
            if (changedWorkspace) {
                output.push(changedWorkspace);
            }
        });
    });

    console.log(output);
};
