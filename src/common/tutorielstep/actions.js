/**
 * Created by Fakebounce on 13/11/2016.
 */

import { Range } from 'immutable';
export const LOAD_STEP = 'LOAD_STEP';
export const LOAD_STEP_SUCCESS = 'LOAD_STEP_SUCCESS';

export const LoadStep = (tutoriel) => ({firebase}) => {
    var path = 'TutorielStep/'+tutoriel.step;
    const getPromise = async () => {
        try {
            return await firebase.database.ref(path).once('value').then(function(snapshot){
                let step = snapshot.val();
                return step;
            });
        } catch (error) {
            console.log('An error occured. We could not load the dungeon. Try again later.');
            throw error;
        }
    };

    return {
        type: LOAD_STEP,
        payload: getPromise(),
    }
};