/**
 * Created by Fakebounce on 13/11/2016.
 */

import { Range } from 'immutable';
export const LOAD_TUTO = 'LOAD_TUTO';

export const LoadTuto = (snap: Object) => {
    const tutoriel = snap.val();
    console.log("action",tutoriel);
    return {
        type: LOAD_TUTO,
        payload: { tutoriel },
    };
};
