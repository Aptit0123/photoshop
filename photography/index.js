const express = require('express');
const { createTables } = require("./connection");
const app = express();
const cors = require('cors');

const appointmentRoutes = require('./appoinment'); // Corrected filename to 'appointment.js'
const commentRoutes = require('./comment');
const contactusRoutes = require('./contactus');
const pricingRoutes = require('./pricing');
const storiesRoutes = require('./stories');
const photostoriesRoutes = require('./photosss'); // Corrected filename to 'photostories.js'
const imagesRoutes = require('./images');
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "database-1.ce8foznoiqpc.ap-south-1.rds.amazonaws.com",
  user: "admin2", // Replace with your MySQL username
  password: "E9Api3PfkYpFriIsAHa7", // Replace with your MySQL password
  database: "testingDb",
});

function startServer() {
  try {
    connection.connect();
    console.log("Connected to MySQL");
  } catch (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }

  createTables();

  app.use(express.json());
  const corsOptions = {
    origin: 'http://52.66.68.229:3000', // Replace with your allowed origin(s)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
  };
  app.use(cors(corsOptions));
  app.use(express.urlencoded({ extended: true }));

  app.use('/api/appointment', appointmentRoutes);
  app.use('/api/comment', commentRoutes);
  app.use('/api/contactus', contactusRoutes);
  app.use('/api/pricing', pricingRoutes);
  app.use('/api/stories', storiesRoutes);
  app.use('/api/photosss', photostoriesRoutes); // Corrected route path
  app.use('/api/images', imagesRoutes);

  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
