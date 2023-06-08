import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  user_id: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  screwed_up_count: {
    type: Number,
    trim: true,
    default: 0,
  },
  flash_count: {
    type: Number,
    trim: true,
    default: 0,
  },
})

export const User = model('User', UserSchema)
