const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// environment variables
const config = require('./config/env');
// DB connection
const connectionDB = require('./config/db');
// routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const projectRoutes = require('./routes/project');

// Custom middleware
const notFoundHandler = require('./utils/middleware/notFoundHandler');

// Initializing connection to DB
connectionDB();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: [
      'http://alg-tasks.herokuapp.com',
      'https://alg-tasks.herokuapp.com',
      'http://localhost:3000'
    ],
    credentials: true
  })
);
app.use(cookieParser());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/project', projectRoutes);

// 404 middleware
app.use(notFoundHandler);

const port = config.port || 5000;
app.listen({ port }, () => {
  console.log(`Server running on port ${port}`);
});
