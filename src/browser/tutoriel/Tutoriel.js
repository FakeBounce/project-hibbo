/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import { View, Button} from '../app/components';
import { connect } from 'react-redux';
import { firebase } from '../../common/lib/redux-firebase';
import { LoadTuto, CreateTuto, LoadStep, reloadTutos } from '../../common/tutoriel/actions';

let Tutoriel = ({ CreateTuto, LoadTuto, viewer, tutoriel, LoadStep}) => {
    var display = false;
    var tuto = null;
    var close = true;
    if(tutoriel)
    {
        tutoriel.map(t => {
            console.log("t", t);
            if(t){
                if(t.step != null)
                {
                    tuto = t;
                }
                if(t.close != null)
                {
                    close = t.close;
                }
            }

        });
        console.log("tutoriel", tutoriel);
        console.log("tuto", tuto);
        if(tuto == null && viewer){
            console.log(viewer);
            console.log("tuto 2", tuto);
                var load = CreateTuto(viewer);
        }

        if(tuto && tuto.step && tuto.step.description && !close)
        {
            display = true;
        }
        else{
            console.log("tuto step", tuto);
        }
    }



    //Load step à chaque click
    const nextStep = function(){
        if(tuto){
            var step = LoadStep(tuto, viewer)
        }
    };


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
    viewer: React.PropTypes.object.isRequired,
    LoadTuto: React.PropTypes.func.isRequired,
};

export default connect(state => ({
    tutoriel: state.tutoriel,
    viewer: state.users.viewer,
}), { LoadTuto, CreateTuto, LoadStep, reloadTutos })(Tutoriel);
