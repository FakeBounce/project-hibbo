/**
 * Created by Ben on 13/11/2016.
 */


import React from 'react';
import { Block, Text } from '../app/components';


type Props = {
    dungeon: Object,
    loadWorldMap: () => void,
    viewer: Object,
};

const Dungeon = ({ dungeon,loadWorldMap,viewer }: Props) => {
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
            <Text style={styles.title}
                  onClick={() => loadWorldMap(dungeon,viewer)}>
                Description : {dungeon.description}
            </Text>
            {/*<WorldMap*/}
                {/*worldmap={dungeon.worldmap}*/}
            {/*></WorldMap>*/}
        </Block>
    );
};

Dungeon.propTypes = {
    dungeon: React.PropTypes.object.isRequired,
    loadWorldMap: React.PropTypes.func.isRequired,
    viewer: React.PropTypes.object,
};

export default Dungeon;
