const initState = {
    authError: null,
    loggedInUser: null,
    isLogin:false
  }
  
  const authReducer = (state = initState, action) => {
    switch (action.type) {
      case 'REGISTER_SUCCESS':
        return {
          ...state,
          authError: null,
          loggedInUser: action.payload
        }
  
      case 'REGISTER_ERROR': {
        return {
          ...state,
          authError: "Register failed"
        }
      }
  
      case 'LOGIN_ERROR':
        return {
          ...state,
          authError: 'Login failed'
        }
  
        case 'LOGIN_SUCCESS_FIREBASE':
          console.log('masuk sini')
          return {
            ...state,
            authError: null,
            loggedInUser: action.payload,
            isLogin:true
          }  
  
      case 'SIGNOUT_SUCCESS':
        return {
          ...state,
          authError: null,
          loggedInUser: null
        }
  
      case 'SIGNOUT_ERROR':
        return {
          ...state,
          authError: action.payload
        }
  
      case 'CLEAR_AUTH_ERROR':
        return {
          ...state,
          authError: null
        }
  
      default:
        return state
    }
  }
  
  export default authReducer