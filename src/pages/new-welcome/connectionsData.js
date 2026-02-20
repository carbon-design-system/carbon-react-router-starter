/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const connectionsData = [
  // MongoDB connections (56 total)
  ...Array.from({ length: 56 }, (_, i) => ({
    id: `mongodb-${i + 1}`,
    name: `MongoDB Connection ${i + 1}`,
    type: 'MongoDB',
    status:
      i % 4 === 0
        ? 'failed'
        : i % 4 === 1
          ? 'pending'
          : i % 4 === 2
            ? 'successful'
            : 'in-progress',
    description: 'MongoDB database connection',
    discoveryAssets: Math.floor(Math.random() * 50),
    workflows: Math.floor(Math.random() * 20),
    lastModified: 'April 17, 2025',
  })),
  // MariaDB connections (6 total)
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `mariadb-${i + 1}`,
    name: `MariaDB Connection ${i + 1}`,
    type: 'MariaDB',
    status:
      i % 3 === 0 ? 'successful' : i % 3 === 1 ? 'pending' : 'in-progress',
    description: 'MariaDB database connection',
    discoveryAssets: Math.floor(Math.random() * 30),
    workflows: Math.floor(Math.random() * 15),
    lastModified: 'March 10, 2025',
  })),
  // PostgreSQL connections (8 total)
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `postgresql-${i + 1}`,
    name: `PostgreSQL Connection ${i + 1}`,
    type: 'PostgreSQL',
    status: i % 2 === 0 ? 'successful' : 'pending',
    description: 'PostgreSQL database connection',
    discoveryAssets: Math.floor(Math.random() * 40),
    workflows: Math.floor(Math.random() * 18),
    lastModified: 'February 22, 2025',
  })),
  // SQLite connections (13 total)
  ...Array.from({ length: 13 }, (_, i) => ({
    id: `sqlite-${i + 1}`,
    name: `SQLite Connection ${i + 1}`,
    type: 'SQLite',
    status: i % 3 === 0 ? 'failed' : i % 3 === 1 ? 'successful' : 'in-progress',
    description: 'SQLite database connection',
    discoveryAssets: Math.floor(Math.random() * 25),
    workflows: Math.floor(Math.random() * 12),
    lastModified: 'January 15, 2025',
  })),
  // Cassandra connections (17 total)
  ...Array.from({ length: 17 }, (_, i) => ({
    id: `cassandra-${i + 1}`,
    name: `Cassandra Connection ${i + 1}`,
    type: 'Cassandra',
    status:
      i % 4 === 0
        ? 'pending'
        : i % 4 === 1
          ? 'successful'
          : i % 4 === 2
            ? 'failed'
            : 'in-progress',
    description: 'Cassandra database connection',
    discoveryAssets: Math.floor(Math.random() * 35),
    workflows: Math.floor(Math.random() * 16),
    lastModified: 'December 5, 2024',
  })),
];

export const connectionTypes = [
  { id: 'all', label: 'All connection types', count: 100 },
  { id: 'MongoDB', label: 'MongoDB', count: 56 },
  { id: 'MariaDB', label: 'MariaDB', count: 6 },
  { id: 'PostgreSQL', label: 'PostgreSQL', count: 8 },
  { id: 'SQLite', label: 'SQLite', count: 13 },
  { id: 'Cassandra', label: 'Cassandra', count: 17 },
];
