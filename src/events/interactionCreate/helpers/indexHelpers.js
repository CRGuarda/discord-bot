import 'dotenv/config'

const COOLDOWN = 7 //seconds
let COOLDOWNS_LIST = []

export const validateInteraction = (interaction) => {
  const userModel = interaction.options.get('user')
  if (userModel?.user && userModel.user?.bot) return true
  if (!interaction.isChatInputCommand() || interaction.user.bot) return true

  return false
}

export const isCooldown = (interaction) => {
  const userId = interaction.user.id
  const userFoundIndex = COOLDOWNS_LIST.findIndex(({ id }) => id === userId)
  if (userFoundIndex >= 0) {
    const diff = Math.round((new Date() - COOLDOWNS_LIST[userFoundIndex].cd_date) / 1000)
    if (diff < COOLDOWN) {
      return true
    }
    const newCooldownList = structuredClone(COOLDOWNS_LIST)
    newCooldownList[userFoundIndex] = { id: userId, cd_date: new Date() }
    COOLDOWNS_LIST = newCooldownList
  }

  COOLDOWNS_LIST.push({ id: userId, cd_date: new Date() })
  return false
}

export const hasPrefferedRole = async (interaction) => {
  const userModel = interaction.options.get('user')
  if (!userModel) return true
  const member = await interaction.guild.members.fetch(userModel.user.id)
  return member._roles.includes(process.env.APPROVED_ROL)
}
