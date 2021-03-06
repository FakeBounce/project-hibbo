/**
 * Created by Fakebounce on 13/11/2016.
 */

import * as actions from './actions';
import Dungeon from './dungeon';
import { Map } from 'immutable';
import { Record } from '../transit';
import { Seq } from 'immutable';

const State = Record({
    loaded: false,
    verifloaded: 1,
    dungeonLoaded: null,
    viewer: null,
    tutoriel: null,
    dungeonsOP: Map(),
    classes: Map(),
    equipments: Map(),
    division: null,
    class: null,
}, 'dungeon');

const dungeonsReducer = (state = new State(), action) => {

    switch (action.type) {

        case actions.LOAD_VIEWER_SUCCESS: {
            let viewer = state.viewer;
            if(viewer == null)
            {
                return state.set('viewer', action.payload.username);
            }
            else {
                viewer = jsonConcat(viewer,action.payload.username);
            }
            return state;
        }

        case actions.LOAD_VIEWER_REF: {
            if(action.payload.viewer)
            {

                let viewer = state.viewer;
                if(viewer != null)
                {
                    viewer = jsonConcat(viewer,action.payload.viewer);
                }
                else {
                    viewer = action.payload.viewer;
                }
                return state.set('viewer', viewer);
            }
            return state;
        }

        case actions.LOAD_VIEWER_CHANGES: {
            let  viewer = action.payload;
            let vviewer = viewer.viewer;
            if(viewer.skills)
            vviewer.skills = viewer.skills;
            if(viewer.weapons)
            vviewer.weapons = viewer.weapons;
            return state.set('viewer', vviewer);
        }

        case actions.LOAD_CLASSES: {
            const classes = action.payload;
            return state.set('classes', classes);
        }

        case actions.LOAD_EQUIPMENTS: {
            const equipments = action.payload;
            return state.set('equipments', equipments);
        }

        case actions.SET_CLASSE: {
            return state.set('viewer', action.payload);
        }

        case actions.LOAD_TUTO_REF: {
            if(action.payload.tutoriel)
            {

                let tutoriel = state.tutoriel;
                if(tutoriel != null)
                {
                    tutoriel = jsonConcat(tutoriel,action.payload.tutoriel);
                }
                else {
                    tutoriel = action.payload.tutoriel;
                }
                return state.set('tutoriel', tutoriel);
            }
            return state;
        }

        case actions.LOAD_NEXT_STEP_SUCCESS: {
            return state.set('tutoriel',action.payload.tutoriel);
        }

        case actions.LOAD_STEP_SUCCESS: {
            return state.set('tutoriel',action.payload.tutoriel);
        }

        case actions.LOAD_SKILLS: {
            const skills = action.payload;
            let viewer = state.viewer;
            if(viewer) {
                viewer.skills = skills.skills;
            }
            return state.set('viewer', viewer);
        }

        case actions.LOAD_WEAPONS: {
          const weapons = action.payload;
          let viewer = state.viewer;
            if(viewer) {
                viewer.weapons = weapons.weapons;
            }
          return state.set('viewer', viewer);
        }

        case actions.LOAD_DUNGEONS: {
            const { dungeons } = action.payload;
            const list = Seq(dungeons)
                    // .map(dungeonpPresence => new Dungeon(dungeonpPresence))

                .map(dungeonpPresence => new Dungeon(dungeonpPresence))
                .toList();
            return state.set('loaded', true)
                .set('dungeonLoaded', list);
        }

        case actions.CANCEL_DUNGEON: {
            const dungeonsOP = action.payload;
            if(dungeonsOP)
            {
                return state.update('dungeonsOP', map => map.set(state.viewer.id,null));
            }
            return state;
        }

        case actions.LOAD_WORLD_MAP_SUCCESS: {
            const dungeonsOP = action.payload;
            const list = Seq(dungeonsOP)
            // .map(dungeonpPresence => new Dungeon(dungeonpPresence))
                .toList();
            // state.dungeonsOP[action.payload.id].set(action.payload);

            return state.update('dungeonsOP', map => map.set(state.viewer.id,dungeonsOP));
        }

        case actions.PRELOAD_ACTIVE_DUNGEON_SUCCESS: {
            const dungeonsOP = action.payload;
            if(dungeonsOP)
            {
                return state.update('dungeonsOP', map => map.set(state.viewer.id,dungeonsOP));
            }
            return state;
        }

        case actions.RELOAD_WORLD_MAP: {
            const dungeonsOP = action.payload.dungeons;
            if(dungeonsOP != null && !dungeonsOP.stop_turn)
            {
                return state.update('dungeonsOP', map => map.set(state.viewer.id,dungeonsOP));
            }
            return state;
        }

        case actions.END_MONSTER_TURN: {
            let payload = action.payload;
            let vl = state.verifloaded;
            vl++;
            return state.update('dungeonsOP', map => map.set(state.viewer.id,payload))
                .set('verifloaded',vl);
        }

        case actions.ATTACK_MONSTER: {
            let payload = action.payload;
            let vl = state.verifloaded;
            vl++;
            return state.update('dungeonsOP', map => map.set(state.viewer.id,payload))
                .set('verifloaded',vl);
        }

        case actions.MOVE_CHARACTER: {
            let payload = action.payload;
            let vl = state.verifloaded;
            vl++;
            return state.update('dungeonsOP', map => map.set(state.viewer.id,payload))
                .set('verifloaded',vl);
        }

        case actions.MOVING_CHARACTER: {
            let payload = action.payload;
            let vl = state.verifloaded;
            vl++;
            return state.update('dungeonsOP', map => map.set(state.viewer.id,payload))
                .set('verifloaded',vl);
        }

        case actions.CAN_ATTACK_MONSTER: {
            let payload = action.payload;
            let vl = state.verifloaded;
            vl++;
            return state.update('dungeonsOP', map => map.set(state.viewer.id,payload))
                .set('verifloaded',vl);
        }

        case actions.END_TURN: {
            let payload = action.payload;
            let vl = state.verifloaded;
            vl++;
            return state.update('dungeonsOP', map => map.set(state.viewer.id,payload))
                .set('verifloaded',vl);
        }

        case actions.MONSTER_TURN: {
            let payload = action.payload;
            let vl = state.verifloaded;
            vl++;
            return state.update('dungeonsOP', map => map.set(state.viewer.id,payload))
                .set('verifloaded',vl);
        }

        case actions.MONSTER_MOVE: {
            let payload = action.payload;
            let vl = state.verifloaded;
            vl++;
            return state.update('dungeonsOP', map => map.set(state.viewer.id,payload))
                .set('verifloaded',vl);
        }

        case actions.SET_PSEUDO: {
            let payload = action.payload;
            if(payload.length > 0){
                return state.set("pseudo",payload);
            }
            return state;
        }

        case actions.CREATE_PERSO: {
            return state;
        }

        case actions.ADD_EQUIPMENT: {
            let payload = action.payload;
            return state;
        }

        case actions.CAN_USE_SKILL: {
            let payload = action.payload;
            let vl = state.verifloaded;
            vl++;
            return state.update('dungeonsOP', map => map.set(state.viewer.id,payload))
                .set('verifloaded',vl);
        }

        case actions.TRY_SKILL: {
            let payload = action.payload;
            let vl = state.verifloaded;
            vl++;
            return state.update('dungeonsOP', map => map.set(state.viewer.id,payload))
                .set('verifloaded',vl);
        }

        case actions.TRY_ITEM: {
            let payload = action.payload;
            let vl = state.verifloaded;
            vl++;
            return state.update('dungeonsOP', map => map.set(state.viewer.id,payload))
                .set('verifloaded',vl);
        }

        case actions.END_SKILL: {
            let payload = action.payload;
            let vl = state.verifloaded;
            vl++;
            return state.update('dungeonsOP', map => map.set(state.viewer.id,payload))
                .set('verifloaded',vl);
        }

        case actions.SHOW_AOE_SKILL: {
            let payload = action.payload;
            let vl = state.verifloaded;
            vl++;
            return state.update('dungeonsOP', map => map.set(state.viewer.id,payload))
                .set('verifloaded',vl);
        }

        case actions.SHOW_RANGE_TARGET: {
            let payload = action.payload;
            let vl = state.verifloaded;
            vl++;
            return state.update('dungeonsOP', map => map.set(state.viewer.id,payload))
                .set('verifloaded',vl);
        }

        case actions.UNSET_RANGE_TARGET: {
            let payload = action.payload;
            let vl = state.verifloaded;
            vl++;
            return state.update('dungeonsOP', map => map.set(state.viewer.id,payload))
                .set('verifloaded',vl);
        }

        case actions.CHANGE_GRID: {
            let payload = action.payload;
            let vl = state.verifloaded;
            vl++;
            return state.update('dungeonsOP', map => map.set(state.viewer.id,payload))
                .set('verifloaded',vl);
        }

        case actions.SWITCH_PANNEL: {
            let payload = action.payload;
            let vl = state.verifloaded;
            vl++;
            return state.update('dungeonsOP', map => map.set(state.viewer.id,payload))
                .set('verifloaded',vl);
        }

        case actions.END_DUNGEON: {
            let payload = action.payload;
            let vl = state.verifloaded;
            vl++;
            return state.update('dungeonsOP', map => map.set(state.viewer.id,payload))
                .set('verifloaded',vl);
        }

        case actions.SHOW_SKILL_INFO: {
            let vl = state.verifloaded;
            vl++;
            return state.set('verifloaded',vl);
        }

        case actions.UNEQUIP_SKILL: {
            let vl = state.verifloaded;
            vl++;
            return state.set('verifloaded',vl);
        }

        case actions.EQUIP_SKILL: {
            let vl = state.verifloaded;
            vl++;
            return state.set('verifloaded',vl);
        }

        default:
            return state;
    }
};

export default dungeonsReducer;

function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
    return o1;
}
