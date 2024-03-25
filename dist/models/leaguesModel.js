"use strict";
var mongoose = require("mongoose");
const Leagueschema = mongoose.Schema({
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
    seasons: [
        {
            year: {
                type: String
            },
            start: {
                type: String
            },
            end: {
                type: String
            },
            current: {
                type: Boolean
            },
            coverage: {
                fixtures: {
                    events: {
                        type: Boolean
                    },
                    lineups: {
                        type: Boolean
                    },
                    statistics_fixtures: {
                        type: Boolean
                    },
                    statistics_players: {
                        type: Boolean
                    },
                },
                standings: {
                    type: Boolean
                },
                players: {
                    type: Boolean
                },
                top_scorers: {
                    type: Boolean
                },
                top_assists: {
                    type: Boolean
                },
                top_cards: {
                    type: Boolean
                },
                injuries: {
                    type: Boolean
                },
                predictions: {
                    type: Boolean
                },
                odds: {
                    type: Boolean
                }
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
const Leagues = mongoose.model("Leagues", Leagueschema);
module.exports = Leagues;
