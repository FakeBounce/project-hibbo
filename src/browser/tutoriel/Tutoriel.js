/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import { View, Button} from '../app/components';
import { connect } from 'react-redux';
import { firebase } from '../../common/lib/redux-firebase';
import { LoadTuto, CreateTuto, LoadStep } from '../../common/tutoriel/actions';

let Tutoriel = ({ CreateTuto, LoadTuto, viewer, tutoriel, LoadStep}) => {
    var display = false;
    var tuto = null;
    var close = true;
    if(tutoriel)
    {
        tutoriel.map(t => {
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

        if(!tuto &&  viewer){
            console.log(viewer);
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
            console.log("next step",tuto);
            LoadStep(tuto.step.next)
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

Tutoriel.propTypes = {
    tutoriel: React.PropTypes.object,
    viewer: React.PropTypes.object.isRequired,
    LoadTuto: React.PropTypes.func.isRequired,
};

export default connect(state => ({
    tutoriel: state.tutoriel,
    viewer: state.users.viewer,
}), { LoadTuto, CreateTuto, LoadStep })(Tutoriel);
