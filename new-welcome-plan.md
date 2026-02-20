# New Welcome Page - Complete Design Analysis

## Overview

The page is designed at **1786px width** with a **1584px content grid** (102px margins on each side). The design uses Carbon's 16-column grid system at the large (lg) breakpoint.

---

## Section 1: Welcome Page Header

**Location:** Y: 48-424px | Height: 376px

### Components:

- **Heading (heading-05)**: "Welcome, [user]" - 40px height
- **Body text (body-long-01)**: Value proposition text - 56px height
- **Button (Primary)**: "Customize your journey" with dropdown icon - 48px height
- **ClickableTile (4x)**: Task tiles with icons, titles, and descriptions - 164px height each

### Carbon Components Needed:

- `Grid`, `Column` from `@carbon/react`
- `Button` from `@carbon/react`
- `ClickableTile` from `@carbon/react`
- Icons: `Connect`, `Hashtag`, `JobRun`, `Bee` from `@carbon/icons-react`
- `ChevronDown` from `@carbon/icons-react` (for button)

### Grid Layout:

**Welcome Title Row (separate Grid - narrow variant):**

```jsx
<Grid narrow>
  <Column sm={4} md={8} lg={16}>
    <h1>Welcome, [user]</h1>
  </Column>
</Grid>
```

**Welcome Content Row (separate Grid - narrow variant):**

```jsx
<Grid narrow>
  <Column sm={4} md={8} lg={4}>
    <p>This is a value prop that should not exceed two lines.</p>
    <Button renderIcon={ChevronDown}>Customize your journey</Button>
  </Column>

  <Column sm={4} md={8} lg={12}>
    <Grid narrow>
      <Column sm={4} md={4} lg={3}>
        <ClickableTile>
          <Connect size={24} />
          <h3>Discover your data</h3>
          <p>
            Explore relationships between data objects and set access
            definitions.
          </p>
        </ClickableTile>
      </Column>

      <Column sm={4} md={4} lg={3}>
        <ClickableTile>
          <Hashtag size={24} />
          <h3>Data masking</h3>
          <p>
            Set privacy conditions based on existing data objects and access
            definitions
          </p>
        </ClickableTile>
      </Column>

      <Column sm={4} md={4} lg={3}>
        <ClickableTile>
          <JobRun size={24} />
          <h3>Jobs</h3>
          <p>View all jobs in the jobs list page.</p>
        </ClickableTile>
      </Column>

      <Column sm={4} md={4} lg={3}>
        <ClickableTile>
          <Bee size={24} />
          <h3>watsonx.optim out now</h3>
          <p>Get all the latest updates here!</p>
        </ClickableTile>
      </Column>
    </Grid>
  </Column>
</Grid>
```

### Spacing:

- Top margin from header: 40px ($spacing-09)
- Gap between title and content: 64px ($spacing-10)
- Gap between value prop and tiles: 16px ($spacing-05)
- Tile internal padding: 16px ($spacing-05)

---

## Section 2: Jump Back In

**Location:** Y: 424-572px | Height: 148px

### Components:

- **Heading (heading-03)**: "Jump back in" - 28px height
- **Label with icon (label-01)**: "Recently visited worksheets" with Recently-viewed icon - 16px height
- **Link components (4x)**: Breadcrumb-style paths with clickable links - 46px height each

### Carbon Components Needed:

- `Grid`, `Column` from `@carbon/react`
- `Link` from `@carbon/react`
- `RecentlyViewed` icon from `@carbon/icons-react`

### Grid Layout:

```jsx
<Grid>
  <Column sm={4} md={8} lg={5}>
    <h2>Jump back in</h2>
    <div className="recently-visited-label">
      <RecentlyViewed size={16} />
      <span>Recently visited worksheets</span>
    </div>
  </Column>

  <Column sm={4} md={4} lg={3}>
    <div className="path-item">
      <span className="path-label">Subsetting worksheet /</span>
      <Link href="#">CSTMR_Group13</Link>
    </div>
  </Column>

  <Column sm={4} md={4} lg={3}>
    <div className="path-item">
      <span className="path-label">Masking worksheet /</span>
      <Link href="#">CSTMR_Data1</Link>
    </div>
  </Column>

  <Column sm={4} md={4} lg={3}>
    <div className="path-item">
      <span className="path-label">Data discovery /</span>
      <Link href="#">CSTMR_Group26</Link>
    </div>
  </Column>

  <Column sm={4} md={4} lg={2}>
    <div className="path-item">
      <span className="path-label">Masking worksheet /</span>
      <Link href="#">CSTMR_DataGroup2</Link>
    </div>
  </Column>
</Grid>
```

### Spacing:

- Section top padding: 48px ($spacing-09)
- Gap between heading and items: 20px ($spacing-05)
- Internal path item spacing: 4px ($spacing-02)

---

## Section 3: Recently Run Jobs

**Location:** Y: 572-836px | Height: 264px

### Components:

- **Heading (heading-03)**: "Recently run jobs" with Tooltip icon - 28px height
- **Link**: "View all" link (top right) - 18px height
- **ClickableTile (4x)**: Larger job tiles with 48px icons, labels, titles, captions, and arrow icons - 189px height each

### Carbon Components Needed:

- `Grid`, `Column` from `@carbon/react`
- `ClickableTile` from `@carbon/react`
- `Link` from `@carbon/react`
- `Tooltip` from `@carbon/react`
- Icons: `Connect`, `Hashtag` (48px size) from `@carbon/icons-react`
- `ArrowRight` icon from `@carbon/icons-react`
- `Information` icon from `@carbon/icons-react` (for tooltip)

### Grid Layout:

```jsx
<Grid>
  <Column sm={4} md={8} lg={16}>
    <div className="section-header">
      <div className="section-title">
        <h2>Recently run jobs</h2>
        <Tooltip>
          <button type="button">
            <Information size={16} />
          </button>
        </Tooltip>
      </div>
      <Link href="#">View all</Link>
    </div>
  </Column>
</Grid>

<Grid>
  <Column sm={4} md={4} lg={4}>
    <ClickableTile>
      <Connect size={48} />
      <div className="tile-content">
        <span className="label">Masking worksheet</span>
        <h3>Masking title</h3>
        <span className="caption">Saved by: YYYY/MM/DD HH:mm</span>
      </div>
      <ArrowRight size={20} />
    </ClickableTile>
  </Column>

  <Column sm={4} md={4} lg={4}>
    <ClickableTile>
      <Hashtag size={48} />
      <div className="tile-content">
        <span className="label">Masking worksheet</span>
        <h3>Masking title</h3>
        <span className="caption">Saved by: YYYY/MM/DD HH:mm</span>
      </div>
      <ArrowRight size={20} />
    </ClickableTile>
  </Column>

  <Column sm={4} md={4} lg={4}>
    <ClickableTile>
      <Connect size={48} />
      <div className="tile-content">
        <span className="label">Masking worksheet</span>
        <h3>Masking title</h3>
        <span className="caption">Saved by: YYYY/MM/DD HH:mm</span>
      </div>
      <ArrowRight size={20} />
    </ClickableTile>
  </Column>

  <Column sm={4} md={4} lg={4}>
    <ClickableTile>
      <Hashtag size={48} />
      <div className="tile-content">
        <span className="label">Masking worksheet</span>
        <h3>Masking title</h3>
        <span className="caption">Saved by: YYYY/MM/DD HH:mm</span>
      </div>
      <ArrowRight size={20} />
    </ClickableTile>
  </Column>
</Grid>
```

### Spacing:

- Section top padding: 32px ($spacing-07)
- Gap between heading and tiles: 41px ($spacing-08)
- Tile internal padding: 16px ($spacing-05)
- Gap between tiles: 16px (handled by Grid gutters)

---

## Section 4: Connections

**Location:** Y: 836-1614px | Height: 778px

### Components:

- **Heading (heading-03)**: "Connections" - 28px height
- **Search**: Full-width search input - 48px height
- **Tabs (Vertical)**: Connection type filter tabs - 651px height
  - Tab items with labels and counts (48px height each)
  - 6 visible tabs: "All connection types", "MongoDB", "MariaDB", "PostgreSQL", "SQLite", "Cassandra"
- **DataTable**: Main connections table with columns:
  - Name, Status, Description, Discovery assets, Workflows, Last modified on
  - Pagination controls at bottom

### Carbon Components Needed:

- `Grid`, `Column` from `@carbon/react`
- `Search` from `@carbon/react`
- `Tabs`, `TabList`, `Tab`, `TabPanels`, `TabPanel` from `@carbon/react`
- `DataTable`, `Table`, `TableHead`, `TableRow`, `TableHeader`, `TableBody`, `TableCell` from `@carbon/react`
- `Pagination` from `@carbon/react`
- `Tag` from `@carbon/react` (for status indicators)

### Grid Layout:

```jsx
<Grid>
  <Column sm={4} md={8} lg={16}>
    <h2>Connections</h2>
  </Column>
</Grid>

<Grid>
  <Column sm={4} md={8} lg={16}>
    <Search
      labelText="Find connections"
      placeholder="Find connections"
      size="lg"
    />
  </Column>
</Grid>

<Grid>
  <Column sm={4} md={2} lg={3}>
    <div className="connections-filter">
      <span className="filter-label">Connections type</span>
      <Tabs orientation="vertical">
        <TabList>
          <Tab>All connection types <span className="count">100</span></Tab>
          <Tab>MongoDB <span className="count">56</span></Tab>
          <Tab>MariaDB <span className="count">6</span></Tab>
          <Tab>PostgreSQL <span className="count">8</span></Tab>
          <Tab>SQLite <span className="count">13</span></Tab>
          <Tab>Cassandra <span className="count">17</span></Tab>
        </TabList>
      </Tabs>
    </div>
  </Column>

  <Column sm={4} md={6} lg={13}>
    <DataTable
      rows={rows}
      headers={headers}
    >
      {/* DataTable implementation with:
        - Name column
        - Status column (with Tag components)
        - Description column
        - Discovery assets column (links)
        - Workflows column (links)
        - Last modified on column
        - Overflow menu for actions
      */}
    </DataTable>
    <Pagination
      totalItems={100}
      pageSize={10}
      pageSizes={[10, 20, 30, 40, 50]}
    />
  </Column>
</Grid>
```

### Spacing:

- Section top padding: 33px ($spacing-07)
- Gap between heading and search: 44px ($spacing-08)
- Gap between search and table group: 2px
- Vertical tabs internal spacing: 16px ($spacing-05)
- Table row height: 48px (standard Carbon DataTable)

---

## Typography Mapping:

- **Page title**: 32px/40px → `heading-05` (use `@include type-style('heading-05')`)
- **Section headings**: 20px/28px → `heading-03` (use `@include type-style('heading-03')`)
- **Tile titles**: 16px/22px → `heading-02` (use `@include type-style('heading-02')`)
- **Body text**: 14px/20px → `body-long-01` (use `@include type-style('body-long-01')`)
- **Labels**: 12px/16px → `label-01` (use `@include type-style('label-01')`)
- **Captions**: 12px/16px → `helper-text-01` (use `@include type-style('helper-text-01')`)
- **Links**: 14px/18px → `body-short-01` with link styling

## Color & Theme:

- Theme: **White theme (g10)**
- Background: `$background` (white)
- Tiles: `$layer-01` (light gray background)
- Text: `$text-primary` (dark)
- Secondary text: `$text-secondary`
- Links: `$link-primary` (blue)
- Borders: `$border-subtle`

## Design Tokens Summary:

### Spacing Tokens Used:

- `$spacing-02`: 4px (small gaps)
- `$spacing-05`: 16px (standard padding, tile padding)
- `$spacing-06`: 24px (medium gaps)
- `$spacing-07`: 32px (section padding)
- `$spacing-08`: 40px (large gaps)
- `$spacing-09`: 48px (section top padding)
- `$spacing-10`: 64px (extra large gaps)

### Grid Configuration:

- **Container width**: 1584px (at lg breakpoint)
- **Grid variant**: Default (32px gutters)
- **Breakpoints**:
  - sm: 4 columns (320px+)
  - md: 8 columns (672px+)
  - lg: 16 columns (1056px+)

---

## Implementation Notes:

1. **Separate Grids for Logical Groups**: Each major section (Welcome Header, Jump Back In, Recently Run Jobs, Connections) uses separate Grid components to ensure proper wrapping and responsive behavior.

2. **ClickableTile Customization**: The tiles in sections 1 and 3 will need custom styling to match the exact layout shown in the design, particularly for icon positioning and content alignment.

3. **Vertical Tabs**: The Connections section uses vertical tabs for filtering, which is a standard Carbon pattern but may need custom styling for the count badges.

4. **DataTable Integration**: The Connections table will need proper data structure with status indicators (using Tag components) and overflow menus for row actions.

5. **Responsive Behavior**:
   - On mobile (sm), all tiles stack vertically (4 columns each)
   - On tablet (md), tiles are 2-up (4 columns each)
   - On desktop (lg), tiles follow the specified column spans

6. **Icons**: All icons should be imported from `@carbon/icons-react` and sized appropriately (24px for small tiles, 48px for job tiles).

---

## File Structure:

```
src/pages/new-welcome/
├── NewWelcome.jsx (main page component)
├── new-welcome.scss (styles)
├── NewWelcomeHeader.jsx (section 1)
├── JumpBackIn.jsx (section 2)
├── RecentlyRunJobs.jsx (section 3)
├── ConnectionsSection.jsx (section 4)
└── components/
    ├── TaskTile.jsx (reusable tile for section 1)
    ├── JobTile.jsx (reusable tile for section 3)
    └── PathItem.jsx (reusable path component for section 2)
```

---

## Summary:

The page consists of **4 distinct logical sections**, each requiring its own Grid component(s):

1. **Welcome Header** - Personalized greeting with 4 action tiles
2. **Jump Back In** - Recently visited worksheets with breadcrumb-style links
3. **Recently Run Jobs** - 4 job history tiles with "View all" link
4. **Connections** - Filterable data table with vertical tabs sidebar

All sections use the Carbon 16-column grid with proper responsive breakpoints (sm, md, lg) and Carbon design tokens for spacing, typography, and colors.
