import express from 'express'
import cors from 'cors'
import path from 'path'
import 'express-async-errors'

import './database/connection'
import routes from './routes'
import errorsHandle from './errors/handler'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorsHandle)

app.get('/users', (req, res) => {
  const reponse = req.query
  console.log(reponse)
  return res.json({ msg: 'Hello world' })
})

app.post('/users', (req, res) => {
  const { name, latitude, longitude, about, instructions, opeing_hours, open_on_weekend } = req.body
  return res.json(req.body)
})

app.listen(3030)
