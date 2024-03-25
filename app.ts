export {};
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");
const leaguesRoutes = require('./routes/leaguesRoutes');
const betsRoutes = require('./routes/betsRoutes');
const fixturesRoutes = require('./routes/fixturesRoutes');
const livefixturesRoutes = require('./routes/livefixturesRoutes');
const countriesRoutes = require('./routes/countryRoutes');
const aichatRoutes = require('./routes/aichatRoutes');
const predictionsRoutes = require('./routes/predictionsRoutes');
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
dotenv.config();

connectDB();
const app = express(); // main thing

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
// const predictionsRoute = require('./routes/predictionsRoutes')
app.use(cors());
// app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);
app.use('/api/leagues',leaguesRoutes );
app.use('/api/bets',betsRoutes );
app.use('/api/fixtures',fixturesRoutes );
app.use('/api/livefixtures',livefixturesRoutes );
app.use('/api/countries',countriesRoutes );
app.use('/api/predictions',predictionsRoutes );
app.use('/api/aichats',aichatRoutes );

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
