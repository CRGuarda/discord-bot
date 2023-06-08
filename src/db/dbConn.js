import 'dotenv/config'
import mongoose from 'mongoose'

export const start_conn = () =>
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log(`Connected to database.`))
    .catch((e) => console.log(`Error ocurred:${e}`))

export const close_conn = () => mongoose.connection.close().then(() => console.log('Connection closed'))
