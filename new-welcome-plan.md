# New Welcome Page Plan

## Page Overview

The new welcome page is a personalized landing page that provides users with quick access to key tasks, recent activities, and data connections. It serves as the primary entry point for users to navigate to their most important workflows.

**Full Design:** https://www.figma.com/design/9JMZZVqaZgWxxs5n8yFQBl/Bob-demo-welcome-page?node-id=1-20498&m=dev

## Major Sections

### 1. Welcome Page Header

**Figma:** https://www.figma.com/design/9JMZZVqaZgWxxs5n8yFQBl/Bob-demo-welcome-page?node-id=1-20677&m=dev

- Personalized greeting with user name
- Value proposition statement (2-line maximum)
- Call-to-action button
- Four task tiles for quick access to key features:
  - Discover your data
  - Data masking
  - Jobs
  - watsonx.optim updates

### 2. Jump Back In Section

**Figma:** https://www.figma.com/design/9JMZZVqaZgWxxs5n8yFQBl/Bob-demo-welcome-page?node-id=1-20657&m=dev

- Recently visited worksheets
- Quick links to continue previous work
- Four path items showing recent activity

### 3. Recently Run Jobs

**Figma:** https://www.figma.com/design/9JMZZVqaZgWxxs5n8yFQBl/Bob-demo-welcome-page?node-id=2-33633&m=dev

- Horizontal scrollable tiles showing recent job executions
- Four job tiles with icons, labels, titles, and captions
- "View all" link for complete job list

### 4. Connections Section

**Figma:** https://www.figma.com/design/9JMZZVqaZgWxxs5n8yFQBl/Bob-demo-welcome-page?node-id=1-20499&m=dev

- Data table with search functionality
- Vertical tabs for filtering by connection type:
  - All connection types
  - MongoDB
  - MariaDB
  - PostgreSQL
  - SQLite
  - Cassandra
- Full data table showing connection details

## Implementation Status

- [x] Planning document created
- [x] Placeholder page created at [`src/pages/new-welcome/NewWelcome.jsx`](src/pages/new-welcome/NewWelcome.jsx)
- [x] Route added to navigation (accessible at `/new-welcome`)
- [ ] Section implementations (to be discussed)
