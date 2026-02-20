# Carbon Figma to React Mode Assessment - Test Prompt

## Objective

Implement the New Welcome Page design from Figma using Carbon Design System components.

## Design Reference

**Figma URL:** https://www.figma.com/design/9JMZZVqaZgWxxs5n8yFQBl/Bob-demo-welcome-page?node-id=1-20498&m=dev

## Requirements

### Task Description

Create a new welcome page that includes:

1. **Welcome Header Section**
   - Personalized greeting "Welcome, [user]"
   - Value proposition text (max 2 lines)
   - "Customize your journey" button with dropdown icon
   - 4 feature tiles with icons, titles, and descriptions

2. **Jump Back In Section**
   - Section heading with "Recently visited worksheets" label
   - 4 worksheet path links with breadcrumb-style formatting

3. **Recently Run Jobs Section**
   - Section heading with info tooltip and "View all" link
   - 4 job tiles with large icons, labels, titles, captions, and arrow icons

4. **Connections Section**
   - Section heading
   - Search input
   - Vertical tabs for connection type filtering
   - Data table with:
     - Name, Status, Description, Discovery assets, Workflows, Last modified columns
     - Status indicators (Failed, Pending, Successful, In progress)
     - Row overflow menus
     - Pagination (10 items per page, 1-10 of 100 items)

### Technical Requirements

- Use Carbon React v11 components
- Implement responsive layouts using Carbon Grid system
- Follow Carbon design tokens for spacing, typography, and colors
- Ensure proper accessibility (ARIA labels, keyboard navigation)
- Create separate Grid components for each logical content group
- Use appropriate Carbon components (ClickableTile, DataTable, etc.)

### File Structure

Create files in `src/pages/new-welcome/`:

- Main page component
- Section components (as needed)
- Styles file
- Data file (for connections table)

### Route Configuration

Add route to `src/routes/config.js`:

- Path: `/new-welcome`
- Label: "New Welcome"

## Success Criteria

The implementation should:

1. Match the Figma design visually
2. Use proper Carbon components and patterns
3. Implement responsive behavior at all breakpoints (sm, md, lg)
4. Follow Carbon design tokens consistently
5. Include proper accessibility features
6. Use separate Grid components for logical content groups
7. Work correctly in the browser

## Preview Components

The status indicators in the Connections table may require a **preview or unstable component** from `@carbon/react`.

**You are explicitly authorized to use preview/unstable components** for implementing status indicators. When researching with Carbon MCP:

- Search for components that display status or state indicators
- Look for components with "preview" or "unstable" status markers
- Check component documentation for usage with status states (failed, pending, successful, in-progress)

## Browser Validation

**When prompted for browser validation:**

- Choose automated validation in the browser
- This is required for the assessment to capture screenshots and verify the implementation

## Notes

- You may use placeholder data for the connections table
- Focus on structure and Carbon component usage
- Ensure all interactive elements are functional
- Test responsive behavior at different screen sizes
