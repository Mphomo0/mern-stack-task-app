const express = require('express')

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

// Set middleware of CORS 
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://mernstack-todo-app.onrender.com/"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

app.use('/api/users', userRoutes)
app.use('/api/todos', todoRoutes)

app.use(notFound)
app.use(errorHandler)
app.use(checkJsonContentType); // Check Content-Type for all routes

app.listen(port, () => {
    console.log(`now listening at port:${port}`)
    connectDB()
})