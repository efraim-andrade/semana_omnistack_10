import { Request, Response } from 'express'

import Dev from '../models/Dev'
import { parseStringAsArray } from '../functions'

interface RequestParams {
  latitude?: number,
  longitude?: number,
  techs: string
}

class SearchController {
  public async index (req: Request, res: Response): Promise<Response> {
    const { latitude, longitude, techs }: RequestParams = req.query

    const techsArray = parseStringAsArray(techs)

    const devs = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    })

    return res.json(devs)
  }
}

export default new SearchController()
