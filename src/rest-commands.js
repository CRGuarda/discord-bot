import 'dotenv/config'
import { REST, Routes, ApplicationCommandOptionType } from 'discord.js'

const DISCORD_TOKEN = process.env.DISCORD_TOKEN
const CLIENT_ID = process.env.CLIENT_ID

const commands = [
  {
    name: 'add',
    description: 'Increment the count',
    options: [
      {
        name: 'user',
        description: 'Pick a user to increment the count',
        type: ApplicationCommandOptionType.Mentionable,
        required: true,
      },
    ],
  },
]

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN)

try {
  console.log('Started refreshing application (/) commands.')

  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands })

  console.log('Successfully reloaded application (/) commands.')
} catch (error) {
  console.error(error)
}
