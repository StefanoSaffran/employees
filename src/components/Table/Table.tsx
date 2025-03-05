import { useTable } from 'react-table';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';

import { Employee } from '../../hooks';
import { useIsMobile } from '../../hooks/useIsMobile';
import { formatDate, formatPhone } from '../../utils';
import { Icon } from '../Icon';
import styles from "./Table.module.scss";

import 'react-accessible-accordion/dist/fancy-example.css';

const columns = [
  {
    Header: 'FOTO',
    accessor: 'image',
    Cell: ({ value }: { value: string }) => <img src={value} alt="employee" style={{ width: '34px', height: '34px', borderRadius: '50%' }} />,
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
    Cell: ({ value }: { value: string }) => formatDate(value)
  },
  {
    Header: 'TELEFONE',
    accessor: 'phone',
    Cell: ({ value }: { value: string }) => formatPhone(value),
  },
];

type TableProps = {
  data: Employee[];
  loading: boolean;
  error: string | null;
}
export const Table = ({ data, loading, error }: TableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });
  const isMobile = useIsMobile();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    isMobile ? (
      <div className={styles.accordionContainer}>
        <div className={styles.mobileHeader}>
          <div>
            <span>FOTO</span>
            <span>NOME</span>
          </div>

          <Icon name='circle' className={styles.mobileHeaderIcon} />
        </div>
        <Accordion allowZeroExpanded className={styles.accordion}>
          {data?.map(row => (
            <AccordionItem key={row.id}>
              <AccordionItemHeading>
                <AccordionItemButton className={styles.accordionItemButton}>
                  <div>
                    <img src={row.image} alt={row.name} className="employee-photo" style={{ width: '34px', height: '34px', borderRadius: '50%' }} />
                    <span >{row.name}</span>
                  </div>
                  <Icon name='chevronDown' className={styles.accordionIcon} />
                </AccordionItemButton>
              </AccordionItemHeading>

              <AccordionItemPanel className={styles.accordionItemPanel}>
                <p><strong>Cargo:</strong> {row.job}</p>
                <p><strong>Data de admissão:</strong> {formatDate(row.admission_date)}</p>
                <p><strong>Telefone:</strong> {formatPhone(row.phone)}</p>
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    )
      : (
        <div className={styles.tableContainer}>
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
          </table>
        </div>
      )
  )
};