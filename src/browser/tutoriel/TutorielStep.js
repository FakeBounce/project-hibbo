import React from 'react';
import { connect } from 'react-redux';
import { View } from '../app/components';
import { LoadStep } from '../../common/tutorielstep/actions';

type Props = {
    tutoriel: Object
};

const TutorielStep = ({ tutoriel, LoadStep, step }) => {

    if(tutoriel && !step){
        LoadStep(tutoriel)
    }
    if(step) {
        return (
            <View>
                {step.description}
            </View>
        );
    }
};

TutorielStep.propTypes = {
    tutoriel: React.PropTypes.object.isRequired,
};

export default connect(state => ({
    tutoriel: state.tutoriel.tutoriel,
    step: state.tutoriel.tutoriel.step
}), { LoadStep })(TutorielStep);
