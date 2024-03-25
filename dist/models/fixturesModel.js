"use strict";
var mongoose = require("mongoose");
const Fixtureschema = mongoose.Schema({
    fid: {
        type: Number
    },
    fixturedate: {
        type: String
    },
    fixture: {
        id: {
            type: Number
        },
        referee: {
            type: String
        },
        timezone: {
            type: String,
        },
        date: {
            type: Date
        },
        timestamp: {
            type: Number
        },
        periods: {
            first: {
                type: Number
            },
            second: {
                type: Number
            }
        },
        venue: {
            id: {
                type: Number
            },
            name: {
                type: String
            },
            city: {
                type: String
            }
        },
        status: {
            long: {
                type: String
            },
            short: {
                type: String
            },
            elapsed: {
                type: Number
            }
        }
    },
    league: {
        id: {
            type: Number
        },
        name: {
            type: String
        },
        country: {
            type: String
        },
        logo: {
            type: String
        },
        flag: {
            type: String
        },
        season: {
            type: Number
        },
        round: {
            type: String
        }
    },
    teams: {
        home: {
            id: {
                type: Number
            },
            name: {
                type: String
            },
            logo: {
                type: String
            },
            winner: {
                type: Boolean
            }
        },
        away: {
            id: {
                type: Number
            },
            name: {
                type: String
            },
            logo: {
                type: String
            },
            winner: {
                type: Boolean
            }
        }
    },
    goals: {
        home: {
            type: Number
        },
        away: {
            type: Number
        }
    },
    score: {
        halftime: {
            home: {
                type: Number
            },
            away: {
                type: Number
            }
        },
        fulltime: {
            home: {
                type: Number
            },
            away: {
                type: Number
            }
        },
        extratime: {
            home: {
                type: Number
            },
            away: {
                type: Number
            }
        },
        penalty: {
            home: {
                type: Number
            },
            away: {
                type: Number
            }
        }
    }
});
const Fixtures = mongoose.model("Fixtures", Fixtureschema);
module.exports = Fixtures;
