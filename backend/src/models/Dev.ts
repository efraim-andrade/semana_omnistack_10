import { Schema, model, Document } from 'mongoose'

import PointSchema, { PointInterface } from './utils/PointSchema'

export interface DevInterface extends Document {
  name: string
  github_username: string
  bio: string
  avatar_url: string
  techs: string[]
  location: PointInterface
}

const DevSchema = new Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: PointSchema,
    index: '2dsphere'
  }
}, {
  timestamps: true
})

export default model<DevInterface>('Dev', DevSchema)
