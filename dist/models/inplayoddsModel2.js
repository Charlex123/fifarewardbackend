"use strict";
// var mongoose = require(mongoose);
// const Oddsschema = mongoose.Schema(
// {
//     oddid: {
//         type: Number
//     },
//     fixture: {
//         id: {
//             type: Number
//         },
//         status: {
//             long: {
//                 type: String
//             },
//             elapsed: {
//                 type: Number
//             },
//             seconds: {
//                 type: String
//             }
//         }
//     },
//     league: {
//         id: {
//             type: Number
//         },
//         season: {
//             type: Number
//         }
//     },
//     teams: {
//         home: {
//             id: {
//                 type: Number
//             },
//             goals: {
//                 type: Number
//             }
//         },
//         away: {
//             id: {
//                 type: Number
//             },
//             goals: {
//                 type: Number
//             }
//         }
//     },
//     status: {
//         stopped: {
//             type: Boolean
//         },
//         blocked: {
//             type: Boolean
//         },
//         finished: {
//             type: Boolean
//         }
//     },
//     update: {
//         type: String
//     },
//     odds: [
//     {
//     id: {
//         type: Number
//     },
//     name: {
//         type: String
//     },
//     values: [
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     }
//     ]
//     },
//     {
//     id: {
//         type: Number
//     },
//     name: {
//         type: String
//     },
//     values: [
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     }
//     ]
//     },
//     {
//     id: {
//         type: Number
//     },
//     name: {
//         type: String
//     },
//     values: [
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     }
//     ]
//     },
//     {
//     id: 36,
//     name: {
//         type: String
//     },
//     values: [
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     }
//     ]
//     },
//     {
//     id: {
//         type: Number
//     },
//     name: {
//         type: String
//     },
//     values: [
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     }
//     ]
//     },
//     {
//     id: {
//         type: Number
//     },
//     name: {
//         type: String
//     },
//     values: [
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     }
//     ]
//     },
//     {
//     id: {
//         type: Number
//     },
//     name: {
//         type: String
//     },
//     values: [
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     }
//     ]
//     },
//     {
//     id: {
//         type: Number
//     },
//     name: {
//         type: String
//     },
//     values: [
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     }
//     ]
//     },
//     {
//     id: {
//         type: Number
//     },
//     name: {
//         type: String
//     },
//     values: [
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     }
//     ]
//     },
//     {
//     id: {
//         type: Number
//     },
//     name: {
//         type: String
//     },
//     values: [
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     }
//     ]
//     },
//     {
//     id: {
//         type: Number
//     },
//     name: {
//         type: String
//     },
//     values: [
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     }
//     ]
//     },
//     {
//     id: {
//         type: Number
//     },
//     name: {
//         type: String
//     },
//     values: [
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     },
//     {
//         value: {
//             type: String
//         },
//         odd: {
//             type: String
//         },
//         handicap: {
//             type: String
//         },
//         main: {
//             type: String
//         },
//         suspended: {
//             type: Boolean
//         }
//     }
//     ]
//     },
//     ]
// })
// const Odds = mongoose.model("Odds", Oddsschema);
// module.exports = Odds;
