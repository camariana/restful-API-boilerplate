const env = process.env.NODE_ENV

const info = (...params) => {
  if(env !== 'test' || env !== 'testing') {
    console.log(...params)
  }
}

const error = (...params) => {
  if(env !== 'test' || env !== 'testing') {
    console.error(...params)
  }
}

export default {
  info, error
}