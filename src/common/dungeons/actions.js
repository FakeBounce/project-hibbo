/**
 * Created by Fakebounce on 13/11/2016.
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

export const loadWorldMap = (dungeon,viewer) =>  ({ getUid, now, firebase }) => {
    console.log('dwmid: '+dungeon.worldmap);
    var path = 'maps/'+dungeon.worldmap;
    var Uid = getUid();
    const getPromise = async () => {
        try {
            return await firebase.database.ref(path).once('value').then(function(snapshot){
                let worldmap = snapshot.val();
                let dungeonActive = {
                    id: dungeon.id,
                    name: dungeon.name,
                    description: dungeon.description,
                    user :
                        {id:viewer.id, displayName:viewer.displayName,email:viewer.email},
                    dungeon:worldmap,
                    createdAt: now()
                };
                if(worldmap.id)
                {
                    firebase.update({
                        [`activeDungeons/${Uid}`]: dungeonActive,
                    });
                }
                return dungeonActive;
            });
        } catch (error) {
            console.log('An error occured. We could not load the dungeon. Try again later.');
            throw error;
        }
    };
    return {
        type: LOAD_WORLD_MAP,
        payload: getPromise(),
    }
};
