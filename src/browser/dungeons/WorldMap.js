/**
 * Created by Ben on 13/11/2016.
 */

import React from 'react';
import Maptiles from './Maptiles';
import { Flex, Text, View } from '../app/components';
import { firebase } from '../../common/lib/redux-firebase';
import { LoadWorldMap } from '../../common/worldmap/actions';
import { connect } from 'react-redux';

type Props = {
    worldmap: Object,
    maptiles: Object,
    LoadWorldMap: React.PropTypes.func.isRequired
};

let WorldMap = ({ worldmap,maptiles }: Props) => {
    console.log('worldmap');
    console.log(worldmap);
    return (
        <View>
          {/*<Text onClick={() => LoadWorldMap(worldmap.map)}>Bijour</Text>*/}
        </View>
    );
};

WorldMap.propTypes = {
    worldmap: React.PropTypes.object.isRequired
};

WorldMap = firebase((database, props) => {
    const WorldMapRef = database.child('maps');
    return [
        [WorldMapRef, 'on', 'value', props.LoadWorldMap],
    ];
})(WorldMap);

//export default WorldMap;

export default connect(state => ({
     worldmap: state.worldmap
 }), { LoadWorldMap })(WorldMap);