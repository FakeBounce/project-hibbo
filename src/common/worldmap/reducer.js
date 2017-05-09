import * as actions from './actions';
import WorldMap from './worldmap';
import { Record } from '../transit';
import { Seq } from 'immutable';
import { firebaseActions } from '../lib/redux-firebase';

const State = Record({
    worldmap:Map()
}, 'worldmap');

const worldMapReducer = (state = new State(), action) => {
    switch (action.type) {

        case actions.LOAD_WORLD_MAP: {
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

export default worldMapReducer;