/**
 * Created by Fakebounce on 13/11/2016.
 */

import { Range } from 'immutable';
export const MOVING_CHARACTER = 'MOVING_CHARACTER';
export const LOAD_DUNGEONS = 'LOAD_DUNGEONS';
export const LOAD_VIEWER_SUCCESS = 'LOAD_VIEWER_SUCCESS';
export const CANCEL_DUNGEON = 'CANCEL_DUNGEON';
export const LOAD_SKILLS = 'LOAD_SKILLS';
export const RELOAD_WORLD_MAP = 'RELOAD_WORLD_MAP';
export const LOAD_WEAPONS = 'LOAD_WEAPONS';
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
export const LoadViewer = (viewer) => ({ firebase }) => {
    if(viewer)
    {
        const getPromise = async () => {
            try {
                return await firebase.database.ref('/users/'+viewer.id).once('value').then(function(snapshot) {
                    var username = snapshot.val();
                    return username;
                });
            } catch (error) {
                console.log('An error occured. We could not load the dungeon. Try again later.');
                throw error;
            }
        };
        return {
            type: 'LOAD_VIEWER',
            payload: getPromise(),
        };
    }
    return {
        type: 'LOAD_VIEWER',
        payload: ''
    }
};

export const ReloadWorldMap = (snap: Object) => {
    const dungeons = snap.val();
    return {
        type: RELOAD_WORLD_MAP,
        payload: { dungeons },
    };
};



export const LoadSkills = (snap: Object) => {
    const skills = snap.val();
    return {
        type: LOAD_SKILLS,
        payload: { skills },
    };
};

export const LoadWeapons = (snap: Object) => {
    const weapons = snap.val();
    return {
        type: LOAD_WEAPONS,
        payload: { weapons },
    };
};

export const preLoadActiveDungeon = (viewer) => ({firebase}) => {
    var path = 'activeDungeons/'+viewer.active_dungeon;
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

export const cancelDungeon = (dungeon) =>  ({ firebase }) => {
    firebase.update({
        [`activeDungeons/${dungeon.user.id}`]: null,
        [`users/${dungeon.user.id}/active_dungeon`]: null,
    });

    return {
        type: CANCEL_DUNGEON,
        payload: dungeon
    }
};



export const movingCharacter = (dungeon,row,col) => ({ firebase }) => {

    let canMove = false;
    let message = '';
    let direction = '';
    if(!dungeon.user.is_moving)
    {
        let canMove = false;
        let message = '';
        let direction = '';
        let totalRow = dungeon.user.row - row;
        let totalCol = dungeon.user.col - col;
        if(totalRow < 0)
        {
            direction = 'down';
        }
        else if(totalRow > 0)
        {
            direction = 'up';
        }
        else if(totalCol < 0)
        {
            direction = 'right';
        }
        else if(totalCol > 0)
        {
            direction = 'left';
        }
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
        if(totalRow+totalCol > 1 || totalRow+totalCol == 0)
        {
            message = 'You cannot walk there.';
            if(totalRow+totalCol > 1)
            message = 'You are too far from this location.';
            dungeon.error_message = message;
            dungeon.dungeon.maptiles[dungeon.user.row][dungeon.user.col].character.image = "/assets/images/classes/"+dungeon.dungeon.maptiles[dungeon.user.row][dungeon.user.col].character.name+"/"+direction+".png";
            dungeon.user.is_moving = null;
            dungeon.user.moving_row = null;
            dungeon.user.moving_col = null;
            firebase.update({
                [`activeDungeons/${dungeon.user.id}`]: dungeon,
            });
        }
        else
        {
            if(dungeon.dungeon.maptiles[row][col].type == "walkable" && !dungeon.dungeon.maptiles[row][col].character)
            {
                canMove = true;
                dungeon.user.is_moving = direction;
                dungeon.user.moving_row = row;
                dungeon.user.moving_col = col;
                dungeon.dungeon.maptiles[dungeon.user.row][dungeon.user.col].character.image = "/assets/images/classes/"+dungeon.dungeon.maptiles[dungeon.user.row][dungeon.user.col].character.name+"/"+direction+".png";
                dungeon.error_message = '';
                firebase.update({
                    [`activeDungeons/${dungeon.user.id}`]: dungeon,
                });
            }
            else {
                message = 'You cannot walk there.';
                dungeon.error_message = message;
                dungeon.dungeon.maptiles[dungeon.user.row][dungeon.user.col].character.image = "/assets/images/classes/"+dungeon.dungeon.maptiles[dungeon.user.row][dungeon.user.col].character.name+"/"+direction+".png";
                dungeon.user.is_moving = null;
                dungeon.user.moving_row = null;
                dungeon.user.moving_col = null;
                firebase.update({
                    [`activeDungeons/${dungeon.user.id}`]: dungeon,
                });
            }
        }
    }
    else {
        let canMove = false;
        let message = 'Please wait.';
        let direction = '';
    }
    return {
        type: MOVING_CHARACTER,
        payload: dungeon,
        component: { canMove: canMove,message: message,direction: direction}
    }
}
export const moveCharacter = (dungeon) => ({ firebase }) => {

    if(dungeon.user.is_moving)
    {

        let canMove = false;
        let message = '';
        let direction = '';
        let totalRow = dungeon.user.row - dungeon.user.moving_row;
        let totalCol = dungeon.user.col - dungeon.user.moving_col;
        if(totalRow < 0)
        {
            direction = 'down';
        }
        else if(totalRow > 0)
        {
            direction = 'up';
        }
        else if(totalCol < 0)
        {
            direction = 'right';
        }
        else if(totalCol > 0)
        {
            direction = 'left';
        }
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
            dungeon.dungeon.maptiles[dungeon.user.row][dungeon.user.col].character.image = "/assets/images/classes/"+dungeon.dungeon.maptiles[dungeon.user.row][dungeon.user.col].character.name+"/"+direction+".png";
            dungeon.dungeon.maptiles[dungeon.user.moving_row][dungeon.user.moving_col].character = dungeon.dungeon.maptiles[dungeon.user.row][dungeon.user.col].character;
            delete dungeon.dungeon.maptiles[dungeon.user.row][dungeon.user.col].character;
            dungeon.user.row = dungeon.user.moving_row;
            dungeon.user.col = dungeon.user.moving_col;
            dungeon.user.moving_row = null;
            dungeon.user.moving_col = null;
            dungeon.user.is_moving = null;
            dungeon.error_message = '';
            firebase.update({
                [`activeDungeons/${dungeon.user.id}`]: dungeon,
            });
        }
        else
        {
            dungeon.dungeon.maptiles[dungeon.user.row][dungeon.user.col].character.image = "/assets/images/classes/"+dungeon.dungeon.maptiles[dungeon.user.row][dungeon.user.col].character.name+"/"+direction+".png";
            dungeon.error_message = message;
            dungeon.user.is_moving = null;
            dungeon.user.moving_row = null;
            dungeon.user.moving_col = null;
            firebase.update({
                [`activeDungeons/${dungeon.user.id}`]: dungeon,
            });
        }
    }
    return {
        type: MOVE_CHARACTER,
        payload: dungeon
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
                    dungeon_id: dungeon.id,
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
                        [`activeDungeons/${viewer.id}`]: dungeonActive,
                        [`users/${viewer.id}/active_dungeon`]: Uid,
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
