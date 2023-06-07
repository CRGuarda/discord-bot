import { closeHelper, conn, connHelper } from '../../db/index.js'

export default (interaction) => {
  const { user } = interaction.options.get('user')
  if (user.bot) return interaction.reply(`Adding counters to a bot is not allowed.`)

  // console.log(user.displayAvatarURL()) //To retrieve user Avatar URL type: webp

  const db = new conn('./db.sqlite', connHelper)

  db.serialize(() => {
    return db.get(`SELECT id, count FROM users WHERE id = ${user.id}`, (err, row) => {
      if (!row) {
        db.close(closeHelper)
        return interaction.reply(`Not user found. Try \`/create\` instead.`)
      }
      return db.run(`UPDATE users SET count = count + 1 WHERE id = ${user.id}`, (err) => {
        if (err) {
          // console.log({ row })
          db.close(closeHelper)
          return interaction.reply(`${err.message}`)
        }
        return db.get(`SELECT id, count FROM users WHERE id = ${user.id}`, (err, row) => {
          db.close(closeHelper)
          return interaction.reply(`${user.toString()} la ha cagado ${row?.count} vez/veces.`)
        })
      })
    })
  })
}
