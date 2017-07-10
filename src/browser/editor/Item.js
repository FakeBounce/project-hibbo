import React from 'react';
import { Flex,Image,Text } from '../app/components';
import { connect } from 'react-redux';
import { } from '../../common/editor/actions';

type Props = {
    item: Object,
    viewer: Object,
    row: Object,
    col: Object,
    worldmap: Object,
};

const Item = ({ row,col,item, viewer,worldmap }: Props) => {

    const styles = {
        margin: '0'
    };

    return (

        <Image className="itemEditor" src={item.image} style={styles}/>
    );
};

Item.propTypes = {
    item: React.PropTypes.object.isRequired,
};

export default connect(state => ({
}), { }) (Item);
