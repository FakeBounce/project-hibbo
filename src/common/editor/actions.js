import { Range } from 'immutable';
export const LOAD_MAPS = 'LOAD_MAPS';
export const LOAD_EDITOR_MAPS = 'LOAD_EDITOR_MAPS';
export const LOAD_MAPTILES = 'LOAD_MAPTILES';
export const LOAD_EDIT_MAP = 'LOAD_EDIT_MAP';
export const LOAD_EDIT_MAP_SUCCESS = 'LOAD_EDIT_MAP_SUCCESS';
export const LOAD_VIEWER_EDITOR = 'LOAD_VIEWER_EDITOR';
export const LOAD_VIEWER_EDITOR_SUCCESS = 'LOAD_VIEWER_EDITOR_SUCCESS';
export const LOAD_ACTIVE_MAP = 'LOAD_ACTIVE_MAP';
export const CANCEL_WORLDMAP = 'CANCEL_WORLDMAP';
export const PICK_TILE = 'PICK_TILE';
export const PICK_MONSTER = 'PICK_MONSTER';
export const PICK_ITEM = 'PICK_ITEM';
export const PICK_TILE_SUCCESS = 'PICK_TILE_SUCCESS';
export const PICK_MONSTER_SUCCESS = 'PICK_MONSTER_SUCCESS';
export const PICK_ITEM_SUCCESS = 'PICK_ITEM_SUCCESS';
export const PICK_MAP_TILE = 'PICK_MAP_TILE';
export const PICK_MAP_MONSTER = 'PICK_MAP_MONSTER';
export const PICK_MAP_OBJECT = 'PICK_MAP_OBJECT';
export const RELOAD_ACTIVE_MAP = 'RELOAD_ACTIVE_MAP';
export const SAVE_WORLDMAP = 'SAVE_WORLDMAP';
export const LOAD_MONSTERS = 'LOAD_MONSTERS';
export const LOAD_ITEMS = 'LOAD_ITEMS';
export const VIEW_MONSTER = 'VIEW_MONSTER';
export const VIEW_OBJECT = 'VIEW_OBJECT';
export const VIEW_TILE = 'VIEW_TILE';
export const ADD_NEW_MAP = 'ADD_NEW_MAP';
export const REMOVE_MAP = 'REMOVE_MAP';
export const REMOVE_DUNGEONS = 'REMOVE_DUNGEONS';
export const ACTIVE_DUNGEONS = 'ACTIVE_DUNGEONS';
export const SAVE_MAP_NAME = 'SAVE_MAP_NAME';
export const FULL_BLOCK_RIGHT = 'FULL_BLOCK_RIGHT';
export const FULL_BLOCK_TOP = 'FULL_BLOCK_TOP';
export const ZOOM_PLUS_EDIT = 'ZOOM_PLUS_EDIT';
export const ZOOM_MINUS_EDIT = 'ZOOM_MINUS_EDIT';
export const MOVE_UP_EDIT = 'MOVE_UP_EDIT';
export const MOVE_DOWN_EDIT = 'MOVE_DOWN_EDIT';
export const MOVE_RIGHT_EDIT = 'MOVE_RIGHT_EDIT';
export const MOVE_LEFT_EDIT = 'MOVE_LEFT_EDIT';

export const loadWorldMap = (worldmap,viewer) =>  ({ getUid, now, firebase }) => {
    var path = 'editormaps/'+worldmap.id;

    if(viewer && worldmap) {

        var Uid = getUid();

        const getPromise = async () => {
            try {
                return await firebase.database.ref(path).once('value').then(function (snapshot) {

                    let worldmap = snapshot.val();

                    let worldmapEdit = {
                        id: Uid,
                        worldmap_id: worldmap.id,
                        name: worldmap.name,
                        user: {
                            id: viewer.id,
                            displayName: viewer.displayName,
                            character: worldmap.character,
                            default_character: {
                                movevement: worldmap.character.movement,
                                action: worldmap.character.action,
                                damage: worldmap.character.damage,
                                maxhealth: worldmap.character.health,
                                maxenergy: worldmap.character.energy,
                                maxexperience: 1000,
                            },
                        },
                        worldmap: worldmap,
                        camera:worldmap,
                        active_dungeon: worldmap.active_dungeon,
                        viewonmonster: false,
                        viewonobject: false,
                        viewontile: false,
                        createdAt: now()
                    };
                    if (worldmap.id) {
                        firebase.update({
                            [`activeMap/${viewer.id}`]: worldmapEdit,
                            [`users/${viewer.id}/active_map`]: Uid,
                        });
                    }

                    return worldmapEdit;
                });
            } catch (error) {
                console.log('An error occured. We could not load the editor. Try again later.');
                throw error;
            }
        };

        return {
            type: LOAD_EDIT_MAP,
            payload: getPromise(),
        }

}else
{
    return {
        type: 'LOAD_EDIT_MAP',
        payload: 'failed'
    }
}
};

export const LoadEditorMaps = (snap: Object) => {
    const editormaps = snap.val();
    return {
        type: LOAD_EDITOR_MAPS,
        payload: { editormaps },
    };
};

export const LoadMapTiles = (snap: Object) => {
    const maptiles = snap.val();
    return {
        type: LOAD_MAPTILES,
        payload: { maptiles },
    };
};

export const LoadMonsters = (snap: Object) => {
    const monsters = snap.val();
    return {
        type: LOAD_MONSTERS,
        payload: { monsters },
    };
};

export const LoadItems = (snap: Object) => {
    const items = snap.val();
    return {
        type: LOAD_ITEMS,
        payload: { items },
    };
};

export const LoadMapActive = (viewer) => ({firebase}) => {

  if(viewer)
  {


    var path = 'activeMap/'+viewer.active_map;
    const getPromise = async () => {
        try {
            return await firebase.database.ref(path).once('value').then(function(snapshot){
                let worldmapEdit = snapshot.val();
                return worldmapEdit;
            });
        } catch (error) {
            console.log('An error occured. We could not load the dungeon. Try again later.');
            throw error;
        }
    };

    return {
        type: LOAD_ACTIVE_MAP,
        payload: getPromise(),
    }
  }else {
      return {
          type: LOAD_ACTIVE_MAP,
          payload: "failed",
      }
  }

};

export const LoadViewerEditor = (viewer) => ({ firebase }) => {
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
            type: 'LOAD_VIEWER_EDITOR',
            payload: getPromise(),
        };
    }else
    {
        return {
            type: 'LOAD_VIEWER_EDITOR',
            payload: ''
        }
    }

};

export const cancelWorldmap = (worldmap) =>  ({ firebase }) => {
    firebase.update({
        [`activeMap/${worldmap.user.id}`]: null,
        [`users/${worldmap.user.id}/active_map`]: null,
        [`activeTile/${worldmap.user.id}`]: null,
        [`activeMonster/${worldmap.user.id}`]: null,
        [`activeObject/${worldmap.user.id}`]: null,


    });

    return {
        type: CANCEL_WORLDMAP,
        payload: worldmap
    }
};

export const saveWorldmap = (worldmap,viewer) =>  ({ firebase }) => {

    worldmap.worldmap.character = worldmap.user.character;

    firebase.update({
        [`editormaps/${worldmap.worldmap_id}`]: worldmap.worldmap,
        [`maps/${worldmap.worldmap_id}`]: worldmap.worldmap,
        [`activeMap/${worldmap.user.id}`]: null,
        [`users/${worldmap.user.id}/active_map`]: null,
        [`activeTile/${worldmap.user.id}`]: null,
        [`activeMonster/${worldmap.user.id}`]: null,
        [`activeObject/${worldmap.user.id}`]: null,
    });

    return {
        type: SAVE_WORLDMAP,
        payload: worldmap
    }
};

export const addNameMap = (name,viewer,worldmap) =>  ({ firebase }) => {

    if(worldmap && name && viewer)
    {
        firebase.update({
            [`activeMap/${worldmap.user.id}/name`]: name,
            [`activeMap/${worldmap.user.id}/worldmap/name`]: name,
        });
    }


    return {
        type: SAVE_MAP_NAME,
        payload: name
    }
};

export const viewMonster = (worldmap) => ({ firebase}) => {


    if(worldmap)
    {
        firebase.update({
            [`activeMap/${worldmap.user.id}/viewonmonster`]: true,
            [`activeMap/${worldmap.user.id}/viewontile`]: false,
            [`activeMap/${worldmap.user.id}/viewonobject`]: false,
        });
    }

    return {
        type: VIEW_MONSTER,
        payload: worldmap
    }
};

export const viewObject = (worldmap) => ({ firebase}) => {

    if(worldmap)
    {
       firebase.update({
           [`activeMap/${worldmap.user.id}/viewonmonster`]: false,
           [`activeMap/${worldmap.user.id}/viewontile`]: false,
           [`activeMap/${worldmap.user.id}/viewonobject`]: true,
       });
    }

    return {
        type: VIEW_OBJECT,
        payload: worldmap
    }
};

export const viewTile = (worldmap) => ({ firebase}) => {

    if(worldmap)
    {
        firebase.update({
            [`activeMap/${worldmap.user.id}/viewonmonster`]: false,
            [`activeMap/${worldmap.user.id}/viewontile`]: true,
            [`activeMap/${worldmap.user.id}/viewonobject`]: false,
        });
    }

    return {
        type: VIEW_TILE,
        payload: worldmap
    }
};

export const pickobject = (item,viewer) =>  ({ firebase }) => {
    var path = 'items/'+item.id;

    const getPromise = async () => {
        try {
            return await firebase.database.ref(path).once('value').then(function(snapshot){
                let item = snapshot.val();

                let itemPick = {
                    "id":item.id,
                    "action_cost":item.action_cost,
                    "aoe_back":item.aoe_back,
                    "aoe_diagonal":item.aoe_diagonal,
                    "aoe_front":item.aoe_front,
                    "name" : item.name,
                    "image" : item.image,
                    "aoe_left":item.aoe_left,
                    "aoe_linear":item.aoe_linear,
                    "aoe_right":item.aoe_right,
                    "can_break":item.can_break,
                    "cast_time":item.cast_time,
                    "css":item.css,
                    "damage_buff_flat":item.damage_buff_flat,
                    "damage_buff_percent":item.damage_buff_percent,
                    "damage_debuff_flat":item.damage_debuff_flat,
                    "damage_debuff_percent":item.damage_debuff_percent,
                    "damage_instant":item.damage_instant,
                    "damage_instant_buff":item.damage_instant_buff,
                    "damage_instant_debuff":item.damage_instant_debuff,
                    "damage_reduction_flat":item.damage_reduction_flat,
                    "damage_reduction_percent":item.damage_reduction_percent,
                    "damage_return":item.damage_return,
                    "damage_return_percent":item.damage_return_percent,
                    "damage_time":item.damage_time,
                    "damage_time_buff_flat":item.damage_time_buff_flat,
                    "damage_time_buff_percent":item.damage_time_buff_percent,
                    "damage_time_debuff_flat":item.damage_time_debuff_flat,
                    "damage_time_debuff_percent":item.damage_time_debuff_percent,
                    "damage_time_duration":item.damage_time_duration,
                    "damage_type":item.damage_type,
                    "description":item.description,
                    "duration":item.duration,
                    "energy_cost":item.energy_cost,
                    "energy_heal":item.energy_heal,
                    "energy_percent_heal":item.energy_percent_heal,
                    "energy_percent_time":item.energy_percent_time,
                    "energy_time":item.energy_time,
                    "get":item.get,
                    "heal_instant":item.heal_instant,
                    "heal_on_energy_percent":item.heal_on_energy_percent,
                    "heal_percent_instant":item.heal_percent_instant,
                    "heal_percent_time":item.heal_percent_time,
                    "heal_time":item.heal_time,
                    "life_buff":item.life_buff,
                    "life_cost":item.life_cost,
                    "life_debuff":item.life_debuff,
                    "movement_buff":item.movement_buff,
                    "movement_debuff":item.movement_debuff,
                    "movement_instant":item.movement_instant,
                    "range_cone":item.range_cone,
                    "range_diagonal":item.range_diagonal,
                    "range_linear":item.range_linear,
                    "range_minimum":item.range_minimum,
                    "range_on_target":item.range_on_target,
                    "rest":item.rest,
                    "self":item.self,
                    "uses":item.uses,
                };

                if(item.id)
                {
                    firebase.update({
                        [`activeObject/${viewer.id}`]: itemPick,
                        [`users/${viewer.id}/active_pickobject`]: item.id,
                    });
                }
                return itemPick;
            });
        } catch (error) {
            console.log('An error occured. We could not load the item. Try again later.');
            throw error;
        }
    };
    return {
        type: PICK_ITEM,
        payload: getPromise(),
    };
};

export const picktile = (maptile,viewer) =>  ({ firebase }) => {
    var path = 'maptiles/'+maptile.id;

    const getPromise = async () => {
        try {
            return await firebase.database.ref(path).once('value').then(function(snapshot){
                let maptile = snapshot.val();

                let maptilePick = {
                    id: maptile.id,
                    image: maptile.image,
                    title : maptile.title,
                    type : maptile.type,
                };
                if(maptile.id)
                {
                    firebase.update({
                        [`activeTile/${viewer.id}`]: maptilePick,
                        [`users/${viewer.id}/active_pick`]: maptile.id,
                      });
                }
                return maptilePick;
            });
        } catch (error) {
            console.log('An error occured. We could not load the tile. Try again later.');
            throw error;
        }
    };
    return {
        type: PICK_TILE,
        payload: getPromise(),
    };
};

export const pickmonster = (monster,viewer) =>  ({ firebase }) => {
    var path = 'monsters/'+monster.id;

        const getPromise = async () => {
            try {
                return await firebase.database.ref(path).once('value').then(function(snapshot){
                    let monster = snapshot.val();
                    let monsterPick;
                    if(monster.type == "pj")
                    {
                        monsterPick = {
                            id: monster.id,
                            image: monster.image,
                            name: monster.name,
                            damage: monster.damage,
                            health: monster.health,
                            maxhealth: monster.maxhealth,
                            type: monster.type,
                            row:0,
                            col:0,
                        };
                    }

                    else{
                        monsterPick = {
                            id: monster.id,
                            image: monster.image,
                            name: monster.name,
                            damage: monster.damage,
                            health: monster.health,
                            maxhealth: monster.maxhealth,
                            experience: monster.experience,
                            movement: monster.movement,
                            range: monster.range,
                            type: monster.type,
                        };
                    }
                    if(monster.id)
                    {
                        firebase.update({
                            [`activeMonster/${viewer.id}`]: monsterPick,
                            [`users/${viewer.id}/active_pickmonster`]: monster.id,
                        });
                    }

                    return monsterPick;
                });
            } catch (error) {
                console.log('An error occured. We could not load the monster. Try again later.');
                throw error;
            }
        };
        return {
            type: PICK_MONSTER,
            payload: getPromise(),
        };

};

export const pickmaptile = (maptile,viewer,worldmap,row,col) =>  ({ getUid,firebase }) => {

    if(maptile)
    {
        if( (maptile.type == "walkable" && worldmap.worldmap.maptiles[row][col].character == null) ||  (maptile.type != "walkable" && worldmap.worldmap.maptiles[row][col].character == null) || (maptile.type != "walkable" && worldmap.worldmap.maptiles[row][col].character == null) )
        {
            var id = maptile.id;
            maptile.id = getUid();

            //update worldmap
            worldmap.worldmap.maptiles[row][col] = jsonConcat(worldmap.worldmap.maptiles[row][col],maptile);
            worldmap.camera.maptiles[row][col] = jsonConcat(worldmap.camera.maptiles[row][col],maptile);

            firebase.update({
                [`activeMap/${viewer.id}`]: worldmap,
            });
            maptile.id = id;
        }
    }
    return {
        type: PICK_MAP_TILE,
        payload: worldmap,
    };

};

export const pickmapmonster = (monster,viewer,worldmap,row,col) => ({ getUid,firebase }) => {

    if(monster)
    {
        var id = monster.id;
        monster.id = getUid();

        if(monster.type == "remove")
        {

            if(typeof worldmap.worldmap.maptiles[row][col].character !== 'undefined' && worldmap.worldmap.monsters)
            {
                delete worldmap.worldmap.monsters[worldmap.worldmap.maptiles[row][col].character.number];
                delete worldmap.camera.monsters[worldmap.camera.maptiles[row][col].character.number];
            }
            worldmap.worldmap.maptiles[row][col].character = null;
            worldmap.camera.maptiles[row][col].character = null;
        }
        else
        if(monster.type == "pj")
        {
            if(worldmap.worldmap.maptiles)
            {
                worldmap.worldmap.maptiles[worldmap.user.character.row][worldmap.user.character.col].character = null;
                worldmap.camera.maptiles[worldmap.user.character.row][worldmap.user.character.col].character = null;

                worldmap.worldmap.maptiles[row][col].character = monster;
                worldmap.camera.maptiles[row][col].character = monster;

                worldmap.user.character.row = row;
                worldmap.user.character.col = col;
                worldmap.worldmap.col_player = col;
                worldmap.worldmap.row_player = row;

            }

        }
        else {
            if(worldmap.worldmap.maptiles[row][col].type !== "wall")
            {
                var mo = monster;
                mo.row = row;
                mo.col = col;
                if (typeof  worldmap.worldmap.monsters === 'undefined') {
                    worldmap.worldmap.monsters = [];
                    worldmap.camera.monsters = [];
                }
                var is_here = false;
                worldmap.worldmap.monsters.map(m => {
                    if (parseInt(m.row) == row && parseInt(m.col) == col) {
                        is_here = m;
                        return true;
                    }

                });
                worldmap.camera.monsters.map(m => {
                    if (parseInt(m.row) == row && parseInt(m.col) == col) {
                        is_here = m;
                        return true;
                    }

                });
                if (is_here) {
                    worldmap.worldmap.monsters[worldmap.worldmap.maptiles[row][col].character.number] = mo;
                    worldmap.camera.monsters[worldmap.worldmap.maptiles[row][col].character.number] = mo;
                }
                else {

                    var testRowIndex = worldmap.worldmap.monsters.push(mo) - 1;
                    var testRowIndex = worldmap.camera.monsters.push(mo) - 1;
                    mo.number = testRowIndex;
                }
                worldmap.worldmap.maptiles[row][col].character = mo;
                worldmap.camera.maptiles[row][col].character = mo;
            }

        }

        firebase.update({
            [`activeMap/${viewer.id}`]: worldmap,
        });
        monster.id = id;
    }


    return {
        type: PICK_MAP_MONSTER,
        payload: worldmap,
    };

};

export const pickmapobject = (item,viewer,worldmap,row,col) => ({ firebase, getUid }) => {

    if(item) {

        if(item.name == "Remove")
        {
            worldmap.camera.maptiles[row][col].item = null;
            worldmap.worldmap.maptiles[row][col].item = null;
        }
        else
        if( worldmap.worldmap.maptiles[row][col].type == "walkable") {

            item.id = getUid();

            //update worldmap
            worldmap.worldmap.maptiles[row][col].item = item;
            worldmap.camera.maptiles[row][col].item = item;
        }
            firebase.update({
                [`activeMap/${viewer.id}`]: worldmap,
            });

    }

    return {
        type: PICK_MAP_OBJECT,
        payload: worldmap,
    };

};

export const ReloadActiveMap = (snap: Object) => {
    const worldmaps = snap.val();
    return {
        type: RELOAD_ACTIVE_MAP,
        payload: { worldmaps },
    };
};

export const ActiveMapDungeon = (worldmap,viewer) =>  ({ getUid,firebase }) => {

    if(worldmap)
    {
        let id = getUid();

        firebase.update({
            [`dungeons/${id}`]:
            {
                id : id,
                worldmap: worldmap.worldmap_id,
                name: worldmap.name,
                description:worldmap.name,
                lock : false,
                from_editor : true,
            },
            [`editormaps/${worldmap.worldmap_id}/active_dungeon`]: id,
            [`activeMap/${viewer.id}/active_dungeon`]: id,
            [`activeMap/${viewer.id}/worldmap/active_dungeon`]: id,
            [`maps/${worldmap.worldmap_id}/active_dungeon`]: id,

        });

    }

    return {
        type: ACTIVE_DUNGEONS,
        payload: worldmap,
    };
};

export const RemoveMapDungeon = (worldmap, viewer) =>  ({firebase }) => {


    if(worldmap && viewer)
    {
        if(viewer.id == worldmap.user.id && worldmap.active_dungeon)
        {

            firebase.update({
                [`dungeons/${worldmap.active_dungeon}`]: null,
                [`editormaps/${worldmap.worldmap_id}/active_dungeon`]: "",
                [`activeMap/${viewer.id}/active_dungeon`]: "",
            });
        }
    }

    return {
        type: REMOVE_DUNGEONS,
        payload: worldmap,
    };
};

export const CreateNewWorldMap = (viewer) =>  ({firebase,getUid }) => {

    var UidMap = getUid();
    let map = {};
    let maptiles = [];
    let character="";

    let activeUser = false;
    if(viewer) {
        if(viewer.characters)
        {
            character = viewer.characters[viewer.active];
        }

        for (var i = 0; i < 16; i++) {
            maptiles[i] = [];

            for (var j = 0; j < 16; j++) {
                maptiles[i][j] = [];

                if (j == 0 && i == 0) {
                    maptiles[i][j] = {
                        completed: false,
                        id: getUid(),
                        image: "/assets/images/maptiles/grass.png",
                        title: "forest",
                        type: "walkable",
                        character: {
                            image: "/assets/images/classes/gface.png",
                            damage: 100,
                            health: 15000,
                            name: "Warrior",
                            type: "pj",
                        }
                    };
                }
                else {
                    maptiles[i][j] =
                        {
                            completed: false,
                            id: getUid(),
                            image: "/assets/images/maptiles/grass.png",
                            title: "forest",
                            type: "walkable",
                        };
                }
            }

        }
        map = {id: UidMap,row_player: character.row,col_player: character.col, name: "YourMap", maptiles : maptiles, active_dungeon:"", size_map:15, size_map_min:0,character : character, row_start:0, row_end:15,col_start:0,col_end:15,user_id:viewer.id};

        firebase.update({
            [`editormaps/${UidMap}`]: map,
            [`maps/${UidMap}`]: map,
        });



        return {
            type: ADD_NEW_MAP,
            payload: map,
        };
    }
    else
    {
        return {
            type: ADD_NEW_MAP,
            payload: "FAILED",
        };
    }
};

export const RemoveWorldmap = (worldmap) =>  ({firebase }) => {

    if(worldmap)
    {
        firebase.update({
            [`editormaps/${worldmap.worldmap_id}`]: null,
            [`activeMap/${worldmap.user.id}`]: null,
            [`maps/${worldmap.worldmap_id}`]: null,

        });

        if(worldmap.active_dungeon != "")
        {
            firebase.update({
                 [`dungeons/${worldmap.active_dungeon}`]: null
            });
        }
    }

    return {
        type: REMOVE_MAP,
        payload: worldmap,
    };
};

export const ZoomEditMap = (camera, viewer,worldmap) =>  ({firebase}) => {

    if(camera && (camera.row_end-camera.row_start) >=11  &&  (camera.col_end-camera.col_start) >= 11)
    {
        camera.row_start = camera.row_start+1;
        camera.col_start = camera.col_start +1;
        camera.row_end = camera.row_end - 1;
        camera.col_end = camera.col_end -1;

        firebase.update({
            [`activeMap/${viewer.id}/camera`]: camera,
        });
    }

    return {
        type: ZOOM_PLUS_EDIT,
        payload: camera
    }
};

export const ZoomMinorEditMap = (camera, viewer,worldmap) => ({firebase}) => {

     if(camera)
     {
            if(camera.row_start - 1 >= 0)
            {
                camera.row_start = camera.row_start -1;
            }
            if(camera.col_start - 1 >= 0)
            {
                camera.col_start = camera.col_start -1;
            }
            if(camera.row_end + 1 <= worldmap.worldmap.size_map)
            {
                camera.row_end = camera.row_end + 1;
            }
            if(camera.col_end +1 <= worldmap.worldmap.size_map)
            {
                camera.col_end = camera.col_end +1;
            }


        firebase.update({
            [`activeMap/${viewer.id}/camera`]: camera,
        });
 }

    return {
        type: ZOOM_MINUS_EDIT,
        payload: camera
    }
};

export const MoveRightEditMap = (camera,viewer,worldmap) =>  ({firebase}) => {

    if(camera)
    {
        if(camera.col_end < worldmap.worldmap.col_end){
            camera.col_start = camera.col_start + 1;
            camera.col_end =  camera.col_end + 1;

            firebase.update({
                [`activeMap/${viewer.id}/camera`]: camera,
            });
        }

    }

    return {
        type: MOVE_RIGHT_EDIT,
        payload: camera
    }
};
export const MoveLeftEditMap = (camera,viewer,worldmap) =>  ({firebase}) => {


    if(camera)
    {
       if(camera.col_start > worldmap.worldmap.col_start){
            camera.col_start = camera.col_start - 1;
            camera.col_end = camera.col_end - 1;

            firebase.update({
                [`activeMap/${viewer.id}/camera`]: camera,
            });
        }

    }


    return {
        type: MOVE_LEFT_EDIT,
        payload: camera
    }
};
export const MoveUpEditMap = (camera,viewer,worldmap) =>  ({firebase}) => {

    if(camera)
    {

        if(camera.row_start > worldmap.worldmap.row_start) {
            camera.row_end = camera.row_end - 1;
            camera.row_start = camera.row_start - 1;

            firebase.update({
                [`activeMap/${viewer.id}/camera`]: camera,
            });
        }
    }

    return {
        type: MOVE_UP_EDIT,
        payload: camera
    }
};
export const MoveDownEditMap = (camera,viewer,worldmap) =>  ({firebase}) => {

    if(camera)
    {

        if(camera.row_end < worldmap.worldmap.row_end) {
            camera.row_end = camera.row_end + 1;
            camera.row_start = camera.row_start + 1;

            firebase.update({
                [`activeMap/${viewer.id}/camera`]: camera,
            });
        }
    }

    return {
        type: MOVE_DOWN_EDIT,
        payload: camera
    }

};
export const FullBlockRight = (row,worldmap, viewer, tile) => ({ getUid,firebase }) => {

    let newmap = worldmap;

    if(row && worldmap && tile)
    {

        for(let i=0; i <= worldmap.camera.size_map ; i++)
        {
            if (!worldmap.camera.maptiles[row][i].character && !worldmap.camera.maptiles[row][i].item) {
                tile.id = getUid();

                newmap.camera.maptiles[row][i].image = tile.image;
                newmap.camera.maptiles[row][i].title = tile.title;
                newmap.camera.maptiles[row][i].type = tile.type;

                worldmap.worldmap.maptiles[row][i].image = tile.image;
                worldmap.worldmap.maptiles[row][i].title = tile.title;
                worldmap.worldmap.maptiles[row][i].type = tile.type;
            }
            else {
                if (tile.type == "walkable") {
                    tile.id = getUid();

                    newmap.camera.maptiles[row][i] = jsonConcat(newmap.camera.maptiles[row][i],tile);
                    worldmap.worldmap.maptiles[row][i] = jsonConcat(newmap.camera.maptiles[row][i],tile);

                }
            }
            tile.id = getUid();
        }
        tile.id = getUid();

        firebase.update({
            [`activeMap/${viewer.id}`]: newmap,
        });

    }

    return {
        type: FULL_BLOCK_RIGHT,
        payload: tile,
    };

};
export const FullBlockTop = (col,worldmap, viewer, tile) => ({ getUid,firebase }) => {

    let newmap = worldmap;

    if(col && worldmap && tile)
        {

            for(let i=0; i <= worldmap.camera.size_map ; i++)
            {
                if (!worldmap.camera.maptiles[i][col].character && !worldmap.camera.maptiles[i][col].item) {

                    tile.id = getUid();

                    worldmap.worldmap.maptiles[i][col] = tile;
                    newmap.camera.maptiles[i][col] = tile;
                }
                else {
                    if (tile.type == "walkable" ) {
                        tile.id = getUid();

                        worldmap.worldmap.maptiles[i][col] = jsonConcat(worldmap.camera.maptiles[i][col],tile);
                        newmap.camera.maptiles[i][col] = jsonConcat(newmap.camera.maptiles[i][col],tile);
                    }
                }
            }
            firebase.update({
                [`activeMap/${viewer.id}`]: newmap,
            });

        }

    return {
        type: FULL_BLOCK_TOP,
        payload: newmap,
    };

};


function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
    return o1;
}

