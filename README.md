# Assignment 13: UI Component Library with Build Checks (Husky, Prettier, ESLint, GitHub Actions)

This project is the Assignment 12 UI component library (**React + TypeScript + styled-components + Storybook**) with **code quality checks added to the build process**:

- **Husky** runs a **pre-commit hook** that must pass **Prettier**, **ESLint** and **all tests** before a commit is allowed.
- **GitHub Actions** runs the same checks on every push and pull request, so bypassed hooks are still caught and the failure is reported.
- **Docker** builds a production image that hosts the site on **http://localhost:8018** (also **http://127.0.0.1:8018**). The image build itself runs the quality checks.

| Item                         | Value                                           |
| ---------------------------- | ----------------------------------------------- |
| Author                       | Olukayode Adeyemi                               |
| Docker image name            | `adeyemi_olukayode_ui_garden_build_checks`      |
| **Docker container name**    | `adeyemi_olukayode_coding_assignment13`         |
| **Docker working directory** | `/adeyemi_olukayode_ui_garden_build_checks`     |
| Site URL                     | http://localhost:8018 and http://127.0.0.1:8018 |

Commands are written for **PowerShell** (Windows) and also work in macOS/Linux terminals.

---

## 1. Prerequisites

| Tool           | Version                   | Check with      |
| -------------- | ------------------------- | --------------- |
| Node.js        | 20.19 or newer (LTS)      | `node -v`       |
| npm            | 9 or newer                | `npm -v`        |
| Git            | any recent version        | `git --version` |
| Docker Desktop | installed **and running** | `docker -v`     |

---

## 2. Project setup

```powershell
git clone <your-github-repo-url>
cd <repo-folder>
npm ci
```

`npm ci` also runs the `prepare` script, which executes `husky` and **installs the git hooks** (it sets `core.hooksPath` to `.husky/_`). You do not need any extra step. Check with:

```powershell
git config core.hooksPath      # prints .husky/_
```

If you are starting from the supplied ZIP rather than cloning an existing Git repository, run `git init` in the project root **before** `npm ci`; Husky cannot install a Git hook until the folder is a Git repository.

> A `.npmrc` file sets `legacy-peer-deps=true` because Create React App 5 declares older peer dependency ranges than React 19 and Storybook 10.

### Project files added for this assignment

```
.husky/pre-commit            the pre-commit hook (Prettier -> ESLint -> tests)
.github/workflows/ci.yml     GitHub Actions workflow
.eslintrc.json               ESLint rules
.prettierrc.json             Prettier rules
.prettierignore              files Prettier skips
Dockerfile  nginx.conf  docker-compose.yml  .dockerignore
```

### npm scripts

| Script                 | What it does                                             |
| ---------------------- | -------------------------------------------------------- |
| `npm run format:check` | Prettier check (fails if any file is not formatted)      |
| `npm run format`       | Prettier fixes formatting in all files                   |
| `npm run lint`         | ESLint on `src` and `.storybook` with `--max-warnings 0` |
| `npm run lint:fix`     | ESLint with automatic fixes                              |
| `npm run test:ci`      | Runs all Jest tests once                                 |
| `npm run check`        | Runs all three checks in order: Prettier, ESLint, tests  |
| `npm start`            | Development server at http://localhost:3000              |
| `npm run storybook`    | Storybook at http://localhost:6006                       |
| `npm run build`        | Production build in `build/`                             |

---

## 3. Husky pre-commit checks

### How it is set up (steps taken)

1. Installed the tools: `npm install --save-dev husky prettier eslint eslint-config-prettier`.
2. Added `"prepare": "husky"` to `package.json` so hooks are installed automatically after `npm install`; setup errors are not hidden.
3. Created `.husky/pre-commit`, which runs, in order:
   1. `npm run format:check` (Prettier)
   2. `npm run lint` (ESLint, zero warnings allowed)
   3. `npm run test:ci` (Jest tests)
4. The hook stops at the first failing command, so if **any** check fails the commit is **rejected** and a message tells the developer how to fix it.

### Configuration

- **Prettier** (`.prettierrc.json`): single quotes, semicolons, 100-character lines, 2-space indent, LF line endings.
- **ESLint** (`.eslintrc.json`): extends `react-app`, `react-app/jest` and `prettier` (turns off rules that clash with Prettier). Extra rules: `eqeqeq`, `prefer-const`, `no-debugger`, `@typescript-eslint/no-unused-vars` (errors), `no-console` (warning, and warnings fail the check).
- **Tests**: Jest + React Testing Library + jest-styled-components. Every component has tests for visibility and the disabled-state colour.

### Demonstrate it (commit succeeds)

```powershell
git add .
git commit -m "Add feature"
```

The terminal prints `Running pre-commit checks: Prettier, ESLint and tests...`, then the three checks run and the commit is created.

### Demonstrate it (commit is blocked)

To demonstrate these failures safely, use a **disposable clone** of the repository. Break one rule at a time, stage only the demonstration file, and try to commit. The commit should be rejected; discard the disposable clone afterward so you do not risk overwriting work in your main copy.

| Rule broken     | How to break it                                                                  | Result                                                        |
| --------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Prettier        | Add `export const   x = {a:1,\n b:2}` to a new file `src/bad.ts`                 | `[warn] src/bad.ts` then **Prettier check failed**            |
| ESLint          | Add `const unused = 1; export const y = 2 == 2;` to a new file (format it first) | `eqeqeq` and `no-unused-vars` errors, **ESLint check failed** |
| Tests           | In any `*.tests.tsx` add `expect(1).toBe(2);`                                    | `Tests: 1 failed` then **Tests failed**                       |
| Changing a rule | Edit `.prettierrc.json` (for example `"singleQuote": false`) and commit          | Prettier check fails on every file, commit rejected           |

In each case the message `husky - pre-commit script failed (code 1)` appears and **no commit is created**, so the code cannot be submitted until it is fixed.

---

## 4. GitHub Actions (CI)

The workflow `.github/workflows/ci.yml` runs on **every push and every pull request** (any branch). It is the safety net for when the local hook is skipped (for example `git commit --no-verify`).

| Job                 | What it does                                                                                       |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| `quality-checks`    | `npm ci` -> Prettier check -> ESLint -> tests -> production build                                  |
| `docker-build`      | Builds the Docker image (runs only if `quality-checks` passed)                                     |
| `notify-on-failure` | Runs only on failure: adds an `::error` annotation and a "Build failed" summary, and fails the run |

### Set it up on GitHub

1. Create a new empty repository on GitHub (for example `adeyemi_olukayode_coding_assignment13`).
2. Push this project (the `.github` folder must be at the **repository root**):

   ```powershell
   # Run this once only if the project does not already have a Git repository.
   git init
   git add .
   git commit -m "Assignment 13: build checks"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

3. Open the **Actions** tab on GitHub. The workflow runs automatically and should show a green check.
4. **Notifications:** GitHub emails the person who pushed whenever a workflow run fails (check _Settings -> Notifications -> Actions_ on your GitHub account). The failed run also shows a red X on the commit, and the `notify-on-failure` job prints the failure summary.
5. **Block bad merges (recommended):** _Settings -> Branches -> Add branch protection rule_ for `main` -> tick **Require status checks to pass before merging** and select **Prettier, ESLint, Tests and Build**.

### Demonstrate the CI failure (bypassing the hook)

```powershell
# break a test or format, then skip the local hook on purpose
git add .
git commit --no-verify -m "bypass the hook"
git push
```

Open the **Actions** tab: the run shows a red X, the failing step is highlighted, the `notify-on-failure` job reports the failure, and GitHub sends a failure email. Fix the code (or `git revert HEAD`) and push again to get a green check.

---

## 5. Run the site with Docker on localhost:8018

The `Dockerfile` is a **multi-stage build**:

1. **builder** (`node:22-alpine`, `WORKDIR /adeyemi_olukayode_ui_garden_build_checks`): `npm ci`, then **runs Prettier, ESLint and the tests** (the image build fails if any check fails), then `npm run build` creates the production build.
2. **runner** (`nginx:alpine`, `WORKDIR /adeyemi_olukayode_ui_garden_build_checks`): copies the production files into the working directory and serves them with nginx on port **8018**.

### Build the image

```powershell
docker build -t adeyemi_olukayode_ui_garden_build_checks .
```

### Run the container with the required name

```powershell
docker run -d --name adeyemi_olukayode_coding_assignment13 -p 8018:8018 adeyemi_olukayode_ui_garden_build_checks
```

(Or use Docker Compose: `docker compose up -d --build`.)

### Open the site

- http://localhost:8018
- http://127.0.0.1:8018

### Verify and clean up

```powershell
docker ps --filter "name=adeyemi_olukayode_coding_assignment13"   # shows 0.0.0.0:8018->8018/tcp
docker exec adeyemi_olukayode_coding_assignment13 pwd              # /adeyemi_olukayode_ui_garden_build_checks
docker exec adeyemi_olukayode_coding_assignment13 ls               # index.html, static, ...
docker stop adeyemi_olukayode_coding_assignment13
docker rm adeyemi_olukayode_coding_assignment13
```

If the name is already in use, run `docker rm -f adeyemi_olukayode_coding_assignment13` first. If port 8018 is busy, stop the container using it (`docker ps`).

---

## 6. Requirement checklist

| Requirement                                                  | Where / how to verify                                                              |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| Dockerfile hosts a production build of the component library | `Dockerfile` runs `npm run build` and serves `build` with nginx                    |
| Site on localhost:8018 / 127.0.0.1:8018                      | nginx `listen 8018`, `-p 8018:8018`                                                |
| Container named `adeyemi_olukayode_coding_assignment13`      | `docker run --name ...` (also `docker-compose.yml`), check with `docker ps`        |
| Working dir `adeyemi_olukayode_ui_garden_build_checks`       | `WORKDIR` in both stages, check with `docker exec ... pwd`                         |
| Husky pre-commit hook                                        | `.husky/pre-commit`, installed by `npm install` (`git config core.hooksPath`)      |
| Prettier check                                               | `npm run format:check` (in hook, CI and Docker build)                              |
| ESLint check                                                 | `npm run lint` (in hook, CI and Docker build)                                      |
| Tests                                                        | `npm run test:ci` (in hook, CI and Docker build)                                   |
| Rule change/violation blocks the commit                      | Section 3 "commit is blocked" demonstrations                                       |
| GitHub Actions repeats the checks and reports failures       | `.github/workflows/ci.yml`, Actions tab, failure email and `notify-on-failure` job |

---

## 7. How it works (summary for the explanation)

- **Why quality gates?** They catch formatting problems, bad patterns and broken behaviour before code is shared, so the main branch always builds and passes tests.
- **Husky** wires a script into git's `pre-commit` hook. If the script exits with a non-zero code, git cancels the commit. `npm install` installs the hook through the `prepare` script, so every developer gets it.
- **Prettier** enforces one code style; **ESLint** finds bugs and bad practices (`eslint-config-prettier` stops the two tools from fighting); **Jest tests** check behaviour.
- **Local hooks can be skipped** (`--no-verify`), so **GitHub Actions** runs the same commands on a clean Ubuntu machine for every push and pull request. A failure turns the commit red, emails the author and (with branch protection) blocks merging. This is the CI part of CI/CD.
- **Docker** packages the result. The multi-stage build repeats the checks, builds the production files with Node, then ships only static files in a small nginx image.

---

## 8. Troubleshooting

| Problem                                      | Fix                                                                                        |
| -------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Hook does not run                            | Run `npm install` (or `npx husky`) and check `git config core.hooksPath` prints `.husky/_` |
| Commit rejected by Prettier                  | Run `npm run format`, `git add .`, commit again                                            |
| Commit rejected by ESLint                    | Run `npm run lint:fix`, fix what remains, commit again                                     |
| Commit rejected by tests                     | Run `npm run test:ci` and fix the failing test                                             |
| `open Dockerfile: no such file or directory` | Run Docker commands from the project root, where the `Dockerfile` is                       |
| `ERR_CONNECTION_REFUSED` on port 8018        | Check `docker ps`: the PORTS column must show `0.0.0.0:8018->8018/tcp`                     |
| Container name already in use                | `docker rm -f adeyemi_olukayode_coding_assignment13`                                       |
| Actions workflow does not appear             | `.github/workflows/ci.yml` must be at the repository root and pushed to GitHub             |
