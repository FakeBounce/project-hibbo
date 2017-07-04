import { Range } from 'immutable';
export const LOAD_MAPS = 'LOAD_MAPS';
export const LOAD_MAPTILES = 'LOAD_MAPTILES';
export const LOAD_EDIT_MAP = 'LOAD_EDIT_MAP';
export const LOAD_EDIT_MAP_SUCCESS = 'LOAD_EDIT_MAP_SUCCESS';
export const LOAD_VIEWER = 'LOAD_VIEWER';
export const LOAD_VIEWER_SUCCESS = 'LOAD_VIEWER_SUCCESS';
export const LOAD_ACTIVE_MAP = 'LOAD_ACTIVE_MAP';
export const CANCEL_WORLDMAP = 'CANCEL_WORLDMAP';
export const PICK_TILE = 'PICK_TILE';
export const PICK_MONSTER = 'PICK_MONSTER';
export const PICK_TILE_SUCCESS = 'PICK_TILE_SUCCESS';
export const PICK_MONSTER_SUCCESS = 'PICK_MONSTER_SUCCESS';
export const PICK_MAP_TILE = 'PICK_MAP_TILE';
export const PICK_MAP_MONSTER = 'PICK_MAP_MONSTER';
export const RELOAD_ACTIVE_MAP = 'RELOAD_ACTIVE_MAP';
export const SAVE_WORLDMAP = 'SAVE_WORLDMAP';
export const LOAD_MONSTERS = 'LOAD_MONSTERS';
export const VIEW_MONSTER = 'VIEW_MONSTER';
export const ADD_NEW_MAP = 'ADD_NEW_MAP';
export const REMOVE_MAP = 'REMOVE_MAP';
export const REMOVE_DUNGEONS = 'REMOVE_DUNGEONS';
export const ACTIVE_DUNGEONS = 'ACTIVE_DUNGEONS';


/************ Dungeon creation in firebase *****************/
export const loadWorldMap = (worldmap,viewer) =>  ({ getUid, now, firebase }) => {
    var path = 'maps/'+worldmap.id;
    console.log("viewer",viewer);
    console.log("worldmap",worldmap);



    var Uid = getUid();
    const getPromise = async () => {
        try {
            return await firebase.database.ref(path).once('value').then(function(snapshot){

                let worldmap = snapshot.val();

                let worldmapEdit = {
                    id: Uid,
                    worldmap_id: worldmap.id,
                    name: worldmap.name,
                    user :
                        {
                            id:viewer.id,
                            displayName:viewer.displayName
                        },
                    worldmap:worldmap,
                    active_dungeon: worldmap.active_dungeon,
                    viewonmonster:false,
                    createdAt: now()
                };
                if(worldmap.id)
                {
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
};

export const LoadMaps = (snap: Object) => {
    const maps = snap.val();
    return {
        type: LOAD_MAPS,
        payload: { maps },
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

export const LoadMapActive = (viewer) => ({firebase}) => {
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
    }else
    {
        return {
            type: 'LOAD_VIEWER',
            payload: ''
        }
    }

};

export const cancelWorldmap = (worldmap) =>  ({ firebase }) => {
    firebase.update({
        [`activeMap/${worldmap.user.id}`]: null,
        [`users/${worldmap.user.id}/active_map`]: null,
    });

    return {
        type: CANCEL_WORLDMAP,
        payload: worldmap
    }
};

export const saveWorldmap = (worldmap) =>  ({ firebase }) => {

    firebase.update({
        [`maps/${worldmap.worldmap_id}`]: worldmap.worldmap,
        [`activeMap/${worldmap.user.id}`]: null,
        [`users/${worldmap.user.id}/active_map`]: null,
    });

    return {
        type: SAVE_WORLDMAP,
        payload: worldmap
    }
};

export const viewMonster = (worldmap) => ({ firebase}) => {
    if(worldmap.viewonmonster)
    {
        firebase.update({
            [`activeMap/${worldmap.user.id}/viewonmonster`]: false,
        });
    }
    else {
        firebase.update({
            [`activeMap/${worldmap.user.id}/viewonmonster`]: true,
        });
    }


    return {
        type: VIEW_MONSTER,
        payload: worldmap
    }
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

                let monsterPick = {
                    id: monster.id,
                    image: monster.image,
                    name : monster.name,
                    damage: monster.damage,
                    health: monster.health,
                    maxhealth: monster.maxhealth,
                    movement: monster.movement,
                    range: monster.range,
                    type: monster.type,
                };
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
        var id = maptile.id;
        maptile.id = getUid();
        worldmap.worldmap.maptiles[row][col] = jsonConcat(worldmap.worldmap.maptiles[row][col],maptile);

        firebase.update({
            [`activeMap/${viewer.id}`]: worldmap,
        });
        maptile.id = id;

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
            }
            worldmap.worldmap.maptiles[row][col].character = null;
        }
        else {
            var mo = monster;
            mo.row = row;
            mo.col = col;
            if(typeof  worldmap.worldmap.monsters === 'undefined')
            {
                worldmap.worldmap.monsters = [];
            }
            var is_here = false;
                worldmap.worldmap.monsters.map(m => {
               if(parseInt(m.row) == row && parseInt(m.col) == col)
               {
                   is_here = m;
                   return true;
               }
            });
                console.log('is here',is_here);
                console.log('is too',worldmap.worldmap.maptiles[row][col].character);
            if(is_here)
            {
                console.log('is not pushed',worldmap.worldmap.maptiles[row][col].character);
                worldmap.worldmap.monsters[worldmap.worldmap.maptiles[row][col].character.number] = mo;
            }
            else {

                var testRowIndex = worldmap.worldmap.monsters.push(mo) - 1;
                mo.number = testRowIndex;
            }
            worldmap.worldmap.maptiles[row][col].character = mo;
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
                description:"",
                lock : false,
                from_editor : true,
            },
            [`maps/${worldmap.worldmap_id}/active_dungeon`]: id,
            [`activeMap/${viewer.id}/active_dungeon`]: id,
        });

    }

    return {
        type: ACTIVE_DUNGEONS,
        payload: worldmap,
    };
};

export const RemoveMapDungeon = (worldmap, viewer) =>  ({firebase }) => {

    if(worldmap)
    {
        firebase.update({
            [`dungeons/${worldmap.active_dungeon}`]: null,
            [`maps/${worldmap.worldmap_id}/active_dungeon`]: "",
            [`activeMap/${viewer.id}/active_dungeon`]: "",
        });
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


    for(var i = 0 ; i <16 ;i ++)
    {
        maptiles[i]=[];

        for(var j = 0 ; j <16 ;j ++)
        {
            maptiles[i][j]=[];

            if(j == 0 && i == 0)
            {
                maptiles[i][j] = {
                    completed: false,
                    id:  getUid(),
                    image: "/assets/images/grass.png",
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
            else
            {
                maptiles[i][j] =
                {
                    completed: false,
                    id: getUid(),
                    image: "/assets/images/grass.png",
                    title: "forest",
                    type: "walkable",
                };
            }
        }
    }

    map = {id: UidMap, name: "newmap", maptiles : maptiles, active_dungeon:""};

    if(viewer)
    {
        firebase.update({
            [`maps/${UidMap}`]: map
        });
    }

    return {
        type: ADD_NEW_MAP,
        payload: map,
    };
};

export const RemoveWorldmap = (worldmap) =>  ({firebase }) => {

    console.log("worldmapid",worldmap.id);
    if(worldmap)
    {
        firebase.update({
            [`maps/${worldmap.worldmap_id}`]: null,
            [`activeMap/${worldmap.user.id}`]: null,
        });
    }

    return {
        type: REMOVE_MAP,
        payload: worldmap,
    };
};


function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
    return o1;
}

