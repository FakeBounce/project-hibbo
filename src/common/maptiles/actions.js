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
      id: '603414e3-d8fc-4b3f-ac56-376160eb7958', name: `first`,
      maptiles: {
      0: {
      0: {
      completed: false,
      id: id1,
      image: "/assets/images/forest.png",
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
      image: "/assets/images/forest.png",
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
      image: "/assets/images/forest.png",
      title: "forest"
      }
      },
      1: {
      0: {
      completed: false,
      id: id4,
      image: "/assets/images/forest.png",
      title: "forest"
      },
      1: {
      completed: false,
      id: id5,
      image: "/assets/images/forest.png",
      title: "forest"
      },
      2: {
      completed: false,
      id: id6,
      image: "/assets/images/forest.png",
      title: "forest"
      }
      },
      2: {
      0: {
      completed: false,
      id: id7,
      image: "/assets/images/forest.png",
      title: "forest"
      },
      1: {
      completed: false,
      id: id8,
      image: "/assets/images/forest.png",
      title: "forest"
      },
      2: {
      completed: false,
      id: id9,
      image: "/assets/images/forest.png",
      title: "forest"
      }
      }
      },
      }


    });
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
