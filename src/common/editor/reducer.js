/**
 * Created by Fakebounce on 13/11/2016.
 */

import * as actions from './actions';
import Editor from './editor';
import MapTile from './maptile';
import Monster from './monster';
import Item from './item';
import { Record } from '../transit';
import { Seq } from 'immutable';
import { Map } from 'immutable';

const State = Record({
    maptiles: null,
    worldmaps:null,
    monsters:null,
    items:null,
    loaded: false,
    viewer: null,
    activeMap: Map(),
    activeTile: Map(),
    activeMonster: Map(),
    activeObject: Map(),

}, 'editor');

const editorReducer = (state = new State(), action) => {

    switch (action.type) {

        case actions.LOAD_VIEWER_SUCCESS: {
            let viewer = state.viewer;

            if(!viewer)
            {
                return state.set('viewer', action.payload.username);
            }
            return state;
        }
        case actions.LOAD_MAPS: {
            const { maps } = action.payload;
            const list = Seq(maps)
            // .map(dungeonpPresence => new Dungeon(dungeonpPresence))

                .map(maprefPresence => new Editor(maprefPresence))
                .toList();
            return state.set('loaded', true)
                .set('worldmaps', list);

        }

        case actions.LOAD_EDITOR_MAPS: {
            const { editormaps } = action.payload;
            const list = Seq(editormaps)
                .map(maprefPresence => new Editor(maprefPresence))
                .toList();
            return state.set('loaded', true)
                .set('worldmaps', list);

        }

        case actions.LOAD_MAPTILES: {
            const { maptiles} = action.payload;

            const list = Seq(maptiles)
            .map(maptilesPresence => new MapTile(maptilesPresence))
                .toList();

            return state.set('loaded', true)
                .set('maptiles',list);
        }

        case actions.LOAD_MONSTERS: {
            const { monsters} = action.payload;

            const list = Seq(monsters)
            .map(monstersPresence => new Monster(monstersPresence))
                .toList();

            return state.set('loaded', true)
                .set('monsters',list);
        }
        case actions.LOAD_ITEMS: {
            const { items } = action.payload;

            const list = Seq(items)
            .map(itemsPresence => new Item(itemsPresence))
                .toList();

            return state.set('loaded', true)
                .set('items',list);
        }

        case actions.LOAD_ACTIVE_MAP: {
            const {activeMap} = action.payload;

            const list = Seq(activeMap)
                .map(activeMapPresence => new MapTile(activeMapPresence))
                .toList();

            return state.set('loaded', true)
                .set('maptiles',list);
        }

        case actions.LOAD_EDIT_MAP_SUCCESS: {

            const worldmaps = action.payload;

            return state.update('activeMap', map => map.set(state.viewer.id,worldmaps));
        }


        case actions.CANCEL_WORLDMAP: {
            const activeMap = action.payload;
            if(activeMap)
            {
                return state.update('activeMap', map => map.set(state.viewer.id,null));
            }
            return state;
        }

        case actions.SAVE_WORLDMAP: {
            const activeMap = action.payload;
            if(activeMap)
            {
                return state.update('activeMap', map => map.set(state.viewer.id,null));
            }
            return state;
        }

        case actions.PICK_TILE_SUCCESS: {
            const maptile = action.payload;

            return state.update('activeTile', map => map.set(state.viewer.id,maptile));
        }
        case actions.PICK_ITEM_SUCCESS: {
            const item = action.payload;

            return state.update('activeObject', map => map.set(state.viewer.id,item));
        }

        case actions.PICK_MONSTER_SUCCESS: {
            const monster = action.payload;
            return state.update('activeMonster', map => map.set(state.viewer.id,monster));
        }

        case actions.PICK_MAP_TILE: {
            const worldmap = action.payload;
            return state.update('worldmaps', map => map.set(worldmap.id,worldmap));
        }


        case actions.RELOAD_ACTIVE_MAP: {
            const { worldmaps } = action.payload;
            if(state.viewer !=null)
                if(state.viewer.id)
                    return state.update('activeMap', map => map.set(state.viewer.id,worldmaps));
            return state;

        }

        default:
            return state;
    }
};

export default editorReducer;