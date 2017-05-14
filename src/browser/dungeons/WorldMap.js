/**
 * Created by Ben on 13/11/2016.
 */

import React from 'react';
import MapTiles from './MapTiles';
import { Block, Flex, Text, View,Image } from '../app/components';
import { firebase } from '../../common/lib/redux-firebase';
import { connect } from 'react-redux';

type Props = {
    worldmap: Object,
};

let WorldMap = ({ worldmap }: Props) => {
    console.log('worldmap');
    console.log(worldmap);
    return (
        <View>
            { Object.keys(worldmap.maptiles).map(function (keyRow) {
                var col = Object.keys(worldmap.maptiles[keyRow]).map(function (keyCol) {
                    return(
                        <Image
                            src={worldmap.maptiles[keyRow][keyCol].image}
                        />
                    );
                })
                return (
                  <Block>{col}</Block>
                );

            })

            }
        </View>
    );
};

WorldMap.propTypes = {
    worldmap: React.PropTypes.object.isRequired,
};

// WorldMap = firebase((database, props) => {
//     const WorldMapRef = database.child('maps');
//     return [
//         [WorldMapRef, 'on', 'value', props.LoadWorldMap],
//     ];
// })(WorldMap);

//export default WorldMap;

export default WorldMap;