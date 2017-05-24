import { combineReducers } from 'redux';

import tasks from './reducers/tasks';
import user from './reducers/user';
import chartData from './reducers/chart';

/**
   combineReducers does "call all reducers", or at least all
   of the slice reducers it is wrapping.
**/
export default combineReducers({
  tasks,
  user,
  chartData
});
