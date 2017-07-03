import { Range } from 'immutable';
export const LOAD_MAPS = 'LOAD_MAPS';
export const LOAD_MAPTILES = 'LOAD_MAPTILES';
export const LOAD_WORLD_MAP = 'LOAD_WORLD_MAP';
export const LOAD_WORLD_MAP_SUCCESS = 'LOAD_WORLD_MAP_SUCCESS';
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
        type: LOAD_WORLD_MAP,
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
            worldmap.worldmap.maptiles[row][col].character = null;
        }
        else {
            worldmap.worldmap.maptiles[row][col].character = monster;
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


export const ActiveMapDungeon = (worldmap) =>  ({ getUid,firebase }) => {

    if(worldmap)
    {
        let id = getUid();

        firebase.update({
            [`dungeons/${id}`]: {id : id,worldmap: worldmap.id, name:worldmap.name, description:""},
            [`maps/${worldmap.id}/active_dungeon`]: id,
        });

    }

    return {
        type: ACTIVE_DUNGEONS,
        payload: worldmap,
    };
};
export const RemoveMapDungeon = (worldmap) =>  ({firebase }) => {

    if(worldmap)
    {
        firebase.update({
            [`dungeons/${worldmap.active_dungeon}`]: null,
            [`maps/${worldmap.id}/active_dungeon`]: null,
        });
    }

    return {
        type: REMOVE_DUNGEONS,
        payload: worldmap,
    };
};

function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
    return o1;
}

