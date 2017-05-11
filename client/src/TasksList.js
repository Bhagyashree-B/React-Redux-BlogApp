import React from 'react';
import TaskCard from './TaskCard';
import './css/App.css'

export default function TasksList({ tasks = [], deletetask }) {
  // console.log("tasks in tasklist => " , tasks);
  const emptyMessage = (
    <p>There are no tasks yet in your collection.</p>
  );

  const TasksList = (
    <div className="panel">
      {  tasks.map(task => <TaskCard task={task} key={task._id} deletetask={deletetask} />) }
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

// TasksList.defaultProps = {
//   tasks:{
// 	"tasks": [{
// 		"_id": "59006deb5390dc1df4fe6d01",
// 		"title": "tashdjksak",
// 		"taskContent": "asdhjakshdjka"
// 	}, {
// 		"_id": "5903321518552a35c81c0db4",
// 		"title": "test",
// 		"taskContent": "test desc"
// 	}, {
// 		"_id": "5911c21e5a8f731ee8b47cd2",
// 		"title": "Title from test",
// 		"taskContent": "description from test "
// 	}]
// },
//   deletetask: React.PropTypes.func.isRequired
// };
