import { close_conn, start_conn } from '../../db/dbConn.js'
import { User } from '../../db/schemas/user.js'

export default async (interaction) => {
  const { user } = interaction.options.get('user')
  const type = interaction.options.get('type').value
  // console.log(type)
  if (user.bot) return interaction.reply(`Adding counters to a bot is not allowed.`)
  // return interaction.reply('hola')
  // console.log(user.displayAvatarURL()) //To retrieve user Avatar URL type: webp

  try {
    await interaction.deferReply()
    await start_conn()

    const userUpdated = await User.findOneAndUpdate(
      {
        user_id: user.id,
      },
      {
        $inc: { [type]: 1 },
      },
      {
        returnDocument: 'after',
      }
    )

    if (!userUpdated) {
      return interaction.editReply(`User doesn't exist. Try \`/create\` instead`)
    }

    return interaction.editReply(
      `${user.toString()} la ha cagado ${userUpdated.screwed_up_count} veces y flasheado ${
        userUpdated.flash_count
      } a sus timos. 😞 `
    )
  } catch (error) {
    return interaction.editReply(error.message)
  } finally {
    await close_conn()
  }
}
