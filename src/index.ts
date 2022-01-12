import { setFailed } from "@actions/core";

import { run } from "./run";

run().catch((err) => setFailed(err));
