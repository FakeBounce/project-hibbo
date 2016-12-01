/**
 * Created by Ben on 13/11/2016.
 */


import React from 'react';
import Map from './Map';
import { Block, Text } from '../app/components';

type Props = {
    dungeon: Object,
    firebaseLoadDungeon: () => void,
};

const Dungeon = ({ dungeon, firebaseLoadDungeon }: Props) => {
    const styles = {
        title: {
            cursor: 'pointer',
        },
        delete: {
            cursor: 'pointer',
        },
    };

    return (
        <Block>
            <Text style={styles.title}>
                {dungeon.description}
            </Text>
            <Text onClick={() => firebaseLoadDungeon() }> Load the dungeon</Text>
        </Block>
    );
};

Dungeon.propTypes = {
    dungeon: React.PropTypes.object.isRequired
};

export default Dungeon;
