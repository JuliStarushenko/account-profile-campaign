// AccountComponent.tsx
import React, { useEffect } from 'react';
import { useSortBy, useFilters, usePagination, useTable } from 'react-table';
import { DefaultColumnFilter } from './DefaultColumnFilter';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface Profile {
  profileId: string;
  country: string;
  marketplace: string;
}

interface Props {
  profiles: Profile[];
}

const Profiles: React.FC<Props> = ({ profiles }) => {
  const navigate = useNavigate();
  
  const { accountId } = useParams<{ accountId: string }>();
  useEffect(() => {
    // Fetch or retrieve the profile data using accountId
    // ...
  }, [accountId]);

  const handleOpenProfile = (profile: Profile) => {
    navigate(`/campaigns/${accountId}/${profile.profileId}`);
  };

  const columns = React.useMemo(
    () => [
      { Header: 'Profile ID', accessor: 'profileId', Filter: DefaultColumnFilter },
      { Header: 'Country', accessor: 'country', Filter: DefaultColumnFilter },
      { Header: 'Marketplace', accessor: 'marketplace', Filter: DefaultColumnFilter },
    ],
    []
  );

  const data = React.useMemo(() => profiles, [profiles]);

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
  const amountOfPages = Math.ceil(profiles.length / pageSize);

  return (
    <div className='table-responsive' style={{ height: '40em' }}>
      <div className="text-secondary small">Account ID: {accountId} / Profiles</div>
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
              <tr {...row.getRowProps()} className="table-light" onClick={() => handleOpenProfile(row.original)}>
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

export default Profiles;
