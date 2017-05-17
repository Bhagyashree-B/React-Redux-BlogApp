import { SET_TASKS, ADD_TASK, TASK_FETCHED, TASK_UPDATED, TASK_DELETED, LOGOUT } from '../actions';

export default function tasks(state = [], action = {}) {
  switch(action.type) {
    case ADD_TASK: {
      console.log( "  action.task => ", action.task);
      return [
        ...state,
        action.task
      ];
    }


    case TASK_DELETED:
      return state.filter(item => item.id !== action.taskId);

    case TASK_UPDATED:
      return state.map(item => {
        if (item.id === action.task.id) return action.task;
        return item;
      });

    case TASK_FETCHED:
      const index = state.findIndex(item => item.id === action.task.id);
      if (index > -1) {
        return state.map(item => {
          if (item.id === action.task.id) return action.task;
          return item;
        });
      } else {
        return [
          ...state,
          action.task
        ];
      }

    case SET_TASKS:{
        console.log( "  action.task => ", action.task);
        return action.tasks;
    }


    case LOGOUT:
      return [];

    default: return state;
  }
}
