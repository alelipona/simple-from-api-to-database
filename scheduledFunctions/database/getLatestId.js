const axios = require('axios');
const api = process.env.POCKETBASE_HOST + '/api/collections/test/records?perPage=1&sort=-created'

module.exports = async(token) => {
    const axiosConfig = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': token,
        }
      };
    const res = await axios.get(api, axiosConfig);
    return res.data.items[0].uid
}
