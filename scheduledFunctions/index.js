const CronJob = require("node-cron");
const  getRowFromApi = require('./getRowFromApi');
const createRowInCollection = require('./createRowInCollection')
const getLatestId = require('./getLatestId')
const getToken = require('./getAuthToken')
const helper = require('../helper')

const endpoint = 'https://rickandmortyapi.com/graphql'
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
  var time = 20
const scheduledJobFunction = CronJob.schedule("*/"+time+" * * * * *", async() => {
    console.log("I'm executed on a schedule!");
    console.log('id::: ', id);
    time = helper.randomIntFromInterval(8,15)
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
