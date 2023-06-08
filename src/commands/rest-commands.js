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

    // console.log(JSON.stringify(serverCommandsArray))
    // console.log('///////////////////////////////////////////////')
    // console.log(JSON.stringify(localCommands))

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
        type: ApplicationCommandOptionType.String,
        name: 'type',
        description: 'What type of counter',
        required: true,
        choices: [
          {
            name: 'fucked',
            value: 'screwed_up_count',
          },
          {
            name: 'flash',
            value: 'flash_count',
          },
        ],
      },
      {
        type: ApplicationCommandOptionType.Mentionable,
        name: 'user',
        description: 'What user',
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
        name: 'screwed_up_count',
        description: 'Set fucked value (0 if not provided)',
        required: false,
      },
      {
        type: ApplicationCommandOptionType.Integer,
        name: 'flash_count',
        description: 'Set flash value (0 if not provided)',
        required: false,
      },
    ],
  },
  {
    name: 'secret',
    description: 'This command do NOTHING. Really... nothing.',
    options: [],
  },
  {
    name: 'profile',
    description: 'Return a profile card for the user choosed.',
    options: [
      {
        type: ApplicationCommandOptionType.Mentionable,
        name: 'user',
        description: 'Choose user',
        required: true,
      },
    ],
  },
  {
    name: 'verify',
    description: 'Verify if user is part of Los Timos role',
    options: [
      {
        type: ApplicationCommandOptionType.Mentionable,
        name: 'user',
        description: 'Pick a user to verify',
        required: true,
      },
    ],
  },
  {
    name: 'list',
    description: 'List all users with existing counter',
    options: [],
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
