import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup'

interface ValidationErrors {
  [key: string]: string[]
}

const errorsHandle: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {}

    error.inner.forEach(err => {
      errors[err.path] = err.errors
    })

    return res.status(400).json({ msg: 'Validation failed', errors })
  }

  console.log(error)

  return res.status(500).json({ msg: 'Internal error server' })
}

export default errorsHandle
