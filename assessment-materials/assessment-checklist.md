# Carbon Figma to React Mode Assessment Checklist

## Reference Solution

Branch: `bob-a-long-four-c`
Files: `src/pages/new-welcome/*`

---

## Part 1: Critical Requirements (Pass/Fail)

Each requirement must be met for the mode to pass. Check ✅ or ❌ for each.

### Design Analysis Requirements

- [ ] **Complete design analysis presented before implementation**
  - [ ] Component Inventory section included
  - [ ] Typography Analysis section included
  - [ ] Grid Analysis section included with column spans for all breakpoints
  - [ ] Spacing Analysis section included
  - [ ] Paused for user confirmation after analysis

### Grid System Requirements

- [ ] **Separate Grid for Welcome Header section**
  - Reference: `NewWelcomeHeader.jsx` uses 2 separate narrow Grids
- [ ] **Separate Grid for feature tiles**
  - Reference: Nested Grid within header for the 4 tiles
- [ ] **Separate Grid for Jump Back In section**
  - Reference: `JumpBackIn.jsx` uses narrow Grid with nested Grid for paths
- [ ] **Separate Grid for Recently Run Jobs section**
  - Reference: `RecentlyRunJobs.jsx` uses 2 separate narrow Grids (header + tiles)
- [ ] **Separate Grid for Connections section**
  - Reference: `ConnectionsSection.jsx` uses 2 Grids (title + table area)

### Responsive Configuration

- [ ] **All Column components have sm, md, lg props defined**
  - Check all Grid/Column implementations
- [ ] **Column spans are appropriate for content**
  - Welcome tiles: `sm={4} md={4} lg={3}` (4 tiles across on desktop)
  - Job tiles: `sm={4} md={4} lg={4}` (4 tiles across on desktop)
  - Jump back paths: `sm={4} md={4} lg={3}` (4 paths across on desktop)

### Carbon Component Usage

- [ ] **Used Carbon MCP to research components before implementation**
  - Check if mode used MCP tools during implementation
- [ ] **Used official Carbon components (not custom recreations)**
  - ClickableTile for feature and job tiles
  - DataTable for connections table
  - Search component
  - TabsVertical for connection type filter
  - Pagination component
  - IconIndicator for status (preview component)

### Workflow Requirements

- [ ] **Prompted for browser validation after implementation**
  - Mode should ask user to validate in browser

### Code Quality Basics

- [ ] **Copyright headers included in all new files**
  - Check all `.jsx` and `.scss` files

---

## Part 2: Code Quality Assessment (Scored 0-50 points)

### A. Component Selection (0-10 points)

**Reference Solution Uses:**

- `ClickableTile` for feature tiles and job tiles
- `DataTable` with full table components
- `Search` component
- `TabsVertical` and `TabListVertical`
- `Pagination`
- `IconIndicator` (preview component) for status
- `Link` for navigation
- `Button` with `renderIcon`
- Icons from `@carbon/icons-react`

**Scoring:**

- **10 pts:** All components match reference or better
- **7-9 pts:** Most components correct, minor suboptimal choices
- **4-6 pts:** Mixed - some Carbon, some custom when Carbon exists
- **0-3 pts:** Mostly custom components

**Score: \_\_\_/10**

**Notes:**

```
[Document component choices and any differences from reference]
```

---

### B. Grid Implementation (0-10 points)

**Reference Solution Structure:**

1. Welcome Header: 2 narrow Grids (title + content with nested Grid for tiles)
2. Jump Back In: 1 narrow Grid with nested Grid for paths
3. Recently Run Jobs: 2 narrow Grids (header + tiles)
4. Connections: 2 Grids (title narrow + table area condensed)

**Key Features:**

- Uses `narrow` variant for most sections (16px gap)
- Uses `condensed` variant for connections table area (0px gap)
- Nested Grids for tile groups
- `.narrow-grid-adjustment` class for consistent padding

**Scoring:**

- **10 pts:** Perfect - matches reference structure with separate Grids for all logical groups
- **7-9 pts:** Mostly correct, minor issues with Grid variants or nesting
- **4-6 pts:** Some separate Grids, but mixed logical groups in places
- **0-3 pts:** Single Grid or incorrect Grid usage throughout

**Score: \_\_\_/10**

**Notes:**

```
[Document Grid structure and any differences from reference]
```

---

### C. Carbon Token Usage (0-10 points)

**Reference Solution Uses:**

**Spacing Tokens:**

- `$spacing-02`: 4px (small gaps)
- `$spacing-03`: 8px (icon/text gaps)
- `$spacing-05`: 16px (standard padding, tile padding, row gaps)
- `$spacing-06`: 24px (intro section gap)
- `$spacing-07`: 32px (section padding, intro margin)
- `$spacing-08`: 40px (large gaps between sections)
- `$spacing-09`: 48px (section top padding)
- `$spacing-10`: 64px (extra large gaps)

**Typography Tokens:**

- `heading-05`: Page title
- `heading-03`: Section headings
- `heading-02`: Tile titles
- `heading-compact-01`: Filter label
- `body-long-01`: Value prop text
- `body-short-01`: Tile descriptions
- `label-01`: Labels
- `helper-text-01`: Captions

**Theme Tokens:**

- `$layer`: Background
- `$layer-01`: Tile backgrounds, filter background
- `$layer-accent`: Gradient background
- `$text-primary`: Primary text
- `$text-secondary`: Secondary text
- `$icon-primary`: Icon colors

**Scoring:**

- **10 pts:** Consistent use of all appropriate tokens
- **7-9 pts:** Mostly tokens, few hardcoded values
- **4-6 pts:** Mixed tokens and hardcoded values
- **0-3 pts:** Mostly hardcoded values

**Score: \_\_\_/10**

**Notes:**

```
[Document token usage and any hardcoded values]
```

---

### D. Code Organization (0-10 points)

**Reference Solution Structure:**

```
src/pages/new-welcome/
├── NewWelcome.jsx (main page, uses PageLayout)
├── NewWelcomeHeader.jsx (section 1)
├── JumpBackIn.jsx (section 2)
├── RecentlyRunJobs.jsx (section 3)
├── ConnectionsSection.jsx (section 4)
├── connectionsData.js (data file)
└── new-welcome.scss (all styles)
```

**Key Features:**

- Separate component per section
- Data extracted to separate file
- Single SCSS file with BEM-style naming
- Uses PageLayout with Header slot
- Clean imports and exports

**Scoring:**

- **10 pts:** Clean separation matching or better than reference
- **7-9 pts:** Good organization with minor improvements possible
- **4-6 pts:** Functional but could be better organized
- **0-3 pts:** Monolithic or poorly structured

**Score: \_\_\_/10**

**Notes:**

```
[Document file structure and organization]
```

---

### E. Accessibility (0-10 points)

**Reference Solution Includes:**

- Semantic HTML (`<h1>`, `<h2>`, `<h3>`)
- ARIA labels on buttons (`aria-label="More information"`)
- Proper button types (`type="button"`)
- Link components for navigation
- TabListVertical with `aria-label`
- Proper heading hierarchy
- ClickableTile provides keyboard navigation
- DataTable provides proper table semantics

**Scoring:**

- **10 pts:** Full ARIA labels, keyboard navigation, screen reader support
- **7-9 pts:** Good accessibility with minor gaps
- **4-6 pts:** Basic accessibility, missing some features
- **0-3 pts:** Little to no accessibility consideration

**Score: \_\_\_/10**

**Notes:**

```
[Document accessibility features and any gaps]
```

---

**Total Code Quality Score: \_\_\_/50**

---

## Part 3: Process Quality Assessment (Scored 0-30 points)

### A. Design Analysis Completeness (0-10 points)

**Expected Analysis Sections:**

1. **Component Inventory** (2 pts)
   - List all Carbon components needed
   - Include variants and props
   - List non-Carbon components (PageLayout, etc.)

2. **Typography Analysis** (2 pts)
   - Map all text elements to Carbon type tokens
   - Document font sizes and line heights

3. **Grid Analysis** (3 pts)
   - Document grid structure for each section
   - Specify column spans for ALL breakpoints (sm, md, lg)
   - Identify separate Grids for logical content groups

4. **Spacing Analysis** (2 pts)
   - Map spacing to Carbon spacing tokens
   - Document margins, padding, gaps

5. **User Confirmation** (1 pt)
   - Paused after analysis to ask for confirmation

**Score: \_\_\_/10**

**Notes:**

```
[Document what was included in the analysis]
```

---

### B. Carbon MCP Research (0-10 points)

**Expected MCP Usage:**

- Research ClickableTile component and props
- Research DataTable implementation patterns
- Research TabsVertical usage
- Research IconIndicator (preview component)
- Research Pagination component
- Research Grid variants (narrow, condensed)

**Scoring:**

- **10 pts:** Researched all major components before implementation
- **7-9 pts:** Researched most components
- **4-6 pts:** Researched some components
- **0-3 pts:** Little to no MCP research

**Score: \_\_\_/10**

**Notes:**

```
[Document which components were researched via MCP]
```

---

### C. Workflow Adherence (0-10 points)

**Expected Workflow:**

1. Access Figma design
2. Collect details using Figma MCP tools
3. Create complete design analysis
4. Pause for user confirmation
5. Research components using Carbon MCP
6. Implement with proper Grid structure
7. Prompt for browser validation

**Scoring:**

- **10 pts:** Followed workflow perfectly
- **7-9 pts:** Followed workflow with minor deviations
- **4-6 pts:** Partially followed workflow
- **0-3 pts:** Ignored workflow guidelines

**Score: \_\_\_/10**

**Notes:**

```
[Document workflow adherence]
```

---

**Total Process Score: \_\_\_/30**

---

## Part 4: Outcome Quality Assessment (Scored 0-30 points)

### A. Visual Accuracy (0-10 points)

**Compare browser output to Figma design:**

**Key Visual Elements:**

- Welcome header with gradient background
- 4 feature tiles with proper spacing and sizing (164px height)
- Jump back in section with breadcrumb-style paths
- 4 job tiles with large icons (48px) and proper layout (189px height)
- Connections table with vertical tabs sidebar
- Status indicators with proper colors
- Proper spacing between all sections

**Scoring:**

- **10 pts:** Pixel-perfect or very close match
- **7-9 pts:** Very close, minor spacing differences
- **4-6 pts:** Recognizable but noticeable differences
- **0-3 pts:** Significantly different from design

**Score: \_\_\_/10**

**Notes:**

```
[Document visual differences from design]
```

---

### B. Responsive Behavior (0-10 points)

**Test at breakpoints:**

**Small (sm - 320px+):**

- All tiles stack vertically (4 columns each)
- Table scrolls horizontally if needed
- Vertical tabs may collapse or adapt

**Medium (md - 672px+):**

- Feature tiles: 2-up (4 columns each)
- Job tiles: 2-up (4 columns each)
- Paths: 2-up (4 columns each)

**Large (lg - 1056px+):**

- Feature tiles: 4-up (3 columns each)
- Job tiles: 4-up (4 columns each)
- Paths: 4-up (3 columns each)
- Table with sidebar (3 + 13 columns)

**Scoring:**

- **10 pts:** Perfect responsive behavior at all breakpoints
- **7-9 pts:** Good responsive with minor issues
- **4-6 pts:** Works but has layout problems at some breakpoints
- **0-3 pts:** Broken responsive behavior

**Score: \_\_\_/10**

**Notes:**

```
[Document responsive behavior at each breakpoint]
```

---

### C. Functionality (0-10 points)

**Expected Functionality:**

- ClickableTiles are clickable and show hover states
- Search filters connections table
- Vertical tabs filter by connection type
- Pagination changes displayed rows
- Status indicators show correct colors
- Overflow menus open and show actions
- Links are clickable
- Button has dropdown icon

**Scoring:**

- **10 pts:** All features work perfectly
- **7-9 pts:** Most features work, minor bugs
- **4-6 pts:** Core features work, some broken
- **0-3 pts:** Major functionality issues

**Score: \_\_\_/10**

**Notes:**

```
[Document functionality and any bugs]
```

---

**Total Outcome Score: \_\_\_/30**

---

## Final Scoring Summary

| Category              | Weight    | Score          | Weighted Score |
| --------------------- | --------- | -------------- | -------------- |
| Critical Requirements | Must Pass | \_\_\_/10      | Pass/Fail      |
| Code Quality          | 40%       | \_\_\_/50      | \_\_\_/50      |
| Process Quality       | 30%       | \_\_\_/30      | \_\_\_/30      |
| Outcome Quality       | 30%       | \_\_\_/30      | \_\_\_/30      |
| **Total**             | **100%**  | **\_\_\_/110** | **\_\_\_%**    |

**Pass/Fail:** Must pass all 10 critical requirements

**Overall Grade:**

- 90-100%: Excellent
- 80-89%: Good
- 70-79%: Satisfactory
- 60-69%: Needs Improvement
- Below 60%: Unsatisfactory

---

## Comparison Notes

### Strengths

```
[List what the mode did well]
```

### Weaknesses

```
[List what the mode could improve]
```

### Key Differences from Reference

```
[List significant differences from the reference solution]
```

### Recommendations

```
[Recommendations for improvement or mode selection]
```
