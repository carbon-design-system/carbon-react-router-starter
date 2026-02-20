# Quick Start Guide - Mode Assessment

## 5-Minute Setup

### 1. Review Reference Solution (5 min)

```bash
# Switch to reference branch
git checkout bob-a-long-four-c

# Review the implementation
open src/pages/new-welcome/
```

**Key things to note:**

- 4 separate section components
- Multiple Grid components per section
- Uses narrow/condensed Grid variants
- Consistent Carbon token usage
- Clean component separation

### 2. View the Design (2 min)

Open: https://www.figma.com/design/9JMZZVqaZgWxxs5n8yFQBl/Bob-demo-welcome-page?node-id=1-20498&m=dev

**Key design elements:**

- Welcome header with 4 feature tiles
- Jump back in with 4 worksheet links
- Recently run jobs with 4 job tiles
- Connections table with vertical tabs and pagination

---

## Running the Assessment

### Option A: Quick Test (2-3 hours)

**Test one scenario in each mode:**

1. **Switch to Mode 1**

   ```
   Use mode: Carbon Figma to React
   ```

2. **Give the prompt**

   ```
   Copy from: assessment-materials/test-prompt.md
   ```

3. **Let it work**
   - Answer questions only
   - Don't guide implementation
   - Document what happens

4. **Run automated review**

   ```bash
   node assessment-materials/automated-review.js src/pages/[implementation-path]
   ```

5. **Repeat for Mode 2**

   ```
   Use mode: Carbon Figma to React (Updated)
   ```

6. **Compare results**
   - Use assessment-checklist.md
   - Compare automated scores
   - Test in browser

---

### Option B: Standard Test (1 day)

Follow Option A but add:

- Complete manual checklist for both
- Thorough browser testing at all breakpoints
- Document all differences
- Create comparison report

---

## What to Look For

### 🔴 Critical (Must Pass)

- [ ] Complete design analysis before coding
- [ ] Separate Grid for each logical section
- [ ] Responsive columns (sm, md, lg) everywhere
- [ ] Used Carbon MCP to research components
- [ ] Prompted for browser validation

### 🟡 Important (Scoring)

- Carbon component choices (ClickableTile, DataTable, etc.)
- Grid variants (narrow, condensed)
- Token usage (spacing, theme, typography)
- Code organization (separate files per section)
- Accessibility (ARIA, semantic HTML)

### 🟢 Nice to Have

- Data extraction to separate file
- Consistent naming conventions
- Clean imports
- Good comments

---

## Quick Comparison Checklist

| Aspect                       | Mode 1  | Mode 2  | Winner |
| ---------------------------- | ------- | ------- | ------ |
| Design analysis completeness | ☐       | ☐       |        |
| Separate Grids used          | ☐       | ☐       |        |
| Carbon components correct    | ☐       | ☐       |        |
| Token usage consistent       | ☐       | ☐       |        |
| Code organization clean      | ☐       | ☐       |        |
| Browser validation prompted  | ☐       | ☐       |        |
| **Automated score**          | \_\_\_% | \_\_\_% |        |

---

## Running Automated Review

```bash
# From project root
node assessment-materials/automated-review.js src/pages/[path-to-implementation]

# Example for reference solution
node assessment-materials/automated-review.js src/pages/new-welcome
```

**Expected output for reference solution:**

- Score: ~85-95% (Excellent/Good)
- All file structure checks pass
- All copyright headers present
- Grid usage checks pass
- Token usage checks pass
- Component usage checks pass

---

## Common Issues to Watch For

### ❌ Single Grid for Everything

```jsx
// WRONG - all sections in one Grid
<Grid>
  <Column lg={16}>
    <Header />
  </Column>
  <Column lg={4}>
    <Tile />
  </Column>
  <Column lg={4}>
    <Tile />
  </Column>
  <Column lg={16}>
    <Table />
  </Column>
</Grid>
```

### ✅ Separate Grids for Logical Groups

```jsx
// CORRECT - separate Grids
<Grid>
  <Column lg={16}><Header /></Column>
</Grid>
<Grid>
  <Column lg={4}><Tile /></Column>
  <Column lg={4}><Tile /></Column>
</Grid>
<Grid>
  <Column lg={16}><Table /></Column>
</Grid>
```

### ❌ Missing Responsive Props

```jsx
// WRONG - only lg defined
<Column lg={4}>Content</Column>
```

### ✅ Full Responsive Configuration

```jsx
// CORRECT - all breakpoints
<Column sm={4} md={4} lg={4}>
  Content
</Column>
```

### ❌ Hardcoded Values

```scss
// WRONG
.my-component {
  padding: 16px;
  margin-bottom: 32px;
}
```

### ✅ Carbon Tokens

```scss
// CORRECT
.my-component {
  padding: $spacing-05;
  margin-bottom: $spacing-07;
}
```

---

## Decision Matrix

After testing both modes, use this to decide:

**Choose Mode 1 (Original) if:**

- More detailed guidance is needed
- Team is less familiar with Carbon
- Comprehensive documentation is valued
- Willing to trade verbosity for thoroughness

**Choose Mode 2 (Updated) if:**

- Streamlined workflow is preferred
- Team is experienced with Carbon
- Faster iterations are important
- Concise instructions are valued

**Choose neither if:**

- Critical requirements not met
- Score below 60%
- Major functionality broken
- Significant deviations from Carbon patterns

---

## Time Estimates

- **Setup & Review:** 10 minutes
- **Mode 1 Test:** 1-2 hours
- **Mode 2 Test:** 1-2 hours
- **Comparison:** 30 minutes
- **Documentation:** 30 minutes

**Total: 3-4 hours for quick assessment**

---

## Questions During Assessment?

1. **"Should I help with X?"**
   - Only if both modes get the same help
   - Document what help was provided

2. **"Mode is stuck, what do I do?"**
   - Give minimal hint
   - Document the issue
   - Note it in comparison

3. **"Implementation looks different from reference"**
   - That's okay if it meets requirements
   - Focus on critical requirements first
   - Score based on rubric, not exact match

4. **"Automated review shows warnings"**
   - Warnings don't fail the test
   - Note them in manual checklist
   - Consider if they're valid concerns

---

## Final Deliverable

Create a simple summary:

```markdown
# Mode Assessment Results

## Winner: [Mode Name]

**Scores:**

- Mode 1: X% (Grade)
- Mode 2: Y% (Grade)

**Key Differentiator:**
[Main reason for winner]

**Recommendation:**
[Which mode to use and why]

**Evidence:**

- [Specific examples]
- [Automated scores]
- [Browser testing results]
```

---

## Need Help?

- Review `README.md` for full details
- Check `assessment-checklist.md` for scoring rubric
- Examine reference solution in `bob-a-long-four-c` branch
- Run automated review on reference to see expected results
