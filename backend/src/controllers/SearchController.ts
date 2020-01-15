import { Request, Response } from 'express'

import Dev from '../models/Dev'

class SearchController {
  public async index (req: Request, res: Response): Promise<Response> {
    return res.send('iae')
  }
}

export default new SearchController()
