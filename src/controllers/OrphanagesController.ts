import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Orphanages from '../models/Orphanages'

export default class OrphanagesController {
  async index(req: Request, res: Response) {
    try {
      const orphanagesRepository = getRepository(Orphanages)
      const orphanages = await orphanagesRepository.find()

      return res.status(200).json(orphanages)
    } catch (error) {
      return res.status(400).json({ error: 'Errror show orphanages' })
    }
  }

  async show(req: Request, res: Response) {
    try {
      const orphanagesRepository = getRepository(Orphanages)
      const { id } = req.params
      const orphanage = await orphanagesRepository.findOneOrFail(id)
      console.log(orphanage)

      return res.status(200).json(orphanage)
    } catch (error) {
      return res.status(400).json({ error: 'Errror show orphanage' })
    }
  }

  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      intructions,
      opeing_hours,
      open_on_weekend
    } = req.body

    const orphanagesRepository = getRepository(Orphanages)

    const requestFile = req.files as Express.Multer.File[]

    const images = requestFile.map(image => {
      return { path: image.filename }
    })

    const orphanages = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      intructions,
      opeing_hours,
      open_on_weekend,
      images
    })

    await orphanagesRepository.save(orphanages)

    return res.status(201).json(orphanages)
  }
}
