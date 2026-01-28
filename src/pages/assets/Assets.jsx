import { useState } from 'react';
import { PageLayout } from '../../layouts/page-layout';
import { PageHeader } from '@carbon/ibm-products';
import {
  Grid,
  Column,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Button,
  Pagination,
} from '@carbon/react';
import { Add, Filter, Download, Settings, Folder } from '@carbon/icons-react';

const headers = [
  { key: 'name', header: 'Name' },
  { key: 'type', header: 'Type' },
  { key: 'status', header: 'Status' },
  { key: 'owner', header: 'Owner' },
  { key: 'lastModified', header: 'Last modified' },
];

const rows = [
  {
    id: '1',
    name: 'Asset 1',
    type: 'Document',
    status: 'Active',
    owner: 'John Doe',
    lastModified: '2024-01-15',
  },
  {
    id: '2',
    name: 'Asset 2',
    type: 'Image',
    status: 'Active',
    owner: 'Jane Smith',
    lastModified: '2024-01-14',
  },
  {
    id: '3',
    name: 'Asset 3',
    type: 'Video',
    status: 'Inactive',
    owner: 'Bob Johnson',
    lastModified: '2024-01-13',
  },
  {
    id: '4',
    name: 'Asset 4',
    type: 'Document',
    status: 'Active',
    owner: 'Alice Williams',
    lastModified: '2024-01-12',
  },
  {
    id: '5',
    name: 'Asset 5',
    type: 'Image',
    status: 'Active',
    owner: 'Charlie Brown',
    lastModified: '2024-01-11',
  },
];

const Assets = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <PageLayout className="cs--assets" fallback={<p>Loading assets page...</p>}>
      <PageLayout.Header>
        <PageHeader
          title={{
            text: 'Assets',
            icon: Folder,
          }}
          breadcrumbs={[
            { href: '/', label: 'Home' },
            { href: '/assets', label: 'Assets', isCurrentPage: true },
          ]}
        />
      </PageLayout.Header>

      <Grid>
        <Column sm={4} md={8} lg={16}>
          <Tabs>
            <TabList aria-label="Asset tabs" contained>
              <Tab>All assets</Tab>
              <Tab>Favorites</Tab>
              <Tab>Recent</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <DataTable rows={rows} headers={headers}>
                  {({
                    rows,
                    headers,
                    getHeaderProps,
                    getRowProps,
                    getTableProps,
                    getTableContainerProps,
                  }) => (
                    <TableContainer
                      {...getTableContainerProps()}
                      className="cs--assets__table-container"
                    >
                      <TableToolbar>
                        <TableToolbarContent>
                          <TableToolbarSearch
                            onChange={(e) => setSearchValue(e.target.value)}
                            value={searchValue}
                            placeholder="Search assets"
                          />
                          <Button
                            kind="ghost"
                            hasIconOnly
                            renderIcon={Filter}
                            iconDescription="Filter"
                            tooltipPosition="bottom"
                          />
                          <Button
                            kind="ghost"
                            hasIconOnly
                            renderIcon={Download}
                            iconDescription="Download"
                            tooltipPosition="bottom"
                          />
                          <Button
                            kind="ghost"
                            hasIconOnly
                            renderIcon={Settings}
                            iconDescription="Settings"
                            tooltipPosition="bottom"
                          />
                          <Button kind="primary" renderIcon={Add}>
                            Create new
                          </Button>
                        </TableToolbarContent>
                      </TableToolbar>
                      <Table {...getTableProps()}>
                        <TableHead>
                          <TableRow>
                            {headers.map((header) => (
                              <TableHeader
                                key={header.key}
                                {...getHeaderProps({ header })}
                              >
                                {header.header}
                              </TableHeader>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow key={row.id} {...getRowProps({ row })}>
                              {row.cells.map((cell) => (
                                <TableCell key={cell.id}>
                                  {cell.value}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <Pagination
                        backwardText="Previous page"
                        forwardText="Next page"
                        itemsPerPageText="Items per page:"
                        page={1}
                        pageSize={10}
                        pageSizes={[10, 20, 30, 40, 50]}
                        totalItems={rows.length}
                      />
                    </TableContainer>
                  )}
                </DataTable>
              </TabPanel>
              <TabPanel>
                <p>Favorites content</p>
              </TabPanel>
              <TabPanel>
                <p>Recent content</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Column>
      </Grid>
    </PageLayout>
  );
};

export default Assets;
