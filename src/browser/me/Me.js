/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';

import SignOut from '../auth/SignOut';
import { Block, View, Text, Image,Loading } from '../app/components';
import { connect } from 'react-redux';
import { firebase } from '../../common/lib/redux-firebase';
import { LoadViewer} from '../../common/users/actions';



let Me = ({viewer,dviewer,LoadViewer}) => {

    if(!dviewer)
    {
        LoadViewer(viewer);
    }else {
        if (viewer) {
        }
    }
    return (
        <View>
            {
                viewer?
                    <Text>{viewer.displayName}</Text>
                    :
                    <Text>Aucun Uti</Text>

            }


        </View>
    );
};


Me.propTypes = {
    viewer: React.PropTypes.object,
    dviewer : React.PropTypes.object,
    LoadViewer : React.PropTypes.func.isRequired,
};


export default connect(state => ({

    dviewer: state.dungeons.viewer,
    viewer: state.users.viewer,
}), {LoadViewer})(Me);
