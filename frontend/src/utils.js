export const getError = (error) => {
  return error.response && error.response.data.msg
    ? error.response.data.msg
    : error.message;
};
