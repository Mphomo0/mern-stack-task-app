const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
dotenv.config()
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 5000
const userRoutes = require("./routes/userRoutes")
const todoRoutes = require('./routes/todoRoutes')
const checkJsonContentType = require('./middleware/checkJsonContentType')

const app = express()

const path = require("path");
// Serve static files from the "frontend/build" directory in production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist")); // Serve static files from the "frontend/build" directory
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html")); // Serve the index.html file for all routes
  });
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const corsOption = {
  origin: ['https://mernstack-todo-app.onrender.com'],
};
app.use(cors(corsOption))

app.use('/api/users', userRoutes)
app.use('/api/todos', todoRoutes)

app.use(notFound)
app.use(errorHandler)
app.use(checkJsonContentType); // Check Content-Type for all routes

app.listen(port, () => {
    console.log(`now listening at port:${port}`)
    connectDB()
})