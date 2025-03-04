import { useEffect, useState } from "react";

export type Employee = {
  id: number;
  image: string;
  name: string;
  job: string;
  admission_date: string;
  phone: string;
};

export const useFetchEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await fetch("http://localhost:3000/employees");
        if (!response.ok) throw new Error("There was an error trying to fetch employees, please verify your connection and try again!");
        const data: Employee[] = await response.json();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEmployees();
  }, []);

  return { employees, loading, error };
}