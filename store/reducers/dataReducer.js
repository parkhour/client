const initState = {
  currentReservation: {},
  loc: {},
  dataOnReject: {}
};

const dataReducer = (state = initState, action) => {
  switch (action.type) {
    case "SAVE_CURRENT_WAITING":
      return {
        ...state,
        currentReservation: action.payload
      };

    case "CURRENT_LOC":
      return {
        ...state,
        loc: action.payload
      };

    case "ON_REJECT":
      return {
        ...state,
        dataOnReject: action.payload
      };
    default:
      return state;
  }
};

export default dataReducer;
