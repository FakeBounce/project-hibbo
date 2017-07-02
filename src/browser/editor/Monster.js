import React from 'react';
import { Flex,Image,Text } from '../app/components';
import { connect } from 'react-redux';
import { } from '../../common/editor/actions';

type Props = {
    monster: Object,
    viewer: Object,
    row: Object,
    col: Object,
    worldmap: Object,
};

const Monster = ({ row,col,monster, viewer,worldmap }: Props) => {

    const styles = {
        margin: '0px 0px 0px 0px'
    };

    return (

            <Image className="monster" src={monster.image} style={styles}/>
    );
};

Monster.propTypes = {
    monster: React.PropTypes.object.isRequired,
};

export default connect(state => ({
}), { }) (Monster);
