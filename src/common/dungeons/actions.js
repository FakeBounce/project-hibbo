/**
 * Created by Fakebounce on 13/11/2016.
 */

import { Range } from 'immutable';
export const EQUIP_SKILL = 'EQUIP_SKILL';
export const UNEQUIP_SKILL = 'UNEQUIP_SKILL';
export const SHOW_SKILL_INFO = 'SHOW_SKILL_INFO';
export const LOAD_EQUIPMENTS = 'LOAD_EQUIPMENTS';
export const END_DUNGEON = 'SWITCH_PANNEL';
export const SWITCH_PANNEL = 'SWITCH_PANNEL';
export const CHANGE_GRID = 'CHANGE_GRID';
export const UNSET_RANGE_TARGET = 'UNSET_RANGE_TARGET';
export const SHOW_RANGE_TARGET = 'SHOW_RANGE_TARGET';
export const SHOW_AOE_SKILL = 'SHOW_AOE_SKILL';
export const LOAD_TUTO_REF = 'LOAD_TUTO_REF';
export const TRY_ITEM = 'TRY_ITEM';
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
export const PICK_EQUIPMENT = 'PICK_EQUIPMENT';
export const ADD_EQUIPMENT = 'ADD_EQUIPMENT';
export const CHANGE_TAB = 'CHANGE_TAB';
export const SWITCH_COMPAIGN = 'SWITCH_COMPAIGN';
export const UPDATE_ERROR = 'UPDATE_ERROR';

/************ Dungeon creation in firebase *****************/
export const loadWorldMap = (dungeon,viewer) =>  ({ getUid, now, firebase }) => {
    var path = 'maps/'+dungeon.worldmap;
    var Uid = getUid();
    let character = false;
    let levelup_character = {};
    let default_spells = {};
    let default_inventory = {};
    character = viewer.characters[viewer.active];
    character.maxhealth = character.health;
    character.maxenergy = character.energy;
    levelup_character = JSON.parse(JSON.stringify(character));
    character.row = 0;
    character.col = 0;
    character.damage_time = 0;
    character.is_attacking = false;
    character.is_moving = false;
    character.is_casting = 0;
    character.current_skill = false;
    character.buffs = false;
    character.maxhealth = character.health;
    character.maxenergy = character.energy;
    character.image = "/assets/images/classes/"+character.name+"/down.png";
    const getPromise = async () => {
        try {
            return await firebase.database.ref(path).once('value').then(function(snapshot){
                let worldmap = snapshot.val();
                character.row = worldmap.row_player;
                character.col = worldmap.col_player;
                worldmap.maptiles[0][0].character = null;
                worldmap.maptiles[worldmap.row_player][worldmap.col_player].character = character;
                let cam_row=worldmap.row_player ;
                let cam_col=worldmap.col_player;
                let camera = {row_center:cam_row,col_center:cam_col};
                let dungeonActive = {
                    id: Uid,
                    dungeon_id: dungeon.id,
                    name: dungeon.name,
                    description: dungeon.description,
                    lock: dungeon.lock,
                    end_turn: false,
                    pannel: true,
                    grid: false,
                    camera:camera,
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
                                maxexperience: character.maxexperience,
                                heal_on_energy_percent: 0,
                                damage_reduction_flat: character.damage_reduction_flat,
                                damage_reduction_percent: character.damage_reduction_percent,
                                damage_return: character.damage_return,
                                damage_return_percent: character.damage_return_percent,
                            },
                            levelup_character: levelup_character,
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
    if(!dungeon.user.character.is_attacking && !dungeon.user.character.is_moving && !dungeon.end_turn && !dungeon.pj_is_dead)
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
                let result = doSkill(pj,dungeon.dungeon.maptiles,dungeon,skill,cast_ready,pj.row,pj.col,firebase);
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

        let monsters = dungeon.dungeon.monsters;
        let monster_moves = [];
        if(monsters) {
            monsters.map((monster, index) => {
                if (monster != null) {
                    monster.damage_time_spell = 0;
                    monster.damage_time_spell_duration = 0;
                    if (!monster.conditions) {
                        monster.conditions = false;
                    }
                    else {
                        monster.conditions.map((skill, index) => {
                            if (monster != null) {
                                if (!monster.conditions[index].condition_duration) {
                                    monster.conditions[index].condition_duration = monster.conditions[index].duration - 1;
                                }
                                else {
                                    monster.conditions[index].condition_duration = monster.conditions[index].condition_duration - 1;
                                }
                                if (monster.conditions[index].condition_duration > 0) {
                                    monster.health = monster.health - skill.damage_time;
                                    monster.damage_time_spell = monster.damage_time_spell + (skill.damage_time_buff_flat - skill.damage_time_debuff_flat);
                                    if (skill.damage_time_spell_duration) {
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
                                    if (monster.health > monster.maxhealth) {
                                        monster.health = monster.maxhealth;
                                    }
                                    dungeon.dungeon.maptiles[monster.row][monster.col].character = monster;
                                    if (monster.health <= 0) {
                                        pj.experience = pj.experience + monster.experience;
                                        if (pj.experience >= pj.maxexperience) {
                                            let lvl_result = lvl_up(dungeon, pj, firebase);
                                            dungeon = lvl_result.dungeon;
                                            pj = lvl_result.pj;
                                        }
                                        monsters[index] = null;
                                        dungeon.dungeon.maptiles[monster.row][monster.col].character = null;
                                        monster = null;
                                        dungeon.monster_info_row = null;
                                        dungeon.monster_info_col = null;
                                    }
                                }
                                else {
                                    monster.conditions.splice(index, 1);
                                }
                            }
                        });
                    }
                    if (monster != null) {
                        monster.can_move_aggro = false;

                        var range = comparePosition(monster.row, monster.col, pj.row, pj.col);
                        let map = dungeon.dungeon.maptiles;
                        let is_in_range = false;
                        let temp_tab = [];
                        let result = setRangeMonsters(map, pj, 0, monster.range, (monster.range-1), false, monster);
                        temp_tab = result.tab;

                        temp_tab.map(tt => {
                            if (tt.row == monster.row && tt.col == monster.col) {
                                is_in_range = true;
                            }
                        });

                        temp_tab = [];
                        let is_in_range_movement = false;
                        result = setRangeMonsters(map, pj, 0, (monster.range + monster.movement), (monster.range - 1 + monster.movement-1), false, monster);
                        temp_tab = result.tab;

                        temp_tab.map(tt => {
                            if (tt.row == monster.row && tt.col == monster.col) {
                                is_in_range_movement = true;
                            }
                        });

                        monster.can_attack = false;
                        monster.can_move_attack = false;

                        if (is_in_range) {
                            monster.can_attack = true;
                            monster.direction = range.direction;
                            dungeon.monster_moves = true;
                            monster_moves.push(index);
                        }
                        else if (is_in_range_movement) {
                            monster.can_move_attack = true;
                            monster.direction = range.direction;
                            dungeon.monster_moves = true;
                            monster_moves.push(index);
                        }
                        else if (monster.health < monster.maxhealth && monster.movement > 0) {
                            monster.can_move_attack = true;
                            monster.can_move_aggro = true;
                            monster.direction = range.direction;
                            dungeon.monster_moves = true;
                            monster_moves.push(index);
                        }
                    }
                }
            });

            let is_monster = false;
            Object.keys(monsters).map(m => {
                if (monsters[m] != null) {
                    is_monster = true;
                }
            });
            if (!is_monster) {
                let lvlup_char = dungeon.user.levelup_character;
                lvlup_char.experience = pj.experience;

                firebase.update({
                    [`users/${dungeon.user.id}/characters/0`]: lvlup_char,
                });
                dungeon.is_finished = true;
            }
        }
        else{
            monsters = [];
            let lvlup_char = dungeon.user.levelup_character;
            lvlup_char.experience = pj.experience;

            firebase.update({
                [`users/${dungeon.user.id}/characters/0`]: lvlup_char,
            });
            dungeon.is_finished = true;
        }
        dungeon.user.character = pj;
        dungeon.dungeon.maptiles[pj.row][pj.col].character = pj;

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

export const MonsterTurn = (dungeon,attack = false,monster_aggro = false) => ({firebase}) => {
    if(monster_aggro)
    {

        monster_aggro.aggro_turn = false;
        dungeon.dungeon.maptiles[monster_aggro.row][monster_aggro.col].character = monster_aggro;
        dungeon.dungeon.monsters[monster_aggro.number] = monster_aggro;
    }
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
                                var pj = dungeon.user.character;
                                pj.experience = pj.experience + pnj.experience;
                                if(pj.experience >= pj.maxexperience)
                                {
                                    let lvl_result = lvl_up(dungeon,pj,firebase);
                                    dungeon = lvl_result.dungeon;
                                    pj = lvl_result.pj;
                                }
                                pnj = null;
                                dungeon.monster_info_row = null;
                                dungeon.monster_info_col = null;
                                dungeon.dungeon.monsters[dungeon.monster_moves[0]] = pnj;
                                dungeon.dungeon.maptiles[row][col].character = pnj;
                                dungeon.monster_moves.splice(0,1);
                                if(dungeon.dungeon.monsters)
                                {
                                    let is_monster = false;
                                    Object.keys(dungeon.dungeon.monsters).map(m =>{
                                        is_monster = true;
                                    });
                                    if(!is_monster)
                                    {
                                        let lvlup_char = dungeon.user.levelup_character;
                                        lvlup_char.experience = pj.experience;

                                        firebase.update({
                                            [`users/${dungeon.user.id}/characters/0`]: lvlup_char,
                                        });
                                        dungeon.is_finished = true;
                                    }
                                }
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
                                if(dungeon.user.character.health <= 0)
                                {
                                    dungeon.pj_is_dead = true;
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
                                        pj = dungeon.user.character;
                                        pj.experience = pj.experience + pnj.experience;
                                        if(pj.experience >= pj.maxexperience)
                                        {
                                            let lvl_result = lvl_up(dungeon,pj,firebase);
                                            dungeon = lvl_result.dungeon;
                                            pj = lvl_result.pj;
                                        }
                                        pnj = null;
                                        dungeon.monster_info_row = null;
                                        dungeon.monster_info_col = null;
                                        if(dungeon.dungeon.monsters)
                                        {
                                            let is_monster = false;
                                            Object.keys(dungeon.dungeon.monsters).map(m =>{
                                                is_monster = true;
                                            });
                                            if(!is_monster)
                                            {
                                                let lvlup_char = dungeon.user.levelup_character;
                                                lvlup_char.experience = pj.experience;

                                                firebase.update({
                                                    [`users/${dungeon.user.id}/characters/0`]: lvlup_char,
                                                });
                                                dungeon.is_finished = true;
                                            }
                                        }
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
                        dungeon.monster_info_row = monster.row;
                        dungeon.monster_info_col = monster.col;
                        dungeon.user.character.is_attacked = true;
                        monster.direction = range.direction;
                        dungeon.user.character.is_attacked = true;
                        dungeon.user.character.attacked_direction = monster.direction;
                        monster.is_attacking = true;
                        monster.can_attack = true;
                        dungeon.dungeon.maptiles[dungeon.user.character.row][dungeon.user.character.col].character = dungeon.user.character;
                        dungeon.dungeon.monsters[dungeon.monster_moves[0]] = monster;
                        dungeon.dungeon.maptiles[monster.row][monster.col].character = monster;

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

                        var tab_rg = [];
                        var result = setRangeMonsters(maptiles,pj,0,monster.range,monster.range-1,false);
                        tab_rg = result.tab;


                        var tab = [];
                        var map = dungeon.dungeon.maptiles;
                        var i=0;
                        var j=1;
                        var pj_row = parseInt(monster.row);
                        var pj_col = parseInt(monster.col);
                        tab[0] = [];
                        tab[0].push({row:pj_row,col:pj_col});
                        var crow;
                        var ccol;
                        var found = false;
                        var to_push = false;
                        var movement = monster.movement;

                        if(monster.can_move_aggro)
                        {
                            movement = range.totalRange;
                        }
                        do
                        {
                            if(tab[i])
                            {
                                tab[i].map(t =>{
                                    pj_row = t.row;
                                    pj_col = t.col;
                                    if(!tab[j])
                                    {
                                        tab[j] = [];
                                    }
                                    if(typeof map[pj_row+1] !== "undefined" && !found)
                                    {
                                        if(typeof map[pj_row+1][pj_col] !== "undefined")
                                        {
                                            if(map[pj_row+1][pj_col].type == "walkable" && !map[pj_row+1][pj_col].character)
                                            {
                                                crow = pj_row+1;
                                                to_push = {row:crow,col:pj_col,ta:t,next:"down"};
                                                tab_rg.map(tg => {
                                                    if(crow == tg.row && (pj_col) == tg.col)
                                                    {
                                                        found = to_push;
                                                    }
                                                });
                                                tab[j].push(to_push);
                                            }
                                        }
                                    }
                                    if(typeof map[pj_row-1]  !== "undefined" && !found)
                                    {
                                        if (typeof map[pj_row - 1][pj_col] !== "undefined")
                                        {
                                            if (map[pj_row - 1][pj_col].type == "walkable" && !map[pj_row - 1][pj_col].character) {
                                                crow = pj_row - 1;
                                                to_push = {row:crow,col:pj_col,ta:t,next:"up"};
                                                tab_rg.map(tg => {
                                                    if(crow == tg.row && (pj_col) == tg.col)
                                                    {
                                                        found = to_push;
                                                    }
                                                });
                                                tab[j].push(to_push);
                                            }
                                        }
                                    }
                                    if(typeof map[pj_row] !== "undefined")
                                    {
                                        if(typeof map[pj_row][pj_col+1] !== "undefined" && !found)
                                        {
                                            if(map[pj_row][pj_col+1].type == "walkable" && !map[pj_row][pj_col+1].character)
                                            {
                                                ccol = pj_col+1;
                                                to_push = {row:pj_row,col:ccol,ta:t,next:"right"};
                                                tab_rg.map(tg => {
                                                    if(pj_row == tg.row && (ccol) == tg.col)
                                                    {
                                                        found = to_push;
                                                    }
                                                });
                                                tab[j].push(to_push);
                                            }
                                        }
                                        if(typeof map[pj_row][pj_col-1] !== "undefined" && !found)
                                        {
                                            if(map[pj_row][pj_col-1].type == "walkable" && !map[pj_row][pj_col-1].character)
                                            {
                                                ccol = pj_col-1;
                                                to_push = {row:pj_row,col:ccol,ta:t,next:"left"};
                                                tab_rg.map(tg => {
                                                    if(pj_row == tg.row && (ccol) == tg.col)
                                                    {
                                                        found = to_push;
                                                    }
                                                });
                                                tab[j].push(to_push);
                                            }
                                        }
                                    }
                                });
                            }
                            i++;
                            j++;
                        }while(i<=movement && !found && i<(monster.movement*2));
                        if(monster.can_move_aggro && i<=monster.movement)
                        {
                            monster.can_move_aggro = false;
                        }
                        if(found)
                        {
                            let rec_result = recursiveTa(found,[]);
                            moves = rec_result.m.reverse();

                            if(monster.can_move_aggro) {
                                moves = moves.slice(0,monster.movement);
                            }
                            monster.moves = moves;
                            monster.is_moving = true;
                            monster.direction = moves[0].next;
                            if(i>monster.movement && !monster.can_move_aggro)
                            {
                                monster.moves = false;
                                monster.is_moving = false;
                                dungeon.dungeon.monsters[dungeon.monster_moves[0]].is_attacking = false;
                                dungeon.dungeon.monsters[dungeon.monster_moves[0]].can_attack = false;
                                dungeon.dungeon.monsters[dungeon.monster_moves[0]].moves = null;
                                dungeon.dungeon.monsters[dungeon.monster_moves[0]].can_move_attack = false;
                                dungeon.dungeon.monsters[dungeon.monster_moves[0]].can_move_aggro = false;
                                cdntmv = true;
                            }
                        }
                        else {
                            dungeon.dungeon.monsters[dungeon.monster_moves[0]].is_attacking = false;
                            dungeon.dungeon.monsters[dungeon.monster_moves[0]].can_attack = false;
                            dungeon.dungeon.monsters[dungeon.monster_moves[0]].moves = null;
                            dungeon.dungeon.monsters[dungeon.monster_moves[0]].can_move_attack = false;
                            dungeon.dungeon.monsters[dungeon.monster_moves[0]].can_move_aggro = false;
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
            if(monster != null || typeof monster === "undefined")
            {
                let m_row = monster.row;
                let m_col = monster.col;
                if (monster.is_moving && !monster.is_attacking) {
                    var map = dungeon.dungeon.maptiles;
                    var range = comparePosition(monster.row, monster.col, pj.row, pj.col);
                    var maptiles = dungeon.dungeon.maptiles;

                    monster.direction = range.direction;
                    maptiles[monster.moves[0].row][monster.moves[0].col].character = monster;
                    maptiles[monster.row][monster.col].character = null;
                    monster.row = monster.moves[0].row;
                    monster.col = monster.moves[0].col;
                    m_row = monster.row;
                    m_col = monster.col;

                    monster.moves.splice(0,1);
                    if(typeof monster.moves !== 'undefined' && monster.moves.length)
                    {
                        monster.direction = monster.moves[0].next;
                    }
                    else {
                        monster.is_moving = false;
                        if(monster != null)
                        {
                            if(!monster.can_move_aggro)
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
                                monster.moves = false;
                                monster.can_move_attack = false;
                                monster.is_attacking = false;
                                monster.can_attack = false;
                                monster.aggro_turn = true;
                                dungeon.monster_info_row = null;
                                dungeon.monster_info_col = null;
                                dungeon.dungeon.monsters[dungeon.monster_moves[0]] = monster;
                                dungeon.dungeon.maptiles[m_row][m_col].character = monster;
                                dungeon.monster_moves.splice(0,1);
                            }
                        }
                        else {
                            pj.nextTurn = true;
                            dungeon.user.character = pj;
                        }
                    }
                }
                else {

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
    if(!dungeon.user.character.is_casting && !dungeon.pj_is_dead)
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
            if(totalRow+totalCol == 0)
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
            else if(totalRow+totalCol > 1 && dungeon.user.character.movement>=(totalRow+totalCol))
            {
                var tab = [];
                var map = dungeon.dungeon.maptiles;
                var pj = dungeon.user.character;
                var i=0;
                var j=1;
                var pj_row = parseInt(pj.row);
                var pj_col = parseInt(pj.col);
                tab[0] = [];
                tab[0].push({row:pj_row,col:pj_col});
                var crow;
                var ccol;
                var found = false;
                var to_push = false;
                do
                {
                    if(tab[i])
                    {
                        tab[i].map(t =>{
                            pj_row = t.row;
                            pj_col = t.col;
                            if(!tab[j])
                            {
                                tab[j] = [];
                            }
                            if(typeof map[pj_row+1] !== "undefined" && !found)
                            {
                                if(typeof map[pj_row+1][pj_col] !== "undefined")
                                {
                                    if(map[pj_row+1][pj_col].type == "walkable" && !map[pj_row+1][pj_col].character)
                                    {
                                        crow = pj_row+1;
                                        to_push = {row:crow,col:pj_col,ta:t,next:"down"};
                                        if(crow == row && (pj_col) == col)
                                        {
                                            found = to_push;
                                        }
                                        tab[j].push(to_push);
                                    }
                                }
                            }
                            if(typeof map[pj_row-1]  !== "undefined" && !found)
                            {
                                if (typeof map[pj_row - 1][pj_col] !== "undefined")
                                {
                                    if (map[pj_row - 1][pj_col].type == "walkable" && !map[pj_row - 1][pj_col].character) {
                                        crow = pj_row - 1;
                                        to_push = {row:crow,col:pj_col,ta:t,next:"up"};
                                        if(crow == row && (pj_col) == col)
                                        {
                                            found = to_push;
                                        }
                                        tab[j].push(to_push);
                                    }
                                }
                            }
                            if(typeof map[pj_row] !== "undefined")
                            {
                                if(typeof map[pj_row][pj_col+1] !== "undefined" && !found)
                                {
                                    if(map[pj_row][pj_col+1].type == "walkable" && !map[pj_row][pj_col+1].character)
                                    {
                                        ccol = pj_col+1;
                                        to_push = {row:pj_row,col:ccol,ta:t,next:"right"};
                                        if(pj_row == row && ccol == col)
                                        {
                                            found = to_push;
                                        }
                                        tab[j].push(to_push);
                                    }
                                }
                                if(typeof map[pj_row][pj_col-1] !== "undefined" && !found)
                                {
                                    if(map[pj_row][pj_col-1].type == "walkable" && !map[pj_row][pj_col-1].character)
                                    {
                                        ccol = pj_col-1;
                                        to_push = {row:pj_row,col:ccol,ta:t,next:"left"};
                                        if(pj_row == row && ccol == col)
                                        {
                                            found = to_push;
                                        }
                                        tab[j].push(to_push);
                                    }
                                }
                            }
                        });
                    }
                    i++;
                    j++;
                }while(i<pj.movement && !found);
                if(found)
                {
                    var moves = [];
                    let result = recursiveTa(found,[]);
                    moves = result.m.reverse();
                    pj.to_move = moves;
                    dungeon.user.character.is_moving = moves[0].next;
                    dungeon.user.character.moving_row = moves[0].row;
                    dungeon.user.character.moving_col = moves[0].col;
                    dungeon.dungeon.maptiles[pj.row][pj.col].character.image = "/assets/images/classes/"+dungeon.dungeon.maptiles[pj.row][pj.col].character.name+"/"+moves[0].next+".png";
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
            else if(dungeon.user.character.movement>=(totalRow+totalCol))
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
            else {
                dungeon.error_message = 'Not enough moves';
            }
        }
        else {
            let canMove = false;
            let message = 'Please wait.';
            let direction = '';
        }
    }
    else {
        dungeon.error_message = 'You\'re dead';
    }
    firebase.update({
        [`activeDungeons/${dungeon.user.id}`]: dungeon,
    });
    return {
        type: MOVING_CHARACTER,
        payload: dungeon,
        component: { canMove: canMove,message: message,direction: direction}
    }
};

function recursiveTa(found,moves)
{
    if(found.ta)
    {
        let ta = found.ta;
        found.ta = null;
        moves.push(found);
        return recursiveTa(ta,moves);
    }
    return {f:found,m:moves};
};

export const moveCharacter = (dungeon) => ({ firebase }) => {

    var pj = dungeon.user.character;

    if(typeof pj.to_move !== "undefined" && pj.to_move.length)
    {
        var direction = comparePosition(pj.row,pj.col,pj.moving_row,pj.moving_col);
        dungeon.dungeon.maptiles[pj.row][pj.col].character.image = "/assets/images/classes/"+dungeon.dungeon.maptiles[pj.row][pj.col].character.name+"/"+direction.direction+".png";
        dungeon.dungeon.maptiles[pj.moving_row][pj.moving_col].character = dungeon.dungeon.maptiles[pj.row][pj.col].character;
        delete dungeon.dungeon.maptiles[pj.row][pj.col].character;
        pj.row = pj.moving_row;
        pj.col = pj.moving_col;
        dungeon.camera.row_center = pj.row;
        dungeon.camera.col_center = pj.col;
        pj.movement = pj.movement - 1;
        if(dungeon.dungeon.maptiles[pj.moving_row][pj.moving_col].item)
        {
            if(!pj.items)
            {
                pj.items = [];
            }
            pj.items.push(dungeon.dungeon.maptiles[pj.moving_row][pj.moving_col].item);
            dungeon.dungeon.maptiles[pj.moving_row][pj.moving_col].item = null;
        }

        pj.to_move.splice(0,1);
        if(pj.to_move.length)
        {
            pj.is_moving = pj.to_move[0].next;
            pj.moving_row = pj.to_move[0].row;
            pj.moving_col = pj.to_move[0].col;
            dungeon.dungeon.maptiles[pj.row][pj.col].character = pj;
            dungeon.dungeon.maptiles[pj.row][pj.col].character.image = "/assets/images/classes/"+dungeon.dungeon.maptiles[pj.row][pj.col].character.name+"/"+pj.to_move[0].next+".png";
        }
        else {
            pj.moving_row = null;
            pj.moving_col = null;
            pj.is_moving = false;
            dungeon.error_message = '';
        }
    }
    else if(pj.is_moving)
    {
        let canMove = false;
        let message = '';
        let direction = '';
        let totalRow = pj.row - pj.moving_row;
        let totalCol = pj.col - pj.moving_col;
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
            pj.movement = pj.movement - 1;
            dungeon.dungeon.maptiles[pj.row][pj.col].character.image = "/assets/images/classes/"+dungeon.dungeon.maptiles[pj.row][pj.col].character.name+"/"+direction+".png";
            dungeon.dungeon.maptiles[pj.moving_row][pj.moving_col].character = dungeon.dungeon.maptiles[pj.row][pj.col].character;
            delete dungeon.dungeon.maptiles[pj.row][pj.col].character;
            pj.row = pj.moving_row;
            pj.col = pj.moving_col;
            dungeon.camera.row_center = pj.row;
            dungeon.camera.col_center = pj.col;

            if(dungeon.dungeon.maptiles[pj.moving_row][pj.moving_col].item)
            {
                if(!pj.items)
                {
                    pj.items = [];
                }
                pj.items.push(dungeon.dungeon.maptiles[pj.moving_row][pj.moving_col].item);
                dungeon.dungeon.maptiles[pj.moving_row][pj.moving_col].item = null;

            }

            pj.moving_row = null;
            pj.moving_col = null;
            pj.is_moving = false;
            dungeon.error_message = '';
        }
        else
        {
            dungeon.dungeon.maptiles[pj.row][pj.col].character.image = "/assets/images/classes/"+dungeon.dungeon.maptiles[pj.row][pj.col].character.name+"/"+direction+".png";
            dungeon.error_message = message;
            pj.is_moving = false;
            pj.moving_row = null;
            pj.moving_col = null;
        }
    }
    dungeon.user.character = pj;
    dungeon.dungeon.maptiles[pj.row][pj.col].character = pj;
    firebase.update({
        [`activeDungeons/${dungeon.user.id}`]: dungeon,
    });
    return {
        type: MOVE_CHARACTER,
        payload: dungeon
    }
};

/************ Items *****************/

export const tryItem = (dungeon,row,col,number) => ({firebase}) => {
    var pj = dungeon.user.character;
    var map = dungeon.dungeon.maptiles;
    var cast_ready = false;
    dungeon.error_message = '';
    if(!pj.is_moving && !pj.is_attacking && !pj.is_using_skill && !dungeon.pj_is_dead) {
        let item = pj.items[number-1];
        item.cast_time = 0;
        item.is_item = true;
        pj.current_skill = false;
        let result = doSkill(pj,map,dungeon,item,cast_ready,row,col,firebase);
        pj = result.pj;
        item = result.item;
        pj.items.splice(number-1,1);

        dungeon = result.dungeon;
        dungeon.user.character = pj;
        dungeon.dungeon.maptiles[pj.row][pj.col].character = pj;
    }
    firebase.update({
        [`activeDungeons/${dungeon.user.id}`]: dungeon,
    });
    return {
        type: TRY_ITEM,
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
    map = unsetAoeSkills(map);
    if(!pj.is_casting && !dungeon.pj_is_dead)
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
        dungeon.error_message = 'You are dead.';
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
        let result = doSkill(pj,map,dungeon,skill,cast_ready,row,col,firebase);
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

export const showRangeTarget = (dungeon,character) => ({firebase}) => {
    var map = dungeon.dungeon.maptiles;
    map.map(m1 => m1.map(m2 => {
        m2.is_target_movement = false;
        m2.is_target_range = false;
    }));
    //
    setRange(map,character,((character.movement)*-1),-1,true,99,99,"mv");
    setRange(map,character,1,(character.movement),true,99,99,"mv");
    setRange(map,character,((character.movement)*-1),-1,false,99,99,"mv");
    setRange(map,character,1,(character.movement),false,99,99,"mv");
    setRange(map,character,((character.range)*-1),-1,true,99,99,"tg");
    setRange(map,character,1,(character.range),true,99,99,"tg");
    setRange(map,character,((character.range)*-1),-1,false,99,99,"tg");
    setRange(map,character,1,(character.range),false,99,99,"tg");
    setRangeDiag(map,character,((character.movement)*-1),-1,true,99,99,"mv");
    setRangeDiag(map,character,1,(character.movement),true,99,99,"mv");
    setRangeDiag(map,character,((character.movement)*-1),-1,false,99,99,"mv");
    setRangeDiag(map,character,1,(character.movement),false,9,9,"mv");
    setRangeDiag(map,character,((character.range)*-1),-1,true,99,99,"tg");
    setRangeDiag(map,character,1,(character.range),true,99,99,"tg");
    setRangeDiag(map,character,((character.range)*-1),-1,false,99,99,"tg");
    setRangeDiag(map,character,1,(character.range),false,9,9,"tg");

    return {
        type: SHOW_RANGE_TARGET,
        payload: dungeon
    };
};

export const unsetRangeTarget = (dungeon,character) => ({firebase}) => {
    var map = dungeon.dungeon.maptiles;
    map.map(m1 => m1.map(m2 => {
        m2.is_target_movement = false;
        m2.is_target_range = false;
    }));

    return {
        type: UNSET_RANGE_TARGET,
        payload: dungeon
    };
};

export const canAttackMonster = (dungeon,character,row,col) => ({firebase}) => {
    var pj = dungeon.user.character;
    var map = dungeon.dungeon.maptiles;
    pj.is_attacking = false;
    dungeon.error_message = '';
    if(!pj.is_casting && !dungeon.pj_is_dead)
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
                let is_on_range_hr = false;
                let is_on_range_vt = false;
                let is_on_range_hr2 = false;
                let is_on_range_vt2 = false;
                let is_on_range_hr3 = false;
                let is_on_range_vt3 = false;
                let is_on_range_hr4 = false;
                let is_on_range_vt4 = false;
                map = unsetAoeSkills(map);
                is_on_range_hr = setRange(map,pj,(pj.range*-1),-1,true,row,col);
                is_on_range_hr2 = setRange(map,pj,1,pj.range,true,row,col);
                is_on_range_vt =  setRange(map,pj,(pj.range*-1),-1,false,row,col);
                is_on_range_vt2 = setRange(map,pj,1,pj.range,false,row,col);
                is_on_range_hr3 = setRangeDiag(map,pj,(pj.range*-1),-1,true,row,col);
                is_on_range_hr4 = setRangeDiag(map,pj,1,pj.range,true,row,col);
                is_on_range_vt3 =  setRangeDiag(map,pj,(pj.range*-1),-1,false,row,col);
                is_on_range_vt4 = setRangeDiag(map,pj,1,pj.range,false,row,col);
                if(is_on_range_hr || is_on_range_vt || is_on_range_hr2 || is_on_range_vt2 || is_on_range_hr3 || is_on_range_hr4 || is_on_range_vt3 || is_on_range_vt4) {
                    if (pj.action >= pj.basicCost) {
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
                    dungeon.error_message = "Something is blocking the view";
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
                            pj.experience = pj.experience + pnj.experience;
                            if(pj.experience >= pj.maxexperience)
                            {
                                let lvl_result = lvl_up(dungeon,pj,firebase);
                                dungeon = lvl_result.dungeon;
                                pj = lvl_result.pj;
                            }
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

                if(dungeon.dungeon.monsters)
                {
                    let is_monster = false;
                    Object.keys(dungeon.dungeon.monsters).map(m =>{
                        is_monster = true;
                    });
                    if(!is_monster)
                    {
                        let lvlup_char = dungeon.user.levelup_character;
                        lvlup_char.experience = pj.experience;

                        firebase.update({
                            [`users/${dungeon.user.id}/characters/0`]: lvlup_char,
                        });
                        dungeon.is_finished = true;
                    }
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

export const LoadEquipments = (snap: Object) => {
    const equipments = snap.val();
    return {
        type: LOAD_EQUIPMENTS,
        payload: equipments ,
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

function doSkill(pj,map,dungeon,skill,cast_ready,row,col,firebase)
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
        console.log('pj.equipped_spells',pj.equipped_spells);
        skill = skillCd(skill);
        pj.can_use_skill = false;
        pj.is_attacking = false;
        pj.attacking_row = null;
        pj.attacking_col = null;
        pj.direction = positions.direction;
        if(!skill.is_item)
        {
            pj.equipped_spells[pj.current_skill] = skill;
        }
        console.log('pj.equipped_spells',pj.equipped_spells);
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
                let result = dealDamage(pj,pnj,dungeon,map,row,col,skill,firebase);
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
                let dr = 'down';
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
                        pnj.health = pnj.health - (skill.damage_instant + pj.spell_damage);
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
                            pj.experience = pj.experience + pnj.experience;

                            if(pj.experience >= pj.maxexperience)
                            {
                                let lvl_result = lvl_up(dungeon,pj,firebase);
                                dungeon = lvl_result.dungeon;
                                pj = lvl_result.pj;
                            }
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
                    if(dungeon.dungeon.monsters)
                    {
                        let is_monster = false;
                        Object.keys(dungeon.dungeon.monsters).map(m =>{
                            is_monster = true;
                        });
                        if(!is_monster)
                        {
                            let lvlup_char = dungeon.user.levelup_character;
                            lvlup_char.experience = pj.experience;

                            firebase.update({
                                [`users/${dungeon.user.id}/characters/0`]: lvlup_char,
                            });
                            dungeon.is_finished = true;
                        }
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
                            pnj.health = pnj.health - (skill.damage_instant + pj.spell_damage);
                            if(skill.damage_instant_buff)
                            {
                                pnj.health = pnj.health - (pj.damage + skill.damage_instant_buff);
                            }
                            if(pnj.health<=0)
                            {
                                pj.experience = pj.experience + pnj.experience;

                                if(pj.experience >= pj.maxexperience)
                                {
                                    let lvl_result = lvl_up(dungeon,pj,firebase);
                                    dungeon = lvl_result.dungeon;
                                    pj = lvl_result.pj;
                                }
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
                        if(dungeon.dungeon.monsters)
                        {
                            let is_monster = false;
                            Object.keys(dungeon.dungeon.monsters).map(m =>{
                                is_monster = true;
                            });
                            if(!is_monster)
                            {
                                let lvlup_char = dungeon.user.levelup_character;
                                lvlup_char.experience = pj.experience;

                                firebase.update({
                                    [`users/${dungeon.user.id}/characters/0`]: lvlup_char,
                                });
                                dungeon.is_finished = true;
                            }
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
                        pj.health =  pj.maxhealth + (pj.maxhealth*skill.heal_percent_instant/100);
                    }
                    if(skill.energy_percent_heal)
                    {
                        pj.energy =  pj.energy + (pj.maxenergy*skill.energy_percent_heal/100);
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
                            pnj.health = pnj.health - (skill.damage_instant + pj.spell_damage);
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
                                pj.experience = pj.experience + pnj.experience;


                                if(pj.experience >= pj.maxexperience)
                                {
                                    let lvl_result = lvl_up(dungeon,pj,firebase);
                                    dungeon = lvl_result.dungeon;
                                    pj = lvl_result.pj;
                                }
                                pnj = null;
                                dungeon.monster_info_row = null;
                                dungeon.monster_info_col = null;
                            }
                        }
                        pj.direction = positions.direction;
                        dungeon.user.character = pj;
                        map[pj.row][pj.col].character = pj;
                        dungeon.camera.row_center = pj.row;
                        dungeon.camera.col_center = pj.col;
                        if(pnj != null && typeof pnj !== 'undefined' && map[t.row][t.col].character)
                        {
                            dungeon.dungeon.monsters[map[t.row][t.col].character.number] = jsonConcat(dungeon.dungeon.monsters[map[t.row][t.col].character.number],pnj);
                        }
                        else {
                            delete dungeon.dungeon.monsters[map[t.row][t.col].character.number];
                        }
                        if(dungeon.dungeon.monsters)
                        {
                            let is_monster = false;
                            Object.keys(dungeon.dungeon.monsters).map(m =>{
                                is_monster = true;
                            });
                            if(!is_monster)
                            {
                                let lvlup_char = dungeon.user.levelup_character;
                                lvlup_char.experience = pj.experience;

                                firebase.update({
                                    [`users/${dungeon.user.id}/characters/0`]: lvlup_char,
                                });
                                dungeon.is_finished = true;
                            }
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
                    pnj.health = pnj.health - (skill.damage_instant + pj.spell_damage);
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
                        pj.experience = pj.experience + pnj.experience;


                        if(pj.experience >= pj.maxexperience)
                        {
                            let lvl_result = lvl_up(dungeon,pj,firebase);
                            dungeon = lvl_result.dungeon;
                            pj = lvl_result.pj;
                        }
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
                if(dungeon.dungeon.monsters)
                {
                    let is_monster = false;
                    Object.keys(dungeon.dungeon.monsters).map(m =>{
                        is_monster = true;
                    });
                    if(!is_monster)
                    {
                        let lvlup_char = dungeon.user.levelup_character;
                        lvlup_char.experience = pj.experience;

                        firebase.update({
                            [`users/${dungeon.user.id}/characters/0`]: lvlup_char,
                        });
                        dungeon.is_finished = true;
                    }
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
                        pj.experience = pj.experience + pnj.experience;

                        if(pj.experience >= pj.maxexperience)
                        {
                            let lvl_result = lvl_up(dungeon,pj,firebase);
                            dungeon = lvl_result.dungeon;
                            pj = lvl_result.pj;
                        }
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
                if(dungeon.dungeon.monsters)
                {
                    let is_monster = false;
                    Object.keys(dungeon.dungeon.monsters).map(m =>{
                        is_monster = true;
                    });
                    if(!is_monster)
                    {
                        let lvlup_char = dungeon.user.levelup_character;
                        lvlup_char.experience = pj.experience;

                        firebase.update({
                            [`users/${dungeon.user.id}/characters/0`]: lvlup_char,
                        });
                        dungeon.is_finished = true;
                    }
                }
                map[row][col].character = pnj;
                dungeon.dungeon.maptiles = map;
                map = unsetAoeSkills(map);
            }
        }
    }
    return {pj:pj,map:map,skill:skill,dungeon:dungeon};
}
export const CreateCharacter = (viewer, classe, pseudo) =>  ({ firebase }) => {
    viewer.characters = [];
    classe.pseudo = pseudo;
    classe.row = 0;
    classe.col = 0;
    //add equi init
    viewer.characters.push(classe);
    viewer.active = 0;
    viewer.tuto = 1;




    firebase.update({
        [`users/${viewer.id}/characters/`]: viewer.characters,
        [`users/${viewer.id}/active`]: viewer.active,
        [`users/${viewer.id}/tuto`]: 1
    });

    firebase.update({
        [`users/${viewer.id}/characters/${viewer.active}/inventory/init_1`]: {
            name: "init_1",
            img: "/assets/images/weapons/init_1.png",
            type: "helmet",
            classe: "All",
            benefits: {
                damage: 100,
                health: 100,
                energy: 100,
            },
        }});

    firebase.update({
        [`users/${viewer.id}/characters/${viewer.active}/inventory/init_2`]: {
            name: "init_2",
            img: "/assets/images/weapons/init_2.png",
            type: "armor",
            classe: "All",
            benefits: {
                damage: 100,
                health: 100,
                energy: 100,
            },
        }});

    firebase.update({
        [`users/${viewer.id}/characters/${viewer.active}/inventory/init_3`]: {
            name: "init_3",
            img: "/assets/images/weapons/init_3.png",
            type: "boots",
            classe: "All",
            benefits: {
                damage: 100,
                health: 100,
                energy: 100,
            },
        }});

    firebase.update({
        [`users/${viewer.id}/characters/${viewer.active}/inventory/init_4`]: {
            name: "init_4",
            img: "/assets/images/weapons/init_4.png",
            type: "weapon",
            classe: "All",
            benefits: {
                damage: 100,
                health: 100,
                energy: 100,
            },
        }});

    firebase.update({
        [`users/${viewer.id}/dungeons/Dungeon1`]: {
            description: "Dungeon 1",
            name: "Dungeon 1",
            from_editor: false,
            id: "Dungeon1",
            lock: false,
            worldmap: "a024ef95-98b8-4a7a-abfe-55a838c0e0c8",
            next: "Dungeon2",
        },
        [`users/${viewer.id}/dungeons/Dungeon2`]: {
            description: "Dungeon 2",
            name: "Dungeon 2",
            from_editor: false,
            id: "Dungeon2",
            lock: true,
            worldmap: "24f49f73-b3f0-4bed-b938-031b70f54a24",
            next: "Dungeon3",
        },
        [`users/${viewer.id}/dungeons/Dungeon3`]: {
            description: "Dungeon 3",
            name: "Dungeon 3",
            from_editor: false,
            id: "Dungeon3",
            lock: true,
            worldmap: "24f49f73-b3f0-4bed-b938-031b70f54a24",
            next: false,
        },
    });

    return {
        type: CREATE_PERSO,
        payload: { viewer },
    };

};

function dealDamage(pj,pnj,dungeon,map,row,col,skill,firebase)
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
            pnj.health = pnj.health - (skill.damage_instant + pj.spell_damage);
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
            pj.experience = pj.experience + pnj.experience;


            if(pj.experience >= pj.maxexperience)
            {
                let lvl_result = lvl_up(dungeon,pj,firebase);
                dungeon = lvl_result.dungeon;
                pj = lvl_result.pj;
            }
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
    if(dungeon.dungeon.monsters)
    {
        let is_monster = false;
        Object.keys(dungeon.dungeon.monsters).map(m =>{
            is_monster = true;
        });
        if(!is_monster)
        {
            let lvlup_char = dungeon.user.levelup_character;
            lvlup_char.experience = pj.experience;

            firebase.update({
                [`users/${dungeon.user.id}/characters/0`]: lvlup_char,
            });
            dungeon.is_finished = true;
        }
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
        m2.is_movable = false;
    }));
    return map;
}

function setSkillsTarget(map,pj,skill,direction = "all",is_on_target = false,on_hover = false)
{
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
            result = setDiagonalSTSkill(map,pj,(skill.range_minimum*-1),(skill.range_diagonal*-1),true,skill.aoe_diagonal,self);
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
            result =  setDiagonalSTSkill(map,pj,(skill.range_minimum*-1),(skill.range_diagonal*-1),false,skill.aoe_diagonal,self);
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
    if(totalRow > 0)
    {
        direction = 'up';
    }
    if(totalCol < 0)
    {
        if(totalRow<0)
        {
            if((totalCol*-1)>(totalRow*-1))
            {
                direction = 'right';
            }
        }
        else {
            if((totalCol*-1)>totalRow)
            {
                direction = 'right';
            }
        }
    }
    if(totalCol > 0)
    {
        if(totalRow>0)
        {
            if(totalCol>totalRow)
            {
                direction = 'left';
            }
        }
        else {
            if(totalCol>(totalRow*-1))
            {
                direction = 'left';
            }
        }
    }

    //Transform total difference to positive int
    if(totalCol < 0 && totalCol<(totalRow*-1))
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
function setDiagonalSTSkill(map,pj,neg,pos,hor,aoe,self = false){
    let imin = neg;
    let imax = pos;
    let crt_row = 0;
    while(imax != 0)
    {
        for(let j=imin;j<=imax;j++)
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
        for(let j=-imin;j>=-imax;j--)
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
        if(imax > 0)
        {
            imax--;
        }
        else {
            imax++;
        }
        crt_row++;
    }
    return {map:map,pj:pj};
}

    function setLinearSTSkill(map,pj,neg,pos,hor,aoe,self = false){
        if(neg<0)
        {
            for(let j=pos;j>=neg;j--)
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
        }
        else {
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
        }
        return {map:map,pj:pj};
    }



    function setRange(map,pj,neg,pos,hor,row,col,movements){
        let imin = neg;
        let imax = pos;
        let crt_row = 0;
        if(neg<0)
        {
            for(let j=pos;j>=neg;j--)
            {
                if(hor)
                {
                    if(((parseInt(pj.row)) == row && (parseInt(pj.col)+j) == col) && !movements)
                    {
                        return true;
                    }
                    if(typeof map[parseInt(pj.row)] !== 'undefined')
                    {
                        if(typeof map[parseInt(pj.row)][parseInt(pj.col)+j] !== 'undefined')
                        {
                            if(map[parseInt(pj.row)][parseInt(pj.col)+j].type == "walkable")
                            {
                                if(movements && movements == "tg")
                                {
                                    map[parseInt(pj.row)][parseInt(pj.col)+j].is_target_range = true;
                                }
                                if(movements && movements == "mv")
                                {
                                    map[parseInt(pj.row)][parseInt(pj.col)+j].is_target_movement = true;
                                }
                                if((typeof map[parseInt(pj.row)][parseInt(pj.col)+j].character !== 'undefined') && map[parseInt(pj.row)][parseInt(pj.col)+j].character != null)
                                {
                                    if(map[parseInt(pj.row)][parseInt(pj.col)+j].character.type == "pnj")
                                    {
                                        break;
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
                    if(((parseInt(pj.row)+j) == row && (parseInt(pj.col)) == col) && !movements)
                    {
                        return true;
                    }
                    if(typeof map[parseInt(pj.row)+j] !== 'undefined')
                    {
                        if(typeof map[parseInt(pj.row)+j][parseInt(pj.col)] !== 'undefined')
                        {
                            if(map[parseInt(pj.row)+j][parseInt(pj.col)].type == "walkable")
                            {
                                if(movements && movements == "tg")
                                {
                                    map[parseInt(pj.row)+j][parseInt(pj.col)].is_target_range = true;
                                }
                                if(movements && movements == "mv")
                                {
                                    map[parseInt(pj.row)+j][parseInt(pj.col)].is_target_movement = true;
                                }
                                if((typeof map[parseInt(pj.row)+j][parseInt(pj.col)].character !== 'undefined') && map[parseInt(pj.row)+j][parseInt(pj.col)].character != null)
                                {
                                    if(map[parseInt(pj.row)+j][parseInt(pj.col)].character.type == "pnj"){
                                        break;
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
        }
        else {
            for(let j=neg;j<=pos;j++)
            {
                if(hor)
                {
                    if(((parseInt(pj.row)) == row && (parseInt(pj.col)+j) == col) && !movements)
                    {
                        return true;
                    }
                    if(typeof map[parseInt(pj.row)] !== 'undefined')
                    {
                        if(typeof map[parseInt(pj.row)][parseInt(pj.col)+j] !== 'undefined')
                        {
                            if(map[parseInt(pj.row)][parseInt(pj.col)+j].type == "walkable")
                            {
                                if(movements && movements == "tg")
                                {
                                    map[parseInt(pj.row)][parseInt(pj.col)+j].is_target_range = true;
                                }
                                if(movements && movements == "mv")
                                {
                                    map[parseInt(pj.row)][parseInt(pj.col)+j].is_target_movement = true;
                                }
                                if((typeof map[parseInt(pj.row)][parseInt(pj.col)+j].character !== 'undefined') && map[parseInt(pj.row)][parseInt(pj.col)+j].character != null)
                                {
                                    if(map[parseInt(pj.row)][parseInt(pj.col)+j].character.type == "pnj")
                                    {
                                        break;
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
                    if(((parseInt(pj.row)+j) == row && (parseInt(pj.col)) == col) && !movements)
                    {
                        return true;
                    }
                    if(typeof map[parseInt(pj.row)+j] !== 'undefined')
                    {
                        if(typeof map[parseInt(pj.row)+j][parseInt(pj.col)] !== 'undefined')
                        {
                            if(map[parseInt(pj.row)+j][parseInt(pj.col)].type == "walkable")
                            {

                                if(movements && movements == "tg")
                                {
                                    map[parseInt(pj.row)+j][parseInt(pj.col)].is_target_range = true;
                                }
                                if(movements && movements == "mv")
                                {
                                    map[parseInt(pj.row)+j][parseInt(pj.col)].is_target_movement = true;
                                }
                                if((typeof map[parseInt(pj.row)+j][parseInt(pj.col)].character !== 'undefined') && map[parseInt(pj.row)+j][parseInt(pj.col)].character != null)
                                {
                                    if(map[parseInt(pj.row)+j][parseInt(pj.col)].character.type == "pnj"){
                                        break;
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
        }
        return false;
    }

    function setRangeDiag(map,pj,neg,pos,hor,row,col,movements){
        let imin = neg;
        let imax = pos;
        let crt_row = 0;
        while(imax != 0)
        {
            for(let j=imin;j<=imax;j++)
            {
                if(hor)
                {
                    if(((parseInt(pj.row)+crt_row) == row && (parseInt(pj.col)+j) == col) && !movements)
                    {
                        return true;
                    }
                    if(typeof map[parseInt(pj.row)+crt_row] !== 'undefined')
                    {
                        if(typeof map[parseInt(pj.row)+crt_row][parseInt(pj.col)+j] !== 'undefined')
                        {
                            if(map[parseInt(pj.row)+crt_row][parseInt(pj.col)+j].type == "walkable")
                            {
                                if(movements && movements == "tg")
                                {
                                    map[parseInt(pj.row)+crt_row][parseInt(pj.col)+j].is_target_range = true;
                                }
                                if(movements && movements == "mv")
                                {
                                    map[parseInt(pj.row)+crt_row][parseInt(pj.col)+j].is_target_movement = true;
                                }
                                if((typeof map[parseInt(pj.row)+crt_row][parseInt(pj.col)+j].character !== 'undefined') && map[parseInt(pj.row)+crt_row][parseInt(pj.col)+j].character != null)
                                {
                                    if(map[parseInt(pj.row)+crt_row][parseInt(pj.col)+j].character.type == "pnj")
                                    {
                                        break;
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
                    if(((parseInt(pj.row)-crt_row) == row && (parseInt(pj.col)+j) == col)&& !movements)
                    {
                        return true;
                    }
                    if(typeof map[parseInt(pj.row)-crt_row] !== 'undefined')
                    {
                        if(typeof map[parseInt(pj.row)-crt_row][parseInt(pj.col)+j] !== 'undefined')
                        {
                            if (map[parseInt(pj.row) - crt_row][parseInt(pj.col) + j].type == "walkable") {

                                if(movements && movements == "tg")
                                {
                                    map[parseInt(pj.row)-crt_row][parseInt(pj.col)+j].is_target_range = true;
                                }
                                if(movements && movements == "mv")
                                {
                                    map[parseInt(pj.row)-crt_row][parseInt(pj.col)+j].is_target_movement = true;
                                }

                                if ((typeof map[parseInt(pj.row) - crt_row][parseInt(pj.col) + j].character !== 'undefined') && map[parseInt(pj.row)-crt_row][parseInt(pj.col)+j].character != null) {
                                    if (map[parseInt(pj.row) - crt_row][parseInt(pj.col) + j].character.type == "pnj") {
                                        break;
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
            for(let j=-imin;j>=-imax;j--)
            {
                if(hor)
                {
                    if(((parseInt(pj.row)+crt_row) == row && (parseInt(pj.col)+j) == col)&& !movements)
                    {
                        return true;
                    }
                    if(typeof map[parseInt(pj.row)+crt_row] !== 'undefined')
                    {
                        if(typeof map[parseInt(pj.row)+crt_row][parseInt(pj.col)+j] !== 'undefined')
                        {
                            if(map[parseInt(pj.row)+crt_row][parseInt(pj.col)+j].type == "walkable")
                            {
                                if(movements && movements == "tg")
                                {
                                    map[parseInt(pj.row)+crt_row][parseInt(pj.col)+j].is_target_range = true;
                                }
                                if(movements && movements == "mv")
                                {
                                    map[parseInt(pj.row)+crt_row][parseInt(pj.col)+j].is_target_movement = true;
                                }
                                if((typeof map[parseInt(pj.row)+crt_row][parseInt(pj.col)+j].character !== 'undefined') && map[parseInt(pj.row)+crt_row][parseInt(pj.col)+j].character != null)
                                {
                                    if(map[parseInt(pj.row)+crt_row][parseInt(pj.col)+j].character.type == "pnj")
                                    {
                                        break;
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
                    if(((parseInt(pj.row)-crt_row) == row && (parseInt(pj.col)+j) == col)&& !movements)
                    {
                        return true;
                    }
                    if(typeof map[parseInt(pj.row)-crt_row] !== 'undefined')
                    {
                        if(typeof map[parseInt(pj.row)-crt_row][parseInt(pj.col)+j] !== 'undefined')
                        {
                            if(movements && movements == "tg")
                            {
                                map[parseInt(pj.row)-crt_row][parseInt(pj.col)+j].is_target_range = true;
                            }
                            if(movements && movements == "mv")
                            {
                                map[parseInt(pj.row)-crt_row][parseInt(pj.col)+j].is_target_movement = true;
                            }
                            if (map[parseInt(pj.row) - crt_row][parseInt(pj.col) + j].type == "walkable") {
                                if ((typeof map[parseInt(pj.row) - crt_row][parseInt(pj.col) + j].character !== 'undefined') && map[parseInt(pj.row)-crt_row][parseInt(pj.col)+j].character != null) {
                                    if (map[parseInt(pj.row) - crt_row][parseInt(pj.col) + j].character.type == "pnj") {
                                        break;
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
            if(imax > 0)
            {
                imax--;
            }
            else {
                imax++;
            }
            crt_row++;
        }
        return false;
    }

    function setRangeMonsters(map,pj,neg,pos,diag,hor,is_char = false){
        let imin = neg;
        let imax = pos;
        let crt_row = 0;
        var tab = [];
        var c_row = 0;
        var c_col = 0;
        while(imax)
        {
            for(let j=imin;j<=imax;j++)
            {
                if(hor)
                {
                    c_row = parseInt(pj.row)+crt_row;
                    c_col = c_col;
                    if(typeof map[c_row] !== 'undefined')
                    {
                        if(typeof map[c_row][c_col] !== 'undefined')
                        {
                            if(map[c_row][c_col].type == "walkable")
                            {
                                if ((typeof map[c_row][c_col].character !== 'undefined') && map[c_row][c_col].character != null) {
                                    if(map[c_row][c_col].character.type == "pnj")
                                    {
                                        if(is_char && c_row == parseInt(is_char.row) && c_col == parseInt(is_char.col))
                                        {
                                            tab.push({row:c_row,col:c_col});
                                        }
                                        else {
                                            break;
                                        }
                                    }
                                }
                                else {
                                    if(!(c_row == pj.row && c_col == pj.col))
                                    {
                                        tab.push({row:c_row,col:c_col});
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
                    c_row = parseInt(pj.row)-crt_row;
                    c_col = parseInt(pj.col)+j;
                    if(typeof map[c_row] !== 'undefined')
                    {
                        if(typeof map[c_row][c_col] !== 'undefined')
                        {
                            if (map[c_row][c_col].type == "walkable") {
                                if ((typeof map[c_row][c_col].character !== 'undefined') && map[c_row][c_col].character != null) {
                                    if (map[c_row][c_col].character.type == "pnj") {

                                        if(is_char && c_row == parseInt(is_char.row) && c_col == parseInt(is_char.col))
                                        {
                                            tab.push({row:c_row,col:c_col});
                                        }
                                        else {
                                            break;
                                        }
                                    }
                                }
                                else {
                                    if(!(c_row == pj.row && c_col == pj.col))
                                    {
                                        tab.push({row:c_row,col:c_col});
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
            for(let j=-imin;j>=-imax;j--)
            {
                if(hor)
                {
                    c_row = parseInt(pj.row)+crt_row;
                    c_col = parseInt(pj.col)+j;
                    if(typeof map[c_row] !== 'undefined')
                    {
                        if(typeof map[c_row][c_col] !== 'undefined')
                        {
                            if(map[c_row][c_col].type == "walkable")
                            {
                                if ((typeof map[c_row][c_col].character !== 'undefined') && map[c_row][c_col].character != null) {
                                    if(map[c_row][c_col].character.type == "pnj")
                                    {
                                        if(is_char && c_row == parseInt(is_char.row) && c_col == parseInt(is_char.col))
                                        {
                                            tab.push({row:c_row,col:c_col});
                                        }
                                        else {
                                            break;
                                        }
                                    }
                                }
                                else {
                                    if(!(c_row == pj.row && c_col == pj.col))
                                    {
                                        tab.push({row:c_row,col:c_col});
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
                    c_row = parseInt(pj.row)-crt_row;
                    c_col = parseInt(pj.col)+j;

                    if(typeof map[c_row] !== 'undefined')
                    {
                        if(typeof map[c_row][c_col] !== 'undefined')
                        {
                            if (map[c_row][c_col].type == "walkable") {
                                if ((typeof map[c_row][c_col].character !== 'undefined') && map[c_row][c_col].character != null) {
                                    if (map[c_row][c_col].character.type == "pnj") {

                                        if(is_char && c_row == parseInt(is_char.row) && c_col == parseInt(is_char.col))
                                        {
                                            tab.push({row:c_row,col:c_col});
                                        }
                                        else {
                                            break;
                                        }
                                    }
                                }
                                else {
                                    if(!(c_row == pj.row && c_col == pj.col))
                                    {
                                        tab.push({row:c_row,col:c_col});
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

        imin = neg;
        imax = pos;
        for(let j=diag;j<=diag;j++)
        {
            c_row = parseInt(pj.row)+j;
            c_col = parseInt(pj.col)+j;

            if(typeof map[c_row] !== 'undefined')
            {
                if(typeof map[c_row][c_col] !== 'undefined')
                {
                    if(map[c_row][c_col].type == "walkable")
                    {
                        if ((typeof map[c_row][c_col].character !== 'undefined') && map[c_row][c_col].character != null) {
                            if(map[c_row][c_col].character.type == "pnj")
                            {
                                if(is_char && c_row == parseInt(is_char.row) && c_col == parseInt(is_char.col))
                                {
                                    tab.push({row:c_row,col:c_col});
                                }
                                else {
                                    break;
                                }
                            }
                        }
                        else {
                            if(!(c_row == pj.row && c_col == pj.col))
                            {
                                tab.push({row:c_row,col:c_col});
                            }
                        }
                    }
                    else
                    {
                        break;
                    }
                }
            }
            c_row = parseInt(pj.row)-j;
            c_col = parseInt(pj.col)+j;
            if(typeof map[c_row] !== 'undefined')
            {
                if(typeof map[c_row][c_col] !== 'undefined')
                {
                    if (map[c_row][parseInt(pj.col) + j].type == "walkable") {
                        if ((typeof map[c_row][c_col].character !== 'undefined') && map[c_row][c_col].character != null) {
                            if (map[c_row][c_col].character.type == "pnj") {
                                if(is_char && c_row == parseInt(is_char.row) && c_col == parseInt(is_char.col))
                                {
                                    tab.push({row:c_row,col:c_col});
                                }
                                else {
                                    break;
                                }
                            }
                        }
                        else {
                            if(!(c_row == pj.row && c_col == pj.col))
                            {
                                tab.push({row:c_row,col:c_col});
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
        for(let j=-diag;j>=-diag;j--)
        {
            if(hor)
            {
                c_row = parseInt(pj.row)+j;
                c_col = parseInt(pj.col)+j;

                if(typeof map[c_row] !== 'undefined')
                {
                    if(typeof map[c_row][c_col] !== 'undefined')
                    {

                        if(map[c_row][c_col].type == "walkable")
                        {
                            if ((typeof map[c_row][c_col].character !== 'undefined') && map[c_row][c_col].character != null) {
                                if(map[c_row][c_col].character.type == "pnj")
                                {
                                    if(is_char && c_row == parseInt(is_char.row) && c_col == parseInt(is_char.col))
                                    {
                                        tab.push({row:c_row,col:c_col});
                                    }
                                    else {
                                        break;
                                    }
                                }
                            }
                            else {
                                if(!(c_row == pj.row && c_col == pj.col))
                                {
                                    tab.push({row:c_row,col:c_col});
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
                c_row = parseInt(pj.row)-j;
                c_col = parseInt(pj.col)+j;

                if(typeof map[c_row] !== 'undefined')
                {
                    if(typeof map[c_row][c_col] !== 'undefined')
                    {
                        if (map[c_row][c_col].type == "walkable") {
                            if ((typeof map[c_row][c_col].character !== 'undefined') && map[c_row][c_col].character != null) {
                                if (map[c_row][c_col].character.type == "pnj") {

                                    if(is_char && c_row == parseInt(is_char.row) && c_col == parseInt(is_char.col))
                                    {
                                        tab.push({row:c_row,col:c_col});
                                    }
                                    else {
                                        break;
                                    }
                                }
                            }
                            else {
                                if(!(c_row == pj.row && c_col == pj.col))
                                {
                                    tab.push({row:c_row,col:c_col});
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

        for(let j=0;j<=pos;j++)
        {
            c_row = parseInt(pj.row)-j;
            c_col = parseInt(pj.col);

            if(typeof map[c_row] !== 'undefined')
            {
                if(typeof map[c_row][c_col] !== 'undefined')
                {
                    if (map[c_row][c_col].type == "walkable") {
                        if ((typeof map[c_row][c_col].character !== 'undefined') && map[c_row][c_col].character != null) {
                            if (map[c_row][c_col].character.type == "pnj") {

                                if(is_char && c_row == parseInt(is_char.row) && c_col == parseInt(is_char.col))
                                {
                                    tab.push({row:c_row,col:c_col});
                                }
                                else {
                                    break;
                                }
                            }
                        }
                        else {
                            if(!(c_row == pj.row && c_col == pj.col))
                            {
                                tab.push({row:c_row,col:c_col});
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

        for(let j=0;j<=pos;j++)
        {
            c_row = parseInt(pj.row)+j;
            c_col = parseInt(pj.col);

            if(typeof map[c_row] !== 'undefined')
            {
                if(typeof map[c_row][c_col] !== 'undefined')
                {
                    if (map[c_row][c_col].type == "walkable") {
                        if ((typeof map[c_row][c_col].character !== 'undefined') && map[c_row][c_col].character != null) {
                            if (map[c_row][c_col].character.type == "pnj") {

                                if(is_char && c_row == parseInt(is_char.row) && c_col == parseInt(is_char.col))
                                {
                                    tab.push({row:c_row,col:c_col});
                                }
                                else {
                                    break;
                                }
                            }
                        }
                        else {
                            if(!(c_row == pj.row && c_col == pj.col))
                            {
                                tab.push({row:c_row,col:c_col});
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
        return {map:map,tab:tab};
    }



/************ Display Equipement ***************************/
export const PickEquipment = (viewer, equipment, wear) => ({ firebase }) => {
    equipment.wear = wear;
    viewer.pick_equipment = equipment;
    firebase.update({
        [`users/${viewer.id}/pick_equipment`]: equipment,
    });
    return {
        type: PICK_EQUIPMENT,
        payload: viewer,
    }
};

export const RemoveEquipment = (viewer, equipment) => ({ firebase }) => {
    let character = viewer.characters[viewer.active];
    if(character.equipped_equipments && character.equipped_equipments[equipment.type])
    {
        Object.keys(equipment.benefits).map(p => {
            if(character[p]){
                character[p] = character[p] - equipment.benefits[p];
            }
        });

        character.equipped_equipments[equipment.type] = null;
        if(!character.inventory){
            character.inventory = {};
        }
        character.inventory[equipment.name] = equipment;
    }

    viewer.pick_equipment = null;
    firebase.update({
        [`users/${viewer.id}/pick_equipment`]: null,
        [`users/${viewer.id}/characters/${viewer.active}`]: character,
    });
    return {
        type: PICK_EQUIPMENT,
        payload: viewer,
    }
};

export const DeleteEquipment = (viewer, equipment) => ({ firebase }) => {
    let character = viewer.characters[viewer.active];
    if(!equipment.wear){
        if(character.inventory[equipment.name])
        {
            character.inventory[equipment.name] = null
        }
    }
    else{
        if(character.equipped_equipments && character.equipped_equipments[equipment.type])
        {
            Object.keys(equipment.benefits).map(p => {
                if(character[p]){
                    character[p] = character[p] - equipment.benefits[p];
                }
            });
            character.equipped_equipments[equipment.type] = null;
        }
    }

    viewer.pick_equipment = null;
    firebase.update({
        [`users/${viewer.id}/pick_equipment`]: null,
        [`users/${viewer.id}/characters/${viewer.active}`]: character,
    });
    return {
        type: PICK_EQUIPMENT,
        payload: viewer,
    }
};

export const AddEquipment = (viewer, equipment) => ({ firebase }) => {
    let character = viewer.characters[viewer.active];

    //es ce que luser peut le porter
    if(character.name == equipment.classe || equipment.classe == "All") {
        //si luser n'a pas equipements
        if (character.equipped_equipments == null) {
            Object.keys(equipment.benefits).map(p => {
                if (character[p]) {
                    character[p] = character[p] + equipment.benefits[p];
                }
                else {
                    character[p] = equipment.benefits[p];
                }
            });
            character.equipped_equipments = {};
            character.equipped_equipments[equipment.type] = equipment;
            character.inventory[equipment.name] = null;
        }
        else {
            //si luser a un equipement du type de l'objet
            if (character.equipped_equipments[equipment.type]) {
                let equipment_wear = character.equipped_equipments[equipment.type];
                if (equipment_wear && equipment_wear.benefits) {
                    //on soustraie l'ancien
                    Object.keys(equipment_wear.benefits).map(p => {
                        character[p] = character[p] - equipment_wear.benefits[p];
                    });
                    character.inventory[equipment_wear.name] = equipment_wear;
                }
                //on additione le nouveau
                Object.keys(equipment.benefits).map(p => {
                    if (character[p]) {
                        character[p] = character[p] + equipment.benefits[p];
                    }
                    else {
                        character[p] = equipment.benefits[p];
                    }
                });
                character.equipped_equipments[equipment.type] = equipment;
                character.inventory[equipment.name] = null;
            }
            else {
                //on additione le nouveau
                Object.keys(equipment.benefits).map(p => {
                    if (character[p]) {
                        character[p] = character[p] + equipment.benefits[p];
                    }
                    else {
                        character[p] = equipment.benefits[p];
                    }
                });
                character.equipped_equipments[equipment.type] = equipment;
                character.inventory[equipment.name] = null;
            }
        }

        viewer.characters[viewer.active] = character;
        viewer.pick_equipment = null;
        firebase.update({
            [`users/${viewer.id}/pick_equipment`]: null,
            [`users/${viewer.id}/characters/${viewer.active}`]: character,
        });
    }
    else{
        viewer.pick_equipment.error = "You are not " + viewer.pick_equipment.classe;
        firebase.update({
            [`users/${viewer.id}/pick_equipment`]: viewer.pick_equipment,
        });
    }

    return {
        type: ADD_EQUIPMENT,
        payload: viewer,
    }
};


/************ Change Tabs **********************************/
export const ChangeTab = (viewer, tab) => ({firebase}) => {
    viewer.tab = tab;

    firebase.update({
        [`users/${viewer.id}/tab`]: tab,
    });

    return {
        type: CHANGE_TAB,
        payload: viewer,
    }
};

export const changeGrid = (dungeon) => ({firebase}) => {
    if(dungeon.grid)
    {
        dungeon.grid = false;
    }
    else {
        dungeon.grid = true;
    }

    firebase.update({
        [`activeDungeons/${dungeon.user.id}`]: dungeon,
    });

    return {
        type: CHANGE_GRID,
        payload: dungeon,
    }
};

export const switchPannel = (dungeon) => ({firebase}) => {
    if(dungeon.pannel)
    {
        dungeon.pannel = false;
    }
    else {
        dungeon.pannel = true;
    }

    firebase.update({
        [`activeDungeons/${dungeon.user.id}`]: dungeon,
    });

    return {
        type: SWITCH_PANNEL,
        payload: dungeon,
    }
};

export const endDungeon = (dungeon,equipments = false, dviewer) => ({firebase}) => {
    if(dungeon.is_finished)
    {
        if(equipments)
        {
            let imin = Math.ceil(1);
            let imax = Math.floor(3);
            let iresult = Math.floor(Math.random() * (imax - imin)) + imin;
            let min = Math.ceil(1);
            let max = Math.floor(25);

            let possible_loot = [];
            if(!dungeon.loot)
            {
                dungeon.loot = [];
                Object.keys(equipments).map(e => {
                    possible_loot.push(equipments[e]);
                });

                if(!dungeon.user.levelup_character.inventory)
                {
                    dungeon.user.levelup_character.inventory = {};
                }

                for(imin;imin<=iresult;imin++)
                {
                    let result = Math.floor(Math.random() * (max - min)) + min;
                    dungeon.user.levelup_character.inventory[possible_loot[result].name] = (possible_loot[result]);
                    dungeon.loot.push(possible_loot[result]);
                }
            }
        }
        dungeon.is_finished = false;
        dungeon.is_looted = true;
        firebase.update({
            [`users/${dungeon.user.id}/characters/0`]: dungeon.user.levelup_character
        });

        if(dviewer != null && dviewer.dungeons) {
            let dung = dviewer.dungeons[dungeon.dungeon_id];
            if (dung != null && dung.next != null && dung.next) {
                firebase.update({
                    [`users/${dungeon.user.id}/dungeons/${dung.next}/lock`]: false
                });
            }
        }
    }

    firebase.update({
        [`activeDungeons/${dungeon.user.id}`]: dungeon,
    });

    return {
        type: END_DUNGEON,
        payload: dungeon,
    }
};

export const SwitchCompaign = (viewer, compaign) => ({firebase}) => {
    viewer.compaign = compaign;

    firebase.update({
        [`users/${viewer.id}/compaign`]: compaign,
    });

    return {
        type: SWITCH_COMPAIGN,
        payload: viewer,
    }
};

export const setClasse = (viewer, description) => ({firebase}) => {
    viewer.description = description;

    firebase.update({
        [`users/${viewer.id}/description`]: description,
    });

    return {
        type: SET_CLASSE,
        payload: viewer,
    }
};

function lvl_up(dungeon,pj,firebase){

    let lvlup_char = dungeon.user.levelup_character;
    let default_char = dungeon.user.default_character;

    let maxxp = pj.maxexperience;
    pj.health = pj.health + pj.health_lvl;
    pj.energy = pj.energy + pj.energy_lvl;
    pj.damage_reduction_flat = pj.damage_reduction_flat + pj.damage_reduction_flat_lvl;
    pj.damage = pj.damage + pj.damage_lvl;
    pj.experience = pj.experience - maxxp;
    pj.level = pj.level + 1;
    pj.maxexperience = (pj.maxexperience*120/100);

    default_char.maxhealth = default_char.maxhealth + pj.health_lvl;
    default_char.maxenergy = default_char.maxenergy + pj.energy_lvl;
    default_char.damage = default_char.damage + pj.damage_lvl;
    default_char.maxexperience = pj.maxexperience;
    default_char.damage_reduction_flat = default_char.damage_reduction_flat + pj.damage_reduction_flat_lvl;


    lvlup_char.health = lvlup_char.maxhealth + pj.health_lvl;
    lvlup_char.energy = lvlup_char.maxenergy + pj.energy_lvl;
    lvlup_char.maxhealth = lvlup_char.maxhealth + pj.health_lvl;
    lvlup_char.maxenergy = lvlup_char.maxenergy + pj.energy_lvl;
    lvlup_char.damage = lvlup_char.damage + pj.damage_lvl;
    lvlup_char.maxexperience = pj.maxexperience;
    lvlup_char.level = pj.level;
    lvlup_char.damage_reduction_flat = lvlup_char.damage_reduction_flat_lvl + pj.damage_reduction_flat_lvl;


    dungeon.user.default_character = default_char;
    dungeon.user.levelup_character = lvlup_char;
    dungeon.user.character = pj;

    firebase.update({
        [`users/${dungeon.user.id}/characters/0`]: lvlup_char,
    });
    return {dungeon:dungeon,pj:pj};
};

export const updateError = (viewer, error) => ({firebase}) => {
    viewer.errorClasse = error;

    firebase.update({
        [`users/${viewer.id}/errorClasse`]: error,
    });

    return {
        type: UPDATE_ERROR,
        payload: viewer,
    }
};

export const showSkillInfos = (viewer, skill) => ({ firebase }) => {
    viewer.info_skill = skill;
    firebase.update({
        [`users/${viewer.id}/info_skill`]: skill,
    });
    return {
        type: SHOW_SKILL_INFO,
        payload: viewer,
    }
};

export const unequipSkill = (viewer, skill) => ({ firebase }) => {

    if(viewer.characters[viewer.active].equipped_spells)
    {
        viewer.characters[viewer.active].learned_spells[skill.id].number = null;
        viewer.characters[viewer.active].learned_spells[skill.id].is_equipped = false;
        viewer.info_skill.is_equipped = false;

        viewer.characters[viewer.active].equipped_spells.map(ep => {
            if(skill.id == ep.id)
            {
                viewer.characters[viewer.active].equipped_spells.splice(skill.number,1);
            }
        });


        let cpt = 0;
        viewer.characters[viewer.active].equipped_spells.map(sk =>{
            sk.number = cpt;
            cpt = cpt+1;
        });
    }

    firebase.update({
        [`users/${viewer.id}`]: viewer,
    });
    return {
        type: UNEQUIP_SKILL,
        payload: viewer,
    }
};

export const equipSkill = (viewer, skill) => ({ firebase }) => {
    if(!viewer.characters[viewer.active].equipped_spells)
    {
        viewer.characters[viewer.active].equipped_spells = [];
    }
    if(viewer.characters[viewer.active].equipped_spells.length<8)
    {
        skill.is_equipped = true;
        viewer.characters[viewer.active].equipped_spells.push(skill);

        let cpt = 0;
        viewer.characters[viewer.active].equipped_spells.map(sk =>{
            sk.number = cpt;
            cpt = cpt+1;
        });
    }
    viewer.info_skill = skill;
    firebase.update({
        [`users/${viewer.id}`]: viewer,
    });
    return {
        type: EQUIP_SKILL,
        payload: viewer,
    }
};