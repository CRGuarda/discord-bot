import { closeHelper, conn, connHelper } from '../../db/index.js'

export default (interaction) => {
  const { user } = interaction.options.get('user')
  const count = interaction.options.get('count')?.value || 0
  // console.log({ user })
  if (user.bot) return interaction.reply(`Can't create a count of a bot.`)

  const db = new conn('./db.sqlite', connHelper)

  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, count INTEGER)', (err) => {
      err && console.log(`Error creating table users: ${err}`)
    })
    db.get(`SELECT * FROM users WHERE id = ${user.id}`, (err, row) => {
      if (row) {
        db.close(closeHelper)
        return interaction.reply(
          `User ${user.username} already exists. Try \`/add @${user.username}\` for existings users.`
        )
      }
      return db.run(`INSERT INTO users VALUES(${user.id},${count})`, (error) => {
        db.close(closeHelper)
        if (error) {
          return interaction.reply(`Not possible to create counter. Try again. ${error.message}`)
        }
        return interaction.reply(`Succesfully counter created!`)
      })
    })
  })
}