/**
 * Created by Ben on 13/11/2016.
 */

import React from 'react';
import Maptiles from './Maptiles';
import { Flex, Text, View } from '../app/components';
import { firebase } from '../../common/lib/redux-firebase';
import { connect } from 'react-redux';

type Props = {
    worldmap: Object,
    LoadWorldMap: () => void,
};

let WorldMap = ({ worldmap }: Props) => {
    return (
        <View>
          <Text onClick={() => LoadWorldMap(worldmap.id)}> Bijour</Text>
        </View>
    );
};

WorldMap.propTypes = {
    worldmap: React.PropTypes.object.isRequired,
    LoadWorldMap: React.PropTypes.func.isRequired,
};

// WorldMap = firebase((database, props) => {
//     const WorldMapRef = database.child('maps');
//     return [
//         [WorldMapRef, 'on', 'value', props.LoadWorldMap],
//     ];
// })(WorldMap);

//export default WorldMap;

export default WorldMap;