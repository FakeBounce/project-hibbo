/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import MapTile from './MapTile';
import { Block, Flex, Text, View,Image } from '../app/components';
import { firebase } from '../../common/lib/redux-firebase';
import { connect } from 'react-redux';

type Props = {
    worldmap: Object,
};

let WorldMap = ({ worldmap }: Props) => {
    return (
        <View>
            { Object.keys(worldmap.maptiles).map(function (keyRow) {
                var col = Object.keys(worldmap.maptiles[keyRow]).map(function (keyCol) {
                    return(
                        <MapTile key={worldmap.maptiles[keyRow][keyCol].id}
                            row={keyRow} col={keyCol} maptile={worldmap.maptiles[keyRow][keyCol]}
                        />
                    );
                })
                return (
                  <Flex key={keyRow} >{col}</Flex>
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