/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import { View, Button} from '../app/components';
import { connect } from 'react-redux';
import { firebase } from '../../common/lib/redux-firebase';
import { LoadTuto, CreateTuto, LoadStep, reloadTutos,LoadViewer } from '../../common/tutoriel/actions';

let Tutoriel = ({ tutoriel,viewer,tviewer,CreateTuto, LoadTuto,LoadViewer,   LoadStep}) => {
    var display = false;
    var tuto = null;
    var close = true;

    if(!tviewer)
    {
        LoadViewer(viewer);
    }
    else
    {
        tutoriel.map(t => {
            if (t) {
                if (t.step != null) {
                    tuto = t;
                }
                if (t.close != null) {
                    close = t.close;
                }
            }

        });
        if (tuto == null && viewer) {
            var load = CreateTuto(viewer);
        }

        if (tuto && tuto.step && tuto.step.description && !close) {
            display = true;
        }
    }
    //Load step à chaque click
    const nextStep = function(){
        if(tuto){
            var step = LoadStep(tuto, viewer)
        }
    }


    return (
        <View>
            {display ?
                <View className="testmaxime">
                    { tuto.step.description }
                    <Button onClick={nextStep}> Next </Button>
                </View>
                :
                <div></div>
            }
        </View>
    );
};

Tutoriel = firebase((database, props) => {
    const TutorielRef = database.child('Tutoriel');
    return [
        [TutorielRef, 'on', 'value', props.reloadTutos],
    ];
})(Tutoriel);


Tutoriel.propTypes = {
    tutoriel: React.PropTypes.object,
    viewer: React.PropTypes.object,
    tviewer: React.PropTypes.object,
    LoadTuto: React.PropTypes.func.isRequired,
    LoadViewer: React.PropTypes.func.isRequired,
    reloadTutos: React.PropTypes.func.isRequired,
};

export default connect(state => ({
    tutoriel: state.tutoriel,
    viewer: state.users.viewer,
    tviewer: state.tutoriel.viewer,
}), { LoadTuto, CreateTuto, LoadStep, reloadTutos,LoadViewer })(Tutoriel);
