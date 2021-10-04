import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },
  settings: {
    theme: {
      type: String,
      required: true,
      default: 'light'
    },
    notifications: {
      type: Boolean,
      required: true,
      default: true
    },
    compactMode: {
      type: Boolean,
      required: true,
      default: false
    }
  }
},
{ timestamps: true }
)

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next()
  }

  bcrypt.hash(this.password, 10, (error, hash) => {
    if (error) {
      return next(error)
    }

    this.password = hash
    next()
  })
})

userSchema.methods.checkPassword = function(password) {
  const passwordHash = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (error, same) => {
      if (error) {
        return reject(error)
      }

      resolve(same)
    })
  })
}

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const User = mongoose.model('user', userSchema)
