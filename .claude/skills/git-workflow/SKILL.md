---
name: git-workflow
description: Git workflow best practices for commits, branches, PRs, and merges. Triggers on git operations, commits, branches, PRs, and merges.
allowed-tools: Read, Grep, Glob
model: haiku
effort: low
---

# Git Workflow

## Branch Management

- Always branch from `main`:
  ```
  git checkout main && git pull && git checkout -b <prefix>/<name>
  ```
- Branch naming prefixes: `feat/`, `fix/`, `hotfix/`, `refactor/`, `docs/`, `chore/`
- Use descriptive names, no ticket IDs (e.g., `feat/add-user-auth`, `fix/null-pointer-on-login`)

## Commit Standards

- Use Conventional Commits: `<type>[optional scope]: <description>`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Scope is optional (e.g., `feat(auth): add OAuth2 support`)
- Add a body when context is needed; keep the subject line concise
- Before committing, always ask the user if they want to add Claude as a co-author (via `Co-authored-by` trailer). Do not add it automatically

## PR Workflow

1. Push branch to remote: `git push -u origin <branch>`
2. Create a PR targeting `main`
3. Wait for user approval before merging
4. Squash and merge into `main`

## Merge Strategy

- Always **squash and merge** into `main`
- Keep `main` linear — no merge commits

## Conflict Resolution

1. `git fetch origin && git rebase origin/main`
2. Resolve conflicts in each file
3. `git add <resolved-files> && git rebase --continue`

## Cleanup

- Delete merged branches locally: `git branch -d <branch>`
- Delete merged branches remotely: `git push origin --delete <branch>`
- Prune stale remote refs: `git fetch --prune`

## Best Practices

- Make small, focused commits
- Test before pushing
- Never commit directly to `main`
- Pull latest `main` before creating a new branch
