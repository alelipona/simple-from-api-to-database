require('dotenv').config()

const scheduledFunctions = require('./scheduledFunctions/index');

scheduledFunctions.initScheduledJobs();

