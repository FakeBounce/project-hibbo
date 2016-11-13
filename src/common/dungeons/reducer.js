/**
 * Created by Ben on 13/11/2016.
 */

import * as actions from './actions';
import Dungeon from './dungeon';
import { Map } from 'immutable';
import { Record } from '../transit';
import { firebase } from '../../common/lib/redux-firebase';

const State = Record({
    map: Map(),
}, 'dungeon');

const dungeonsReducer = (state = new State(), action) => {
    switch (action.type) {

        case actions.LAUNCH_DUNGEON: {
            const dungeon = new Dungeon(action.payload);
            return state.update('map', map => map.set(dungeon.id, dungeon));
        }

        default:
            return state;

    }
};

export default dungeonsReducer;