const CronJob = require("node-cron");
const  getRowFromApi = require('./api/getRowFromApi');
const createRowInCollection = require('./database/createRowInCollection');
const getLatestId = require('./database/getLatestId');
const getToken = require('./database/getAuthToken');

const endpoint = process.env['API_ENDPOINT'];
console.log('process.env.POCKETBASE_HOST::: ', process.env['POCKETBASE_HOST']);
const query = `
query Query($characterId: ID!) {
  character(id: $characterId) {
    id
    name
  }
}
`;

exports.initScheduledJobs = async() => {
  var token = await getToken();
  var id = await getLatestId(token);
  var time = 20 //every 20th second
const scheduledJobFunction = CronJob.schedule("*/"+time+" * * * * *", async() => {
    console.log("I'm executed on a schedule!");
    console.log('id::: ', id);
    id++

    
    // Add your custom logic here

    let variables = {
      "characterId": id
    };
    const item = await getRowFromApi(endpoint,query,variables)
    console.log('dataFromApi::: ', item);
 
    const added = await createRowInCollection(token,item)
  });

  scheduledJobFunction.start();
}
