/**
 * Created by Ben on 13/11/2016.
 */

import * as actions from './actions';
import Dungeon from './dungeon';
import { Map } from 'immutable';
import { Record } from '../transit';
import { Seq } from 'immutable';
import { firebase } from '../../common/lib/redux-firebase';

const State = Record({
    map: Map(),
    loaded: false,
    dungeonLoaded: null,
}, 'dungeon');

const dungeonsReducer = (state = new State(), action) => {
    switch (action.type) {

        case actions.FIREBASE_LOAD_DUNGEON: {
            const dungeon = new Dungeon(action.payload);
            return state.update('map', map => map.set(dungeon.id, dungeon));
        }

        case actions.LIST_DUNGEONS: {
            const dungeons = action.payload.reduce((dungeons, json) =>
                dungeons.set(json.id, new Dungeon(json)),Map());
            return state.update('map', map => map.merge(dungeons));
        }

        case actions.LAUNCH_DUNGEON: {
            const dungeon = new Dungeon(action.payload);
            return state.update('map', map => map.set(dungeon.id, dungeon));
        }

        case actions.ON_ACTIVE_DUNGEON: {
            const dungeons = action.payload.reduce((dungeons, json) =>
                dungeons.set(json.id, new Dungeon(json)),Map());

            return state.update('map', map => map.merge(dungeons));
        }

        case actions.LOAD_DUNGEONS: {

            const dungeons = action.payload.dungeons;
            const presence = action.payload;
            const list = presence && Seq(presence).map(dungeons => Seq(dungeons)
                    .last()
                ).toList();

            return state.update('map', map => map.merge(dungeons))
                .set('loaded', true)
                .set('dungeonLoaded', list);
        }

        default:
            return state;

    }
};

export default dungeonsReducer;