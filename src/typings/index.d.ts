declare module "@npmcli/map-workspaces" {
    export default function mapWorkspaces(opts: { pkg: object; cwd: string }): Promise<Map<string, string>>;
}
