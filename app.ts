export {};
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");
const leaguesRoutes = require('./routes/leaguesRoutes');
const fixturesRoutes = require('./routes/fixturesRoutes');
const countriesRoutes = require('./routes/countryRoutes');
const predictionsRoutes = require('./routes/predictionsRoutes');
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const OpenAI= require('openai');
dotenv.config();

connectDB();
const app = express(); // main thing
// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

app.use(express.json()); // to accept json data

if (process.env.NODE_ENV === "production") {
  app.get("/", (req:any, res:any) => {
    res.send("API is running..");
  });
} else {
  app.get("/", (req:any, res:any) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------
// async function main() {
//   const chatCompletion = await openai.chat.completions.create({
//     messages: [{ role: 'user', content: 'Say this is a test' }],
//     model: 'gpt-3.5-turbo',
//   });
// }

// main();

// --------------------------deployment------------------------------
// const predictionsRoute = require('./routes/predictionsRoutes')
app.use(cors());
// app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);
app.use('/api/leagues',leaguesRoutes );
app.use('/api/fixtures',fixturesRoutes );
app.use('/api/leaguefixtures',fixturesRoutes );
app.use('/api/countries',countriesRoutes );
app.use('/api/predictions',predictionsRoutes );

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 9000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`
  )
);
