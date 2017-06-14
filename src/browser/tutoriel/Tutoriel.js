/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import { Block, View, Text, Image,Loading } from '../app/components';
import { connect } from 'react-redux';
import { firebase } from '../../common/lib/redux-firebase';
import { LoadTuto, CreateTuto } from '../../common/tutoriel/actions';


let Tutoriel = ({ CreateTuto, LoadTuto, viewer, tutoriel }) => {
    if(!tutoriel)
    {
        var load = LoadTuto(viewer);
    }
    //console.log("tit", tutoriel);
    //var tutorielStep = LoadTuto(viewer);
    /*if(tutorielStep.payload == null)
    {
        CreateTuto(viewer);
    }*/
    console.log("tit2", load);
    console.log("tit3", tutoriel);
    return (
        <View>
            {tutoriel ?
                <Block className="testmaxime">
                    Bonjour
                    </Block>
                :
                <Block className="testmaxime">
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
