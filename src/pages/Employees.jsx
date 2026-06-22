import React from 'react';
import EmployeeTable from '../components/employees/EmployeeTable';
import StatCard from '../components/dashboard/StatCard';
import employees from '../data/employees';
import { MdSupervisorAccount, MdLocationOn, MdWork, MdAttachMoney } from 'react-icons/md';
import { formatINR } from '../utils/format';

const headcount = employees.length;
const avgSalary = Math.round(employees.reduce((s, e) => s + e.salary, 0) / headcount);
const remote = employees.filter(e => e.location === 'Remote').length;
const depts = [...new Set(employees.map(e => e.role))].length;

export default function Employees() {
  return (
    <>
      <div className="page-header">
        <h1>Team</h1>
        <p>Your team overview and HR data.</p>
      </div>
      <div className="stat-grid">
        <StatCard index={0} label="Headcount"   value={headcount}           icon={<MdSupervisorAccount size={20} />} color="var(--accent)" />
        <StatCard index={1} label="Remote"      value={remote}              icon={<MdLocationOn size={20} />}       color="var(--green)"  />
        <StatCard index={2} label="Departments" value={depts}               icon={<MdWork size={20} />}             color="var(--neutral)"   />
        <StatCard index={3} label="Avg Salary"  value={formatINR(avgSalary)} icon={<MdAttachMoney size={20} />}    color="var(--orange)" />
      </div>
      <EmployeeTable />
    </>
  );
}
