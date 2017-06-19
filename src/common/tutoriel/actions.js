/**
 * Created by Fakebounce on 13/11/2016.
 */

import { Range } from 'immutable';
export const LOAD_TUTO = 'LOAD_TUTO';
export const LOAD_NOTHING = 'LOAD_NOTHING';
export const LOAD_TUTO_SUCCESS = 'LOAD_TUTO_SUCCESS';
export const CREATE_TUTO = 'CREATE_TUTO';
export const CREATE_TUTO_SUCCESS = 'CREATE_TUTO_SUCCESS';
export const LOAD_STEP = 'LOAD_STEP';
export const LOAD_STEP_SUCCESS = 'LOAD_STEP_SUCCESS';

export const LoadNothing = (snap : Object) => {
    const tutoriel = snap.val();
    return {
        type: LOAD_NOTHING,
        payload: {tutoriel},
    }
};
export const LoadTuto = (viewer) => ({firebase}) => {
    const getPromise = async() => {
        try {
            return await firebase.database.ref("Tutoriel/"+ viewer)
                .once('value')
                .then(function (snapshot) {
                    console.log("load tuto snap", snapshot.val());
                    return snapshot.val();
                });
        } catch (error) {
            console.log('An error occured. We could not load the dungeon. Try again later.');
            throw error;
        }
    };
    return {
        type: LOAD_TUTO,
        payload: getPromise(),
    }
};

export const CreateTuto = (viewer) => ({ getUid, firebase}) => {
        var Uid = getUid();
        const getPromise = async() => {
            try {
                return await firebase.database.ref("tutorialSteps/1")
                    .once('value')
                    .then(function (snapshot) {
                        var s = snapshot.val();
                        let TutorielUser = {
                            user : viewer.id,
                            step : s,
                            close : false,
                        };
                        firebase.update({
                            [`Tutoriel/${viewer.id}`]: TutorielUser,
                        });

                        firebase.update({
                            [`users/${viewer.id}/tuto`]: "in_progress",
                        });
                        return TutorielUser;
                    });
            } catch (error) {
                console.log('An error occured. We could not load the dungeon. Try again later.');
                throw error;
            }
        };

        return {
            type: CREATE_TUTO,
            payload: getPromise(),
        };
};

export const LoadStep = (tuto, viewer) => ({firebase}) => {
    var path = 'tutorialSteps/'+tuto.step.next;
    const getPromise = async () => {
        try {
            return await firebase.database.ref(path).once('value').then(function(snapshot){
                let step = snapshot.val();
                console.log("load step", step);
                if(step){
                    firebase.update({
                        [`Tutoriel/${viewer.id}/step`]: step,
                    });
                }
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
