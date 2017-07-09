import React from 'react';
import { Flex, Text } from '../app/components';
import { connect } from 'react-redux';
import { addDefaultDungeon } from '../../common/maptiles/actions';


type Props = {
    viewer: Object,
};

const AddDefault = ({ viewer,addDefaultDungeon }) => {
    const styles = {
        delete: {
            cursor: 'pointer',
        },
    };

    return (
        <Flex onClick={() => addDefaultDungeon(viewer)}>
            Cliquez ici pour ADD FAKE DUNGEON
        </Flex>
    );
};



AddDefault.propTypes = {
    viewer: React.PropTypes.object.isRequired,
};
export default connect(state => ({
    viewer: state.users.viewer,
}), { addDefaultDungeon })(AddDefault);