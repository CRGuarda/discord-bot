import 'dotenv/config'
import { Client, GatewayIntentBits } from 'discord.js'
import { closeHelper, conn, connHelper } from '../db/index.js'
import ready from './events/ready.js'
import interactionCreate from './events/interactionCreate.js'

const DISCORD_TOKEN = process.env.DISCORD_TOKEN
const CLIENT_ID = process.env.CLIENT_ID
const intents = [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]

const client = new Client({
  intents,
})

client.on('ready', ready({ DISCORD_TOKEN, CLIENT_ID }))

client.on('interactionCreate', interactionCreate)

client.login(DISCORD_TOKEN)
