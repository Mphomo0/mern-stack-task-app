const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Define the user schema using Mongoose
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name is required
    },
    email: {
      type: String,
      required: true, // Email is required
      unique: true, // Email must be unique
    },
    password: {
      type: String,
      required: true, // Password is required
    },
  },
  {
    timestamps: true, // Add timestamps (createdAt and updatedAt) to the documents
  }
)

// Middleware: Before saving the user, hash the password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next() // Skip hashing if the password hasn't been modified
  }

  const salt = await bcrypt.genSalt(10) // Generate a salt
  this.password = await bcrypt.hash(this.password, salt) // Hash the password
})

// Method: Compare the entered password with the stored hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Create a User model based on the user schema
const User = mongoose.model('User', userSchema)

// Export the User model to be used in other parts of the application
module.exports = User
