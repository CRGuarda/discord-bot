import 'dotenv/config'
import { Client, GatewayIntentBits } from 'discord.js'

const TOKEN = process.env.DISCORD_TOKEN
let count = 0

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand() || interaction.user.bot) return

  if (interaction.commandName === 'add') {
    const { user } = interaction.options.get('user')
    if (user.bot) return interaction.reply(`Can't make a count of a bot`)

    console.log(user.id)
    count += 1

    return interaction.reply(`Added the count for ${user.toString()}. Count: ${count}!`)
  }
})

// client.on('messageCreate', (msg) => {
//   if (msg.author.bot) return

//   if (msg.content.startsWith('help')) {
//     const user = msg.mentions.users.first()
//     return msg.channel.send(`hola ${user.toString()}`)
//   }
// })

client.login(TOKEN)
