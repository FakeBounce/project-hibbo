/**
 * Created by Ben on 13/11/2016.
 */


import React from 'react';
import WorldMap from './WorldMap';
import { Block, Text } from '../app/components';
import { LoadWorldMap } from '../../common/worldmap/actions';

type Props = {
    dungeon: Object,
};

const Dungeon = ({ dungeon }: Props) => {
    const styles = {
        title: {
            cursor: 'pointer',
        },
        delete: {
            cursor: 'pointer',
        },
    };

var wm = {
    'id':3,
    'maptiles' : ['http://fakebounce.fr/asset/img/forest.png'],
    'name' : 'testwm'
};
    console.log('wm');
console.log(wm);
    return (
        <Block>
            <Text style={styles.title}>
                Description : {dungeon.description}
            </Text>
            <WorldMap
                worldmap={wm}
            ></WorldMap>
        </Block>
    );
};

Dungeon.propTypes = {
    dungeon: React.PropTypes.object.isRequired
};

export default Dungeon;
