import { close_conn, start_conn } from './src/db/dbConn.js'
import { User } from './src/db/schemas/user.js'

await start_conn()

const findOneUpdate = await User.findOneAndUpdate(
  {
    user_id: '236175198410375169',
  },
  {
    $inc: { screwed_up_count: 1 },
  },
  {
    returnDocument: 'after',
  }
)

// console.log(findOneUpdate)

await close_conn()
