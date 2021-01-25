import {loginC, logoutC} from '../actions/auth';

const auth = (state = {}, action: any) => {
  switch (action.type) {
    case loginC:
      return {...state, ...action.res};
    case logoutC:
      return {...state, ...action.res};
    default:
      return state;
  }
};
export default auth;
