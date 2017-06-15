/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import { View, Button} from '../app/components';
import { connect } from 'react-redux';
import { firebase } from '../../common/lib/redux-firebase';
import { LoadTuto, CreateTuto, LoadStep } from '../../common/tutoriel/actions';

let Tutoriel = ({ CreateTuto, LoadTuto, viewer, tutoriel, LoadStep }) => {
    var display = false;
    if(viewer && !tutoriel)
    {
        var load = LoadTuto(viewer.id);
        console.log("load", load);
        if(!tutoriel)
        {
            CreateTuto(viewer, 1);
        }
    }

    if(tutoriel)
    {
        console.log("tuto",tutoriel);
        display = true;
    }
    else{
        console.log("tuto null",tutoriel);
    }

    //Load step à chaque click
    const nextStep = function(){
        if(tutoriel){
            LoadStep(tutoriel)
        }
    };


    return (
        <View>
            {display &&
                <View className="testmaxime">
                    Bonjour
                    <Button onClick={nextStep}> Next </Button>
                </View>
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
}), { LoadTuto, CreateTuto, LoadStep })(Tutoriel);
