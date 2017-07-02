/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import WorldMap from './Worldmap';
import EditorMap from './EditorMap';
import SignOut from '../auth/SignOut';
import { Block, View, Text, Image,Loading } from '../app/components';
import { connect } from 'react-redux';
import { firebase } from '../../common/lib/redux-firebase';
import { LoadMaps,LoadMapTiles,loadWorldMap,LoadViewer,LoadMapActive,ReloadActiveMap,LoadMonsters } from '../../common/editor/actions';



let Editor = ({worldmaps, viewer,dviewer, loaded, loadWorldMap, LoadViewer,activeMap,LoadMapActive,maptiles,monsters }) => {

    if(!dviewer)
    {
        LoadViewer(viewer);
    }else
    {
        if(activeMap){

            var wdmap = [];
            var mapactive = false;
            let mapViewer;
            activeMap.map(activeMap => mapViewer = activeMap);

            if(mapViewer)
            {
                mapactive = true;
                if(viewer)
                {
                    wdmap.push(<EditorMap key={mapViewer.id} worldmap={mapViewer} viewer={viewer} maptiles={maptiles} monsters={monsters}Ò/>);
                }
            }
        }
        else
        {
            if(viewer && !viewer.active_map)
            {
                LoadMapActive(viewer);
            }
            mapactive =false;
        }

    }

    return (
        <View>

            <SignOut/>
            <audio loop autoplay="autoplay" controls>
                <source src="/assets/images/sounds/sample.mp3" />
            </audio>
            {!loaded ?
                <Loading />
                : viewer ?
                    mapactive?
                        wdmap
                        :
                        worldmaps ?
                    worldmaps.map(activeMap =>
                        <WorldMap key={activeMap.id} worldmap={activeMap} viewer={viewer} loadWorldMap={loadWorldMap}/>
                    )

                    : <Text>Il n'y a pas encore de map.</Text>
                : <Text>Aucun utilisateur</Text>
            }



        </View>
    );
};

Editor = firebase((database, props) => {
    const EditorRef = database.child('maps');
    const MapActiveRef = database.child('activeMap');
    let WorldMapRef = database.child('activeMap');
    let MonsterRef = database.child('monsters');
    if(props.viewer)
    {

        WorldMapRef = database.child('activeMap/'+props.viewer.id);
    }
    const TileRef = database.child('maptiles');
    return [
        [EditorRef, 'on', 'value', props.LoadMaps],
        [TileRef, 'on', 'value', props.LoadMapTiles],
        [MapActiveRef, 'on', 'value', props.LoadMapActive],
        [WorldMapRef, 'on', 'value', props.ReloadActiveMap],
        [MonsterRef, 'on', 'value', props.LoadMonsters],
    ];
})(Editor);

Editor.propTypes = {
    loaded: React.PropTypes.bool.isRequired,
    worldmaps : React.PropTypes.object,
    maptiles : React.PropTypes.object,
    viewer: React.PropTypes.object,
    dviewer : React.PropTypes.object,
    loadWorldMap : React.PropTypes.func,
    activeMap : React.PropTypes.object,
    monsters : React.PropTypes.object,
};


export default connect(state => ({
    loaded: state.editor.loaded,
    viewer: state.users.viewer,
    worldmaps: state.editor.worldmaps,
    dviewer: state.editor.viewer,
    activeMap: state.editor.activeMap,
    maptiles : state.editor.maptiles,
    monsters : state.editor.monsters,
}), {LoadMaps, LoadMapTiles,loadWorldMap,LoadViewer,LoadMapActive,ReloadActiveMap,LoadMonsters })(Editor);
