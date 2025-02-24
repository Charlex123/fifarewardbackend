"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require(mongoose);
const PrematchOddsschema = mongoose.Schema({
    oddid: {
        type: Number
    },
    fixture: {
        id: {
            type: Number
        },
        status: {
            long: {
                type: String
            },
            elapsed: {
                type: Number
            },
            seconds: {
                type: String
            }
        }
    },
    league: {
        id: {
            type: Number
        },
        season: {
            type: Number
        }
    },
    teams: {
        home: {
            id: {
                type: Number
            },
            goals: {
                type: Number
            }
        },
        away: {
            id: {
                type: Number
            },
            goals: {
                type: Number
            }
        }
    },
    status: {
        stopped: {
            type: Boolean
        },
        blocked: {
            type: Boolean
        },
        finished: {
            type: Boolean
        }
    },
    update: {
        type: String
    },
    odds: {
        type: Array
    }
});
const PrematchOdds = mongoose.model("PrematchOdds", PrematchOddsschema);
module.exports = PrematchOdds;
