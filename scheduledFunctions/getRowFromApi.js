const axios = require('axios');

module.exports = async(endpoint,query,variables) => {
    // console.log(':::------ ');
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
    // console.log('result::: ', result.data.data.character);
    const item = {
        uid:result.data.data.character.id,
        name:result.data.data.character.name
      }
  return item
}
