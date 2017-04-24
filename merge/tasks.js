import { SET_TASKS, ADD_TASK, TASK_FETCHED, TASK_UPDATED, TASK_DELETED } from '../actions';

export default function tasks(state = [], action = {}) {
  switch(action.type) {
    case ADD_TASK:
      return [
        ...state,
        action.task
      ];

    case TASK_DELETED:
      return state.filter(item => item._id !== action.taskId);

    case TASK_UPDATED:
      return state.map(item => {
        if (item._id === action.task._id) return action.task;
        return item;
      });

    case TASK_FETCHED:
      const index = state.findIndex(item => item._id === action.task._id);
      if (index > -1) {
        return state.map(item => {
          if (item._id === action.task._id) return action.task;
          return item;
        });
      } else {
        return [
          ...state,
          action.task
        ];
      }

    case SET_TASKS:
      return action.tasks;
    default: return state;
  }
}
