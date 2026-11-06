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

Clone the GitHub repository, then install the project dependencies:

```powershell
git clone https://github.com/oadeyemi85/adeyemi_olukayode_coding_assignment13.git
cd adeyemi_olukayode_coding_assignment13
npm ci
```

The `prepare` script runs Husky and installs the Git hooks in `.husky/_`. Verify the hook path with:

```powershell
git config core.hooksPath      # prints .husky/_
```

When using the assignment ZIP instead of cloning the repository, run `git init` in the project folder before `npm ci`; Husky requires a Git repository to install the hook.

> `.npmrc` sets `legacy-peer-deps=true` because Create React App 5 declares older peer dependency ranges than React 19 and Storybook 10.

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

### Setup

1. Installed Husky, Prettier, ESLint, and `eslint-config-prettier` as development dependencies.
2. Set `"prepare": "husky"` in `package.json` to install Git hooks after dependency installation. Setup errors are not suppressed.
3. Added `.husky/pre-commit` to run, in order:
   1. `npm run format:check` (Prettier)
   2. `npm run lint` (ESLint, zero warnings allowed)
   3. `npm run test:ci` (Jest tests)
4. The hook stops at the first failed check, prints a message, and blocks the commit.

### Configuration

- **Prettier** (`.prettierrc.json`): single quotes, semicolons, 100-character lines, 2-space indent, LF line endings.
- **ESLint** (`.eslintrc.json`): extends `react-app`, `react-app/jest` and `prettier`. Additional rules include `eqeqeq`, `prefer-const`, `no-debugger`, and `@typescript-eslint/no-unused-vars`. ESLint warnings fail the check.
- **Tests**: Jest, React Testing Library, and jest-styled-components.

### Demonstrate a passing commit

```powershell
git add .
git commit -m "Add feature"
```

The hook runs Prettier, ESLint, and the tests before Git creates the commit.

### Demonstrate a blocked commit

Use a **disposable clone** to test a failing check. Make one change at a time, stage only the demonstration file, and try to commit. The hook should reject the commit. Discard the disposable clone afterward.

| Rule broken     | Example                                                                     | Result                                              |
| --------------- | --------------------------------------------------------------------------- | --------------------------------------------------- |
| Prettier        | Add poorly formatted code to a new file, such as `src/bad.ts`               | Prettier reports the file and the commit is blocked |
| ESLint          | Add an unused variable or use `==` instead of `===` in a new source file    | ESLint reports errors and the commit is blocked     |
| Tests           | Add `expect(1).toBe(2);` to a test                                          | Jest fails and the commit is blocked                |
| Changing a rule | Change a Prettier setting and leave files that do not match the new setting | Prettier check fails and the commit is blocked      |

The terminal reports that the Husky pre-commit script failed, and Git does not create the commit.

---

## 4. GitHub Actions (CI)

The `.github/workflows/ci.yml` workflow runs on every push and pull request. It also checks changes when a local hook is skipped, for example with `git commit --no-verify`.

| Job                 | What it does                                                            |
| ------------------- | ----------------------------------------------------------------------- |
| `quality-checks`    | `npm ci` -> Prettier check -> ESLint -> tests -> production build       |
| `docker-build`      | Builds the Docker image after `quality-checks` passes                   |
| `notify-on-failure` | Adds an error annotation and failure summary when a preceding job fails |

### GitHub setup

The repository is available at [github.com/oadeyemi85/adeyemi_olukayode_coding_assignment13](https://github.com/oadeyemi85/adeyemi_olukayode_coding_assignment13). The `.github` folder must be at the repository root for Actions to detect the workflow.

After pushing changes, open the repository's **Actions** tab to see the workflow result. GitHub notification settings control email alerts for failed runs. To block merges when checks fail, configure branch protection for `main` and require the workflow status check to pass.

### Demonstrate a CI failure

In a disposable clone, introduce a formatting or test failure, then bypass the local hook and push:

```powershell
git add src/bad.ts
git commit --no-verify -m "Demonstrate a failing check"
git push
```

The GitHub Actions run should show the failing check and a red status. Fix the issue in the disposable clone and push again to get a passing run.

---

## 5. Run the site with Docker on localhost:8018

The `Dockerfile` uses a **multi-stage build**:

1. **Builder** (`node:22-alpine`, `WORKDIR /adeyemi_olukayode_ui_garden_build_checks`): installs dependencies, runs Prettier, ESLint, and tests, then creates the production build. The image build stops if a check fails.
2. **Runner** (`nginx:alpine`, `WORKDIR /adeyemi_olukayode_ui_garden_build_checks`): serves the production files with Nginx on port **8018**.

### Build the image

Run this command from the project root:

```powershell
docker build -t adeyemi_olukayode_ui_garden_build_checks .
```

### Run the container

```powershell
docker run -d --name adeyemi_olukayode_coding_assignment13 -p 8018:8018 adeyemi_olukayode_ui_garden_build_checks
```

Docker Compose is also available:

```powershell
docker compose up -d --build
```

### Open the site

- http://localhost:8018
- http://127.0.0.1:8018

### Verify and clean up

```powershell
docker ps --filter "name=adeyemi_olukayode_coding_assignment13"
docker exec adeyemi_olukayode_coding_assignment13 pwd
docker exec adeyemi_olukayode_coding_assignment13 ls
docker stop adeyemi_olukayode_coding_assignment13
docker rm adeyemi_olukayode_coding_assignment13
```

The working directory is `/adeyemi_olukayode_ui_garden_build_checks`. If the container name is already in use, remove the old container before starting another. If port 8018 is busy, stop the process or container using it.

---

## 6. Requirement checklist

| Requirement                                                  | Where / how to verify                                                    |
| ------------------------------------------------------------ | ------------------------------------------------------------------------ |
| Dockerfile hosts a production build of the component library | `Dockerfile` runs `npm run build` and serves `build` with Nginx          |
| Site on localhost:8018 / 127.0.0.1:8018                      | Nginx listens on port 8018; Docker maps `8018:8018`                      |
| Container name                                               | `docker run --name ...` or `docker-compose.yml`; check with `docker ps`  |
| Working directory                                            | `WORKDIR` in both Docker stages; check with `docker exec ... pwd`        |
| Husky pre-commit hook                                        | `.husky/pre-commit`, installed by `npm ci` (`git config core.hooksPath`) |
| Prettier check                                               | `npm run format:check` in the hook, CI, and Docker build                 |
| ESLint check                                                 | `npm run lint` in the hook, CI, and Docker build                         |
| Tests                                                        | `npm run test:ci` in the hook, CI, and Docker build                      |
| Rule change or violation blocks a commit                     | Section 3, "Demonstrate a blocked commit"                                |
| GitHub Actions checks and reports failures                   | `.github/workflows/ci.yml` and the repository's Actions tab              |

---

## 7. How it works

- **Quality checks** catch formatting problems, code issues, and failing behavior before changes are shared.
- **Husky** runs the pre-commit script. A non-zero exit code blocks the commit. The `prepare` script installs the hook when dependencies are installed.
- **Prettier** enforces consistent formatting. **ESLint** checks code quality, and **Jest** tests component behavior.
- **GitHub Actions** repeats the checks on pushes and pull requests, including when a local hook is bypassed. Branch protection can require successful checks before merging.
- **Docker** runs the quality gates, creates a production build, and serves the static files from a small Nginx image.

These steps demonstrate continuous integration and delivery (CI/CD): automated checks verify changes, and Docker packages the production application for deployment.

---

## 8. Troubleshooting

| Problem                                      | Fix                                                                                    |
| -------------------------------------------- | -------------------------------------------------------------------------------------- |
| Hook does not run                            | Run `npm ci` in the repository and check `git config core.hooksPath` prints `.husky/_` |
| Commit rejected by Prettier                  | Run `npm run format`, stage the updated files, and commit again                        |
| Commit rejected by ESLint                    | Run `npm run lint:fix`, fix remaining errors, stage the changes, and commit again      |
| Commit rejected by tests                     | Run `npm run test:ci` and fix the failing test                                         |
| `open Dockerfile: no such file or directory` | Run Docker commands from the project root                                              |
| `ERR_CONNECTION_REFUSED` on port 8018        | Check `docker ps` and confirm the port mapping is `0.0.0.0:8018->8018/tcp`             |
| Container name already in use                | Stop and remove the existing container before starting another                         |
| Actions workflow does not appear             | Confirm `.github/workflows/ci.yml` is at the repository root and pushed to GitHub      |
