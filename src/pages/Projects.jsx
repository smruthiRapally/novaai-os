import React from 'react';
import KanbanBoard from '../components/projects/KanbanBoard';
import StatCard from '../components/dashboard/StatCard';
import projects from '../data/projects';
import { MdWork, MdCheckCircle, MdPending, MdPlayCircle } from 'react-icons/md';

const todo = projects.filter(p => p.status === 'Todo').length;
const inProgress = projects.filter(p => p.status === 'In Progress').length;
const done = projects.filter(p => p.status === 'Done').length;

export default function Projects() {
  return (
    <>
      <div className="page-header">
        <h1>Projects</h1>
        <p>Track all ongoing work. Click any card for full project overview.</p>
      </div>
      <div className="stat-grid">
        <StatCard index={0} label="Total Projects" value={projects.length} icon={<MdWork size={20} />} color="var(--purple)" />
        <StatCard index={1} label="In Progress" value={inProgress} icon={<MdPlayCircle size={20} />} color="var(--orange)" />
        <StatCard index={2} label="To Do" value={todo} icon={<MdPending size={20} />} color="var(--text-2)" />
        <StatCard index={3} label="Done" value={done} icon={<MdCheckCircle size={20} />} color="var(--green)" />
      </div>
      <div className="glass-card" style={{ overflowX: 'auto' }}>
        <div className="chart-title">Project Board</div>
        <KanbanBoard />
      </div>
    </>
  );
}
