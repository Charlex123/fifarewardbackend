var mongoose = require("mongoose");

const Leagueschema = mongoose.Schema(
  {
    lid: {
      type: Number
    },
    league: {
      id: {
        type: Number
      },
      name: {
        type: String
      },
      type: {
        type: String
      },
      logo: {
        type: String
      }
    },
    country: {
      name: {
        type: String
      },
      code: {
        type: String
      },
      flag: {
        type: String
      }
    },
    createdAt: {
      type:Date,
      default:Date.now()
    }
  }
);


const Leagues = mongoose.model("Leagues", Leagueschema);

module.exports = Leagues;
