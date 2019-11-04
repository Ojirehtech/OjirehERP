import {
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
} from "../actions/action_user";

const initialState = {
  users: [],
  user: {},
  singleLoading: false,
  singleSuccess: false,
  usersLoading: false,
  usersSuccess: false,
  deleteLoading: false,
  deleteSuccess: false,
  error: ""
}

const userReducers = ( state = initialState, action ) => {
  switch ( action.type ) {
    case GET_USER_START:
      return {
        ...state,
        singleLoading: true
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        singleSuccess: true,
        singleLoading: false,
        user: action.data
      }
    case GET_USER_FAILED:
      return {
        ...state,
        singleLoading: false,
        singleSuccess: false,
        error: action.error
      }
    case GET_USERS_START:
      return {
        ...state,
        usersLoading: true
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        usersLoading: false,
        usersSuccess: true,
        users: action.data
      }
    case GET_USERS_FAILED:
      return {
        ...state,
        usersLoading: false,
        usersSuccess: false,
        error: action.error
      }
    case DELETE_USER_START:
      return {
        ...state,
        deleteLoading: true
      }
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
        users: action.data
      }
    case DELETE_USER_FAILED:
      return {
        ...state,
        deleteSuccess: false,
        deleteLoading: false,
        error: action.error
      }
    default:
      return state;
  }
}

export default userReducers;