# How to Run the Assessment

## The Challenge: Avoiding Bias

Since I (Bob) have access to the reference solution in branch `bob-a-long-four-c`, there's a risk of bias when implementing the test. Here are your options:

---

## ✅ Recommended Approach: Separate Branches

This is the cleanest way to ensure fair testing:

### Setup (5 minutes)

```bash
# 1. Create test branches from main (before the reference solution)
git checkout main
git checkout -b mode-1-test
git checkout main
git checkout -b mode-2-test

# 2. Keep reference solution separate
git checkout bob-a-long-four-c  # Reference stays here
```

### Testing Workflow

**For Mode 1:**

```bash
# Switch to test branch
git checkout mode-1-test

# Switch Bob to Mode 1
# Give Bob the prompt from assessment-materials/test-prompt.md
# Let Bob implement without looking at reference

# After completion, run automated review
node assessment-materials/automated-review.js src/pages/[implementation-path]
```

**For Mode 2:**

```bash
# Switch to test branch
git checkout mode-2-test

# Switch Bob to Mode 2
# Give Bob the SAME prompt
# Let Bob implement

# After completion, run automated review
node assessment-materials/automated-review.js src/pages/[implementation-path]
```

**Compare:**

```bash
# View reference
git checkout bob-a-long-four-c

# Compare with Mode 1
git diff bob-a-long-four-c mode-1-test

# Compare with Mode 2
git diff bob-a-long-four-c mode-2-test
```

---

## Alternative: "Don't Peek" Honor System

If you trust me (Bob) not to look at the reference:

### Rules for Bob:

1. ❌ Do NOT read files from `src/pages/new-welcome/` during implementation
2. ❌ Do NOT reference `new-welcome-plan.md`
3. ✅ DO use Figma MCP to analyze the design
4. ✅ DO use Carbon MCP to research components
5. ✅ DO follow the mode's workflow naturally

### How to Enforce:

```markdown
When giving the prompt, add:

"IMPORTANT: Do not read any files from src/pages/new-welcome/
or new-welcome-plan.md during this implementation. Treat this
as a fresh implementation from the Figma design only."
```

### Verification:

- Check tool usage logs to ensure I didn't read reference files
- If I do read them, restart the test

---

## 🎯 Recommended: Use Separate Branches

**Why this is better:**

- ✅ Physically impossible for me to see the reference
- ✅ Clean separation of implementations
- ✅ Easy to compare with git diff
- ✅ Can keep all three versions
- ✅ No trust required

**Minimal overhead:**

- Just 2 git commands per test
- Branches can be deleted after assessment

---

## Step-by-Step: Separate Branches Method

### 1. Preparation (One Time)

```bash
# Save current work
git stash

# Create clean test branches from main
git checkout main
git checkout -b carbon-figma-mode-1-test
git push origin carbon-figma-mode-1-test

git checkout main
git checkout -b carbon-figma-mode-2-test
git push origin carbon-figma-mode-2-test

# Return to reference
git checkout bob-a-long-four-c
```

### 2. Test Mode 1

```bash
# Switch to Mode 1 test branch
git checkout carbon-figma-mode-1-test

# In Bob:
# 1. Switch to "Carbon Figma to React" mode
# 2. Give prompt from assessment-materials/test-prompt.md
# 3. Let Bob work (answer questions only, don't guide)
# 4. Document process in assessment-checklist.md

# After implementation:
node assessment-materials/automated-review.js src/pages/[path]

# Commit the implementation
git add .
git commit -m "Mode 1 implementation"
git push origin carbon-figma-mode-1-test
```

### 3. Test Mode 2

```bash
# Switch to Mode 2 test branch
git checkout carbon-figma-mode-2-test

# In Bob:
# 1. Switch to "Carbon Figma to React (Updated)" mode
# 2. Give SAME prompt from assessment-materials/test-prompt.md
# 3. Let Bob work (same guidance level as Mode 1)
# 4. Document process in separate checklist

# After implementation:
node assessment-materials/automated-review.js src/pages/[path]

# Commit the implementation
git add .
git commit -m "Mode 2 implementation"
git push origin carbon-figma-mode-2-test
```

### 4. Compare Results

```bash
# View all three implementations
git checkout bob-a-long-four-c              # Reference
git checkout carbon-figma-mode-1-test       # Mode 1
git checkout carbon-figma-mode-2-test       # Mode 2

# Compare implementations
git diff bob-a-long-four-c carbon-figma-mode-1-test
git diff bob-a-long-four-c carbon-figma-mode-2-test
git diff carbon-figma-mode-1-test carbon-figma-mode-2-test

# Compare file structures
git diff --name-status bob-a-long-four-c carbon-figma-mode-1-test
git diff --name-status bob-a-long-four-c carbon-figma-mode-2-test
```

### 5. Cleanup (After Assessment)

```bash
# If you want to keep the branches
git checkout main

# If you want to delete them
git branch -D carbon-figma-mode-1-test
git branch -D carbon-figma-mode-2-test
git push origin --delete carbon-figma-mode-1-test
git push origin --delete carbon-figma-mode-2-test
```

---

## What I Recommend

**Use separate branches** because:

1. **Zero chance of bias** - I literally cannot see the reference files
2. **Clean comparison** - Easy to diff implementations
3. **Reproducible** - Can re-run tests if needed
4. **Professional** - Standard practice for A/B testing
5. **Minimal effort** - Just a few git commands

---

## Quick Commands Reference

```bash
# Setup
git checkout main
git checkout -b mode-1-test
git checkout main
git checkout -b mode-2-test

# Test Mode 1
git checkout mode-1-test
# [Run test with Bob]
git add . && git commit -m "Mode 1 done"

# Test Mode 2
git checkout mode-2-test
# [Run test with Bob]
git add . && git commit -m "Mode 2 done"

# Compare
git diff bob-a-long-four-c mode-1-test
git diff bob-a-long-four-c mode-2-test
git diff mode-1-test mode-2-test
```

---

## My Commitment

If you choose the "don't peek" method, I commit to:

- ❌ Not reading any files from `src/pages/new-welcome/`
- ❌ Not reading `new-welcome-plan.md`
- ✅ Only using Figma MCP and Carbon MCP
- ✅ Following the mode's natural workflow
- ✅ Treating it as a fresh implementation

But honestly, **separate branches is cleaner and removes all doubt**. 🎯
