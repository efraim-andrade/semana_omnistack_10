import { Request, Response } from 'express'
import axios from 'axios'

import Dev, { DevInterface } from '../models/Dev'

interface RequestParams {
  github_username: string,
  techs?: string
  latitude: number,
  longitude: number
}

class DevController {
  public async index (req: Request, res: Response): Promise<Response> {
    const devs = await Dev.find()

    return res.json(devs)
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const { github_username, techs, latitude, longitude }:RequestParams = req.body

    try {
      let dev = await Dev.findOne({ github_username })

      if (dev) {
        return res.status(409).json({ message: 'User already exists' })
      }

      const response = await axios.get<DevInterface>(`https://api.github.com/users/${github_username}`)

      const { name, avatar_url, bio } = response.data

      const techsArray = techs.split(',').map((tech: string) => tech.trim())

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      })

      return res.json(dev)
    } catch (error) {
      return res.status(500).json({ message: `Algo deu errado: ${error.message}` })
    }
  }
}

export default new DevController()
