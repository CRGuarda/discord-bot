import sqlite3 from 'sqlite3'
sqlite3.verbose()

const helper =
  (type = 'Query') =>
  (error) => {
    if (error) return console.log(error.message)
    return console.log(`${type} created/executed! `)
  }

const db = new sqlite3.Database('./db.sqlite', helper('Database'))

db.run('SELECT * FROM users', helper())

db.serialize(async () => {
  // const createUserTable = `CREATE TABLE users(id INTEGER PRIMARY KEY, count INTEGER)`
  // db.run(createUserTable, helper('Table'))

  db.run(`UPDATE users SET count = count + 1 WHERE id = 1`)

  db.each('SELECT * FROM users', (err, row) => {
    console.log(row)
  })
})

db.close()
