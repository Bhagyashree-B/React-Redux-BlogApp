import { SET_CHART_DATA } from '../actions';

export default function chartData(state = {}, action = {}) {
  switch(action.type) {
    case SET_CHART_DATA:
      return action.chartData;
      
    default: return state;
  }
}
