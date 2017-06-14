/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import { Block, View, Text, Image,Loading } from '../app/components';
import { connect } from 'react-redux';
import { firebase } from '../../common/lib/redux-firebase';
import { LoadTuto } from '../../common/tutoriel/actions';


let Tutoriel = ({ tutoriel }) => {
    console.log("tit", tutoriel);
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

Tutoriel = firebase((database, props) => {
    const TutorialRef = database.child('Tutoriel');
    return [
        [TutorialRef, 'on', 'value', props.LoadTuto],
    ];
})(Tutoriel);

export default connect(state => ({
    tutoriel: state.dungeons,
    viewer: state.viewer
}), { LoadTuto })(Tutoriel);
