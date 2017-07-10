import React from 'react';
import { Flex,Image,Text } from '../app/components';
import { connect } from 'react-redux';
import { } from '../../common/editor/actions';

type Props = {
    viewer: Object,
    row: Object,
    col: Object,
    worldmap: Object,
};

const ShadowMonster = ({ row,col, viewer,worldmap }: Props) => {

    const styles = {
        margin: '0'
    };

    return (

        <Image className="shadowmonsterEditor" src={'/assets/images/monsters/ShadowMonster.png'} style={styles}/>
    );
};

ShadowMonster.propTypes = {
    monster: React.PropTypes.object.isRequired,
};

export default connect(state => ({
}), { }) (ShadowMonster);
