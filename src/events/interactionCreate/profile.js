import { EmbedBuilder } from 'discord.js'

export default async (interaction) => {
  const { user } = interaction.options.get('user')

  try {
    await interaction.deferReply()
    const embed = new EmbedBuilder()
      .setTitle(`Profile of ${user.username}`)
      .addFields({ name: 'Es gil?', value: 'sí', inline: true })
      .setImage(user.displayAvatarURL())
      .setColor('DarkGold')
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
    return interaction.editReply({ content: user.toString(), embeds: [embed] })
  } catch (error) {
    return interaction.editReply('*Error happened*')
  }
}
