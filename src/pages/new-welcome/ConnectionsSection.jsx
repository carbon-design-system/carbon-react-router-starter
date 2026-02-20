/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Grid,
  Column,
  Search,
  TabsVertical,
  TabListVertical,
  Tab,
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Pagination,
  OverflowMenu,
  OverflowMenuItem,
  preview__IconIndicator as IconIndicator,
} from '@carbon/react';
import { useState } from 'react';
import { connectionsData, connectionTypes } from './connectionsData';

export const ConnectionsSection = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const headers = [
    { key: 'name', header: 'Name' },
    { key: 'status', header: 'Status' },
    { key: 'description', header: 'Description' },
    { key: 'discoveryAssets', header: 'Discovery assets' },
    { key: 'workflows', header: 'Workflows' },
    { key: 'lastModified', header: 'Last modified on' },
  ];

  // Filter data based on selected type and search
  const filteredData = connectionsData.filter((connection) => {
    const matchesType =
      selectedType === 'all' || connection.type === selectedType;
    const matchesSearch =
      searchValue === '' ||
      connection.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      connection.type.toLowerCase().includes(searchValue.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Paginate data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const rows = paginatedData.map((connection) => ({
    id: connection.id,
    name: `${connection.name}\n${connection.type}`,
    status: connection.status,
    description: connection.description,
    discoveryAssets: connection.discoveryAssets.toString(),
    workflows: connection.workflows.toString(),
    lastModified: connection.lastModified,
  }));

  const getStatusIndicator = (status) => {
    const statusMap = {
      failed: { kind: 'failed', label: 'Failed' },
      pending: { kind: 'pending', label: 'Pending' },
      successful: { kind: 'succeeded', label: 'Successful' },
      'in-progress': { kind: 'in-progress', label: 'In progress' },
    };
    const config = statusMap[status] || { kind: 'unknown', label: 'Status' };
    return <IconIndicator kind={config.kind} label={config.label} size={16} />;
  };

  return (
    <div className="connections-section">
      <Grid narrow className="narrow-grid-adjustment">
        <Column sm={4} md={8} lg={16}>
          <h2 className="connections-section__title">Connections</h2>
        </Column>
      </Grid>

      <Grid condensed className="connections-section__table-area">
        <Column sm={4} md={8} lg={16}>
          <Search
            labelText="Find connections"
            placeholder="Find connections"
            size="lg"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Column>

        <Column sm={4} md={2} lg={3}>
          <div className="connections-section__filter">
            <span className="connections-section__filter-label">
              Connections type
            </span>
            <TabsVertical
              selectedIndex={connectionTypes.findIndex(
                (t) => t.id === selectedType,
              )}
              onChange={(evt) => {
                const index = evt.selectedIndex;
                setSelectedType(connectionTypes[index].id);
                setCurrentPage(1);
              }}
            >
              <TabListVertical aria-label="Connection types">
                {connectionTypes.map((type) => (
                  <Tab key={type.id}>
                    {type.label} <span className="count">{type.count}</span>
                  </Tab>
                ))}
              </TabListVertical>
            </TabsVertical>
          </div>
        </Column>

        <Column sm={4} md={6} lg={13}>
          <DataTable rows={rows} headers={headers}>
            {({
              rows,
              headers,
              getTableProps,
              getHeaderProps,
              getRowProps,
            }) => (
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
                    <TableHeader />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id} {...getRowProps({ row })}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>
                          {cell.info.header === 'status'
                            ? getStatusIndicator(cell.value)
                            : cell.value}
                        </TableCell>
                      ))}
                      <TableCell>
                        <OverflowMenu size="sm" flipped>
                          <OverflowMenuItem itemText="Action 1" />
                          <OverflowMenuItem itemText="Action 2" />
                          <OverflowMenuItem itemText="Action 3" />
                        </OverflowMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DataTable>
          <Pagination
            totalItems={filteredData.length}
            page={currentPage}
            pageSize={pageSize}
            pageSizes={[10, 20, 30, 40, 50]}
            itemsPerPageText="Items per page:"
            onChange={({ page, pageSize: newPageSize }) => {
              setCurrentPage(page);
              setPageSize(newPageSize);
            }}
          />
        </Column>
      </Grid>
    </div>
  );
};
