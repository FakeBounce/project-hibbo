/* @flow */
export const ON_USERS_PRESENCE = 'ON_USERS_PRESENCE';
export const LOAD_VIEWER = 'LOAD_VIEWER';
export const LOAD_VIEWER_SUCCESS = 'LOAD_VIEWER_SUCCESS';

export const onUsersPresence = (snap: Object) => {
  const presence = snap.val();
  return {
    type: ON_USERS_PRESENCE,
    payload: { presence },
  };

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
            type: 'LOAD_VIEWER',
            payload: getPromise(),
        };
    }
    return {
        type: 'LOAD_VIEWER',
        payload: ''
    }
};

