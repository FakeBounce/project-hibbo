/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import MapTile from '../editor/MapTile';
import { Block, Flex, Text, View,Image } from '../app/components';
import { firebase } from '../../common/lib/redux-firebase';
import { connect } from 'react-redux';
import {loadWorldMap,LoadViewer } from '../../common/editor/actions';

type Props = {
    worldmap: Object,
    loadWorldMap: () => void,
    viewer: Object
};

let WorldMap = ({ worldmap,viewer,loadWorldMap }) => {
    const styles = {
        title: {
            cursor: 'pointer',
        },
        lock: {
            cursor: 'default',
        },
        delete: {
            cursor: 'pointer',
        },
    };
    return (
        <View>
            <div className="one-level">
                <div className="choose-level" onClick={() => loadWorldMap(worldmap,viewer)}>
                    <span>!</span>
                </div>
                <Text style={styles.title}
                      onClick={() => loadWorldMap(worldmap,viewer)}>
                    Description : {worldmap.name}
                </Text>
            </div>



        </View>
    );
};

WorldMap.propTypes = {
    worldmap: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object,
    loadWorldMap : React.PropTypes.func,
};

export default connect(state => ({
    viewer: state.editor.viewer,
}), {})(WorldMap);
