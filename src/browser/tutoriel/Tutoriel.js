/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import { Block, View, Text, Image,Loading } from '../app/components';
import { connect } from 'react-redux';
import { firebase } from '../../common/lib/redux-firebase';
import { LoadTuto, CreateTuto } from '../../common/tutoriel/actions';


let Tutoriel = ({ CreateTuto, LoadTuto, viewer, tutoriel }) => {
    if(viewer && !tutoriel)
    {
        CreateTuto(viewer);
    }
    if(!tutoriel)
    {
        var test = function () {
            var load = LoadTuto(viewer.id);
        }
    }
    return (
        <View>
            {tutoriel ?
                <Block className="testmaxime">
                    Bonjour
                    </Block>
                :
                <Block className="testmaxime" onClick={test}>
                    Bonsoir
                </Block>
            }
        </View>
    );
};

Tutoriel.propTypes = {
    tutoriel: React.PropTypes.object,
    viewer: React.PropTypes.object,
};

export default connect(state => ({
    tutoriel: state.tutoriel.tutoriel,
    viewer: state.users.viewer
}), { LoadTuto, CreateTuto })(Tutoriel);
