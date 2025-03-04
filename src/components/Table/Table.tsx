import { useTable } from 'react-table';

import { Employee } from '../../hooks';
import styles from "./Table.module.scss";

const columns = [
  {
    Header: 'FOTO',
    accessor: 'image',
    Cell: ({ value }) => <img src={value} alt="employee" style={{ width: '34px', height: '34px', borderRadius: '50%' }} />,
  },
  {
    Header: 'NOME',
    accessor: 'name',
  },
  {
    Header: 'CARGO',
    accessor: 'job',
  },
  {
    Header: 'DATA DE ADMISSÃO',
    accessor: 'admission_date',
  },
  {
    Header: 'TELEFONE',
    accessor: 'phone',
  },
];

type TableProps = {
  data: Employee[];
  loading: boolean;
  error: string | null;
}
export const Table = ({ data, loading, error }: TableProps) => {
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Error: {error}</p>;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className={styles.table}>
      <thead className={styles.tableHeader}>
        {headerGroups.map(headerGroup => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            key={headerGroup.Header as string}
          >
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                key={column.Header as string}
                title={column.Header as string}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          const { key, ...otherProps } = row.getRowProps();
          return (
            <tr
              {...otherProps}
              className={styles.tableRow}
              key={key}
            >
              {row.cells.map((cell) => {
                const { key, ...otherProps } = cell.getCellProps();
                return (
                  <td
                    {...otherProps}
                    title={cell.value}
                    key={key}
                  >
                    {cell.render("Cell")}</td>
                )
              })}
            </tr>
          );
        })}
      </tbody>
    </table >
  );
};