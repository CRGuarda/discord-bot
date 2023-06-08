import add from './add.js'
import create from './create.js'
import { hasPrefferedRole, isCooldown, validateInteraction } from './helpers/indexHelpers.js'
import list from './list.js'
import profile from './profile.js'
import secret from './secret.js'
import verify from './verify.js'

export default async (interaction) => {
  if (isCooldown(interaction)) return interaction.reply(`Don't rush. Breath and try again in few seconds.😮‍💨`)
  if (validateInteraction(interaction)) return interaction.reply('Interaction not allowed.')
  const prefferedRole = await hasPrefferedRole(interaction)
  if (!prefferedRole) return interaction.reply(`Can't mention outside preffered role (Los Timos).`)

  if (interaction.commandName === 'add') add(interaction)

  if (interaction.commandName === 'create') create(interaction)

  if (interaction.commandName === 'profile') profile(interaction)

  if (interaction.commandName === 'secret') secret(interaction)

  if (interaction.commandName === 'verify') verify(interaction)

  if (interaction.commandName === 'list') list(interaction)
}
