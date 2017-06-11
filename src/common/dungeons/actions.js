/**
 * Created by Fakebounce on 13/11/2016.
 */

import { Range } from 'immutable';
export const LOAD_DUNGEONS = 'LOAD_DUNGEONS';
export const LOAD_SKILLS = 'LOAD_SKILLS';
export const PRELOAD_ACTIVE_DUNGEON = 'PRELOAD_ACTIVE_DUNGEON';
export const PRELOAD_ACTIVE_DUNGEON_SUCCESS = 'PRELOAD_ACTIVE_DUNGEON_SUCCESS';
export const ATTACK_MONSTER = 'ATTACK_MONSTER';
export const MOVE_CHARACTER = 'MOVE_CHARACTER';
export const LOAD_WORLD_MAP = 'LOAD_WORLD_MAP';
export const LOAD_WORLD_MAP_SUCCESS = 'LOAD_WORLD_MAP_SUCCESS';

export const LoadDungeons = (snap: Object) => {
    const dungeons = snap.val();
    return {
        type: LOAD_DUNGEONS,
        payload: { dungeons },
    };
};

export const LoadSkills = (snap: Object) => {
    const skills = snap.val();
    console.log(skills);
    return {
        type: LOAD_SKILLS,
        payload: { skills },
    };
};

export const preLoadActiveDungeon = (viewer) => ({firebase}) => {
    var path = 'activeDungeons/'+viewer.dungeonActive;
    const getPromise = async () => {
        try {
            return await firebase.database.ref(path).once('value').then(function(snapshot){
                let dungeonActive = snapshot.val();
                return dungeonActive;
            });
        } catch (error) {
            console.log('An error occured. We could not load the dungeon. Try again later.');
            throw error;
        }
    };
    return {
        type: PRELOAD_ACTIVE_DUNGEON,
        payload: getPromise(),
    }
};

export const attackMonster = (character,row,col) => {
    console.log('action ok');
    return {
        type: ATTACK_MONSTER,
        payload: character
    }
};

export const moveCharacter = (dungeon,row,col) => ({ firebase }) => {
    let canMove = false;
    let message = '';
    let totalRow = dungeon.user.row - row;
    let totalCol = dungeon.user.col - col;
    //Transform total difference to positive int
    if(totalCol < 0)
    {
        totalCol = totalCol*-1;
    }
    //Transform total difference to positive int
    if(totalRow < 0)
    {
        totalRow = totalRow*-1;
    }
    //Check if user can move to location
    if(totalRow+totalCol > 1)
    {
        message = 'You are too far from this location.';
    }
    else
    {
        canMove = true;
    }

    if(canMove)
    {
        dungeon.dungeon.maptiles[row][col].character = dungeon.dungeon.maptiles[dungeon.user.row][dungeon.user.col].character;
        delete dungeon.dungeon.maptiles[dungeon.user.row][dungeon.user.col].character;
        dungeon.user.row = row;
        dungeon.user.col = col;
        dungeon.error_message = '';
        firebase.update({
            [`activeDungeons/${dungeon.id}`]: dungeon,
        });
    }
    else
    {
        dungeon.error_message = message;
    }
    return {
        type: MOVE_CHARACTER,
        payload: dungeon,
        component: { canMove: canMove,message: message}
    }
};

export const loadWorldMap = (dungeon,viewer) =>  ({ getUid, now, firebase }) => {
    var path = 'maps/'+dungeon.worldmap;
    var Uid = getUid();
    const getPromise = async () => {
        try {
            return await firebase.database.ref(path).once('value').then(function(snapshot){
                let worldmap = snapshot.val();
                let dungeonActive = {
                    id: Uid,
                    dungeonId: dungeon.id,
                    name: dungeon.name,
                    description: dungeon.description,
                    user :
                        {id:viewer.id, displayName:viewer.displayName, row:0,col:0},
                    dungeon:worldmap,
                    createdAt: now()
                };
                if(worldmap.id)
                {
                    firebase.update({
                        [`activeDungeons/${Uid}`]: dungeonActive,
                    });
                    firebase.update({
                        [`users/${viewer.id}/dungeonActive`]: Uid,
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
