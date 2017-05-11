import React from 'react';
import { Link } from 'react-router-dom';
import {Panel } from 'react-bootstrap';
import  './css/TaskCard.css';
import moment from 'moment';

const categoryList = {
  arts_entertainment : "Arts & Entertainment",
  beauty_fitness : "Beauty & Fitness",
  books_literature : "Books & Literature",
  food_drink : "Food & Drink"
}

export default function taskCard({ task, deletetask }) {
  let startDate = moment(task.startDate).format("dddd, MMMM Do YYYY")
  let dueDate = moment(task.dueDate).format("dddd, MMMM Do YYYY")
  return (
    <div>
    <Panel className="panel-header text-capitalize" header={task.title} bsStyle="info">
      <div className="panel-content">
        <table>
          <tbody>
          <tr>
            <td>Category : </td>
            <td>{ categoryList[task.category] ? categoryList[task.category] : "other"}</td>
          </tr>
          <tr>
            <td>Start Date : </td>
            <td>{startDate}</td>
          </tr>
          <tr>
            <td>Due date : </td>
            <td>{dueDate}</td>
          </tr><tr>
            <td>Description : </td>
            <td>{ task.taskContent }</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div>
        {/* <Link to={`/task/${task.id}`} className="ui basic button green panel-button">Edit</Link> */}
        <div className="ui basic button panel-button red" onClick={() => deletetask(task.id)}>Delete</div>
      </div>
    </Panel>
    </div>

  );
}

taskCard.propTypes = {
  task: React.PropTypes.object.isRequired,
  deletetask: React.PropTypes.func.isRequired
}
