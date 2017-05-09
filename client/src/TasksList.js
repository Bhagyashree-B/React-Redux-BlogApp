import React from 'react';
import TaskCard from './TaskCard';
import './css/App.css'

export default function TasksList({ tasks, deletetask }) {
  const emptyMessage = (
    <p>There are no tasks yet in your collection.</p>
  );

  const TasksList = (
    <div className="panel">
      { tasks.map(task => <TaskCard task={task} key={task.id} deletetask={deletetask} />) }
    </div>
  );

  return (
    <div>
      {tasks.length === 0 ? emptyMessage : TasksList}
    </div>
  );
}

TasksList.propTypes = {
  tasks: React.PropTypes.array.isRequired,
  deletetask: React.PropTypes.func.isRequired
}
