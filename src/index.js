import 'dotenv/config'
import { Client, GatewayIntentBits } from 'discord.js'
import { closeHelper, conn, connHelper } from '../src/db/index.js'

const DISCORD_TOKEN = process.env.DISCORD_TOKEN

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
    if (user.bot) return interaction.reply(`Adding counters to a bot is not allowed.`)

    // console.log(user.displayAvatarURL()) //To retrieve user Avatar URL type: webp

    const db = new conn('./db.sqlite', connHelper)
    db.serialize(() => {
      return db.get(`SELECT id, count FROM users WHERE id = ${user.id}`, (err, row) => {
        if (!row) {
          db.close(closeHelper)
          return interaction.reply(`Not user found. Try \`/create\` instead.`)
        }
        return db.run(`UPDATE users SET count = count + 1 WHERE id = ${user.id}`, (err) => {
          if (err) {
            // console.log({ row })
            db.close(closeHelper)
            return interaction.reply(`${err.message}`)
          }
          return db.get(`SELECT id, count FROM users WHERE id = ${user.id}`, (err, row) => {
            db.close(closeHelper)
            return interaction.reply(`${user.toString()} la ha cagado ${row?.count} vez/veces.`)
          })
        })
      })
    })
  }

  if (interaction.commandName === 'create') {
    const { user } = interaction.options.get('user')
    const count = interaction.options.get('count')
    console.log({ user })
    if (user.bot) return interaction.reply(`Can't create a count of a bot.`)

    const db = new conn('./db.sqlite', connHelper)
    db.serialize(() => {
      db.get(`SELECT * FROM users WHERE id = ${user.id}`, (err, row) => {
        if (row) {
          db.close(closeHelper)
          return interaction.reply(
            `User ${user.username} already exists. Try \`/add @${user.username}\` for existings users.`
          )
        }
        return db.run(`INSERT INTO users VALUES(${user.id},${count?.value || 0})`, (error) => {
          db.close(closeHelper)
          if (error) {
            return interaction.reply(`Not possible to create counter. Try again. ${error.message}`)
          }
          return interaction.reply(`Succesfully counter created!`)
        })
      })
    })
  }
})

client.login(DISCORD_TOKEN)
