import add from './add.js'
import create from './create.js'
import profile from './profile.js'
import secret from './secret.js'

export default (interaction) => {
  if (!interaction.isChatInputCommand() || interaction.user.bot) return

  if (interaction.commandName === 'add') add(interaction)

  if (interaction.commandName === 'create') create(interaction)

  if (interaction.commandName === 'profile') profile(interaction)

  if (interaction.commandName === 'secret') secret(interaction)
}
