/**
 * Created by bromanelli on 12/10/2016.
 */

import { Range } from 'immutable';

/*
export const saveMaptile = maptile =>  ({ firebase }) => {
  firebase.firebase();
  firebase.child(`users-presence/4f8vev89qz798vz87`)
    .push({
      authenticatedAt: 'hoho',
      user: 'haha',
    });
};
*/
export const MAPTILE_COMPLETED = 'MAPTILE_COMPLETED';
export const FIREBASE_SAVE_MAPTILE = 'FIREBASE_SAVE_MAPTILE';


// CREATE + SAVE VERSION
export const maptileCompleted = () => ({ getUid, now, firebase, firebaseDatabase }) => {
  var id = getUid();
  var id1 = getUid();
  var id2 = getUid();
  var id3 = getUid();
  var id4 = getUid();
  var id5 = getUid();
  var id6 = getUid();
  var id7 = getUid();
  var id8 = getUid();
  var id9 = getUid();
  var id10 = getUid();
  var id11 = getUid();
  var id12 = getUid();
  var id13 = getUid();
  var id14 = getUid();
  var id15 = getUid();
  var id16 = getUid();
  var id17 = getUid();
  var id18 = getUid();
  var id19 = getUid();
  var id20 = getUid();
  var id21 = getUid();
  var id22 = getUid();
  var id23 = getUid();
  var id24 = getUid();
  var id25 = getUid();
  var id26 = getUid();
  var id27 = getUid();
  var id28 = getUid();
  var id29 = getUid();
  var id30 = getUid();
  var id31 = getUid();
  var id32 = getUid();
  var id33 = getUid();
  var id34 = getUid();
  var id35 = getUid();
  var id36 = getUid();
  var id37 = getUid();
  var id38 = getUid();
  var id39 = getUid();
  var id40 = getUid();
  var id41 = getUid();
  var id42 = getUid();
  var id43 = getUid();
  var id44 = getUid();
  var id45 = getUid();
  var id46 = getUid();
  var id47 = getUid();
  var id48 = getUid();
  var id49 = getUid();
  var id50 = getUid();
  var id51 = getUid();
  var id52 = getUid();
  var id53 = getUid();
  var id54 = getUid();
  var id55 = getUid();
  var id56 = getUid();
  var id57 = getUid();
  var id58 = getUid();
  var id59 = getUid();
  var id60 = getUid();
  var id61 = getUid();
  var id62 = getUid();
  var id63 = getUid();
  var id64 = getUid();
  var id65 = getUid();
  var id66 = getUid();
  var id67 = getUid();
  var id68 = getUid();
  var id69 = getUid();
  var id70 = getUid();
  var id71 = getUid();
  var id72 = getUid();
  var id73 = getUid();
  var id74 = getUid();
  var id75 = getUid();
  var id76 = getUid();
  var id77 = getUid();
  var id78 = getUid();
  var id79 = getUid();
  var id80 = getUid();
  var id81 = getUid();
  var id82 = getUid();
  var id83 = getUid();
  var id84 = getUid();
  var id85 = getUid();
  var id86 = getUid();
  var id87 = getUid();
  var id88 = getUid();
  var id89 = getUid();
  var id90 = getUid();
  var id91 = getUid();
  var id92 = getUid();
  var id93 = getUid();
  var id94 = getUid();
  var id95 = getUid();
  var id96 = getUid();
  var dungeon = { description: `Training dungeon`, id: `0665f39f-707c-4a5d-9fab-c3e18456746c`,idMap: `603414e3-d8fc-4b3f-ac56-376160eb7958`,name: `Practice`}
  // firebase.update({
  //   [`maptile/${id}`]: { completed: false, id: id, title : `MapTile #123` },

  // ADD FAKE DUNGEON
  //[`dungeons/${id}`]: { id: id, map:`987654321`, name : `Practice`,description : `Training dungeon` },
  // [`typeDungeons/${id}`]: { id: id, name : `Practice`,description : `Training dungeon`, idMap1: `603414e3-d8fc-4b3f-ac56-376160eb7958`},
  //[`activeDungeons/${id}`]: { createdAt: firebaseDatabase.ServerValue.TIMESTAMP, dungeon: dungeon},

  //ADD FAKE MAP
  firebase.update({
      [`maps/603414e3-d8fc-4b3f-ac56-376160eb7958`]: {
          id: '603414e3-d8fc-4b3f-ac56-376160eb7958', name: `first`, maptiles: {
              0: {
                  0: {
                      completed: false,
                      id: id1,
                      image: "casegrass",
                      title: "forest",
                      character: {
                          image:"/assets/images/classes/gface.png",
                          damage:100,
                          health:15000
                      }
                  },
                  1: {
                      completed: false,
                      id: id2,
                      image: "casegrass",
                      title: "forest",
                      character: {
                          image:"/assets/images/monsters/Warrior.png",
                          damage:250,
                          health:400
                      }
                  },
                  2: {
                      completed: false,
                      id: id3,
                      image: "caseforest",
                      title: "forest"
                  },
                  3: {
                    completed: false,
                    id: id4,
                    image: "caseforest",
                    title: "forest"
                  },
                  4: {
                    completed: false,
                    id: id5,
                    image: "caseforest",
                    title: "forest"
                  },
                  5: {
                    completed: false,
                    id: id6,
                    image: "caseforest",
                    title: "forest"
                  },
                  6: {
                    completed: false,
                    id: id7,
                    image: "caseforest",
                    title: "forest"
                  },
                  7: {
                    completed: false,
                    id: id8,
                    image: "caseforest",
                    title: "forest"
                  },
                  8: {
                    completed: false,
                    id: id9,
                    image: "caseforest",
                    title: "forest"
                  },
                  9: {
                    completed: false,
                    id: id10,
                    image: "caseforest",
                    title: "forest"
                  }
              },
              1: {
                0: {
                  completed: false,
                  id: id11,
                  image: "casegrass",
                  title: "forest"
                },
                1: {
                  completed: false,
                  id: id12,
                  image: "casegrass",
                  title: "forest"
                },
                2: {
                  completed: false,
                  id: id13,
                  image: "caseforest",
                  title: "forest"
                },
                3: {
                  completed: false,
                  id: id14,
                  image: "caseforest",
                  title: "forest"
                },
                4: {
                  completed: false,
                  id: id15,
                  image: "caseforest",
                  title: "forest"
                },
                5: {
                  completed: false,
                  id: id16,
                  image: "caseforest",
                  title: "forest"
                },
                6: {
                  completed: false,
                  id: id17,
                  image: "caseforest",
                  title: "forest"
                },
                7: {
                  completed: false,
                  id: id18,
                  image: "caseforest",
                  title: "forest"
                },
                8: {
                  completed: false,
                  id: id19,
                  image: "caseforest",
                  title: "forest"
                },
                9: {
                  completed: false,
                  id: id20,
                  image: "caseforest",
                  title: "forest"
                }
              },
              2: {
                0: {
                  completed: false,
                  id: id21,
                  image: "casegrass",
                  title: "forest"
                },
                1: {
                  completed: false,
                  id: id22,
                  image: "casegrass",
                  title: "forest"
                },
                2: {
                  completed: false,
                  id: id23,
                  image: "caseforest",
                  title: "forest"
                },
                3: {
                  completed: false,
                  id: id24,
                  image: "caseforest",
                  title: "forest"
                },
                4: {
                  completed: false,
                  id: id25,
                  image: "caseforest",
                  title: "forest"
                },
                5: {
                  completed: false,
                  id: id26,
                  image: "caseforest",
                  title: "forest"
                },
                6: {
                  completed: false,
                  id: id27,
                  image: "caseforest",
                  title: "forest"
                },
                7: {
                  completed: false,
                  id: id28,
                  image: "caseforest",
                  title: "forest"
                },
                8: {
                  completed: false,
                  id: id29,
                  image: "caseforest",
                  title: "forest"
                },
                9: {
                  completed: false,
                  id: id30,
                  image: "caseforest",
                  title: "forest"
                }
              },
              3: {
                0: {
                  completed: false,
                  id: id31,
                  image: "casegrass",
                  title: "forest"
                },
                1: {
                  completed: false,
                  id: id32,
                  image: "casegrass",
                  title: "forest"
                },
                2: {
                  completed: false,
                  id: id33,
                  image: "caseforest",
                  title: "forest"
                },
                3: {
                  completed: false,
                  id: id34,
                  image: "caseforest",
                  title: "forest"
                },
                4: {
                  completed: false,
                  id: id35,
                  image: "caseforest",
                  title: "forest"
                },
                5: {
                  completed: false,
                  id: id36,
                  image: "caseforest",
                  title: "forest"
                },
                6: {
                  completed: false,
                  id: id37,
                  image: "caseforest",
                  title: "forest"
                },
                7: {
                  completed: false,
                  id: id38,
                  image: "caseforest",
                  title: "forest"
                },
                8: {
                  completed: false,
                  id: id39,
                  image: "caseforest",
                  title: "forest"
                },
                9: {
                  completed: false,
                  id: id40,
                  image: "caseforest",
                  title: "forest"
                }
              },
            4: {
              0: {
                completed: false,
                id: id41,
                image: "casegrass",
                title: "forest"
              },
              1: {
                completed: false,
                id: id42,
                image: "casegrass",
                title: "forest"
              },
              2: {
                completed: false,
                id: id43,
                image: "caseforest",
                title: "forest"
              },
              3: {
                completed: false,
                id: id44,
                image: "caseforest",
                title: "forest"
              },
              4: {
                completed: false,
                id: id45,
                image: "caseforest",
                title: "forest"
              },
              5: {
                completed: false,
                id: id46,
                image: "caseforest",
                title: "forest"
              },
              6: {
                completed: false,
                id: id47,
                image: "caseforest",
                title: "forest"
              },
              7: {
                completed: false,
                id: id48,
                image: "caseforest",
                title: "forest"
              },
              8: {
                completed: false,
                id: id49,
                image: "caseforest",
                title: "forest"
              },
              9: {
                completed: false,
                id: id50,
                image: "caseforest",
                title: "forest"
              }
            },
            5: {
              0: {
                completed: false,
                id: id51,
                image: "casegrass",
                title: "forest"
              },
              1: {
                completed: false,
                id: id52,
                image: "casegrass",
                title: "forest"
              },
              2: {
                completed: false,
                id: id53,
                image: "caseforest",
                title: "forest"
              },
              3: {
                completed: false,
                id: id54,
                image: "caseforest",
                title: "forest"
              },
              4: {
                completed: false,
                id: id55,
                image: "caseforest",
                title: "forest"
              },
              5: {
                completed: false,
                id: id56,
                image: "caseforest",
                title: "forest"
              },
              6: {
                completed: false,
                id: id57,
                image: "caseforest",
                title: "forest"
              },
              7: {
                completed: false,
                id: id58,
                image: "caseforest",
                title: "forest"
              },
              8: {
                completed: false,
                id: id59,
                image: "caseforest",
                title: "forest"
              },
              9: {
                completed: false,
                id: id60,
                image: "caseforest",
                title: "forest"
              }
            },
            6: {
              0: {
                completed: false,
                id: id61,
                image: "casegrass",
                title: "forest"
              },
              1: {
                completed: false,
                id: id62,
                image: "casegrass",
                title: "forest"
              },
              2: {
                completed: false,
                id: id63,
                image: "caseforest",
                title: "forest"
              },
              3: {
                completed: false,
                id: id64,
                image: "caseforest",
                title: "forest"
              },
              4: {
                completed: false,
                id: id65,
                image: "caseforest",
                title: "forest"
              },
              5: {
                completed: false,
                id: id66,
                image: "caseforest",
                title: "forest"
              },
              6: {
                completed: false,
                id: id67,
                image: "caseforest",
                title: "forest"
              },
              7: {
                completed: false,
                id: id68,
                image: "caseforest",
                title: "forest"
              },
              8: {
                completed: false,
                id: id69,
                image: "caseforest",
                title: "forest"
              },
              9: {
                completed: false,
                id: id70,
                image: "caseforest",
                title: "forest"
              }
            },
            7:{
              0: {
                completed: false,
                id: id71,
                image: "casegrass",
                title: "forest"
              },
              1: {
                completed: false,
                id: id72,
                image: "casegrass",
                title: "forest"
              },
              2: {
                completed: false,
                id: id73,
                image: "caseforest",
                title: "forest"
              },
              3: {
                completed: false,
                id: id74,
                image: "caseforest",
                title: "forest"
              },
              4: {
                completed: false,
                id: id75,
                image: "caseforest",
                title: "forest"
              },
              5: {
                completed: false,
                id: id76,
                image: "caseforest",
                title: "forest"
              },
              6: {
                completed: false,
                id: id77,
                image: "caseforest",
                title: "forest"
              },
              7: {
                completed: false,
                id: id78,
                image: "caseforest",
                title: "forest"
              },
              8: {
                completed: false,
                id: id79,
                image: "caseforest",
                title: "forest"
              },
              9: {
                completed: false,
                id: id80,
                image: "caseforest",
                title: "forest"
              }
            }
          }
      }});


  //ADD FAKE SKILLS
  firebase.update({
    [`skills`]: {
      0: {
        get: true,
        id: id81,
        css: "objet0",
        title: "fiole0"
      },
      1: {
        get: true,
        id: id82,
        css: "objet1",
        title: "fiole1"
      },
      2: {
        get: true,
        id: id83,
        css: "objet2",
        title: "fiole2"
      },
      3: {
        get: true,
        id: id84,
        css: "objet3",
        title: "fiole3"
      },
      4: {
        get: true,
        id: id85,
        css: "objet4",
        title: "fiole4"
      },
      5: {
        get: true,
        id: id86,
        css: "objet5",
        title: "fiole5"
      },
      6: {
        get: true,
        id: id87,
        css: "objet6",
        title: "fiole6"
      },
      7: {
        get: false,
        id: id88,
        css: "objet7",
        title: "fiole7"
      },
    }
  });

  //ADD FAKE WEAPONS
  firebase.update({
    [`weapons`]: {
      0: {
        get: true,
        id: id89,
        css: "weapon0",
        title: "weapon0"
      },
      1: {
        get: true,
        id: id90,
        css: "weapon1",
        title: "weapon1"
      },
      2: {
        get: true,
        id: id91,
        css: "weapon2",
        title: "weapon2"
      },
      3: {
        get: true,
        id: id92,
        css: "weapon3",
        title: "weapon3"
      },
      4: {
        get: true,
        id: id93,
        css: "weapon4",
        title: "weapon4"
      },
      5: {
        get: true,
        id: id94,
        css: "weapon5",
        title: "weapon5"
      },
      6: {
        get: true,
        id: id95,
        css: "weapon6",
        title: "weapon6"
      },
      7: {
        get: false,
        id: id96,
        css: "weapon7",
        title: "weapon7"
      }
    }});

  return {
    type: MAPTILE_COMPLETED,
    payload: {
      createdAt: now(),
      id: id,
      title: `MapTile #123`,
    },
  };
};




// CREATE ONLY
/*
export const maptileCompleted = () => ({ getUid, now }) => ({
    type: MAPTILE_COMPLETED,
    payload: {
      createdAt: now(),
      id: getUid(),
      title: `MapTile #123`,
    },
});
*/
export const saveMapTile = (maptile) =>  ({ firebase }) => {

  const { ...json } = maptile.toJS();
  const promise = firebase.update({
    [`maptile/${maptile.id}`]: { json },
  });
  return {
    type: FIREBASE_SAVE_MAPTILE,
    payload: promise,
  };
};
