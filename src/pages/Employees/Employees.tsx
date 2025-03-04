import { Table } from "../../components";
import { Icon } from "../../components/Icon"
import styles from "./Employees.module.scss"
import LogoIcon from "../../assets/images/logo.svg?react";
import { useFetchEmployees, Employee } from "../../hooks";
import { useMemo, useState } from "react";

export const Employees = () => {
  const [search, setSearch] = useState("");
  const { employees, loading, error } = useFetchEmployees();

  const filteredEmployees: Employee[] = useMemo(() => {
    if (!employees || loading || error) return [];
    return employees?.filter((employee) => employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.job.toLowerCase().includes(search.toLowerCase()) ||
      employee.phone?.includes(search))
  }, [employees, search])

  return (
    <div className={styles.container} >
      <header>
        <LogoIcon />
      </header>

      <div className={styles.content}>
        <div className={styles.titleAndSearchContainer}>
          <h1>Funcionários</h1>
          <div>
            <input className="input" placeholder="Pesquisar" value={search} onChange={(e) => setSearch(e.target.value)} />
            <Icon name="search" className={styles.icon} size={24} />
          </div>
        </div>

        <Table data={filteredEmployees} loading={loading} error={error} />
      </div>
    </div>
  )
}