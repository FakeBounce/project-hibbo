/**
 * Created by Ben on 13/11/2016.
 */

import { Range } from 'immutable';
export const FIREBASE_LOAD_DUNGEON = 'FIREBASE_LOAD_DUNGEON';
export const LOAD_DUNGEONS = 'LOAD_DUNGEONS';
export const LIST_DUNGEONS = 'LIST_DUNGEONS';
export const ON_ACTIVE_DUNGEON = 'ON_ACTIVE_DUNGEON';
export const LOAD_WORLD_MAP = 'LOAD_WORLD_MAP';
export const LOAD_WORLD_MAP_SUCCESS = 'LOAD_WORLD_MAP_SUCCESS';

// export const firebaseLoadDungeon = (dungeon) =>  ({ firebase }) => {
//
//     const id = "15f053bc-d52d-4f70-ae41-5f3912b18fef";
//     const promise = firebase(`dungeons/${id}`);
//     return {
//         type: FIREBASE_LOAD_DUNGEON,
//         payload: promise,
//     };
// };

export const LoadDungeons = (snap: Object) => {
    const dungeons = snap.val();
    return {
        type: LOAD_DUNGEONS,
        payload: { dungeons },
    };
};

export const loadWorldMap = (id) =>  ({ firebase }) => {
    var path = 'maps/'+id;
    // let worldmap;
    // let promises = [];
    // const promise = firebase.database.ref(path).once('value').then(function(snapshot) {
    //     promises.push(snapshot.val());
    //     return Promise.all(promise).then(data => {
    //         return {
    //             type: LOAD_WORLD_MAP,
    //             payload: { data },
    //         };
    //     });
    // });
    const getPromise = async () => {
        try {
            return await firebase.database.ref(path).once('value').then(function(snapshot){ return snapshot.val()});
        } catch (error) {
            if (messages[error.code]) {
                throw mapFirebaseErrorToEsteValidationError(error.code);
            }
            throw error;
        }
    };
    return {
        type: LOAD_WORLD_MAP,
        payload: getPromise(),
    }
};

// export const listDungeons = (dungeon) =>  ({ firebase }) => {
//
//     const id = "15f053bc-d52d-4f70-ae41-5f3912b18fef";
//     const promise = firebase(`dungeons`);
//     return {
//         type: LIST_DUNGEON,
//         payload: promise,
//     };
// };
//
//
// export const onActiveDungeon = (snap: Object) => {
//     const dungeons = snap.val();
//     return {
//         type: ON_ACTIVE_DUNGEON,
//         payload: { dungeons },
//     };
// };
