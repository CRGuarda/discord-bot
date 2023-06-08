import { EmbedBuilder } from 'discord.js'
import { closeHelper, conn, connHelper } from '../../db/dbConn.js'

export default async (interaction) => {
  const { user } = interaction.options.get('user')

  try {
    await interaction.deferReply()

    const db = new conn('./db.sqlite', connHelper)

    db.serialize(() => {
      return db.get(`SELECT * FROM users WHERE id = ${user.id}`, (err, row) => {
        if (!row) {
          db.close(closeHelper)
          return interaction.editReply(`Not user found. Try \`/create @${user.username}\` or choose another user.`)
        }
        // console.log(row.fucked_counter)
        const embed = new EmbedBuilder()
          .setTitle(`Profile of ${user.username}`)
          .addFields({ name: 'Fucked count', value: row.fucked_counter + '', inline: true })
          .addFields({ name: 'Flashed count', value: row.flash_counter + '', inline: true })
          .setImage(user.displayAvatarURL())
          .setColor('DarkGold')
          .setFooter({
            text: `Requested by ${interaction.user.username}`,
            iconURL: interaction.user.displayAvatarURL(),
          })
        db.close(closeHelper)
        return interaction.editReply({ content: user.toString(), embeds: [embed] })
      })
    })
  } catch (error) {
    return interaction.editReply('*Error happened*')
  }
}
