import { combineReducers } from 'redux';

import tasks from './reducers/tasks';
import user from './reducers/user';

export default combineReducers({
  tasks,
  user
});
