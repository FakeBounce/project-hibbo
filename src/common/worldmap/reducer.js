import * as actions from './actions';
import WorldMap from './worldmap';
import { Record } from '../transit';
import { Seq } from 'immutable';
import { Map } from 'immutable';

const State = Record({
    worldmap:Map(),
}, 'worldmap');

const worldMapReducer = (state = new State(), action) => {
    switch (action.type) {

        case actions.LOAD_WORLD_MAP: {
            return state;
        }
        default:
            return state;

    }
};

export default worldMapReducer;