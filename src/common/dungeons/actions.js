/**
 * Created by Fakebounce on 13/11/2016.
 */

import { Range } from 'immutable';
export const LOAD_TUTO_REF = 'LOAD_TUTO_REF';
export const LOAD_VIEWER_CHANGES = 'LOAD_VIEWER_CHANGES';
export const LOAD_VIEWER_REF = 'LOAD_VIEWER_REF';
export const LOAD_STEP = 'LOAD_STEP';
export const LOAD_STEP_ERROR = 'LOAD_STEP_ERROR';
export const LOAD_STEP_START = 'LOAD_STEP_START';
export const LOAD_STEP_SUCCESS = 'LOAD_STEP_SUCCESS';
export const LOAD_NEXT_STEP = 'LOAD_NEXT_STEP';
export const LOAD_NEXT_STEP_SUCCESS = 'LOAD_NEXT_STEP_SUCCESS';
export const MONSTER_TURN = 'MONSTER_TURN';
export const END_TURN = 'END_TURN';
export const CAN_ATTACK_MONSTER = 'CAN_ATTACK_MONSTER';
export const MOVING_CHARACTER = 'MOVING_CHARACTER';
export const LOAD_DUNGEONS = 'LOAD_DUNGEONS';
export const LOAD_VIEWER = 'LOAD_VIEWER';
export const LOAD_VIEWER_SUCCESS = 'LOAD_VIEWER_SUCCESS';
export const CANCEL_DUNGEON = 'CANCEL_DUNGEON';
export const LOAD_SKILLS = 'LOAD_SKILLS';
export const LOAD_CLASSES = 'LOAD_CLASSES';
export const SET_CLASSE = 'SET_CLASSE';
export const RELOAD_WORLD_MAP = 'RELOAD_WORLD_MAP';
export const LOAD_WEAPONS = 'LOAD_WEAPONS';
export const PRELOAD_ACTIVE_DUNGEON = 'PRELOAD_ACTIVE_DUNGEON';
export const PRELOAD_ACTIVE_DUNGEON_SUCCESS = 'PRELOAD_ACTIVE_DUNGEON_SUCCESS';
export const ATTACK_MONSTER = 'ATTACK_MONSTER';
export const MOVE_CHARACTER = 'MOVE_CHARACTER';
export const LOAD_WORLD_MAP = 'LOAD_WORLD_MAP';
export const LOAD_WORLD_MAP_SUCCESS = 'LOAD_WORLD_MAP_SUCCESS';

/************ Dungeon creation in firebase *****************/
export const loadWorldMap = (dungeon,viewer) =>  ({ getUid, now, firebase }) => {
    var path = 'maps/'+dungeon.worldmap;
    var Uid = getUid();
    console.log(viewer);
    var character = viewer.characters[viewer.active];
character.row = 0;
character.col = 0;
character.is_attacking = false;
character.is_moving = false;
    const getPromise = async () => {
        try {
            return await firebase.database.ref(path).once('value').then(function(snapshot){
                let worldmap = snapshot.val();
                let dungeonActive = {
                    id: Uid,
                    dungeon_id: dungeon.id,
                    name: dungeon.name,
                    description: dungeon.description,
                    lock: dungeon.lock,
                    end_turn: false,
                    user :
                        {
                            id:viewer.id,
                            displayName:viewer.displayName,
                            character :character,
                            default_character : {
                                movevement:character.movement,
                                action:character.action,
                                damage:character.damage,
                                maxhealth:character.health,
                                maxenergy: character.energy,
                                maxexperience: 1000,
                            },
                        },
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

export const LoadStep = (viewer) =>  ({ firebase }) => {
    if(viewer.tuto) {
        const getPromise = async () => {
            try {
                return await firebase.database.ref('tutorialSteps/'+viewer.tuto).once('value').then(function(snapshot){
                    let tutoriel = snapshot.val();
                    firebase.update({
                        [`users/${viewer.id}/tuto_loaded`]: true,
                        [`tutoriel/${viewer.id}`]: tutoriel,
                    });
                    return {tutoriel};
                });
            } catch (error) {
                console.log('An error occured. We could not load the tutorial. Try again later.');
                throw error;
            }
        };
        return {
            type: LOAD_STEP,
            payload: getPromise(),
        }
    }
    return {
        type: LOAD_STEP,
        payload: viewer,

    }
};

export const LoadNextStep = (viewer,next) =>  ({ firebase }) => {
    if(viewer.tuto) {
        const getPromise = async () => {
            try {
                return await firebase.database.ref('tutorialSteps/'+next).once('value').then(function(snapshot){
                    let tutoriel = snapshot.val();

                    firebase.update({
                        [`users/${viewer.id}/tuto`]: next,
                        [`tutoriel/${viewer.id}`]: tutoriel,
                    });
                    return {tutoriel};
                });
            } catch (error) {
                console.log('An error occured. We could not load the tutorial. Try again later.');
                throw error;
            }
        };
        return {
            type: LOAD_NEXT_STEP,
            payload: getPromise(),
        }
    }
    return {
        type: LOAD_NEXT_STEP,
        payload: viewer,
    }
};

/************ Turns *****************/
export const EndTurn = (dungeon) => ({firebase}) => {
    dungeon.error_message = '';
    if(!dungeon.user.character.is_attacking && !dungeon.user.character.is_moving && !dungeon.end_turn)
    {
        dungeon.end_turn = true;
        dungeon.monster_turn = false;
        dungeon.monster_moves = false;
        var pj = dungeon.user.character;
        pj.is_attacked = false;
        var default_pj = dungeon.user.default_character;
        pj = jsonConcat(pj,default_pj);

        dungeon.user.character = pj;

        let monsters = dungeon.dungeon.monsters;
        let monster_moves = [];
        monsters.map((monster,index) => {
            let range = comparePosition(monster.row,monster.col,pj.row,pj.col);
            monster.can_attack = false;
            monster.can_move_attack = false;
            if(range.totalRange <= monster.range)
            {
                monster.can_attack = true;
                monster.direction = range.direction;
                dungeon.monster_moves = true;
                monster_moves.push(index);
            }
            else if(range.totalRange <= (monster.range+monster.movement))
            {
                monster.can_move_attack = true;
                monster.direction = range.direction;
                dungeon.monster_moves = true;
                monster_moves.push(index);
            }
        });
        dungeon.dungeon.monsters = monsters;
        if(monster_moves.length > 0)
        {
            dungeon.monster_moves = monster_moves;
        }
    }
    else {
        dungeon.end_turn = false;
        dungeon.error_message = 'You can\'t end while doing an action';
    }
    firebase.update({
        [`activeDungeons/${dungeon.user.id}`]: dungeon,
    });
    return {
        type: END_TURN,
        payload: dungeon,
    };
};

export const MonsterTurn = (dungeon,attack = false) => ({firebase}) => {
    if(dungeon.end_turn)
    {
        dungeon.monster_turn = true;
        if(attack)
        {
            dungeon.user.character.health -= dungeon.dungeon.monsters[dungeon.monster_moves[0]].damage;
            dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character = dungeon.user.character;
            dungeon.dungeon.monsters[dungeon.monster_moves[0]].is_attacking = false;
            dungeon.monster_moves.splice(0,1);
        }
        if(dungeon.monster_moves.length > 0)
        {
            let monster = dungeon.dungeon.monsters[dungeon.monster_moves[0]];
            if(monster.can_attack)
            {
                dungeon.monster_info_row = monster.row;
                dungeon.monster_info_col = monster.col;
                dungeon.user.character.is_attacked = true;
                dungeon.user.character.attacked_direction = monster.direction;
                dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character = dungeon.user.character;
                monster.is_attacking = true;
            }
            if(monster.can_move_attack)
            {
                //Algo de déplacement
                //Temporaire
                dungeon.monster_info_row = monster.row;
                dungeon.monster_info_col = monster.col;
                dungeon.user.character.is_attacked = true;
                dungeon.user.character.attacked_direction = monster.direction;
                dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character = dungeon.user.character;
                monster.is_attacking = true;

            }
            dungeon.dungeon.monsters[dungeon.monster_moves[0]] = monster;
            dungeon.dungeon.maptiles[monster.row][monster.col].character = monster;
        }
        else {
            dungeon.user.character.is_attacked = false;
            dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character = dungeon.user.character;
            dungeon.monster_moves = false;
            dungeon.end_turn = false;
            dungeon.monster_turn = false;
        }
    }
    firebase.update({
        [`activeDungeons/${dungeon.user.id}`]: dungeon,
    });
    return {
        type: MONSTER_TURN,
        payload: dungeon,
    };
};

/************ Moves *****************/
export const movingCharacter = (dungeon,row,col) => ({ firebase }) => {

    let canMove = false;
    let message = '';
    let direction = '';
    if(!dungeon.user.character.is_moving && !dungeon.user.character.is_attacking)
    {
        let canMove = false;
        let message = '';
        let direction = '';
        let totalRow = dungeon.user.character.row - row;
        let totalCol = dungeon.user.character.col - col;
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
            dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character.image = "/assets/images/classes/"+dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character.name+"/"+direction+".png";
            dungeon.user.character.is_moving = false;
            dungeon.user.character.moving_row = null;
            dungeon.user.character.moving_col = null;
            firebase.update({
                [`activeDungeons/${dungeon.user.id}`]: dungeon,
            });
        }
        else
        {
            if(dungeon.dungeon.maptiles[row][col].type == "walkable" && !dungeon.dungeon.maptiles[row][col].character)
            {
                canMove = true;
                dungeon.user.character.is_moving = direction;
                dungeon.user.character.moving_row = row;
                dungeon.user.character.moving_col = col;
                dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character.image = "/assets/images/classes/"+dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character.name+"/"+direction+".png";
                dungeon.error_message = '';
                firebase.update({
                    [`activeDungeons/${dungeon.user.id}`]: dungeon,
                });
            }
            else {
                message = 'You cannot walk there.';
                dungeon.error_message = message;
                dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character.image = "/assets/images/classes/"+dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character.name+"/"+direction+".png";
                dungeon.user.character.is_moving = false;
                dungeon.user.character.moving_row = null;
                dungeon.user.character.moving_col = null;
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

    if(dungeon.user.character.is_moving)
    {

        let canMove = false;
        let message = '';
        let direction = '';
        let totalRow = dungeon.user.character.row - dungeon.user.character.moving_row;
        let totalCol = dungeon.user.character.col - dungeon.user.character.moving_col;
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
            dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character.image = "/assets/images/classes/"+dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character.name+"/"+direction+".png";
            dungeon.dungeon.maptiles[dungeon.user.character.moving_row][dungeon.user.character.moving_col].character = dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character;
            delete dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character;
            dungeon.user.character.row = dungeon.user.character.moving_row;
            dungeon.user.character.col = dungeon.user.character.moving_col;
            dungeon.user.character.moving_row = null;
            dungeon.user.character.moving_col = null;
            dungeon.user.character.is_moving = false;
            dungeon.error_message = '';
        }
        else
        {
            dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character.image = "/assets/images/classes/"+dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character.name+"/"+direction+".png";
            dungeon.error_message = message;
            dungeon.user.character.is_moving = false;
            dungeon.user.character.moving_row = null;
            dungeon.user.character.moving_col = null;
        }
    }
    firebase.update({
        [`activeDungeons/${dungeon.user.id}`]: dungeon,
    });
    return {
        type: MOVE_CHARACTER,
        payload: dungeon
    }
};

/************ Attacks *****************/
export const canAttackMonster = (dungeon,character,row,col) => ({firebase}) => {
    var pj = dungeon.user.character;
    pj.is_attacking = false;
    dungeon.error_message = '';
    if(!pj.is_moving)
    {
        var range = comparePosition(pj.row,pj.col,row,col);
        pj.direction = range.direction;
        //Replace with pj.range
        if(pj.range >= range.totalRange && range.totalRange > 0)
        {
            if(pj.action >= pj.basicCost)
            {
                pj.is_attacking = true;
                pj.attacking_row = row;
                pj.attacking_col = col;
                dungeon.dungeon.maptiles[row][col].character.is_attacked = true;
                dungeon.dungeon.maptiles[row][col].character.attacked_direction = range.direction;
                dungeon.monster_info_row = row;
                dungeon.monster_info_col = col;
            }
            else {
                dungeon.error_message = 'Not enough action points';
            }
        }
        else {
            dungeon.error_message = "You're too far.";
        }
    }
    dungeon.user.character = pj;
    dungeon.dungeon.maptiles[pj.row][pj.col].character = pj;
    firebase.update({
        [`activeDungeons/${dungeon.user.id}`]: dungeon,
    });
    return {
        type: CAN_ATTACK_MONSTER,
        payload: dungeon
    }
}

export const attackMonster = (dungeon,character,row,col) => ({firebase}) => {
    if(dungeon.dungeon.maptiles[row][col].character && dungeon.dungeon.maptiles[row][col].character != null)
    {
        dungeon.dungeon.maptiles[row][col].character.is_attacked = false;
        dungeon.error_message = '';
        let pnj = dungeon.dungeon.maptiles[row][col].character;
        let pj = character;
        if(pj.is_attacking)
        {
            if(pnj.health > 0)
            {
                pnj.health = pnj.health - pj.damage;
                pj.action = pj.action - pj.basicCost;
                if(pnj.health<=0)
                {
                    pnj = null;
                    dungeon.monster_info_row = null;
                    dungeon.monster_info_col = null;
                }
                pj.is_attacking = false;
                pj.direction = null;
                pj.attacking_row = null;
                pj.attacking_col = null;
            }
        }
        dungeon.user.character = pj;
        dungeon.dungeon.maptiles[pj.row][pj.col].character = pj;
        if(pnj != null && typeof pnj !== 'undefined' && dungeon.dungeon.maptiles[row][col].character)
        {
            dungeon.dungeon.monsters[dungeon.dungeon.maptiles[row][col].character.number] = jsonConcat(dungeon.dungeon.monsters[dungeon.dungeon.maptiles[row][col].character.number],pnj);
        }
        else {
            delete dungeon.dungeon.monsters[dungeon.dungeon.maptiles[row][col].character.number];
        }
        dungeon.dungeon.maptiles[row][col].character = pnj;
    }
    else {
        dungeon.error_message = 'The ennemy is dead';
    }
    firebase.update({
        [`activeDungeons/${dungeon.user.id}`]: dungeon,
    });
    return {
        type: ATTACK_MONSTER,
        payload: dungeon
    }
};

/************ Others *****************/
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

export const LoadViewerChanges = (snap: Object) => {
    const viewer = snap.val();
    return {
        type: LOAD_VIEWER_CHANGES,
        payload: { viewer },
    };
};

export const LoadClasses = (snap: Object) => {
    const classes = snap.val();
    return {
        type: LOAD_CLASSES,
        payload: { classes },
    };
};

export const setClass = (classe,viewer) => ({getUid,firebase}) => {
    viewer.characters = [];
    viewer.characters.push(classe);
    viewer.active = 0;

    firebase.update({
        [`users/${viewer.id}/characters`]: viewer.characters,
        [`users/${viewer.id}/active`]: viewer.active,
    });
    return {
        type: SET_CLASSE,
        payload: { viewer },
    };
};

export const LoadDungeons = (snap: Object) => {
    const dungeons = snap.val();
    return {
        type: LOAD_DUNGEONS,
        payload: { dungeons },
    };
};

export const LoadViewerRef = (snap: Object) => {
    const viewer = snap.val();
    return {
        type: LOAD_VIEWER_REF,
        payload: { viewer },
    };
};

export const LoadTutoRef = (snap: Object) => {
    const tutoriel = snap.val();
    return {
        type: LOAD_TUTO_REF,
        payload: { tutoriel },
    };
};

export const LoadViewer = (viewer) => ({ firebase }) => {
    if(viewer)
    {
        const getPromise = async () => {
            try {
                return await firebase.database.ref('/users/'+viewer.id).once('value').then(function(snapshot) {
                    var username = snapshot.val();
                    return {username};
                });
            } catch (error) {
                console.log('An error occured. We could not load the dungeon. Try again later.');
                throw error;
            }
        };
        return {
            type: LOAD_VIEWER,
            payload: getPromise(),
        };
    }
    return {
        type: LOAD_VIEWER,
        payload: ''
    }
};


function comparePosition(r1,c1,r2,c2){
    let totalRow = r1 - r2;
    let totalCol = c1 - c2;
    let direction = "";
    let totalRange = 0;
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
    totalRange = totalCol + totalRow;
    return {direction : direction, totalRow: totalRow, totalCol: totalCol,totalRange:totalRange};
}

function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
    return o1;
}

