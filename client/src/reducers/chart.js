import { SET_CHART_DATA,LOGOUT } from '../actions';

export default function chartData(state = {}, action = {}) {
  switch(action.type) {
    case SET_CHART_DATA:
      return action.chartData;

    case LOGOUT:
        return {};

    default: return state;
  }
}
