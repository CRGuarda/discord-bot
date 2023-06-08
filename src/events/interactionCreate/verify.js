export default async (interaction) => {
  // console.log(member?._roles?.includes('908941843364982784'))

  //Los Timos Rol ID = 908941843364982784

  // console.log(interaction.guild.roles) // bitfield: 4194304
  // console.log(user) // bitfield: 4194304
  /*
    User {
      id: '236175198410375168',
      bot: false,
      system: false,
      flags: UserFlagsBitField { bitfield: 4194304 },
      username: 'GUARDA',
      discriminator: '5124',
      avatar: '29c13f34ec177370ec0289439ba9fc95',
      banner: undefined,
      accentColor: undefined
    } 
  */
  // interaction.client.channels.fetch(interaction.channelId).then((channel) => console.log(channel))

  return interaction.reply('oa')
}
