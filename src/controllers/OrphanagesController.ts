import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Orphanages from '../models/Orphanages'
import orphanagesViews from '../views/Orphanages_view'

import * as Yup from 'yup'

export default class OrphanagesController {
  async index(req: Request, res: Response) {
    try {
      const orphanagesRepository = getRepository(Orphanages)
      const orphanages = await orphanagesRepository.find({
        relations: ['images']
      })

      return res.status(200).json(orphanagesViews.renderMany(orphanages))
    } catch (error) {
      return res.status(400).json({ error: 'Errror show orphanages' })
    }
  }

  async show(req: Request, res: Response) {
    try {
      const orphanagesRepository = getRepository(Orphanages)
      const { id } = req.params
      const orphanage = await orphanagesRepository.findOneOrFail(id, {
        relations: ['images']
      })
      console.log(orphanage)

      return res.status(200).json(orphanagesViews.render(orphanage))
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

    const data = {
      name,
      latitude,
      longitude,
      about,
      intructions,
      opeing_hours,
      open_on_weekend,
      images
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      intructions: Yup.string().required(),
      opeing_hours: Yup.string().required(),
      open_on_weekend: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    })

    await schema.validate(data, {
      abortEarly: false
    })

    const orphanages = orphanagesRepository.create(data)

    await orphanagesRepository.save(orphanages)

    return res.status(201).json(orphanages)
  }
}
