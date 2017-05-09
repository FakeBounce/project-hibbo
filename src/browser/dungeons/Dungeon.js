/**
 * Created by Ben on 13/11/2016.
 */


import React from 'react';
import { Block, Text } from '../app/components';


type Props = {
    dungeon: Object,
    loadWorldMap: () => void,
};

const Dungeon = ({ dungeon,loadWorldMap }: Props) => {
    const styles = {
        title: {
            cursor: 'pointer',
        },
        delete: {
            cursor: 'pointer',
        },
    };

console.log("maxime",dungeon);
    return (
        <Block>
            <Text style={styles.title}
                  onClick={() => loadWorldMap(dungeon.worldmap)}>
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
    loadWorldMap: React.PropTypes.func.isRequired
};

export default Dungeon;
