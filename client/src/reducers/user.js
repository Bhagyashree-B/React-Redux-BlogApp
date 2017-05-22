import { LOGIN, LOGOUT, LOGGEDIN } from '../actions'


const user = (state = [], action = {}) => {
   switch (action.type) {
      case LOGIN:
         return state;

      case LOGGEDIN:
        window.localStorage.setItem("user", JSON.stringify(action.user))
        return action.user;

      case LOGOUT:
        window.localStorage.removeItem("user")
        return {};

      default:
        let savedState = JSON.parse(window.localStorage.getItem("user")) || {}
        return savedState;
   }
};

export default user;
