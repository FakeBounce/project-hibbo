/**
 * Created by bromanelli on 12/10/2016.
 */

import { Range } from 'immutable';

export const MOVE_CHARACTER = 'MOVE_CHARACTER';

export const moveCharacter = (dungeon,char) =>  ({ firebase }) => {
    // firebase.update({
    //     [`maptile/${id}`]: {completed: false, id: id, title: `MapTile #123`},
    // });
    return {
        type: MOVE_CHARACTER,
        payload: promise,
    };
};
