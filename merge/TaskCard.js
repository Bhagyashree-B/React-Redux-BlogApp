import React from 'react';
import { Link } from 'react-router-dom';
import {Panel } from 'react-bootstrap';
import  './css/TaskCard.css';

export default function taskCard({ task, deletetask }) {
  return (

    <div>
    <Panel className="panel-header" header={task.title} bsStyle="info">
      <div className="panel-content">
        {task.taskContent}
      </div>
      <div>
        <Link to={`/task/${task._id}`} className="ui basic button green panel-button">Edit</Link>
        <div className="ui basic button panel-button red" onClick={() => deletetask(task._id)}>Delete</div>
      </div>
    </Panel>
    </div>

  );
}

taskCard.propTypes = {
  task: React.PropTypes.object.isRequired,
  deletetask: React.PropTypes.func.isRequired
}
