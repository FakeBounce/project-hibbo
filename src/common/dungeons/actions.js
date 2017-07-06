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
export const END_MONSTER_TURN = 'END_MONSTER_TURN';
export const MONSTER_MOVE = 'MONSTER_MOVE';
export const MONSTER_TURN = 'MONSTER_TURN';
export const END_SKILL = 'END_SKILL';
export const END_TURN = 'END_TURN';
export const CAN_ATTACK_MONSTER = 'CAN_ATTACK_MONSTER';
export const CAN_USE_SKILL = 'CAN_USE_SKILL';
export const TRY_SKILL = 'TRY_SKILL';
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
        dungeon.monster_moves = [];
        var pj = dungeon.user.character;
        pj.is_attacked = false;
        var default_pj = dungeon.user.default_character;
        pj = jsonConcat(pj,default_pj);

        dungeon.user.character = pj;

        let monsters = dungeon.dungeon.monsters;
        let monster_moves = [];
        monsters.map((monster,index) => {
            if(monster != null)
            {
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
            }
        });
        dungeon.dungeon.monsters = monsters;
        if(monster_moves.length > 0)
        {
            dungeon.monster_moves = monster_moves;
            dungeon.stop_turn = false;
        }
        else {
            dungeon.end_turn = false;
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
        var cdntmv = false;
        dungeon.monster_turn = true;
        do
        {
            console.log('cdmnt;',cdntmv);
            cdntmv = false;
            if(typeof dungeon.monster_moves !== "undefined")
            {
                if(dungeon.monster_moves.length > 0 && !dungeon.stop_turn)
                {
                    if(dungeon.dungeon.monsters[dungeon.monster_moves[0]].is_attacking)
                    {
                        dungeon.user.character.health -= dungeon.dungeon.monsters[dungeon.monster_moves[0]].damage;
                        dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character = dungeon.user.character;
                        dungeon.dungeon.monsters[dungeon.monster_moves[0]].is_attacking = false;
                        dungeon.dungeon.monsters[dungeon.monster_moves[0]].can_attack = false;
                        dungeon.dungeon.monsters[dungeon.monster_moves[0]].moves = null;
                        dungeon.dungeon.monsters[dungeon.monster_moves[0]].can_move_attack = false;
                        dungeon.monster_moves.splice(0,1);
                    }
                }
                if(dungeon.monster_moves.length > 0)
                {
                    let monster = dungeon.dungeon.monsters[dungeon.monster_moves[0]];
                    let pj = dungeon.user.character;
                    var range = comparePosition(monster.row,monster.col,pj.row,pj.col);
                    if(monster.can_attack)
                    {
                        monster.is_moving = false;
                        monster.can_move_attack = false;
                        monster.direction = range.direction;
                        dungeon.monster_info_row = monster.row;
                        dungeon.monster_info_col = monster.col;
                        dungeon.user.character.is_attacked = true;
                        dungeon.user.character.attacked_direction = monster.direction;
                        dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character = dungeon.user.character;
                        monster.is_attacking = true;
                    }
                    if(monster.can_move_attack)
                    {
                        monster.is_moving = false;
                        var maptiles = dungeon.dungeon.maptiles;
                        var moves = [];
                        var minrow = monster.row-monster.move;
                        var maxrow = monster.row+monster.move;
                        var mincol = monster.col-monster.move;
                        var maxcol = monster.col+monster.move;
                        var m_row = parseInt(monster.row);
                        var m_col = parseInt(monster.col);
                        var can_move = false;

                        if ( range.totalColU > 0 && !can_move)
                        {
                            if(typeof  maptiles[m_row][m_col - 1] !== "undefined")
                            {
                                if ((typeof  maptiles[m_row][m_col - 1].character === "undefined" || maptiles[m_row][m_col - 1].character == null))
                                {
                                    if(maptiles[m_row][m_col - 1].type =="walkable")
                                    {
                                        // maptiles[m_row][m_col-1].character = monster;
                                        // maptiles[m_row][m_col].character = null;
                                        // m_col = m_col - 1;
                                        monster.direction = "left";
                                        monster.is_moving = true;
                                        moves.push(
                                            {
                                                "row":m_row,
                                                "col":m_col-1,
                                            }
                                        );
                                        can_move = true;
                                    }
                                }
                            }
                        }
                        if ( range.totalColU < 0&& !can_move)
                        {
                            if(typeof  maptiles[m_row][m_col + 1] !== "undefined")
                            {
                                if ((typeof  maptiles[m_row][m_col + 1].character === "undefined" || maptiles[m_row][m_col + 1].character == null))
                                {
                                    if(maptiles[m_row][m_col + 1].type =="walkable")
                                    {
                                        // maptiles[m_row][m_col+1].character = monster;
                                        // maptiles[m_row][m_col].character = null;
                                        // m_col = m_col + 1;
                                        monster.direction = "right";
                                        monster.is_moving = true;
                                        moves.push(
                                            {
                                                "row":m_row,
                                                "col":m_col+1,
                                            }
                                        );
                                        can_move = true;
                                    }
                                }
                            }
                        }
                        if ( range.totalRowU > 0&& !can_move)
                        {
                            if(typeof  maptiles[m_row - 1][m_col] !== "undefined") {
                                if ((typeof  maptiles[m_row - 1][m_col].character === "undefined" || maptiles[m_row - 1][m_col].character == null)) {

                                    if(maptiles[m_row - 1][m_col].type =="walkable")
                                    {
                                        // maptiles[m_row - 1][m_col].character = monster;
                                        // maptiles[m_row][m_col].character = null;
                                        // m_row = m_row - 1;
                                        monster.direction = "up";
                                        monster.is_moving = true;
                                        moves.push(
                                            {
                                                "row": m_row - 1,
                                                "col": m_col,
                                            }
                                        );
                                        can_move = true;
                                    }
                                }
                            }
                        }
                        if ( range.totalRowU < 0&& !can_move)
                        {
                            if(typeof  maptiles[m_row + 1][m_col] !== "undefined") {
                                if ((typeof  maptiles[m_row + 1][m_col].character === "undefined" || maptiles[m_row + 1][m_col].character == null) )
                                {
                                    if(maptiles[m_row + 1][m_col].type =="walkable") {
                                        // maptiles[m_row + 1][m_col].character = monster;
                                        // maptiles[m_row][m_col].character = null;
                                        // m_row = m_row + 1;
                                        monster.direction = "down";
                                        monster.is_moving = true;
                                        moves.push(
                                            {
                                                "row": m_row + 1,
                                                "col": m_col,
                                            }
                                        );
                                        can_move = true;
                                    }
                                }
                            }
                        }
                        console.log('can_move : ',can_move);
                        if(can_move)
                        {
                            monster.moves = moves;
                        }
                        else{
                            dungeon.dungeon.monsters[dungeon.monster_moves[0]].is_attacking = false;
                            dungeon.dungeon.monsters[dungeon.monster_moves[0]].can_attack = false;
                            dungeon.dungeon.monsters[dungeon.monster_moves[0]].moves = null;
                            dungeon.dungeon.monsters[dungeon.monster_moves[0]].can_move_attack = false;
                            cdntmv = true;
                        }

                    }
                    dungeon.dungeon.monsters[dungeon.monster_moves[0]] = monster;
                    dungeon.dungeon.maptiles[monster.row][monster.col].character = monster;
                    if(cdntmv)
                    {
                        dungeon.monster_moves.splice(0,1);
                    }
                }
                else {
                    var dung = EndMonsterTurn(dungeon);
                    firebase.update({
                        [`activeDungeons/${dungeon.user.id}`]: dung,
                    });
                    return {
                        type: MONSTER_TURN,
                        payload: dung
                    };
                }
            }
        }while(cdntmv)
    }
    firebase.update({
        [`activeDungeons/${dungeon.user.id}`]: dungeon,
    });
    return {
        type: MONSTER_TURN,
        payload: dungeon
    };
};

export const MonsterMove = (dungeon) => ({firebase}) => {

    if(typeof dungeon.monster_moves !== "undefined") {
        if (dungeon.monster_moves.length > 0) {
            let monster = dungeon.dungeon.monsters[dungeon.monster_moves[0]];
            if (monster.is_moving && !monster.is_attacking) {
                let pj = dungeon.user.character;
                var range = comparePosition(monster.row, monster.col, pj.row, pj.col);
                var maptiles = dungeon.dungeon.maptiles;
                monster.is_moving = false;

                monster.direction = range.direction;
                maptiles[monster.moves[0].row][monster.moves[0].col].character = monster;
                maptiles[monster.row][monster.col].character = null;
                monster.row = monster.moves[0].row;
                monster.col = monster.moves[0].col;
                monster.moves = false;
                monster.can_move_attack = false;
                dungeon.monster_info_row = monster.row;
                dungeon.monster_info_col = monster.col;
                dungeon.user.character.is_attacked = true;
                dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character = dungeon.user.character;
                monster.is_attacking = true;
                monster.can_attack = true;
                var rg = comparePosition(monster.row,monster.col,pj.row,pj.col);
                monster.direction = rg.direction;
                dungeon.user.character.attacked_direction = rg.direction;
                dungeon.dungeon.monsters[dungeon.monster_moves[0]] = monster;
                dungeon.dungeon.maptiles[monster.row][monster.col].character = monster;

            }
        }
        else {
            var dung = EndMonsterTurn(dungeon);
            firebase.update({
                [`activeDungeons/${dungeon.user.id}`]: dung,
            });
            return {
                type: MONSTER_MOVE,
                payload: dung
            };
        }
    }
    firebase.update({
        [`activeDungeons/${dungeon.user.id}`]: dungeon,
    });
    return {
        type: MONSTER_MOVE,
        payload: dungeon
    }
};

function EndMonsterTurn(dungeon){
    dungeon.user.character.is_attacked = false;
    var opposed_img = '';
    if(
        dungeon.user.character.attacked_direction == "left")
    {
        opposed_img = 'right';
    }
    if(
        dungeon.user.character.attacked_direction == "right")
    {
        opposed_img = 'left';
    }
    if(
        dungeon.user.character.attacked_direction == "up")
    {
        opposed_img = 'down';
    }
    if(
        dungeon.user.character.attacked_direction == "down")
    {
        opposed_img = 'up';
    }
    dungeon.user.character.image = "/assets/images/classes/"+dungeon.user.character.name+"/"+opposed_img+".png";
    dungeon.user.character.attacked_direction = "";
    dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character = dungeon.user.character;
    dungeon.monster_moves = [];
    dungeon.end_turn = false;
    dungeon.monster_turn = false;
    dungeon.stop_turn = true;
    return dungeon;
}

/************ Moves *****************/
export const movingCharacter = (dungeon,row,col) => ({ firebase }) => {

    let canMove = false;
    let message = '';
    let direction = '';
    if(!dungeon.user.character.is_moving && !dungeon.user.character.is_attacking && !dungeon.end_turn && !dungeon.monster_turn)
    {
        if(dungeon.stop_turn)
        {
            dungeon.stop_turn = false;
        }
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
            }
            else {
                message = 'You cannot walk there.';
                dungeon.error_message = message;
                dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character.image = "/assets/images/classes/"+dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character.name+"/"+direction+".png";
                dungeon.user.character.is_moving = false;
                dungeon.user.character.moving_row = null;
                dungeon.user.character.moving_col = null;
            }
        }
    }
    else {
        let canMove = false;
        let message = 'Please wait.';
        let direction = '';
    }
    firebase.update({
        [`activeDungeons/${dungeon.user.id}`]: dungeon,
    });
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
export const CanUseSkill = (dungeon,viewer,skill) => ({firebase}) => {
    var pj = dungeon.user.character;
    var map = dungeon.dungeon.maptiles;
    pj.is_using_skill = false;
    pj.try_skill = false;
    dungeon.error_message = '';
    if(!pj.is_moving && !pj.is_attacking && !dungeon.monster_turn && !dungeon.end_turn) {
        pj.is_using_skill = true;
        pj.can_use_skill = false;
        pj.current_skill = false;
        if(skill.uses === -1 || skill.uses>0)
        {
            if(pj.energy>=skill.energy_cost)
            {
                if(pj.action>=skill.action_cost)
                {
                    let result = setLinearAoeSkill(map,pj,(skill.range_linear*-1),(skill.range_minimum*-1),true,skill.aoe_linear);
                    map = result.map;
                    pj = result.pj;
                    result = setLinearAoeSkill(map,pj,skill.range_minimum,skill.range_linear,true,skill.aoe_linear);
                    map = result.map;
                    pj = result.pj;
                    result =  setLinearAoeSkill(map,pj,(skill.range_linear*-1),(skill.range_minimum*-1),false,skill.aoe_linear);
                    map = result.map;
                    pj = result.pj;
                    result = setLinearAoeSkill(map,pj,skill.range_minimum,skill.range_linear,false,skill.aoe_linear);
                    map = result.map;
                    pj = result.pj;
                    if(pj.can_use_skill)
                    {
                        pj.current_skill = skill.number;
                    }
                }
            }
        }
        dungeon.user.character = pj;
        dungeon.dungeon.maptiles = map;
        firebase.update({
            [`activeDungeons/${dungeon.user.id}`]: dungeon,
        });
    }
    return {
        type: CAN_USE_SKILL,
        payload: dungeon
    }
};

export const trySkill = (dungeon,row,col) => ({firebase}) => {
    var pj = dungeon.user.character;
    var map = dungeon.dungeon.maptiles;
    pj.try_skill = false;
    dungeon.error_message = '';
    if(!pj.is_moving && !pj.is_attacking && pj.is_using_skill) {
        pj.is_using_skill = false;
        let skill = dungeon.user.character.equipped_spells[dungeon.user.character.current_skill];
        if(!skill.aoe_linear || !skill.aoe_diagonal || !skill.range_cone || !skill.aoe_front|| !skill.aoe_left|| !skill.aoe_right|| !skill.aoe_back)
        {
            if(typeof map[row][col].character !== 'undefined')
            {
                pj.try_skill = true;
                dungeon.error_message = '';
                var pnj = map[row][col].character;
                var positions = comparePosition(pj.row,pj.col,pnj.row,pnj.col);
                if(pnj.health > 0)
                {
                    pnj.health = pnj.health - skill.damage_instant;
                    pj.action = pj.action - skill.action_cost;
                    pj.energy = pj.energy - skill.energy_cost;
                    if(skill.uses > 0)
                    {
                        skill.uses = skill.uses - 1;
                    }
                    if(pnj.health<=0)
                    {
                        pnj = null;
                        dungeon.monster_info_row = null;
                        dungeon.monster_info_col = null;
                    }
                    pj.can_use_skill = false;
                    pj.is_attacking = false;
                    pj.attacking_row = null;
                    pj.attacking_col = null;
                    pj.direction = positions.direction;
                }
                dungeon.user.character = pj;
                map[pj.row][pj.col].character = pj;
                if(pnj != null && typeof pnj !== 'undefined' && map[row][col].character)
                {
                    dungeon.dungeon.monsters[map[row][col].character.number] = jsonConcat(dungeon.dungeon.monsters[map[row][col].character.number],pnj);
                }
                else {
                    delete dungeon.dungeon.monsters[map[row][col].character.number];
                }
                map[row][col].character = pnj;
                map = unsetAoeSkills(map);
                dungeon.dungeon.maptiles = map;
            }
        }
    }
    firebase.update({
        [`activeDungeons/${dungeon.user.id}`]: dungeon,
    });
    return {
        type: TRY_SKILL,
        payload: dungeon
    }
};

export const endSkill = (dungeon) => ({firebase}) => {

    var pj = dungeon.user.character;
    var map = dungeon.dungeon.maptiles;
    map = unsetAoeSkills(map);
    pj.try_skill = false;
    pj.is_using_skill = false;
    pj.current_skill = false;
    pj.can_use_skill = false;
    pj.is_attacking = false;
    pj.attacking_row = null;
    pj.attacking_col = null;
    dungeon.dungeon.maptiles[pj.row][pj.col].character = pj;
    dungeon.user.character = pj;
    dungeon.dungeon.maptiles = map;
    firebase.update({
        [`activeDungeons/${dungeon.user.id}`]: dungeon,
    });
    return {
        type: END_SKILL,
        payload: dungeon
    }
};



export const canAttackMonster = (dungeon,character,row,col) => ({firebase}) => {
    var pj = dungeon.user.character;
    pj.is_attacking = false;
    dungeon.error_message = '';
    if(!pj.is_moving  && !dungeon.end_turn && !dungeon.monster_turn)
    {
        if(dungeon.stop_turn)
        {
            dungeon.stop_turn = false;
        }
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
};

export const attackMonster = (dungeon,character,row,col) => ({firebase}) => {
    if(row != null && col != null)
    {
        if(typeof dungeon.dungeon.maptiles[row][col].character !== "undefined")
        {
            if(dungeon.dungeon.maptiles[row][col].character != null)
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
        }
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
export const ReloadCharacter = (snap: Object) => {
    const dungeons = snap.val();
    return {
        type: RELOAD_CHAR,
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
    let totalRowU = r1 - r2;
    let totalRow = r1 - r2;
    let totalColU = c1 - c2;
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
    return {direction : direction, totalRow: totalRow, totalCol: totalCol,totalRange:totalRange,totalRowU:totalRowU,totalColU:totalColU};
}

function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
    return o1;
}

function unsetAoeSkills(map) {
    map.map(m1 => m1.map(m2 => {
        m2.is_target = false;
    }));
    return map;
}

function setLinearAoeSkill(map,pj,neg,pos,hor,aoe){

    for(let j=neg;j<=pos;j++)
    {
        if(hor)
        {
            if(typeof map[pj.row] !== 'undefined')
            {
                if(typeof map[pj.row][parseInt(pj.col)+j] !== 'undefined')
                {
                    if(map[pj.row][parseInt(pj.col)+j].type == "walkable")
                    {
                        if((typeof map[pj.row][parseInt(pj.col)+j].character !== 'undefined' && map[pj.row][parseInt(pj.col)+j].character.type == "pnj") && aoe)
                        {
                            map[pj.row][parseInt(pj.col)+j].is_target = true;
                            pj.can_use_skill = true;
                            break;
                        }
                        pj.can_use_skill = true;
                        map[pj.row][parseInt(pj.col)+j].is_target = true;
                    }else {
                        break;
                    }
                }
            }
        }
        else {
            if(typeof map[parseInt(pj.row)+j] !== 'undefined')
            {
                if(typeof map[parseInt(pj.row)+j][pj.col] !== 'undefined')
                {
                    if(map[parseInt(pj.row)+j][pj.col].type == "walkable")
                    {
                        if((typeof map[parseInt(pj.row)+j][pj.col].character !== 'undefined'))
                        {
                            if(map[parseInt(pj.row)+j][pj.col].character.type == "pnj" && aoe)
                            {
                                pj.can_use_skill = true;
                                map[parseInt(pj.row)+j][pj.col].is_target = true;
                                break;
                            }
                        }
                        pj.can_use_skill = true;
                        map[parseInt(pj.row)+j][pj.col].is_target = true;
                    }else {
                        break;
                    }
                }
            }
        }
    }
    return {map:map,pj:pj};
}
