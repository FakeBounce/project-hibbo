/**
 * Created by Ben on 13/11/2016.
 */

import { Range } from 'immutable';
export const FIREBASE_LOAD_DUNGEON = 'FIREBASE_LOAD_DUNGEON';
export const LOAD_DUNGEONS = 'LOAD_DUNGEONS';
export const LIST_DUNGEONS = 'LIST_DUNGEONS';
export const ON_ACTIVE_DUNGEON = 'ON_ACTIVE_DUNGEON';

export const firebaseLoadDungeon = (dungeon) =>  ({ firebase }) => {

    const id = "15f053bc-d52d-4f70-ae41-5f3912b18fef";
    const promise = firebase(`dungeons/${id}`);
    return {
        type: FIREBASE_LOAD_DUNGEON,
        payload: promise,
    };
};

export const LoadDungeons = (snap: Object) => {
    const dungeons = snap.val();
    return {
        type: LOAD_DUNGEONS,
        payload: { dungeons },
    };
};

export const listDungeons = (dungeon) =>  ({ firebase }) => {

    const id = "15f053bc-d52d-4f70-ae41-5f3912b18fef";
    const promise = firebase(`dungeons`);
    return {
        type: LIST_DUNGEON,
        payload: promise,
    };
};


export const onActiveDungeon = (snap: Object) => {
    const dungeons = snap.val();
    return {
        type: ON_ACTIVE_DUNGEON,
        payload: { dungeons },
    };
};
