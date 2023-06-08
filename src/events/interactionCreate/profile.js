import { EmbedBuilder } from 'discord.js'
import { close_conn, start_conn } from '../../db/dbConn.js'
import { User } from '../../db/schemas/user.js'

export default async (interaction) => {
  const { user } = interaction.options.get('user')
  if (user.bot) return interaction.reply(`Adding counters to a bot is not allowed.`)

  try {
    await interaction.deferReply()
    await start_conn()

    const { user_id, screwed_up_count, flash_count } = await User.findOne({
      user_id: user.id + '',
    })
    if (!user_id) return interaction.editReply(`User doesn't exist. Try \`/create\` insead.`)

    const embed = new EmbedBuilder()
      .setTitle(`Profile of ${user.username}`)
      .addFields({ name: 'Fucked count', value: screwed_up_count + '', inline: true })
      .addFields({ name: 'Flashed count', value: flash_count + '', inline: true })
      .setImage(user.displayAvatarURL())
      .setColor('DarkGold')
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      })

    return interaction.editReply({ content: user.toString(), embeds: [embed] })
  } catch (error) {
    return interaction.editReply(`*Error happened*: ${error.message}`)
  } finally {
    await close_conn()
  }
}
