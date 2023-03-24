const axios = require('axios');

module.exports = async(token,item) => {

    const axiosConfig = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': token,
        }
      };
    const queryurl = process.env.POCKETBASE_HOST + '/api/collections/test/records';
    const response = await axios.post(queryurl, item, axiosConfig);
    console.log('response::: ', response);

}