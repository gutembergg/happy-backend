import express from 'express'
import './database/connection'
import routes from './routes'

const app = express()

app.use(express.json())
app.use(routes)

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
