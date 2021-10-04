import logger from './logger'

export const createOne = model => async (request, response) => {
  const createdBy = request.user._id

  try {
    const doc = await model.create({ ...request.body, createdBy })
    response.status(201).json({ data: doc })
  } catch (error) {
    logger.error(error)
    response.status(400).end()
  }
}

export const getOne = model => async (request, response) => {
  try {
    const doc = await model
      .findOne({ createdBy: request.user._id, _id: request.params.id })
      .lean()
      .exec()

    if (!doc) {
      return response.status(400).end()
    }

    response.status(200).json({ data: doc })
  } catch (error) {
    logger.error(error)
    response.status(400).end()
  }
}

export const getMany = model => async (request, response) => {
  try {
    const docs = await model
      .find({ createdBy: request.user._id })
      .lean()
      .exec()

    response.status(200).json({ data: docs })
  } catch (error) {
    logger.error(error)
    response.status(400).end()
  }
}

export const updateOne = model => async (request, response) => {
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          createdBy: request.user._id,
          _id: request.params.id
        },
        request.body,
        { new: true }
      )
      .lean()
      .exec()

    if (!updatedDoc) {
      return response.status(400).end()
    }

    response.status(200).json({ data: updatedDoc })
  } catch (error) {
    logger.error(error)
    response.status(400).end()
  }
}

export const removeOne = model => async (request, response) => {
  try {
    const removed = await model.findOneAndRemove({
      createdBy: request.user._id,
      _id: request.params.id
    })

    if (!removed) {
      return response.status(400).end()
    }

    return response.status(200).json({ data: removed })
  } catch (error) {
    logger.error(error)
    response.status(400).end()
  }
}

export const crudControllers = model => ({
  createOne: createOne(model),
  getOne: getOne(model),
  getMany: getMany(model),
  updateOne: updateOne(model),
  removeOne: removeOne(model),
})
