/**
 * Created by bromanelli on 11/10/2016.
 */
import React from 'react';
import { Flex, Text } from '../app/components';
import { connect } from 'react-redux';
import { deleteUser } from '../../common/maptiles/actions';


type Props = {
    viewer: Object,
};

const Reset = ({ viewer,deleteUser }) => {
    const styles = {
        delete: {
            cursor: 'pointer',
        },
    };

    return (
        <Flex style={styles.delete} onClick={() => deleteUser(viewer)}>
            Cliquez ici pour vous remettre à 0
        </Flex>
    );
};



Reset.propTypes = {
    viewer: React.PropTypes.object.isRequired,
};
export default connect(state => ({
    viewer: state.users.viewer,
}), { deleteUser })(Reset);