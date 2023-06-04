import sqlite3 from 'sqlite3'

export const conn = sqlite3.verbose().Database

export const connHelper = () => console.log('Database connected!.')
export const closeHelper = () => console.log('Connection closed successfully!.')

// const db = new conn('./db.sqlite', connHelper)

// db.run('DELETE FROM users', () => console.log('Succesfully deleted.'))
// db.close()

// db.serialize(async () => {
//   // const createUserTable = `CREATE TABLE users(id INTEGER PRIMARY KEY, count INTEGER)`
//   // db.run(createUserTable, helper('Table'))

//   db.run(`DELETE FROM users`, (a) => {
//     console.log(a)
//   })

//   // db.run(`UPDATE users SET count = count + 1 WHERE id = 1`)

//   // db.each('SELECT * FROM users', (err, row) => {
//   //   console.log(row)
//   // })
// })

// db.close()
