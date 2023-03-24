const PocketBase = require('pocketbase/cjs')

module.exports = async() => {
    const pb = new PocketBase(process.env.POCKETBASE_HOST)
    const authData = await pb.admins.authWithPassword(process.env.POCKETBASE_USER, process.env.POCKETBASE_PASSWORD);
    return pb.authStore.token
  };