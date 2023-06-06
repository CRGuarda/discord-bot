import 'dotenv/config'
import { REST, Routes, ApplicationCommandOptionType } from 'discord.js'

export const areSameCommandsTrigger = async ({ client, commands: localCommands }) => {
  try {
    const serverCommands = await client.application.commands.fetch()
    //If no serverCommands provided or no commands on localCommands
    const serverCommandsArray = serverCommands.map(({ name, description, options }) => ({
      name,
      description,
      options,
    }))

    if (serverCommandsArray.length !== localCommands.length) return false

    return JSON.stringify(serverCommandsArray) === JSON.stringify(localCommands)
  } catch (error) {
    console.log(error)
  }
}

const commands = [
  // REQUIRED STRUCTURED: { name : string, description : string, options : Options<[]> }. type Options: { type, name, description, required }
  {
    name: 'add',
    description: 'Increment the count',
    options: [
      {
        type: ApplicationCommandOptionType.Mentionable,
        name: 'user',
        description: 'Pick a user to increment the count',
        required: true,
      },
    ],
  },
  {
    name: 'create',
    description: 'Create a count for a user',
    options: [
      {
        type: ApplicationCommandOptionType.Mentionable,
        name: 'user',
        description: 'Pick a user to create the count',
        required: true,
      },
      {
        type: ApplicationCommandOptionType.Integer,
        name: 'count',
        description: 'Set first value (0 if not provided)',
        required: false,
      },
    ],
  },
]

export const upsertCommands = async ({ DISCORD_TOKEN, CLIENT_ID, client }) => {
  try {
    const areSame = await areSameCommandsTrigger({ client, commands })
    if (areSame) return console.log('Local commands are the same with the server commands. Not calling PUT method...')

    const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN)

    console.log('------ Local and server commands are not the same. Sync starting soon... ------')
    console.log('Started refreshing application (/) commands.')

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands })

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }
}
