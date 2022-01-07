import { posix } from "path";

export const splitPath = (path: string) => path.split(posix.sep);
