import { User } from '../../db/schemas/user.js'
import { close_conn, start_conn } from '../../db/dbConn.js'

export default async (interaction) => {
  const { user } = interaction.options.get('user')
  const screwed_up_count = interaction.options.get('screwed_up_count')?.value || 0
  const flash_count = interaction.options.get('flash_count')?.value || 0
  // console.log({ user })
  if (user.bot) return interaction.reply(`Can't create a count of a bot.`)
  try {
    await interaction.deferReply()

    await start_conn()

    const findOne = await User.findOne({
      user_id: user.id,
    })
    if (findOne) {
      await close_conn()
      return interaction.editReply('User is already created. Try `/add` command')
    }

    const newUser = new User({
      user_id: user.id,
      username: user.username,
      screwed_up_count,
      flash_count,
    })
    newUser
      .save()
      .then(({ screwed_up_count, flash_count }) =>
        interaction.editReply(
          `Counter for ${user.toString()} successfully created with ${screwed_up_count} screwed up and ${flash_count} teammate flashes.`
        )
      )
      .catch((e) => {
        return interaction.editReply(e.message)
      })
      .finally(() => close_conn())
  } catch (error) {
    await close_conn()
    return interaction.editReply(error.message)
  }
}
