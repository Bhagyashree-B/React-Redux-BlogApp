import { combineReducers } from 'redux';

import tasks from './reducers/tasks';
import user from './reducers/user';
import chartData from './reducers/chart';

export default combineReducers({
  tasks,
  user,
  chartData
});
