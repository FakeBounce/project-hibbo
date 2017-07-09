/**
 * Created by Fakebounce on 13/11/2016.
 */

import { Range } from 'immutable';
export const SHOW_AOE_SKILL = 'SHOW_AOE_SKILL';
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
export const SET_PSEUDO = 'SET_PSEUDO';
export const CREATE_PERSO = 'CREATE_PERSO';


/************ Dungeon creation in firebase *****************/
export const loadWorldMap = (dungeon,viewer) =>  ({ getUid, now, firebase }) => {
    var path = 'maps/'+dungeon.worldmap;
    var Uid = getUid();
    var character = viewer.characters[viewer.active];
    character.row = 0;
    character.col = 0;
    character.is_attacking = false;
    character.is_moving = false;
    character.is_casting = 0;
    character.current_skill = false;
    character.buffs = false;
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
                                movement:character.movement,
                                action:character.action,
                                damage:character.damage,
                                damage_time:character.damage_time,
                                damage_time_duration:character.damage_time_duration,
                                maxhealth:character.health,
                                maxenergy: character.energy,
                                maxexperience: 1000,
                                heal_on_energy_percent: 0,
                                damage_reduction_flat: character.damage_reduction_flat,
                                damage_reduction_percent: character.damage_reduction_percent,
                                damage_return: character.damage_return,
                                damage_return_percent: character.damage_return_percent,
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
    if(viewer.tuto && next) {
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

        if(pj.is_casting)
        {
            if(pj.is_casting > 0){
                pj.is_casting = pj.is_casting - 1;
            }
            if(pj.is_casting == 0 && pj.current_skill)
            {
                let cast_ready = true;
                let skill = pj.equipped_spells[pj.current_skill];
                let result = doSkill(pj,dungeon.dungeon.maptiles,dungeon,skill,cast_ready,pj.row,pj.col);
            }
        }

        if(!pj.buffs)
        {
            pj.buffs = false;
        }
        else {
            pj.buffs.map((skill,index) => {
                if(!pj.buffs[index].buff_duration)
                {
                    pj.buffs[index].buff_duration = pj.buffs[index].duration-1;
                }
                else {
                    pj.buffs[index].buff_duration = pj.buffs[index].buff_duration-1;
                }
                if(pj.buffs[index].buff_duration > 0)
                {
                    pj.health = pj.health + skill.heal_time;
                    pj.energy = pj.energy + skill.energy_time;
                    pj.damage = pj.damage + (skill.damage_buff_flat - skill.damage_debuff_flat);
                    pj.damage_time = pj.damage_time + (skill.damage_time_buff_flat - skill.damage_time_debuff_flat);
                    pj.damage_time_duration = skill.damage_time_duration;
                    pj.heal_on_energy_percent = skill.heal_on_energy_percent;

                    if(skill.damage_buff_percent || skill.damage_debuff_percent)
                    {
                        pj.damage = pj.damage*skill.damage_buff_percent/100;
                        pj.damage = pj.damage*skill.damage_debuff_percent/100;
                    }

                    pj.movement = pj.movement + (skill.movement_buff - skill.movement_debuff);
                    pj.damage_reduction_flat = pj.damage_reduction_flat + skill.damage_reduction_flat;
                    pj.damage_reduction_percent = pj.damage_reduction_percent + skill.damage_reduction_percent;
                    pj.damage_return = pj.damage_return + skill.damage_return;
                    pj.damage_return_percent = pj.damage_return_percent + skill.damage_return_percent;
                    if(skill.damage_buff_percent)
                    {
                        pj.damage = pj.damage*skill.damage_buff_percent/100;
                    }
                    if(pj.health > pj.maxhealth)
                    {
                        pj.health = pj.maxhealth;
                    }
                    if(pj.energy > pj.maxenergy)
                    {
                        pj.energy = pj.maxenergy;
                    }
                }
                else {
                    pj.buffs.splice(index,1);
                }
            });
        }
        pj.equipped_spells.map((spell,index)=> {
            if(pj.equipped_spells[index].cooldown)
            {
                pj.equipped_spells[index].cooldown = pj.equipped_spells[index].cooldown - 1;
            }

        });

        dungeon.user.character = pj;

        let monsters = dungeon.dungeon.monsters;
        let monster_moves = [];

         monsters.map((monster,index) => {
           if(monster != null)
           {
             console.log('m1',monster);
             monster.damage_time_spell = 0;
             monster.damage_time_spell_duration = 0;
             if(!monster.conditions)
             {
               monster.conditions = false;
             }
             else {
               monster.conditions.map((skill,index) => {
                 if(!monster.conditions[index].condition_duration)
                 {
                   monster.conditions[index].condition_duration = monster.conditions[index].duration-1;
                 }
                 else {
                   monster.conditions[index].condition_duration = monster.conditions[index].condition_duration-1;
                 }
                 if(monster.conditions[index].condition_duration > 0)
                 {
                   monster.health = monster.health - skill.damage_time;
                   monster.damage_time_spell = monster.damage_time_spell + (skill.damage_time_buff_flat - skill.damage_time_debuff_flat);
                   if(skill.damage_time_spell_duration)
                   {
                     monster.damage_time_spell_duration = skill.damage_time_spell_duration;
                   }
                   // monster.damage = monster.damage - (skill.damage_time_buff_flat - skill.damage_time_debuff_flat);
                   //
                   // if(skill.damage_time_buff_percent || skill.damage_time_debuff_percent)
                   // {
                   //     monster.damage = monster.damage*skill.damage_time_buff_percent/100;
                   //     monster.damage = monster.damage*skill.damage_time_debuff_percent/100;
                   // }

                   monster.movement = monster.movement + (skill.movement_buff - skill.movement_debuff);
                   if(monster.health > monster.maxhealth)
                   {
                     monster.health = monster.maxhealth;
                   }
                   dungeon.dungeon.maptiles[monster.row][monster.col].character = monster;
                   if(monster.health<=0)
                   {
                     monsters[index] = null;
                     dungeon.dungeon.maptiles[monster.row][monster.col].character = null;
                     monster = null;
                     dungeon.monster_info_row = null;
                     dungeon.monster_info_col = null;
                   }
                 }
                 else {
                   monster.conditions.splice(index,1);
                 }
               });
             }
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
            cdntmv = false;
            if(typeof dungeon.monster_moves !== "undefined")
            {
                if(dungeon.monster_moves.length > 0 && !dungeon.stop_turn)
                {
                    if(dungeon.dungeon.monsters[dungeon.monster_moves[0]])
                    {
                        if(dungeon.dungeon.monsters[dungeon.monster_moves[0]].is_attacking)
                        {
                            var pnj = dungeon.dungeon.monsters[dungeon.monster_moves[0]];
                            var row = pnj.row;
                            var col = pnj.col;

                            if(pnj.health<=0)
                            {
                                pnj = null;
                                dungeon.monster_info_row = null;
                                dungeon.monster_info_col = null;
                                dungeon.dungeon.monsters[dungeon.monster_moves[0]] = pnj;
                                dungeon.dungeon.maptiles[row][col].character = pnj;
                                dungeon.monster_moves.splice(0,1);
                            }
                            else {
                                var damage = pnj.damage;
                                var returned_damage = 0;
                                damage = damage - dungeon.user.character.damage_reduction_flat;
                                damage = damage - dungeon.user.character.damage_return;
                                returned_damage = dungeon.user.character.damage_return;
                                if(dungeon.user.character.damage_reduction_percent && damage > 0)
                                {
                                    damage = damage*dungeon.user.character.damage_reduction_percent/100;
                                }
                                if(dungeon.user.character.damage_return_percent && damage > 0)
                                {
                                    returned_damage = returned_damage + (damage*dungeon.user.character.damage_return_percent/100);
                                    damage = damage*dungeon.user.character.damage_return_percent/100;
                                }
                                if(damage > 0)
                                {
                                    dungeon.user.character.health -= (damage);
                                }
                                pnj.is_attacking = false;
                                pnj.can_attack = false;
                                pnj.moves = null;
                                pnj.can_move_attack = false;
                                if(returned_damage)
                                {
                                    pnj.health -=  returned_damage;
                                    if(pnj.health<=0)
                                    {
                                        pnj = null;
                                        dungeon.monster_info_row = null;
                                        dungeon.monster_info_col = null;
                                    }
                                }
                                dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character = dungeon.user.character;
                                dungeon.dungeon.monsters[dungeon.monster_moves[0]] = pnj;
                                dungeon.dungeon.maptiles[row][col].character = pnj;
                                dungeon.monster_moves.splice(0,1);
                            }
                        }
                    }
                    else {
                        dungeon.user.character.nextTurn = false;
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

    let pj = dungeon.user.character;
    if(typeof dungeon.monster_moves !== "undefined") {
        if (dungeon.monster_moves.length > 0) {
            let monster = dungeon.dungeon.monsters[dungeon.monster_moves[0]];
            console.log('m',monster);
            if(monster != null || typeof monster === "undefined")
            {
                let m_row = monster.row;
                let m_col = monster.col;
                if (monster.is_moving && !monster.is_attacking) {
                    var map = dungeon.dungeon.maptiles;
                    var range = comparePosition(monster.row, monster.col, pj.row, pj.col);
                    var maptiles = dungeon.dungeon.maptiles;
                    monster.is_moving = false;

                    monster.direction = range.direction;
                    maptiles[monster.moves[0].row][monster.moves[0].col].character = monster;
                    maptiles[monster.row][monster.col].character = null;
                    monster.row = monster.moves[0].row;
                    monster.col = monster.moves[0].col;
                    m_row = monster.row;
                    m_col = monster.col;
                    if(map[monster.row][monster.col].trap)
                    {
                        var result = false;
                        map[monster.row][monster.col].trap.map((skill,index) => {
                            if (skill.aoe_front) {
                                result = setSkillsTarget(map, monster, skill, "up");
                                map = result.map;
                            }
                            if (skill.aoe_back) {
                                result = setSkillsTarget(map, monster, skill, "down");
                                map = result.map;
                            }
                            if (skill.aoe_right) {
                                result = setSkillsTarget(map, monster, skill, "right");
                                map = result.map;
                            }
                            if (skill.aoe_left) {
                                result = setSkillsTarget(map, monster, skill, "left");
                                map = result.map;
                            }


                            let target = [];
                            Object.keys(map).map(m1 => {
                                Object.keys(map[m1]).map(m2 => {
                                    if(map[m1][m2].is_target_aoe && map[m1][m2].character )
                                    {
                                        if(map[m1][m2].character.type != "pj")
                                        {
                                            target.push({row:m1,col:m2});
                                        }
                                    }
                                })
                            });

                            target.map(t => {
                                var pnj = map[t.row][t.col].character;
                                if(pnj.type != "pj")
                                {
                                    var positions = comparePosition(0,0,0,0);
                                    if(pnj.health > 0)
                                    {
                                        pnj.health = pnj.health - skill.damage_instant;
                                        if(skill.damage_instant_buff)
                                        {
                                            pnj.health = pnj.health - (pj.damage + skill.damage_instant_buff);
                                        }
                                        if(pnj.health<=0)
                                        {
                                            if(t.row == monster.row && t.col == monster.col)
                                            {
                                                monster = null;
                                            }
                                            pnj = null;
                                            dungeon.monster_info_row = null;
                                            dungeon.monster_info_col = null;
                                        }
                                    }
                                    if(pnj != null && typeof pnj !== 'undefined' && map[t.row][t.col].character)
                                    {
                                        dungeon.dungeon.monsters[map[t.row][t.col].character.number] = jsonConcat(dungeon.dungeon.monsters[map[t.row][t.col].character.number],pnj);
                                    }
                                    else {
                                        delete dungeon.dungeon.monsters[map[t.row][t.col].character.number];
                                    }
                                    map[t.row][t.col].character = pnj;
                                    dungeon.dungeon.maptiles = map;
                                }
                            });
                            map = unsetAoeSkills(map);
                            dungeon.dungeon.maptiles = map;
                        });
                    }
                    if(monster != null)
                    {
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
                    else {
                        pj.nextTurn = true;
                        dungeon.user.character = pj;
                    }
                }
            }
            else {
                pj.nextTurn = true;
                dungeon.user.character = pj;
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
    var pj = dungeon.user.character;
    pj.is_attacked = false;
    var opposed_img = '';
    if(
        pj.attacked_direction == "left")
    {
        opposed_img = 'right';
    }
    if(
        pj.attacked_direction == "right")
    {
        opposed_img = 'left';
    }
    if(
        pj.attacked_direction == "up")
    {
        opposed_img = 'down';
    }
    if(
        pj.attacked_direction == "down")
    {
        opposed_img = 'up';
    }
    pj.image = "/assets/images/classes/"+pj.name+"/"+opposed_img+".png";
    pj.attacked_direction = "";
    dungeon.dungeon.maptiles[pj.row][pj.col].character = pj;
    dungeon.user.character = pj;
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
    if(!dungeon.user.character.is_casting)
    {
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
    }
    else {
        dungeon.error_message = 'You cannot move while casting a spell';
    }
    firebase.update({
        [`activeDungeons/${dungeon.user.id}`]: dungeon,
    });
    return {
        type: MOVING_CHARACTER,
        payload: dungeon,
        component: { canMove: canMove,message: message,direction: direction}
    };
};

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
    if(!pj.is_casting)
    {
        if(!pj.is_moving && !pj.is_attacking && !dungeon.monster_turn && !dungeon.end_turn)
        {
            if(dungeon.stop_turn)
            {
                dungeon.stop_turn = false;
            }
            if((skill.uses === -1 || skill.uses>0) && (typeof skill.cooldown === "undefined" || skill.cooldown == 0))
            {
                pj.can_use_skill = false;
                pj.current_skill = false;
                if(pj.energy>=skill.energy_cost)
                {
                    if(pj.action>=skill.action_cost)
                    {
                        let result = setSkillsTarget(map,pj,skill,"all",false,true);
                        map = result.map;
                        pj = result.pj;

                        if(!skill.self)
                        {
                            map[pj.row][pj.col].is_target = false;
                            map[pj.row][pj.col].is_target_aoe = false;
                        }
                        if(pj.can_use_skill)
                        {
                            pj.is_using_skill = true;
                            pj.current_skill = skill.number;
                        }
                        else {
                            dungeon.error_message = 'No target in range.';
                            endSkill(dungeon);
                        }
                    }
                    else {
                        dungeon.error_message = 'Not enough action points.';
                    }
                }
                else {
                    dungeon.error_message = 'Not enough energy.';
                }
            }
            else {
                if(skill.uses == 0)
                {
                    dungeon.error_message = 'This spell cannot be used anymore.';
                }
                if(skill.cooldown)
                {
                    dungeon.error_message = 'This spell is on cooldown for '+skill.cooldown+' turn(s)';
                }
            }
            dungeon.user.character = pj;
            dungeon.dungeon.maptiles = map;
            firebase.update({
                [`activeDungeons/${dungeon.user.id}`]: dungeon,
            });
        }
    }
    else {
        dungeon.error_message = 'You cannot move while casting a spell';
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
    var cast_ready = false;
    dungeon.error_message = '';
    if(!pj.is_moving && !pj.is_attacking && pj.is_using_skill) {
        pj.is_using_skill = false;
        let skill = dungeon.user.character.equipped_spells[dungeon.user.character.current_skill];
        let result = doSkill(pj,map,dungeon,skill,cast_ready,row,col);

        dungeon = result.dungeon;
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
    if(pj.is_moving_instant)
    {
        var row = pj.row;
        var col = pj.col;
        if(pj.direction == "up")
        {
            pj.row = parseInt(pj.row) - pj.is_moving_instant;
        }
        if(pj.direction == "down")
        {
            pj.row = parseInt(pj.row) + pj.is_moving_instant;
        }
        if(pj.direction == "right")
        {
            pj.col = parseInt(pj.col) + pj.is_moving_instant;
        }
        if(pj.direction == "left")
        {
            pj.col = parseInt(pj.col) - pj.is_moving_instant;
        }
        pj.is_moving_instant = false;
        map[pj.row][pj.col].character = pj;
        map[row][col].character = null;
    }
    map = unsetAoeSkills(map);
    pj.try_skill = false;
    pj.is_using_skill = false;
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
    if(!pj.is_casting)
    {
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
    }
    else {
        dungeon.error_message = 'You cannot move while casting a spell';
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
                        if(pj.damage_time)
                        {
                            if(!pnj.conditions)
                            {
                                pnj.conditions = [];
                            }
                            var cond = {
                                name: "Poisoned Arrows",
                                // animation: "spell1.gif",
                                image: "Apply_Poison.jpg",
                                damage_instant: 0,
                                damage_time: pj.damage_time,
                                damage_instant_buff: 0,
                                damage_instant_debuff: 0,
                                damage_type: "Buff",
                                damage_debuff_flat: 0,
                                damage_buff_flat: 0,
                                damage_debuff_percent: 0,
                                damage_buff_percent: 0,
                                damage_reduction_flat: 0,
                                damage_reduction_percent: 0,
                                damage_time_buff_flat: 0,
                                damage_time_buff_percent: 0,
                                damage_time_debuff_flat: 0,
                                damage_time_debuff_percent: 0,
                                damage_return: 0,
                                damage_return_percent: 0,
                                life_buff: 0,
                                life_debuff: 0,
                                heal_instant: 0,
                                heal_time: 0,
                                heal_percent_instant: 0,
                                heal_percent_time: 0,
                                movement_instant: 0,
                                movement_buff: 0,
                                movement_debuff: 0,
                                energy_heal: 0,
                                energy_time: 0,
                                energy_percent_heal: 0,
                                energy_percent_time: 0,
                                condition_duration: pj.damage_time_duration,
                                damage_time_spell_duration: 0,
                                description: "Poisoned arrow",
                            };
                            pnj.conditions.push(cond);

                            pnj.health = pnj.health - cond.damage_time;
                            pnj.damage = pnj.damage - (cond.damage_time_buff_flat - cond.damage_time_debuff_flat);
                            if(cond.damage_time_buff_percent || cond.damage_time_debuff_percent)
                            {
                                pnj.damage = pnj.damage*cond.damage_time_buff_percent/100;
                                pnj.damage = pnj.damage*cond.damage_time_debuff_percent/100;
                            }

                            pnj.movement = pnj.movement + (cond.movement_buff - cond.movement_debuff);
                            if(pnj.health > pnj.maxhealth)
                            {
                                pnj.health = pnj.maxhealth;
                            }
                        }
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
        payload: classes ,
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

export const CreateCharacter = (viewer, classe, pseudo) =>  ({ firebase }) => {
    viewer.characters = [];
    classe.pseudo = pseudo;
    classe.row = 0;
    classe.col = 0;
    viewer.characters.push(classe);
    viewer.active = 0;
    viewer.tuto = 1;



    firebase.update({
        [`users/${viewer.id}/characters/`]: viewer.characters,
        [`users/${viewer.id}/active`]: viewer.active,
        [`users/${viewer.id}/tuto`]: 1
    });

    return {
        type: CREATE_PERSO,
        payload: { viewer },
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



export const showAoeSkill = (dungeon,maptile) => ({}) => {
    var map = dungeon.dungeon.maptiles;
    map.map(m1 => m1.map(m2 => {
        m2.is_target_aoe = false;
    }));

    maptile.aoe_target.map(m => {
       map[m.row][m.col]. is_target_aoe = true;
    });

    dungeon.dungeon.maptiles = map;
    return {
        type: SHOW_AOE_SKILL,
        payload: dungeon,
    }
}

function doSkill(pj,map,dungeon,skill,cast_ready,row,col)
{

    if(skill.cast_time && !pj.is_casting && !cast_ready)
    {
        var positions = comparePosition(pj.row,pj.col,row,col);
        pj.is_casting = skill.cast_time;
        pj.action = pj.action - skill.action_cost;
        pj.energy = pj.energy - skill.energy_cost;
        pj.health = pj.health - skill.life_cost;
        if(pj.heal_on_energy_percent)
        {
            pj.health = pj.health + (skill.energy_cost*pj.heal_on_energy_percent/100);
        }
        skill = skillCd(skill);
        pj.can_use_skill = false;
        pj.is_attacking = false;
        pj.attacking_row = null;
        pj.attacking_col = null;
        pj.direction = positions.direction;
        pj.equipped_spells[pj.current_skill] = skill;
        pj.direction = "down";
        pj.try_skill = true;
        dungeon.user.character = pj;
        map[pj.row][pj.col].character = pj;
        dungeon.dungeon.maptiles = map;
        map = unsetAoeSkills(map);
    }
    else {

        if(!skill.aoe_linear && !skill.aoe_diagonal && !skill.range_cone && !skill.aoe_front && !skill.aoe_left && !skill.aoe_right && !skill.aoe_back && !skill.self && !skill.damage_time && !skill.damage_time_buff_flat)
        {
            if(typeof map[row][col].character !== 'undefined')
            {
                pj.try_skill = true;
                dungeon.error_message = '';
                var pnj = map[row][col].character;
                let result = dealDamage(pj,pnj,dungeon,map,row,col,skill);
                pj = result.pj;
                pnj = result.pnj;
                dungeon = result.dungeon;
                map = result.map;
                skill = result.skill;
                map = unsetAoeSkills(map);
            }
        }
        if(skill.range_on_target)
        {
            if(skill.aoe_diagonal || skill.aoe_linear)
            {
                map = unsetAoeSkills(map);
                var fake_pj = {row:row,col:col,can_use_skill:false};
                let res;
                let rg = comparePosition(pj.row,pj.col,row,col);
                let dr = '';
                if (skill.aoe_front) {
                    res = setSkillsTarget(map, fake_pj, skill, rg.direction,true);
                    map = res.map;
                }
                if (skill.aoe_back) {
                    if(rg.direction == "up")
                    {
                        dr = "down";
                    }
                    if(rg.direction == "down")
                    {
                        dr = "up";
                    }
                    if(rg.direction == "right")
                    {
                        dr = "left";
                    }
                    if(rg.direction == "left")
                    {
                        dr = "right";
                    }
                    res = setSkillsTarget(map, fake_pj, skill, dr,true);
                    map = res.map;
                }
                if (skill.aoe_right) {
                    if(rg.direction == "up")
                    {
                        dr = "right";
                    }
                    if(rg.direction == "down")
                    {
                        dr = "left";
                    }
                    if(rg.direction == "right")
                    {
                        dr = "down";
                    }
                    if(rg.direction == "left")
                    {
                        dr = "up";
                    }
                    res = setSkillsTarget(map, fake_pj, skill, dr,true);
                    map = res.map;
                }
                if (skill.aoe_left) {
                    if(rg.direction == "up")
                    {
                        dr = "left";
                    }
                    if(rg.direction == "down")
                    {
                        dr = "right";
                    }
                    if(rg.direction == "right")
                    {
                        dr = "up";
                    }
                    if(rg.direction == "left")
                    {
                        dr = "down";
                    }
                    res = setSkillsTarget(map, fake_pj, skill, dr,true);
                    map = res.map;
                }

                let target = [];
                Object.keys(map).map(m1 => {
                    Object.keys(map[m1]).map(m2 => {
                        if(map[m1][m2].is_target_aoe)
                        {
                            let dsf = {row:m1,col:m2};
                        }
                        if(map[m1][m2].is_target_aoe && map[m1][m2].character)
                        {
                            if(map[m1][m2].character.type != "pj")
                            {
                                target.push({row:m1,col:m2});
                            }
                        }
                    })
                });

                target.map(t => {
                    var pnj = map[t.row][t.col].character;
                    var positions = comparePosition(row,col,pnj.row,pnj.col);
                    if(pnj.health > 0)
                    {
                        pnj.health = pnj.health - skill.damage_instant;
                        if(skill.damage_instant_buff)
                        {
                            pnj.health = pnj.health - (pj.damage + skill.damage_instant_buff);
                        }
                        if(pnj.damage_time_spell)
                        {
                            if(!pnj.conditions)
                            {
                                pnj.conditions = [];
                            }
                            var cond = {
                                name: "Rogdor Mark",
                                // animation: "spell1.gif",
                                image: "Mark_of_Rodgort.jpg",
                                damage_instant: 0,
                                damage_time: pnj.damage_time_spell,
                                damage_instant_buff: 0,
                                damage_instant_debuff: 0,
                                damage_type: "Buff",
                                damage_debuff_flat: 0,
                                damage_buff_flat: 0,
                                damage_debuff_percent: 0,
                                damage_buff_percent: 0,
                                damage_reduction_flat: 0,
                                damage_reduction_percent: 0,
                                damage_time_buff_flat: 0,
                                damage_time_buff_percent: 0,
                                damage_time_debuff_flat: 0,
                                damage_time_debuff_percent: 0,
                                damage_return: 0,
                                damage_return_percent: 0,
                                life_buff: 0,
                                life_debuff: 0,
                                heal_instant: 0,
                                heal_time: 0,
                                heal_percent_instant: 0,
                                heal_percent_time: 0,
                                movement_instant: 0,
                                movement_buff: 0,
                                movement_debuff: 0,
                                energy_heal: 0,
                                energy_time: 0,
                                energy_percent_heal: 0,
                                energy_percent_time: 0,
                                condition_duration: pnj.damage_time_spell_duration,
                                damage_time_spell_duration: pnj.damage_time_spell_duration,
                                description: "Rogdor Mark",
                            };
                            pnj.conditions.push(cond);

                            pnj.health = pnj.health - cond.damage_time;
                            // pnj.damage = pnj.damage - (cond.damage_time_buff_flat - cond.damage_time_debuff_flat);
                            // if(cond.damage_time_buff_percent || cond.damage_time_debuff_percent)
                            // {
                            //     pnj.damage = pnj.damage*cond.damage_time_buff_percent/100;
                            //     pnj.damage = pnj.damage*cond.damage_time_debuff_percent/100;
                            // }

                            pnj.movement = pnj.movement + (cond.movement_buff - cond.movement_debuff);
                            if(pnj.health > pnj.maxhealth)
                            {
                                pnj.health = pnj.maxhealth;
                            }
                        }
                        if(pnj.health<=0)
                        {
                            pnj = null;
                            dungeon.monster_info_row = null;
                            dungeon.monster_info_col = null;
                        }
                    }
                    pj.direction = positions.direction;
                    dungeon.user.character = pj;
                    map[pj.row][pj.col].character = pj;
                    if(pnj != null && typeof pnj !== 'undefined' && map[t.row][t.col].character)
                    {
                        dungeon.dungeon.monsters[map[t.row][t.col].character.number] = jsonConcat(dungeon.dungeon.monsters[map[t.row][t.col].character.number],pnj);
                    }
                    else {
                        delete dungeon.dungeon.monsters[map[t.row][t.col].character.number];
                    }
                    map[t.row][t.col].character = pnj;
                    dungeon.dungeon.maptiles = map;
                });
                pj.try_skill = true;
                pj.action = pj.action - skill.action_cost;
                pj.energy = pj.energy - skill.energy_cost;
                pj.health = pj.health - skill.life_cost;
                if(pj.heal_on_energy_percent)
                {
                    pj.health = pj.health + (skill.energy_cost*pj.heal_on_energy_percent/100);
                }
                skill = skillCd(skill);
                pj.can_use_skill = false;
                pj.is_attacking = false;
                pj.attacking_row = null;
                pj.attacking_col = null;
                pj.equipped_spells[pj.current_skill] = skill;
                dungeon.user.character = pj;
                map = unsetAoeSkills(map);
            }
        }
        if(skill.self)
        {
            dungeon.error_message = '';
            if(skill.damage_type == "Trap")
            {
                var positions = comparePosition(pj.row,pj.col,row,col);
                if(!map[row][col].trap)
                {
                    map[row][col].trap = [];
                }
                map[row][col].trap.push(skill);
                pj.try_skill = true;
                pj.can_use_skill = false;
                pj.is_attacking = false;
                pj.attacking_row = null;
                pj.attacking_col = null;
                pj.direction = positions.direction;
                pj.equipped_spells[pj.current_skill] = skill;
                map[pj.row][pj.col].character = pj;
                console.log(map);
                console.log('map[row][col]',map[row][col]);
                dungeon.dungeon.maptiles = map;
                dungeon.user.character = pj;
            }
            else {
                if(skill.aoe_diagonal || skill.aoe_linear)
                {
                    let target = [];
                    Object.keys(map).map(m1 => {
                        Object.keys(map[m1]).map(m2 => {
                            if(map[m1][m2].is_target_aoe && map[m1][m2].character )
                            {
                                if(map[m1][m2].character.type != "pj")
                                {
                                    target.push({row:m1,col:m2});
                                }
                            }
                        })
                    });

                    target.map(t => {
                        var pnj = map[t.row][t.col].character;
                        var positions = comparePosition(pj.row,pj.col,pnj.row,pnj.col);
                        if(pnj.health > 0)
                        {
                            pnj.health = pnj.health - skill.damage_instant;
                            if(skill.damage_instant_buff)
                            {
                                pnj.health = pnj.health - (pj.damage + skill.damage_instant_buff);
                            }
                            if(pnj.health<=0)
                            {
                                pnj = null;
                                dungeon.monster_info_row = null;
                                dungeon.monster_info_col = null;
                            }
                        }
                        pj.direction = positions.direction;
                        dungeon.user.character = pj;
                        map[pj.row][pj.col].character = pj;
                        if(pnj != null && typeof pnj !== 'undefined' && map[t.row][t.col].character)
                        {
                            dungeon.dungeon.monsters[map[t.row][t.col].character.number] = jsonConcat(dungeon.dungeon.monsters[map[t.row][t.col].character.number],pnj);
                        }
                        else {
                            delete dungeon.dungeon.monsters[map[t.row][t.col].character.number];
                        }
                        map[t.row][t.col].character = pnj;
                        dungeon.dungeon.maptiles = map;
                    });
                    pj.try_skill = true;
                    pj.action = pj.action - skill.action_cost;
                    pj.energy = pj.energy - skill.energy_cost;
                    pj.health = pj.health - skill.life_cost;
                    if(pj.heal_on_energy_percent)
                    {
                        pj.health = pj.health + (skill.energy_cost*pj.heal_on_energy_percent/100);
                    }
                    skill = skillCd(skill);
                    pj.can_use_skill = false;
                    pj.is_attacking = false;
                    pj.attacking_row = null;
                    pj.attacking_col = null;
                    pj.equipped_spells[pj.current_skill] = skill;
                    dungeon.user.character = pj;
                    map = unsetAoeSkills(map);
                }
                if(skill.duration && (skill.damage_type == "Buff" || skill.damage_type == "Melee_Counter"))
                {
                    if(!pj.buffs)
                    {
                        pj.buffs = [];
                    }
                    pj.buffs.push(skill);

                    pj.health = pj.health + skill.heal_time;
                    pj.energy = pj.energy + skill.energy_time;
                    if(pj.health > pj.maxhealth)
                    {
                        pj.health = pj.maxhealth;
                    }
                    if(pj.energy > pj.maxenergy)
                    {
                        pj.energy = pj.maxenergy;
                    }
                    pj.heal_on_energy_percent = skill.heal_on_energy_percent;
                    pj.damage = pj.damage + skill.damage_buff_flat + skill.damage_debuff_flat;
                    pj.damage_time = pj.damage_time + (skill.damage_time_buff_flat - skill.damage_time_debuff_flat);
                    pj.damage_time_duration = skill.damage_time_duration;

                    if(skill.damage_buff_percent || skill.damage_debuff_percent)
                    {
                        pj.damage = pj.damage*skill.damage_buff_percent/100;
                        pj.damage = pj.damage*skill.damage_debuff_percent/100;
                    }

                    pj.movement = pj.movement + skill.movement_buff + skill.movement_debuff;
                    pj.damage_reduction_flat = pj.damage_reduction_flat + skill.damage_reduction_flat;
                    pj.damage_reduction_percent = pj.damage_reduction_percent + skill.damage_reduction_percent;
                    pj.damage_return = pj.damage_return + skill.damage_return;
                    pj.damage_return_percent = pj.damage_return_percent + skill.damage_return_percent;
                    if(skill.damage_buff_percent)
                    {
                        pj.damage = pj.damage*skill.damage_buff_percent/100;
                    }
                    skill = skillCd(skill);
                    pj.direction = "down";
                    pj.try_skill = true;
                    pj.action = pj.action - skill.action_cost;
                    pj.energy = pj.energy - skill.energy_cost;
                    pj.health = pj.health - skill.life_cost;
                    if(pj.heal_on_energy_percent)
                    {
                        pj.health = pj.health + (skill.energy_cost*pj.heal_on_energy_percent/100);
                    }
                    pj.equipped_spells[pj.current_skill] = skill;
                    map[pj.row][pj.col].character = pj;
                    dungeon.dungeon.maptiles = map;
                    dungeon.user.character = pj;
                    map = unsetAoeSkills(map);
                }
                if(skill.damage_type == "Heal")
                {
                    pj.health = pj.health + skill.heal_instant;
                    if(skill.heal_percent_instant)
                    {
                        pj.health = pj.maxhealth/skill.heal_percent_instant*100;
                    }
                    pj.energy = pj.energy + skill.energy_heal;
                    if(pj.health > pj.maxhealth)
                    {
                        pj.health = pj.maxhealth;
                    }
                    if(pj.energy > pj.maxenergy)
                    {
                        pj.energy = pj.maxenergy;
                    }
                    pj.direction = "down";
                    skill = skillCd(skill);
                    pj.try_skill = true;
                    pj.action = pj.action - skill.action_cost;
                    pj.energy = pj.energy - skill.energy_cost;
                    pj.health = pj.health - skill.life_cost;
                    if(pj.heal_on_energy_percent)
                    {
                        pj.health = pj.health + (skill.energy_cost*pj.heal_on_energy_percent/100);
                    }
                    pj.equipped_spells[pj.current_skill] = skill;
                    map[pj.row][pj.col].character = pj;
                    dungeon.dungeon.maptiles = map;
                    dungeon.user.character = pj;
                    map = unsetAoeSkills(map);
                }
            }
        }
        else if(skill.movement_instant)
        {
            dungeon.error_message = '';
            if(skill.aoe_diagonal || skill.aoe_linear)
            {
                let tiles = 0;
                var position = comparePosition(pj.row,pj.col,row,col);
                map = unsetAoeSkills(map);
                let result =  setSkillsTarget(map,pj,skill,position.direction);
                map = result.map;
                pj = result.pj;

                let target = [];
                Object.keys(map).map(m1 => {
                    Object.keys(map[m1]).map(m2 => {
                        if(map[m1][m2].is_target_aoe)
                        {
                            tiles++;
                            target.push({row:m1,col:m2});
                        }
                    })
                });
                pj.is_moving_instant = tiles;
                target.map(t => {
                    if(map[t.row][t.col].character)
                    {
                        var pnj = map[t.row][t.col].character;
                        var positions = comparePosition(pj.row,pj.col,row,col);
                        if(pnj.health > 0)
                        {
                            pnj.health = pnj.health - skill.damage_instant;
                            if(skill.damage_instant_buff)
                            {
                                pnj.health = pnj.health - (pj.damage + skill.damage_instant_buff);
                            }
                            if(pnj.damage_time_spell)
                            {
                                if(!pnj.conditions)
                                {
                                    pnj.conditions = [];
                                }
                                var cond = {
                                    name: "Rogdor Mark",
                                    // animation: "spell1.gif",
                                    image: "Mark_of_Rodgort.jpg",
                                    damage_instant: 0,
                                    damage_time: pnj.damage_time_spell,
                                    damage_instant_buff: 0,
                                    damage_instant_debuff: 0,
                                    damage_type: "Buff",
                                    damage_debuff_flat: 0,
                                    damage_buff_flat: 0,
                                    damage_debuff_percent: 0,
                                    damage_buff_percent: 0,
                                    damage_reduction_flat: 0,
                                    damage_reduction_percent: 0,
                                    damage_time_buff_flat: 0,
                                    damage_time_buff_percent: 0,
                                    damage_time_debuff_flat: 0,
                                    damage_time_debuff_percent: 0,
                                    damage_return: 0,
                                    damage_return_percent: 0,
                                    life_buff: 0,
                                    life_debuff: 0,
                                    heal_instant: 0,
                                    heal_time: 0,
                                    heal_percent_instant: 0,
                                    heal_percent_time: 0,
                                    movement_instant: 0,
                                    movement_buff: 0,
                                    movement_debuff: 0,
                                    energy_heal: 0,
                                    energy_time: 0,
                                    energy_percent_heal: 0,
                                    energy_percent_time: 0,
                                    condition_duration: pnj.damage_time_spell_duration,
                                    damage_time_spell_duration: pnj.damage_time_spell_duration,
                                    description: "Rogdor Mark",
                                };
                                pnj.conditions.push(cond);

                                pnj.health = pnj.health - cond.damage_time;
                                // pnj.damage = pnj.damage - (cond.damage_time_buff_flat - cond.damage_time_debuff_flat);
                                // if(cond.damage_time_buff_percent || cond.damage_time_debuff_percent)
                                // {
                                //     pnj.damage = pnj.damage*cond.damage_time_buff_percent/100;
                                //     pnj.damage = pnj.damage*cond.damage_time_debuff_percent/100;
                                // }

                                pnj.movement = pnj.movement + (cond.movement_buff - cond.movement_debuff);
                                if(pnj.health > pnj.maxhealth)
                                {
                                    pnj.health = pnj.maxhealth;
                                }
                            }
                            if(pnj.health<=0)
                            {
                                pnj = null;
                                dungeon.monster_info_row = null;
                                dungeon.monster_info_col = null;
                            }
                        }
                        pj.direction = positions.direction;
                        dungeon.user.character = pj;
                        map[pj.row][pj.col].character = pj;
                        if(pnj != null && typeof pnj !== 'undefined' && map[t.row][t.col].character)
                        {
                            dungeon.dungeon.monsters[map[t.row][t.col].character.number] = jsonConcat(dungeon.dungeon.monsters[map[t.row][t.col].character.number],pnj);
                        }
                        else {
                            delete dungeon.dungeon.monsters[map[t.row][t.col].character.number];
                        }
                        map[t.row][t.col].character = pnj;
                        dungeon.dungeon.maptiles = map;
                    }
                });
            }
            pj.try_skill = true;
            pj.direction = position.direction;
            pj.action = pj.action - skill.action_cost;
            pj.energy = pj.energy - skill.energy_cost;
            pj.health = pj.health - skill.life_cost;
            if(pj.heal_on_energy_percent)
            {
                pj.health = pj.health + (skill.energy_cost*pj.heal_on_energy_percent/100);
            }
            skill = skillCd(skill);
            pj.can_use_skill = false;
            pj.is_attacking = false;
            pj.attacking_row = null;
            pj.attacking_col = null;
            pj.equipped_spells[pj.current_skill] = skill;
            dungeon.dungeon.maptiles[pj.row][pj.col].character = pj;
            dungeon.user.character = pj;
            map = unsetAoeSkills(map);
        }
        else if(skill.damage_time)
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
                    if(skill.damage_instant_buff)
                    {
                        pnj.health = pnj.health - (pj.damage + skill.damage_instant_buff);
                    }
                    if(!pnj.conditions)
                    {
                        pnj.conditions = [];
                    }
                    pnj.conditions.push(skill);

                    pnj.health = pnj.health - skill.damage_time;
                    // pnj.damage = pnj.damage - (skill.damage_time_buff_flat - skill.damage_time_debuff_flat);
                    // if(skill.damage_time_buff_percent || skill.damage_time_debuff_percent)
                    // {
                    //     pnj.damage = pnj.damage*skill.damage_time_buff_percent/100;
                    //     pnj.damage = pnj.damage*skill.damage_time_debuff_percent/100;
                    // }

                    pnj.movement = pnj.movement + (skill.movement_buff - skill.movement_debuff);
                    if(pnj.health > pnj.maxhealth)
                    {
                        pnj.health = pnj.maxhealth;
                    }

                    pj.action = pj.action - skill.action_cost;
                    pj.energy = pj.energy - skill.energy_cost;
                    pj.health = pj.health - skill.life_cost;
                    if(pj.heal_on_energy_percent)
                    {
                        pj.health = pj.health + (skill.energy_cost*pj.heal_on_energy_percent/100);
                    }
                    skill = skillCd(skill);
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
                    pj.equipped_spells[pj.current_skill] = skill;
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
                dungeon.dungeon.maptiles = map;
                map = unsetAoeSkills(map);
            }
        }
        else if(skill.damage_time_buff_flat || skill.damage_time_buff_percent)
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
                    if(skill.damage_instant_buff)
                    {
                        pnj.health = pnj.health - (pj.damage + skill.damage_instant_buff);
                    }
                    if(!pnj.conditions)
                    {
                        pnj.conditions = [];
                    }
                    skill.damage_time_spell_duration = skill.damage_time_duration;
                    pnj.conditions.push(skill);

                    pnj.health = pnj.health - skill.damage_time;
                    if(!pnj.damage_time_spell)
                    {
                        pnj.damage_time_spell = 0;
                    }
                    pnj.damage_time_spell = pnj.damage_time_spell + (skill.damage_time_buff_flat - skill.damage_time_debuff_flat);
                    pnj.damage_time_spell_duration = skill.damage_time_duration;
                    // pnj.damage = pnj.damage - (skill.damage_time_buff_flat - skill.damage_time_debuff_flat);
                    // if(skill.damage_time_buff_percent || skill.damage_time_debuff_percent)
                    // {
                    //     pnj.damage = pnj.damage*skill.damage_time_buff_percent/100;
                    //     pnj.damage = pnj.damage*skill.damage_time_debuff_percent/100;
                    // }

                    pnj.movement = pnj.movement + (skill.movement_buff - skill.movement_debuff);
                    if(pnj.health > pnj.maxhealth)
                    {
                        pnj.health = pnj.maxhealth;
                    }

                    pj.action = pj.action - skill.action_cost;
                    pj.energy = pj.energy - skill.energy_cost;
                    pj.health = pj.health - skill.life_cost;
                    if(pj.heal_on_energy_percent)
                    {
                        pj.health = pj.health + (skill.energy_cost*pj.heal_on_energy_percent/100);
                    }
                    skill = skillCd(skill);
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
                    pj.equipped_spells[pj.current_skill] = skill;
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
                dungeon.dungeon.maptiles = map;
                map = unsetAoeSkills(map);
            }
        }
    }
    return {pj:pj,map:map,skill:skill,dungeon:dungeon};
}

function dealDamage(pj,pnj,dungeon,map,row,col,skill)
{
    var positions = comparePosition(pj.row,pj.col,pnj.row,pnj.col);
    if(pnj.health > 0)
    {
        var damage = pj.damage;
        if(skill.damage_instant_buff)
        {
            pnj.health = pnj.health - (damage+skill.damage_instant_buff);
            if(pnj.damage_time_spell)
            {
                if(!pnj.conditions)
                {
                    pnj.conditions = [];
                }
                var cond = {
                    name: "Rogdor Mark",
                    // animation: "spell1.gif",
                    image: "Mark_of_Rodgort.jpg",
                    damage_instant: 0,
                    damage_time: pnj.damage_time_spell,
                    damage_instant_buff: 0,
                    damage_instant_debuff: 0,
                    damage_type: "Buff",
                    damage_debuff_flat: 0,
                    damage_buff_flat: 0,
                    damage_debuff_percent: 0,
                    damage_buff_percent: 0,
                    damage_reduction_flat: 0,
                    damage_reduction_percent: 0,
                    damage_time_buff_flat: 0,
                    damage_time_buff_percent: 0,
                    damage_time_debuff_flat: 0,
                    damage_time_debuff_percent: 0,
                    damage_return: 0,
                    damage_return_percent: 0,
                    life_buff: 0,
                    life_debuff: 0,
                    heal_instant: 0,
                    heal_time: 0,
                    heal_percent_instant: 0,
                    heal_percent_time: 0,
                    movement_instant: 0,
                    movement_buff: 0,
                    movement_debuff: 0,
                    energy_heal: 0,
                    energy_time: 0,
                    energy_percent_heal: 0,
                    energy_percent_time: 0,
                    condition_duration: pnj.damage_time_spell_duration,
                    damage_time_spell_duration: pnj.damage_time_spell_duration,
                    description: "Rogdor Mark",
                };
                pnj.conditions.push(cond);

                pnj.health = pnj.health - cond.damage_time;
                // pnj.damage = pnj.damage - (cond.damage_time_buff_flat - cond.damage_time_debuff_flat);
                // if(cond.damage_time_buff_percent || cond.damage_time_debuff_percent)
                // {
                //     pnj.damage = pnj.damage*cond.damage_time_buff_percent/100;
                //     pnj.damage = pnj.damage*cond.damage_time_debuff_percent/100;
                // }

                pnj.movement = pnj.movement + (cond.movement_buff - cond.movement_debuff);
                if(pnj.health > pnj.maxhealth)
                {
                    pnj.health = pnj.maxhealth;
                }
            }
        }
        else if(skill.damage_instant)
        {
            pnj.health = pnj.health - skill.damage_instant;
            if(pnj.damage_time_spell)
            {
                if(!pnj.conditions)
                {
                    pnj.conditions = [];
                }
                var cond = {
                    name: "Rogdor Mark",
                    // animation: "spell1.gif",
                    image: "Mark_of_Rodgort.jpg",
                    damage_instant: 0,
                    damage_time: pnj.damage_time_spell,
                    damage_instant_buff: 0,
                    damage_instant_debuff: 0,
                    damage_type: "Buff",
                    damage_debuff_flat: 0,
                    damage_buff_flat: 0,
                    damage_debuff_percent: 0,
                    damage_buff_percent: 0,
                    damage_reduction_flat: 0,
                    damage_reduction_percent: 0,
                    damage_time_buff_flat: 0,
                    damage_time_buff_percent: 0,
                    damage_time_debuff_flat: 0,
                    damage_time_debuff_percent: 0,
                    damage_return: 0,
                    damage_return_percent: 0,
                    life_buff: 0,
                    life_debuff: 0,
                    heal_instant: 0,
                    heal_time: 0,
                    heal_percent_instant: 0,
                    heal_percent_time: 0,
                    movement_instant: 0,
                    movement_buff: 0,
                    movement_debuff: 0,
                    energy_heal: 0,
                    energy_time: 0,
                    energy_percent_heal: 0,
                    energy_percent_time: 0,
                    condition_duration: pnj.damage_time_spell_duration,
                    damage_time_spell_duration: pnj.damage_time_spell_duration,
                    description: "Rogdor Mark",
                };
                pnj.conditions.push(cond);

                pnj.health = pnj.health - cond.damage_time;
                // pnj.damage = pnj.damage - (cond.damage_time_buff_flat - cond.damage_time_debuff_flat);
                // if(cond.damage_time_buff_percent || cond.damage_time_debuff_percent)
                // {
                //     pnj.damage = pnj.damage*cond.damage_time_buff_percent/100;
                //     pnj.damage = pnj.damage*cond.damage_time_debuff_percent/100;
                // }

                pnj.movement = pnj.movement + (cond.movement_buff - cond.movement_debuff);
                if(pnj.health > pnj.maxhealth)
                {
                    pnj.health = pnj.maxhealth;
                }
            }
        }
        else {
            damage = damage + (skill.damage_buff_flat - skill.damage_debuff_flat);
            if(skill.damage_buff_percent)
            {
                damage = damage*skill.damage_buff_percent/100;
            }
            pnj.health = pnj.health - damage;
            if(pnj.damage_time_spell)
            {
                if(!pnj.conditions)
                {
                    pnj.conditions = [];
                }
                var cond = {
                    name: "Rogdor Mark",
                    // animation: "spell1.gif",
                    image: "Mark_of_Rodgort.jpg",
                    damage_instant: 0,
                    damage_time: pnj.damage_time_spell,
                    damage_instant_buff: 0,
                    damage_instant_debuff: 0,
                    damage_type: "Buff",
                    damage_debuff_flat: 0,
                    damage_buff_flat: 0,
                    damage_debuff_percent: 0,
                    damage_buff_percent: 0,
                    damage_reduction_flat: 0,
                    damage_reduction_percent: 0,
                    damage_time_buff_flat: 0,
                    damage_time_buff_percent: 0,
                    damage_time_debuff_flat: 0,
                    damage_time_debuff_percent: 0,
                    damage_return: 0,
                    damage_return_percent: 0,
                    life_buff: 0,
                    life_debuff: 0,
                    heal_instant: 0,
                    heal_time: 0,
                    heal_percent_instant: 0,
                    heal_percent_time: 0,
                    movement_instant: 0,
                    movement_buff: 0,
                    movement_debuff: 0,
                    energy_heal: 0,
                    energy_time: 0,
                    energy_percent_heal: 0,
                    energy_percent_time: 0,
                    condition_duration: pnj.damage_time_spell_duration,
                    damage_time_spell_duration: pnj.damage_time_spell_duration,
                    description: "Rogdor Mark",
                };
                pnj.conditions.push(cond);

                pnj.health = pnj.health - cond.damage_time;
                // pnj.damage = pnj.damage - (cond.damage_time_buff_flat - cond.damage_time_debuff_flat);
                // if(cond.damage_time_buff_percent || cond.damage_time_debuff_percent)
                // {
                //     pnj.damage = pnj.damage*cond.damage_time_buff_percent/100;
                //     pnj.damage = pnj.damage*cond.damage_time_debuff_percent/100;
                // }

                pnj.movement = pnj.movement + (cond.movement_buff - cond.movement_debuff);
                if(pnj.health > pnj.maxhealth)
                {
                    pnj.health = pnj.maxhealth;
                }
            }
        }
        if(pj.damage_time)
        {
            if(!pnj.conditions)
            {
                pnj.conditions = [];
            }
            var cond = {
                name: "Poisoned Arrows",
                // animation: "spell1.gif",
                image: "Apply_Poison.jpg",
                damage_instant: 0,
                damage_time: pj.damage_time,
                damage_instant_buff: 0,
                damage_instant_debuff: 0,
                damage_type: "Buff",
                damage_debuff_flat: 0,
                damage_buff_flat: 0,
                damage_debuff_percent: 0,
                damage_buff_percent: 0,
                damage_reduction_flat: 0,
                damage_reduction_percent: 0,
                damage_time_buff_flat: 0,
                damage_time_buff_percent: 0,
                damage_time_debuff_flat: 0,
                damage_time_debuff_percent: 0,
                damage_return: 0,
                damage_return_percent: 0,
                life_buff: 0,
                life_debuff: 0,
                heal_instant: 0,
                heal_time: 0,
                heal_percent_instant: 0,
                heal_percent_time: 0,
                movement_instant: 0,
                movement_buff: 0,
                movement_debuff: 0,
                energy_heal: 0,
                energy_time: 0,
                energy_percent_heal: 0,
                energy_percent_time: 0,
                condition_duration: pj.damage_time_duration,
                damage_time_spell_duration: 0,
                description: "Poisoned arrow",
            };
            pnj.conditions.push(cond);

            pnj.health = pnj.health - cond.damage_time;
            // pnj.damage = pnj.damage - (cond.damage_time_buff_flat - cond.damage_time_debuff_flat);
            // if(cond.damage_time_buff_percent || cond.damage_time_debuff_percent)
            // {
            //     pnj.damage = pnj.damage*cond.damage_time_buff_percent/100;
            //     pnj.damage = pnj.damage*cond.damage_time_debuff_percent/100;
            // }

            pnj.movement = pnj.movement + (cond.movement_buff - cond.movement_debuff);
            if(pnj.health > pnj.maxhealth)
            {
                pnj.health = pnj.maxhealth;
            }
        }
        pj.action = pj.action - skill.action_cost;
        pj.energy = pj.energy - skill.energy_cost;
        pj.health = pj.health - skill.life_cost;
        if(pj.heal_on_energy_percent)
        {
            pj.health = pj.health + (skill.energy_cost*pj.heal_on_energy_percent/100);
        }
        skill = skillCd(skill);
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
        pj.equipped_spells[pj.current_skill] = skill;
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
    dungeon.dungeon.maptiles = map;
    return {pj:pj,pnj:pnj,map:map,dungeon:dungeon,skill:skill};
};

function unsetAoeSkills(map) {
    map.map(m1 => m1.map(m2 => {
        m2.is_target = false;
        m2.is_target_aoe = false;
        m2.aoe_target = false;
    }));
    return map;
}

function setSkillsTarget(map,pj,skill,direction = "all",is_on_target = false,on_hover = false)
{
    console.log('ok',on_hover);
    let self = skill.self;
    let result;
    if(direction == "all" || direction == "left")
    {
        if(skill.range_linear > 0 || self)
        {
            result = setLinearSTSkill(map,pj,(skill.range_linear*-1),(skill.range_minimum*-1),true,skill.aoe_linear,self);
            map = result.map;
            pj = result.pj;
        }

        if(skill.range_diagonal > 0)
        {
            result = setDiagonalSTSkill(map,pj,(skill.range_diagonal*-1),(skill.range_minimum*-1),true,skill.aoe_diagonal,self);
            map = result.map;
            pj = result.pj;
        }

        if(skill.aoe_diagonal > 0)
        {
            if(skill.range_on_target && is_on_target)
            {
                result = setDiagonalAoeSkill(map, pj, (skill.aoe_diagonal * -1), true, (skill.range_minimum * -1));
                map = result.map;
                pj = result.pj;
            }
            else if(!skill.range_on_target) {

                result = setDiagonalAoeSkill(map, pj, (skill.aoe_diagonal * -1), true, (skill.range_minimum * -1));
                map = result.map;
                pj = result.pj;
            }
        }

        if(skill.aoe_linear > 0)
        {
            if(skill.range_on_target && is_on_target)
            {
                result = setLinearAoeSkill(map, pj, (skill.aoe_linear * -1), true, (skill.range_minimum * -1));
                map = result.map;
                pj = result.pj;
            }
            else if(!skill.range_on_target) {

                result = setLinearAoeSkill(map, pj, (skill.aoe_linear * -1), true, (skill.range_minimum * -1));
                map = result.map;
                pj = result.pj;
            }
        }
    }
    if(direction == "all" || direction == "right")
    {
        if(skill.range_linear > 0)
        {
            result = setLinearSTSkill(map,pj,skill.range_minimum,skill.range_linear,true,skill.aoe_linear,self);
            map = result.map;
            pj = result.pj;
        }

        if(skill.range_diagonal > 0)
        {
            result = setDiagonalSTSkill(map,pj,skill.range_minimum,skill.range_diagonal,true,skill.aoe_diagonal,self);
            map = result.map;
            pj = result.pj;
        }

        if(skill.aoe_linear > 0)
        {
            if(skill.range_on_target && is_on_target)
            {
                result = setLinearAoeSkill(map,pj,skill.range_minimum,true,skill.aoe_linear);
                map = result.map;
                pj = result.pj;
            }
            else if(!skill.range_on_target) {

                result = setLinearAoeSkill(map,pj,skill.range_minimum,true,skill.aoe_linear);
                map = result.map;
                pj = result.pj;
            }
        }

        if(skill.aoe_diagonal > 0)
        {
            if(skill.range_on_target && is_on_target)
            {
                result = setDiagonalAoeSkill(map,pj,skill.range_minimum,true,skill.aoe_diagonal);
                map = result.map;
                pj = result.pj;
            }
            else if(!skill.range_on_target) {

                result = setDiagonalAoeSkill(map,pj,skill.range_minimum,true,skill.aoe_diagonal);
                map = result.map;
                pj = result.pj;
            }
        }
    }
    if(direction == "all" || direction == "up")
    {
        if(skill.range_linear > 0)
        {
            result =  setLinearSTSkill(map,pj,(skill.range_linear*-1),(skill.range_minimum*-1),false,skill.aoe_linear,self);
            map = result.map;
            pj = result.pj;
        }

        if(skill.range_diagonal > 0)
        {
            result =  setDiagonalSTSkill(map,pj,(skill.range_diagonal*-1),(skill.range_minimum*-1),false,skill.aoe_diagonal,self);
            map = result.map;
            pj = result.pj;
        }

        if(skill.aoe_linear > 0)
        {
            if(skill.range_on_target && is_on_target)
            {
                result = setLinearAoeSkill(map,pj,(skill.aoe_linear*-1),false,(skill.range_minimum*-1));
                map = result.map;
                pj = result.pj;
            }
            else if(!skill.range_on_target) {

                result = setLinearAoeSkill(map,pj,(skill.aoe_linear*-1),false,(skill.range_minimum*-1));
                map = result.map;
                pj = result.pj;
            }
        }

        if(skill.aoe_diagonal > 0)
        {
            if(skill.range_on_target && is_on_target)
            {
                result = setDiagonalAoeSkill(map,pj,(skill.aoe_diagonal*-1),false,(skill.range_minimum*-1));
                map = result.map;
                pj = result.pj;
            }
            else if(!skill.range_on_target) {

                result = setDiagonalAoeSkill(map,pj,(skill.aoe_diagonal*-1),false,(skill.range_minimum*-1));
                map = result.map;
                pj = result.pj;
            }
        }
    }
    if(direction == "all" || direction == "down")
    {
        if(skill.range_linear > 0)
        {
            result = setLinearSTSkill(map,pj,skill.range_minimum,skill.range_linear,false,skill.aoe_linear,self);
            map = result.map;
            pj = result.pj;
        }

        if(skill.range_diagonal > 0)
        {
            result = setDiagonalSTSkill(map,pj,skill.range_minimum,skill.range_diagonal,false,skill.aoe_diagonal,self);
            map = result.map;
            pj = result.pj;
        }

        if(skill.aoe_linear > 0)
        {
            if(skill.range_on_target && is_on_target)
            {
                result = setLinearAoeSkill(map,pj,skill.range_minimum,false,skill.aoe_linear);
                map = result.map;
                pj = result.pj;
            }
            else if(!skill.range_on_target) {

                result = setLinearAoeSkill(map,pj,skill.range_minimum,false,skill.aoe_linear);
                map = result.map;
                pj = result.pj;
            }
        }

        if(skill.aoe_diagonal > 0)
        {
            if(skill.range_on_target && is_on_target)
            {
                result = setDiagonalAoeSkill(map, pj, skill.range_minimum, false, skill.aoe_diagonal);
                map = result.map;
                pj = result.pj;
            }
            else if(!skill.range_on_target) {

                result = setDiagonalAoeSkill(map, pj, skill.range_minimum, false, skill.aoe_diagonal);
                map = result.map;
                pj = result.pj;
            }
        }
    }

    if(on_hover)
    {
        map.map((m1,i1) => {
            m1.map((m2,i2) => {
                if (map[i1][i2].is_target) {
                    let fake_pj = {row: i1, col: i2, can_use_skill: false};
                    result = setDiagonalAoeSkill(map, fake_pj, skill.range_minimum, false, skill.aoe_diagonal, on_hover);
                    map = result.map;
                    result = setDiagonalAoeSkill(map, fake_pj, skill.range_minimum, true, skill.aoe_diagonal, on_hover);
                    map = result.map;
                }
            });
        });
    }

    return {map:map,pj:pj};
};

function comparePosition(r1,c1,r2,c2){
    let totalRowU = r1 - r2;
    let totalRow = r1 - r2;
    let totalColU = c1 - c2;
    let totalCol = c1 - c2;
    let direction = "down";
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
    Object.assign(o1, o2);
    return o1;
}

function skillCd(skill)
{
    if(skill.uses > 0)
    {
        skill.uses = skill.uses - 1;
    }
    if(skill.rest > 0)
    {
        if(!skill.cooldown || skill.cooldown == 0)
        {
            skill.cooldown = skill.rest;
        }
    }
    return skill;
}

function setDiagonalAoeSkill(map,pj,min,hor,aoe,on_hover = false) {
    let imin = min;
    let imax = aoe;
    let crt_row = 1;
    if(on_hover && aoe==1 && hor)
    {
        crt_row = 0;
    }
    while(imax)
    {
        for(let j=-imax;j<=imax;j++)
        {
            let t = {row:crt_row,col:j};
            let c_col = parseInt(pj.col)+j;
            if(hor)
            {
                let c_row = parseInt(pj.row)+crt_row;
                if(typeof map[c_row] !== 'undefined')
                {
                    if(typeof map[c_row][c_col] !== 'undefined')
                    {
                        if(map[c_row][c_col].type == "walkable")
                        {
                            if(on_hover)
                            {
                                if(((c_row)  != pj.row) || ((c_col)  != pj.col))
                                {
                                    if(!map[pj.row][pj.col].aoe_target)
                                    {
                                        map[pj.row][pj.col].aoe_target = [];
                                    }
                                    map[pj.row][pj.col].aoe_target.push({row:c_row,col:c_col});
                                }
                            }
                            else {
                                map[c_row][c_col].is_target_aoe = true;
                                pj.can_use_skill = true;
                            }
                        }
                        else
                        {
                            break;
                        }
                    }
                }
            }
            else {
                let c_row = parseInt(pj.row)-crt_row;
                if(typeof map[c_row] !== 'undefined')
                {
                    if(typeof map[c_row][c_col] !== 'undefined')
                    {
                        if(map[c_row][c_col].type == "walkable")
                        {

                            if(on_hover)
                            {
                                if(((c_row)  != pj.row) || ((c_col)  != pj.col))
                                {
                                    if(!map[pj.row][pj.col].aoe_target)
                                    {
                                        map[pj.row][pj.col].aoe_target = [];
                                    }
                                    map[pj.row][pj.col].aoe_target.push({row:c_row,col:c_col});
                                }
                            }
                            else {
                                map[c_row][c_col].is_target_aoe = true;
                                pj.can_use_skill = true;
                            }
                        }
                        else
                        {
                            break;
                        }
                    }
                }
            }
        }
        if(crt_row != 0)
        {
            imax--;
        }
        crt_row++;
    }
    return {map:map,pj:pj};
}
function setDiagonalSTSkill(map,pj,neg,pos,hor,aoe,self = false){


    let imin = neg;
    let imax = pos;
    let crt_row = 0;
    while(imax)
    {
        for(let j=-imax;j<=imax;j++)
        {
            if(hor)
            {
                if(typeof map[parseInt(pj.row)+crt_row] !== 'undefined')
                {
                    if(typeof map[parseInt(pj.row)+crt_row][parseInt(pj.col)+j] !== 'undefined')
                    {

                        if(map[parseInt(pj.row)+crt_row][parseInt(pj.col)+j].type == "walkable")
                        {
                            if(aoe)
                            {
                                map[parseInt(pj.row)+crt_row][parseInt(pj.col)+j].is_target = true;
                                pj.can_use_skill = true;
                            }
                            if((typeof map[parseInt(pj.row)+crt_row][parseInt(pj.col)+j].character !== 'undefined') && map[parseInt(pj.row)+crt_row][parseInt(pj.col)+j].character != null)
                            {
                                if(map[parseInt(pj.row)+crt_row][parseInt(pj.col)+j].character.type == "pnj" && !aoe)
                                {
                                    map[parseInt(pj.row)+crt_row][parseInt(pj.col)+j].is_target = true;
                                    pj.can_use_skill = true;
                                }
                                else if(self) {
                                    pj.can_use_skill = true;
                                    map[parseInt(pj.row) + j][parseInt(pj.col) + j].is_target = true;
                                }
                            }
                        }
                        else
                        {
                            break;
                        }
                    }
                }
            }
            else {
                if(typeof map[parseInt(pj.row)-crt_row] !== 'undefined')
                {
                    if(typeof map[parseInt(pj.row)-crt_row][parseInt(pj.col)+j] !== 'undefined')
                    {
                        if (map[parseInt(pj.row) - crt_row][parseInt(pj.col) + j].type == "walkable") {
                            if (aoe) {
                                map[parseInt(pj.row) - crt_row][parseInt(pj.col) + j].is_target = true;
                                pj.can_use_skill = true;
                            }
                            if ((typeof map[parseInt(pj.row) - crt_row][parseInt(pj.col) + j].character !== 'undefined') && map[parseInt(pj.row)-crt_row][parseInt(pj.col)+j].character != null) {
                                if (map[parseInt(pj.row) - crt_row][parseInt(pj.col) + j].character.type == "pnj" && !aoe) {
                                    map[parseInt(pj.row) - crt_row][parseInt(pj.col) + j].is_target = true;
                                    pj.can_use_skill = true;
                                }
                                else if(self) {
                                    pj.can_use_skill = true;
                                    map[parseInt(pj.row) - crt_row][parseInt(pj.col) + j].is_target = true;
                                }
                            }
                        }
                        else
                        {
                            break;
                        }
                    }
                }
            }
        }
        imax--;
        crt_row++;
    }
    return {map:map,pj:pj};
}
function setLinearAoeSkill(map,pj,min,hor,aoe) {
    for(let j=min;j<=aoe;j++)
    {
        if(hor)
        {
            if(typeof map[parseInt(pj.row)] !== 'undefined')
            {
                if(typeof map[parseInt(pj.row)][parseInt(pj.col)+j] !== 'undefined')
                {
                    if(map[parseInt(pj.row)][parseInt(pj.col)+j].type == "walkable")
                    {
                        map[parseInt(pj.row)][parseInt(pj.col)+j].is_target_aoe = true;
                        pj.can_use_skill = true;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
        else {
            if(typeof map[parseInt(pj.row)+j] !== 'undefined')
            {
                if(typeof map[parseInt(pj.row)+j][parseInt(pj.col)] !== 'undefined')
                {
                    if(map[parseInt(pj.row)+j][parseInt(pj.col)].type == "walkable")
                    {
                        map[parseInt(pj.row)+j][parseInt(pj.col)].is_target_aoe = true;
                        pj.can_use_skill = true;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
    }
    return {map:map,pj:pj};
}

function setLinearSTSkill(map,pj,neg,pos,hor,aoe,self = false){

    for(let j=neg;j<=pos;j++)
    {
        if(hor)
        {
            if(typeof map[parseInt(pj.row)] !== 'undefined')
            {
                if(typeof map[parseInt(pj.row)][parseInt(pj.col)+j] !== 'undefined')
                {
                    if(map[parseInt(pj.row)][parseInt(pj.col)+j].type == "walkable")
                    {
                        if(aoe)
                        {
                            map[parseInt(pj.row)][parseInt(pj.col)+j].is_target = true;
                            pj.can_use_skill = true;
                        }
                        if((typeof map[parseInt(pj.row)][parseInt(pj.col)+j].character !== 'undefined') && map[parseInt(pj.row)][parseInt(pj.col)+j].character != null)
                        {
                            if(map[parseInt(pj.row)][parseInt(pj.col)+j].character.type == "pnj"&& !aoe)
                            {
                                map[parseInt(pj.row)][parseInt(pj.col)+j].is_target = true;
                                pj.can_use_skill = true;
                                break;
                            }
                            if(self)
                            {
                                pj.can_use_skill = true;
                                map[parseInt(pj.row)][parseInt(pj.col)+j].is_target = true;
                            }
                        }
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
        else {
            if(typeof map[parseInt(pj.row)+j] !== 'undefined')
            {
                if(typeof map[parseInt(pj.row)+j][parseInt(pj.col)] !== 'undefined')
                {
                    if(map[parseInt(pj.row)+j][parseInt(pj.col)].type == "walkable")
                    {
                        if(aoe)
                        {
                            map[parseInt(pj.row)+j][parseInt(pj.col)].is_target = true;
                            pj.can_use_skill = true;
                        }
                        if((typeof map[parseInt(pj.row)+j][parseInt(pj.col)].character !== 'undefined') && map[parseInt(pj.row)+j][parseInt(pj.col)].character != null)
                        {
                            if(map[parseInt(pj.row)+j][parseInt(pj.col)].character.type == "pnj"&& !aoe){
                                pj.can_use_skill = true;
                                map[parseInt(pj.row)+j][parseInt(pj.col)].is_target = true;
                                break;
                            }
                            if(self)
                            {
                                pj.can_use_skill = true;
                                map[parseInt(pj.row) + j][parseInt(pj.col)].is_target = true;
                            }
                        }
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
    }
    return {map:map,pj:pj};
}
