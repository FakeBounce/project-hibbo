/**
 * Created by Fakebounce on 13/11/2016.
 */

import { Range } from 'immutable';
export const LOAD_TUTO = 'LOAD_TUTO';
export const LOAD_TUTO_SUCCESS = 'LOAD_TUTO_SUCCESS';
export const CREATE_TUTO = 'CREATE_TUTO';
export const CREATE_TUTO_SUCCESS = 'CREATE_TUTO_SUCCESS';
export const LOAD_STEP = 'LOAD_STEP';
export const LOAD_STEP_SUCCESS = 'LOAD_STEP_SUCCESS';

export const LoadTuto = (viewer) => ({firebase}) => {
    console.log("load tuto snap viewer", viewer);
    const getPromise = async() => {
        try {
            return await firebase.database.ref("Tutoriel/user")
                .equalTo(viewer)
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
                            id : Uid,
                            user : viewer.id,
                            step : s,
                            close : false,
                        };
                        firebase.update({
                            [`Tutoriel/${viewer.id}`]: TutorielUser,
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

export const LoadStep = (tutoriel) => ({firebase}) => {
    var path = 'tutorielSteps/'+tutoriel.step.next;
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
