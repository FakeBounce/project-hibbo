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
  export const maptileCompleted = () => ({ getUid, now, firebase }) => {
    var id = getUid();
    var dungeon = "dungeon1";
    firebase.update({
      [`maptile/${id}`]: { completed: false, id: id, title : `MapTile #123` },

      // ADD FAKE DUNGEON
      //[`dungeons/${id}`]: { id: id, map:`987654321`, name : `Practice`,description : `Training dungeon` },

      //ADD FAKE MAP
     /* [`maps/${id}`]:
    { id: id,
      maptiles:
      {
        0:
          {
            0:`http://fakebounce.fr/asset/img/forest.png`,
            1:`http://fakebounce.fr/asset/img/forest.png`,
            2:`http://fakebounce.fr/asset/img/forest.png`
          },
        1:
          {
            0:`http://fakebounce.fr/asset/img/grass.png`,
            1:`http://fakebounce.fr/asset/img/grass.png`,
            2:`http://fakebounce.fr/asset/img/grass.png`
          },
        2:
        {
          0:`http://fakebounce.fr/asset/img/forest.png`,
          1:`http://fakebounce.fr/asset/img/forest.png`,
          2:`http://fakebounce.fr/asset/img/forest.png`
        }
      }
    },*/


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
