export {};
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.ts");
const path = require("path");
const cors = require('cors');
const userRoutes = require("./routes/userRoutes.ts");
const { errorHandler, notFound } = require("./middleware/errorMiddleware.ts");
const OpenAI= require('openai');
dotenv.config();

connectDB();
console.log('process.env.OPENAI_API_KEY',process.env.OPENAI_API_KEY)
const app = express(); // main thing
// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

app.use(express.json()); // to accept json data
const leaguesRoute = require('./routes/leaguesRoutes')
const fixturesRoute = require('./routes/fixturesRoutes')
// const predictionsRoute = require('./routes/predictionsRoutes')
app.use(cors());
// app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

// --------------------------deployment------------------------------
app.use('/leagues',leaguesRoute );
app.use('/fixtures',fixturesRoute );
// app.use('/predictions',predictionsRoute );

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
