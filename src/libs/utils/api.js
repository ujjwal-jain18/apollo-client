const axios = require('axios');

export default async function callApi(method, url, data = {}, option = {}) {
  try {
    const finalUrl = process.env.REACT_APP_BASE_URL + url;
    const response = await axios({
      method,
      url: finalUrl,
      ...data,
      ...option,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
}
