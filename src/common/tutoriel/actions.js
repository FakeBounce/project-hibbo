/**
 * Created by Fakebounce on 13/11/2016.
 */

import { Range } from 'immutable';
export const LOAD_TUTO = 'LOAD_TUTO';
export const LOAD_TUTO_SUCCESS = 'LOAD_TUTO_SUCCESS';
export const CREATE_TUTO = 'CREATE_TUTO';

export const LoadTuto = (viewer) => ({firebase}) => {
    const getPromise = async() => {
        try {
            return await firebase.database.ref("Tutoriel/user")
                .equalTo(viewer)
                .once('value')
                .then(function (snapshot) {
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
        let TutorielUser = {
            user : viewer.id,
            step : 1,
            close : false,
        };
        firebase.update({
            [`Tutoriel/${viewer.id}`]: TutorielUser,
        });

        return {
            type: CREATE_TUTO,
            payload: TutorielUser,
        };
};
