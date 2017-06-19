/**
 * Created by Fakebounce on 13/11/2016.
 */

import { Range } from 'immutable';
export const LOAD_VIEWER_TUTO_SUCCESS = 'LOAD_VIEWER_TUTO_SUCCESS';
export const LOAD_TUTO = 'LOAD_TUTO';
export const RELOAD_TUTOS = 'RELOAD_TUTOS';
export const LOAD_TUTO_SUCCESS = 'LOAD_TUTO_SUCCESS';
export const CREATE_TUTO = 'CREATE_TUTO';
export const CREATE_TUTO_SUCCESS = 'CREATE_TUTO_SUCCESS';
export const LOAD_STEP = 'LOAD_STEP';
export const LOAD_STEP_SUCCESS = 'LOAD_STEP_SUCCESS';

export const reloadTutos = (snap : Object) => {
    const tutoriel = snap.val();
    return {
        type: RELOAD_TUTOS,
        payload: {tutoriel},
    }
};

export const LoadViewer = (viewer) => ({ firebase }) => {
    if(viewer)
    {
        const getPromise = async () => {
            try {
                return await firebase.database.ref('/users/'+viewer.id).once('value').then(function(snapshot) {
                    var username = snapshot.val();
                    return username;
                });
            } catch (error) {
                console.log('An error occured. We could not load the dungeon. Try again later.');
                throw error;
            }
        };
        return {
            type: 'LOAD_VIEWER_TUTO',
            payload: getPromise(),
        };
    }
    return {
        type: 'LOAD_VIEWER_TUTO',
        payload: '',
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
                if(step){
                    firebase.update({
                        [`Tutoriel/${viewer.id}/step`]: step,
                    });
                    tuto.step = step;
                }
                return tuto;
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
