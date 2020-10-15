import { Router } from 'express'
import multer from 'multer'

import UploadConfig from './config/upload'

import OrphanagesController from './controllers/OrphanagesController'

const routes = Router()
const upload = multer(UploadConfig)

const Orphanages = new OrphanagesController()

routes.get('/users', Orphanages.index)
routes.get('/user/:id', Orphanages.show)

routes.post('/users', upload.array('images'), Orphanages.create)

export default routes

/* {
    "name": "test1",
    "latitude": 46.206959,
    "longitude": 6.1272736,
    "about": "Sobre orphanages",
    "intructions": "Instru",
    "opeing_hours": "Ate as 18h",
    "open_on_weekend": true
} */
