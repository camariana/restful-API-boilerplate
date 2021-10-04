import { User } from './user.model'
import logger from '../../utils/logger'

export const person = (request, response) => {
  response.status(200).json({ data: request.user })
}

export const updatePerson = async (request, response) => {
  try {
    const user = await User.findByIdAndUpdate(request.user._id, request.body, {
      new: true
    })
      .lean()
      .exec()

    response.status(200).json({ data: user })
  } catch (error) {
    logger.error(error)
    response.status(400).end()
  }
}