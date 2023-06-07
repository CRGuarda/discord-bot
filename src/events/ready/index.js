import { upsertCommands } from '../../commands/rest-commands.js'

export default ({ DISCORD_TOKEN, CLIENT_ID }) =>
  async (client) => {
    console.log(`Logged in as ${client.user.tag}!`)
    await upsertCommands({ DISCORD_TOKEN, CLIENT_ID, client })
  }
