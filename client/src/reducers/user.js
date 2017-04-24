import { LOGIN, LOGOUT, LOGGEDIN } from '../actions'

// const initialState = {
//    cid: null,
//    username: '',
//    logo: ''
// };

const user = (state = [], action = {}) => {
   switch (action.type) {
      case LOGIN:
        //  const api = new loginApi; //simple version
        //  api.login(action.login, action.password)
        //     .done(res => {
        //        //Right here ?
        //     })
        //     .fail(err => console.error(err));

         return state;

      case LOGGEDIN:
         //...
        //  return [
        //     ...state,
        //     action.user
        //   ];
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