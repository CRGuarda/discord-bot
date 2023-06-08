import { closeHelper, conn, connHelper } from '../../db/dbConn.js'

export default (interaction) => {
  const { user } = interaction.options.get('user')
  const type = interaction.options.get('type').value
  // console.log(type)
  if (user.bot) return interaction.reply(`Adding counters to a bot is not allowed.`)
  // return interaction.reply('hola')
  // console.log(user.displayAvatarURL()) //To retrieve user Avatar URL type: webp

  const db = new conn('./db.sqlite', connHelper)

  db.serialize(() => {
    return db.get(`SELECT id FROM users WHERE id = ${user.id}`, (err, row) => {
      if (!row) {
        db.close(closeHelper)
        return interaction.reply(`Not user found. Try \`/create\` instead.`)
      }
      return db.run(`UPDATE users SET ${type} = ${type} + 1 WHERE id = ${user.id}`, (err) => {
        if (err) {
          // console.log({ row })
          db.close(closeHelper)
          return interaction.reply(`${err.message}`)
        }
        return db.get(`SELECT * FROM users WHERE id = ${user.id}`, (err, row) => {
          db.close(closeHelper)
          // console.log(row)
          const reply =
            type === 'fucked_counter'
              ? `${user.toString()} la ha cagado ${row?.[type]} vez/veces.`
              : `${user.toString()} flasheó a sus timos ${row?.[type]} vez/veces.`
          return interaction.reply(reply)
        })
      })
    })
  })
}
