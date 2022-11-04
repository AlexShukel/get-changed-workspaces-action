# Get changed workspaces action

This action finds all `workspaces` in monorepo that has changed files. Then, you can build, test and lint only those packages that has been changed. If you aren't familiar with npm `workspaces`, see documentation for [npm](https://docs.npmjs.com/cli/v7/using-npm/workspaces) and [yarn](https://yarnpkg.com/features/workspaces).

## Usage

1. Create new workflow inside `.github/workflows`

**Example configuration**

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
            names: ${{ steps.changed-packages.outputs.names }}
            paths: ${{ steps.changed-packages.outputs.paths }}
            empty: ${{ steps.changed-packages.outputs.empty }}
        steps:
            - uses: actions/checkout@v2
            - name: Find changed workspaces
              uses: AlexShukel/get-changed-workspaces-action@v1.0.0
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

2. Define `workspaces` in root `package.json`. Also it can be passed via action input [workspaces](#workspaces).

## Events that can trigger action

This action can handle 2 types of events:

-   `pull_request` - action will compare `current` branch with `target` branch of pull request.
-   `push` - by default action will compare a commit `before` push event occured with `current` commit. You can pass `base-ref` input to make another comparison (for example, with main branch).

## Action inputs

Below is the list of all possible options that can be passed in the action.

### workspaces

This input is an alternative to the property of `package.json`. It should be similar to [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces#defining-workspaces). One difference is that each element of array should be on the new line.
Example:

```yml
- uses: AlexShukel/get-changed-workspaces-action@v1.0.0
  with:
      workspaces: |
          packages/*
          tools/*
          app/frontend
```

### working-directory

This input is required when your monorepo is located in different directory than git root.
Example:

```yml
- uses: AlexShukel/get-changed-workspaces-action@v1.0.0
  with:
      working-directory: ./app/frontend
```

### filter

This input option (regular expression) allows to filter changed packages by their names. Example:

```yml
- uses: AlexShukel/get-changed-workspaces-action@v1.0.0
  with:
      filter: "@packages/*"
```

This filter will select only those packages that match "@packages/\*" regular expression.

### base-ref

This input affects execution only when `push` event occurs. You can specify target of comparison (branch name or commit SHA).
Example:

```yml
- uses: AlexShukel/get-changed-workspaces-action@v1.0.0
  with:
      base-ref: main
```

## Action outputs

Below is the list of all possible outputs that this action produces.

### names

The names of changed packages (from `package.json`). Provided as JSON string.

Example: "['@monorepo/core', '@monorepo/react', '@monorepo/svelte']"

If you want to use it in action [matrix](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix), parse input with [fromJson](https://docs.github.com/en/actions/learn-github-actions/expressions#fromjson).

### paths

Paths to changed packages. Provided as JSON string.

Example: "['packages/core', 'packages/react', 'packages/svelte']"

If you want to use it in action [matrix](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix), parse input with [fromJson](https://docs.github.com/en/actions/learn-github-actions/expressions#fromjson).

### empty

Boolean that indicates if there was any changed packages. Provided as JSON string.

For example, if you want to skip a job when there was no changed packages, you can use this configuration:

```yml
generate_matrix:
    name: Get changed packages
    runs-on: ubuntu-latest
    outputs:
        empty: ${{ steps.changed_packages.outputs.empty }}
    steps:
        - name: Checkout
          uses: actions/checkout@v2

        - name: Find changed packages
          id: changed_packages
          uses: alexshukel/get-changed-workspaces-action@v1.0.0
build:
    name: Build
    # Skip build job if there wasn't any changed packages
    if: ${{ !fromJson(needs.generate_matrix.outputs.empty) }}
```

## License

MIT © [Aleksandras Sukelovic](https://github.com/AlexShukel)
