export default (interaction) => {
  const prompt = interaction.options.get('prompt').value
  // console.log(prompt)

  return interaction.reply({
    content: 'Shh!! No body needs to know our secret 👀',
    ephemeral: true,
  })
}
