/**
 * Created by Fakebounce on 13/11/2016.
 */

import { Range } from 'immutable';
export const LOAD_TUTO = 'LOAD_TUTO';
export const CREATE_TUTO = 'CREATE_TUTO';

export const LoadTuto = (viewer) => ({firebase}) => {
    console.log("viewer load tuto", viewer);
    if(viewer) {
        const getPromise = async() => {
            try {
                return await firebase.database.ref("Tutoriel")
                    .orderByChild("user")
                    .equalTo(viewer.id)
                    .once("child_added")
                    .then(function (snapshot) {
                        let tutoriel = snapshot.val();
                        return tutoriel;
                    });
            } catch (error) {
                console.log('An error occured. We could not load the dungeon. Try again later.');
                throw error;
            }
        };
        return {
            type: LOAD_TUTO,
            payload: getPromise()
        }
    }
    console.log("pk");
    return {
        type: LOAD_TUTO,
        payload: null,
    };
};

export const CreateTuto = (viewer) => ({ getUid, firebase}) => {
    console.log("create load tuto", viewer);
    if(viewer) {
        var Uid = getUid();
        let TutorielUser = {
            user : viewer.id,
            step : 1,
            close : false,
        };
        console.log("tutoID", Uid);
        console.log("usertuto", TutorielUser);
        const getPromise = async () => {
            try {
                return await firebase.update({
                    [`Tutoriel/${Uid}`]: TutorielUser,
                });
            } catch (error) {
                console.log('An error occured. We could not load the dungeon. Try again later.');
                throw error;
            }
        };

        if(getPromise()){
            return {
                type: CREATE_TUTO,
                payload: getPromise(),
            };
        }
    }
    return {
        type: CREATE_TUTO,
        payload: null,
    };
};
