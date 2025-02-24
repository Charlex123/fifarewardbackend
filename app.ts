export {};
const express = require("express");
const https = require('https');
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require('cors');
const uploadsRoutes = require("./routes/uploadsRoutes");
const leaguesRoutes = require('./routes/leaguesRoutes');
const chatforumRoutes = require('./routes/chatforumRoutes');
const playerRoutes = require('./routes/playerRoutes');
const proceessbetspaymentRoutes = require('./routes/processbetspaymentsRoutes');
const countdownRoutes = require('./routes/countdownRoutes');
const guessherohintRoutes = require('./routes/guessherohintRoutes');
const guessfootballheroRoutes = require('./routes/guessfootballheroRoutes');
// const betsRoutes = require('./routes/betsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const miningRoutes = require('./routes/miningRoutes');
const fixturesRoutes = require('./routes/fixturesRoutes');
const livefixturesRoutes = require('./routes/livefixturesRoutes');
const countriesRoutes = require('./routes/countryRoutes');
const aichatRoutes = require('./routes/aichatRoutes');
const predictionsRoutes = require('./routes/predictionsRoutes');
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

const crypto = require('crypto');
const { setupMessageHandlers } = require('./controllers/chatforumsocketController');

dotenv.config();

process.env.TZ = 'Europe/London';
connectDB();
const app = express(); // main thing
const server = https.createServer(app);

const io = require("socket.io")(server, {
  rejectUnauthorized: false,
  cors: {
    origin: "https://fifareward.io",
    methods: ["GET", "POST"]
  }
})

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
// app.use('/profile-images', express.static('profile-images'));
// app.use('/playerimages', express.static('playerimages'));
// app.use('/chatforumuploads', express.static('chatforumuploads'));

app.use("/api/chatforum", chatforumRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/countdown", countdownRoutes);
app.use("/api/", uploadsRoutes);
app.use('/api/leagues',leaguesRoutes );
app.use('/api/betpayment',proceessbetspaymentRoutes );
app.use('/api/guessherohint',guessherohintRoutes );
// app.use('/api/bets',betsRoutes );
app.use('/api/users',usersRoutes );
app.use('/api/mining',miningRoutes );
app.use('/api/fixtures',fixturesRoutes );
app.use('/api/livefixtures',livefixturesRoutes );
app.use('/api/guessfootballhero',guessfootballheroRoutes );
app.use('/api/countries',countriesRoutes );
app.use('/api/predictions',predictionsRoutes );
app.use('/api/aichats',aichatRoutes );


// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

io.on('connection', (socket: any) => {
  console.log('a user connected');
  console.log("socket Id",socket.id)

  // Setup message handlers
  setupMessageHandlers(io, socket);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 9000;

app.listen(
  PORT,
  // console.log(
  //   `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`
  // )
);
