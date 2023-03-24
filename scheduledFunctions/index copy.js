const CronJob = require("node-cron");
const request = require('graphql-request').request
const PocketBase = require('pocketbase/cjs')
const axios = require('axios');
// const pockethost = 'https://vz.pockethost.io'
// const pocketuser = 'vyacheslav.zubenko@gmail.com'
// const pocketpassword = 'Fdg75@zygvT'
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

const api = process.env.POCKETBASE_HOST + '/api/collections/test/records?perPage=1&sort=-created'

async function getToken(){
  const pb = new PocketBase(process.env.POCKETBASE_HOST)
  const authData = await pb.admins.authWithPassword(process.env.POCKETBASE_USER, process.env.POCKETBASE_PASSWORD);
  return pb.authStore.token
};

exports.initScheduledJobs = () => {
  var token = getToken();
  var id = await getRecords(token) + 1
  const scheduledJobFunction = CronJob.schedule("*/10 * * * * *", () => {
    console.log("I'm executed on a schedule!");
    // Add your custom logic here
    // const data = testResult(4);
    // console.log('data::: ', data);
    let variables = {
      "characterId": id
    };
    request({
      url: endpoint,
      document: query,
      variables: variables,
    //   requestHeaders: headers,
    }).then((data) => callResult(data))
    let result = {}
    function callResult(data){
        console.log(data.character.name);
        item = {
          uid:data.character.id,
          name:data.character.name
        }
        addRecord(token,item)
        result = data
        id++
    }
  });

  scheduledJobFunction.start();
}

async function getRecords(t) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': t,
    }
  };

  axios.get(api, axiosConfig)
    .then((res) => {
      id = res.data.items[0].uid
      console.log("RESPONSE RECEIVED: ", res.data.items[0].uid)
    })
      
    .catch((err) => {
      token = getToken()
      console.log("AXIOS ERROR: ", err);
    })
  }


async function addRecord(t,item){
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': t,
    }
  };
  const queryurl = process.env.POCKETBASE_HOST + '/api/collections/test/records'
  axios.post(queryurl, axiosConfig, item)
  .then((res) => {
   
    console.log("RESPONSE RECEIVED: ", res.data)
  })
    
  .catch((err) => {
    // token = getToken()
    console.log("AXIOS ERROR: ", err);
    })
  
}