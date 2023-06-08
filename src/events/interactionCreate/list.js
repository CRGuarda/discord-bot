import { EmbedBuilder, resolveColor } from 'discord.js'
import { close_conn, start_conn } from '../../db/dbConn.js'
import { User } from '../../db/schemas/user.js'

export default async (interaction) => {
  try {
    await interaction.deferReply()
    await start_conn()

    const allUsers = await User.find({})
    const embedUsers = await Promise.all(
      allUsers.map(async ({ user_id, username, screwed_up_count, flash_count }) => {
        const guildMember = await interaction.guild.members.fetch(user_id)
        return new EmbedBuilder()
          .setTitle(`Perfil de ${username}`)
          .addFields({ name: '# Cagadas', value: screwed_up_count + '', inline: true })
          .addFields({ name: '# Flashes al equipo', value: flash_count + '', inline: true })
          .setImage(guildMember.user.displayAvatarURL())
          .setColor(resolveColor('Random'))
          .setFooter({
            text: `Requested by ${interaction.user.username}`,
            iconURL: interaction.user.displayAvatarURL(),
          })
      })
    )

    await close_conn()
    return interaction.editReply({
      embeds: embedUsers,
    })
  } catch (error) {}
}
