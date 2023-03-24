const axios = require('axios');

module.exports = async(endpoint,query,variables) => {
    const result = await axios.post(
        endpoint,
        {
            query,
            variables
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
        }
      )
    const item = {
        uid:result.data.data.character.id,
        name:result.data.data.character.name
      }
  return item
}
