# Carbon Figma to React Mode Assessment Materials

This directory contains comprehensive testing materials for assessing the "Carbon Figma to React" and "Carbon Figma to React (Updated)" modes.

## Reference Solution

**Branch:** `bob-a-long-four-c`  
**Figma Design:** https://www.figma.com/design/9JMZZVqaZgWxxs5n8yFQBl/Bob-demo-welcome-page?node-id=1-20498&m=dev

The reference solution implements a complete welcome page with:

- Welcome header with feature tiles
- Jump back in section with recent worksheets
- Recently run jobs section
- Connections data table with filtering and pagination

## Files in This Directory

### 1. `test-prompt.md`

The standardized prompt to give to both modes being assessed. Contains:

- Design reference (Figma URL)
- Complete requirements
- Technical specifications
- Success criteria

**Usage:** Copy this prompt exactly to both modes to ensure fair comparison.

### 2. `assessment-checklist.md`

Comprehensive manual assessment checklist with:

- **Part 1:** Critical Requirements (Pass/Fail) - 10 must-pass items
- **Part 2:** Code Quality Assessment (0-50 points)
- **Part 3:** Process Quality Assessment (0-30 points)
- **Part 4:** Outcome Quality Assessment (0-30 points)

**Usage:** Fill out this checklist while reviewing each implementation. Compare scores at the end.

### 3. `automated-review.js`

Node.js script that performs automated checks on the implementation.

**Checks performed:**

- File structure verification
- Copyright header presence
- Carbon component imports
- Grid system usage (multiple Grids, responsive props)
- Carbon token usage (spacing, theme, typography)
- Component selection (ClickableTile, DataTable, etc.)
- Accessibility features
- Code organization

**Usage:**

```bash
# From the project root
node assessment-materials/automated-review.js src/pages/new-welcome

# Or from assessment-materials directory
node automated-review.js ../src/pages/new-welcome
```

**Output:**

- Detailed pass/fail for each check
- Score and percentage
- Grade (Excellent, Good, Satisfactory, Needs Improvement, Unsatisfactory)
- List of warnings and failed checks

## Assessment Workflow

### Step 1: Preparation

1. Ensure you're on the main branch
2. Review the reference solution in branch `bob-a-long-four-c`
3. Familiarize yourself with the Figma design

### Step 2: Test Mode 1 (Original)

1. Switch to "Carbon Figma to React" mode
2. Provide the prompt from `test-prompt.md`
3. Follow minimal guidance approach (answer questions, don't guide)
4. Document the process in `assessment-checklist.md`
5. Run `automated-review.js` on the implementation
6. Test in browser at all breakpoints

### Step 3: Test Mode 2 (Updated)

1. Switch to "Carbon Figma to React (Updated)" mode
2. Provide the same prompt from `test-prompt.md`
3. Follow the same minimal guidance approach
4. Document the process in a separate checklist
5. Run `automated-review.js` on the implementation
6. Test in browser at all breakpoints

### Step 4: Comparison

1. Compare scores from both checklists
2. Compare automated review results
3. Compare browser testing results
4. Document key differences
5. Make recommendation

## Scoring System

### Critical Requirements (Must Pass All)

- Complete design analysis before implementation
- Separate Grid components for each logical content group
- Responsive column configuration (sm, md, lg)
- Carbon MCP usage before implementation
- Browser validation prompting
- Official Carbon components used

### Weighted Scoring

- **Code Quality:** 40% (50 points)
  - Component selection
  - Grid implementation
  - Token usage
  - Code organization
  - Accessibility

- **Process Quality:** 30% (30 points)
  - Design analysis completeness
  - Carbon MCP research
  - Workflow adherence

- **Outcome Quality:** 30% (30 points)
  - Visual accuracy
  - Responsive behavior
  - Functionality

**Total:** 110 points = 100%

### Grading Scale

- 90-100%: Excellent
- 80-89%: Good
- 70-79%: Satisfactory
- 60-69%: Needs Improvement
- Below 60%: Unsatisfactory

## Key Evaluation Criteria

### Grid System (Critical)

The reference solution uses **separate Grid components** for each logical content group:

- Welcome Header: 2 narrow Grids (title + content with nested Grid)
- Jump Back In: 1 narrow Grid with nested Grid for paths
- Recently Run Jobs: 2 narrow Grids (header + tiles)
- Connections: 2 Grids (title narrow + table area condensed)

**This is the most important differentiator between good and poor implementations.**

### Carbon Component Usage

Reference solution uses:

- `ClickableTile` for feature and job tiles
- `DataTable` with full table components
- `TabsVertical` and `TabListVertical`
- `Search` component
- `Pagination` component
- `IconIndicator` (preview component) for status
- `Link` for navigation
- `Button` with `renderIcon`

### Carbon Token Usage

Reference solution consistently uses:

- Spacing tokens (`$spacing-02` through `$spacing-10`)
- Typography mixins (`@include type-style('heading-03')`)
- Theme tokens (`$layer`, `$text-primary`, `$icon-primary`)

### Code Organization

Reference solution structure:

```
src/pages/new-welcome/
├── NewWelcome.jsx (main page)
├── NewWelcomeHeader.jsx (section 1)
├── JumpBackIn.jsx (section 2)
├── RecentlyRunJobs.jsx (section 3)
├── ConnectionsSection.jsx (section 4)
├── connectionsData.js (data)
└── new-welcome.scss (styles)
```

## Tips for Fair Assessment

1. **Provide identical prompts** - Use `test-prompt.md` exactly as written
2. **Maintain consistent guidance** - Answer questions the same way for both modes
3. **Document everything** - Note questions asked, decisions made, iterations needed
4. **Test thoroughly** - Check all breakpoints, all functionality
5. **Be objective** - Use the scoring rubric consistently

## Expected Time Investment

- **Quick Assessment:** 2-3 hours (one test scenario per mode)
- **Standard Assessment:** 1 day (comprehensive testing)
- **Thorough Assessment:** 2-3 days (multiple iterations, edge cases)

## Deliverables

After completing the assessment, you should have:

1. **Completed checklists** for both modes
2. **Automated review results** for both implementations
3. **Browser testing notes** with screenshots
4. **Comparison document** highlighting key differences
5. **Recommendation** on which mode to use

## Questions or Issues?

If you encounter issues with the assessment materials:

1. Check that you're using the correct branch (`bob-a-long-four-c`)
2. Verify the Figma design URL is accessible
3. Ensure Node.js is installed for the automated review script
4. Review the reference solution for clarification

## License

Copyright IBM Corp. 2026

This source code is licensed under the Apache-2.0 license found in the
LICENSE file in the root directory of this source tree.
