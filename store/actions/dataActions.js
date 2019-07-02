

export const saveReservation = (res) => {
  return {
    type: "SAVE_CURRENT_WAITING",
    payload : res
  };
};

export const saveLoc = (res) => {
  return {
    type: "CURRENT_LOC",
    payload : res
  };
};

export const onReject = (res) => {
  return {
    type : 'ON_REJECT',
    payload : res
  }
}
