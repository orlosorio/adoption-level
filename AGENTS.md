<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Deployment: Vercel requires explicit CLI deploy

**CRITICAL:** This project does NOT have Vercel-GitHub auto-deploy connected. Pushing to `origin/main` does NOT trigger a Vercel deployment. There are no webhooks on the GitHub repo.

When the user asks to deploy (or says "commit deploy"), you MUST run `vercel --prod --yes` explicitly after pushing. A `git push` alone will NOT deploy anything.

**Correct deploy sequence:**
```
git add -A && git commit -m "..." && git push origin main && vercel --prod --yes 2>&1
```

**WRONG — this will NOT deploy:**
```
git push origin main
# ❌ Saying "deploy should be underway" after just pushing is INCORRECT
```

Always verify the deployment succeeded by checking the `vercel --prod` output for "Production:" and the alias URL. Do not tell the user the deploy is done unless you see this confirmation.
