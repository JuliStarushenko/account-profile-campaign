// AccountComponent.tsx
import React from 'react';

import { useTable, useSortBy, useFilters, usePagination } from 'react-table';
import { DefaultColumnFilter } from './DefaultColumnFilter';
import { useNavigate } from 'react-router-dom';

interface Account {
  accountId: string;
  email: string;
  authToken: string;
  creationDate: string;
}

interface Props {
  accounts: Account[];
}

const Accounts: React.FC<Props> = ({ accounts }) => {
  const navigate = useNavigate();
  const handleOpenAccount = (account: Account) => {
    navigate(`/profile/${account.accountId}`);
  };

  const columns = React.useMemo(
    () => [
      { Header: 'Account ID', accessor: 'accountId', Filter: DefaultColumnFilter },
      { Header: 'Email', accessor: 'email', Filter: DefaultColumnFilter },
      { Header: 'Auth Token', accessor: 'authToken', Filter: DefaultColumnFilter },
      { Header: 'Creation Date', accessor: 'creationDate', Filter: DefaultColumnFilter },
    ],
    []
  );

  const data = React.useMemo(() => accounts, [accounts]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize, pageCount },
    setPageSize,
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = useTable(
    { columns, data, initialState: { pageSize: 5 } },
    useFilters,
    useSortBy,
    usePagination
  );
  const amountOfPages = Math.ceil(accounts.length / pageSize);

  return (
    <div className="table-responsive" style={{ height: '40em' }}>
      <div className="text-secondary small">Accounts</div>
      <table {...getTableProps()} className="table table-bordered table-hover">
        <thead className="thead-dark">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={column.isSorted ? (column.isSortedDesc ? 'desc' : 'asc') : ''}
                >
                  {column.render('Header')}
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="table-light" onClick={() => handleOpenAccount(row.original)}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(amountOfPages - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {amountOfPages}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '50px' }}
          />
        </span>{' '}
      </div>
    </div>
  );
};

export default Accounts;
