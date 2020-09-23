export const handleApiError = (url, err) => {
  console.log(`GOT ERROR WHILE CALLING API: ${url}`);
  if (err && err.response && err.response.data && err.response.data.Message) {
    console.log(`VALID ERROR DATA: `, JSON.stringify(err.response.data));
    throw new Error(err.response.data.Message);
  } else {
    console.log(`IN-VALID ERROR DATA: `, JSON.stringify(err));
    throw err;
  }
};
