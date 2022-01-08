# Get changed workspaces action

This action finds all `workspaces` in monorepo that has changed files. Then, you can build, test and lint only those packages that has been changed. If you aren't familiar with npm `workspaces`, see documentation for [npm](https://docs.npmjs.com/cli/v7/using-npm/workspaces) and [yarn](https://classic.yarnpkg.com/lang/en/docs/workspaces/).

## Usage

1. Create new workflow inside `.github/workflows`

**Minimal configuration**

```yml
name: Monorepo CI
on:
    pull_request:
        branches:
            - main
            - master
jobs:
    get-changed-workspaces:
        runs-on: ubuntu-latest
        outputs:
            names-of-changed-packages: ${{ steps.changed-packages.outputs.names }}
            paths-of-changed-packages: ${{ steps.changed-packages.outputs.paths }}
        steps:
            - uses: actions/checkout@v2
            - name: Find changed workspaces
              uses: AlexShukel/get-changed-workspaces-action@main
              id: changed-packages
    build:
        runs-on: ubuntu-latest
        needs: [get-changed-workspaces]
        strategy:
            matrix:
                name: ${{ fromJson(needs.get-changed-workspaces.outputs.names) }}
                path: ${{ fromJson(needs.get-changed-workspaces.outputs.paths) }}
        steps:
            # describe steps for each modified package using ${{ matrix.name }} and ${{ matrix.path }}
```

2. Define `workspaces` in root `package.json`.

## Events that can trigger action

This action can handle 2 types of events:

-   `pull_request` - action will compare `current` branch with `target` branch of pull request
-   `push` - by default action will compare a commit `before` push event occured with `current` commit. You can pass `base-ref` input to make another comparison (for example, with main branch)

## Specify monorepo root directory

By default action will take root `package.json` from `git` root. So, if your monorepo is nested in another folder, you must specify `package-path` input.

## License

MIT © [Aleksandras Sukelovic](https://github.com/AlexShukel)
