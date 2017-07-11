/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import WorldMap from './WorldMap';
import EditorMap from './EditorMap';
import EditMonster from './EditMonster';
import EditTile from './EditTile';
import SignOut from '../auth/SignOut';
import { Block, View, Text, Image,Loading,Link } from '../app/components';
import { connect } from 'react-redux';
import { firebase } from '../../common/lib/redux-firebase';
import { LoadEditorMaps,LoadMapTiles,picktile,pickmonster,loadWorldMap,LoadViewer,LoadMapActive,ReloadActiveMap,LoadMonsters,LoadItems,CreateNewWorldMap } from '../../common/editor/actions';



let Editor = ({worldmaps, picktile,pickmonster, viewer,dviewer, loaded, loadWorldMap, LoadViewer,activeMap,LoadMapActive,maptiles,monsters,CreateNewWorldMap }) => {

    const styles = {
        bg: {
            backgroundImage: "",
        }
    };
    let listmaptiles = [];
    let listmonsters = [];
    let listmaps = [];

    let viewmonster = false;

    let activeTile = false;
    let activeMonster = false;
    let isPlayerMap = false;

    if (monsters) {
        monsters.map(listm => {

            if (activeMonster) {
                if (listm.id == activeMonster.id) {
                    listmonsters.push(<EditMonster key={listm.id} monster={listm} active="active"/>);
                }
                else {
                    listmonsters.push(<EditMonster key={listm.id} monster={listm}/>);
                }
            } else {
                listmonsters.push(<EditMonster key={listm.id} monster={listm} />);
            }
        });
    }
    else
    {
        if(maptiles)
        {
            maptiles.map(list => {
                if (activeTile) {
                    if (list.id == activeTile.id) {
                        listmaptiles.push(<EditTile key={list.id} maptile={list} picktile={picktile} active="active"/>);
                    }
                    else {
                        listmaptiles.push(<EditTile key={list.id} maptile={list} picktile={picktile}/>);
                    }
                } else {
                    listmaptiles.push(<EditTile key={list.id} maptile={list} picktile={picktile}/>);
                }
            });
        }
    }

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
                    wdmap.push(<EditorMap key={mapViewer.id} worldmap={mapViewer} viewer={viewer} maptiles={maptiles} monsters={monsters}/>);
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

        worldmaps.map(list => {
            if(list.user_id == viewer.id)
            {
                listmaps.push(<WorldMap key={list.id} worldmap={list} viewer={viewer} loadWorldMap={loadWorldMap}/>);
            }
        })

    }
    let taille;
    if (typeof(window) !== 'undefined') {
        taille = window.location.origin;
    }
    return (
        <View className="">
            <View className="container_editor_app-img"></View>
            <View className="container_app-editor">


                <div className="cadre-menu-editor">
                    <div className="cadre-menu-div-editor">
                        <ul className="menu-fixe-editor">
                            <Link exactly to='/game'>Dungeons</Link>
                            <SignOut className="test"/>
                        </ul>
                    </div>
                </div>
                <div className="cadre-editor">

                        {
                            !mapactive?

                                <div className="one-level">


                                    <div className="choose-level" onClick={() => CreateNewWorldMap(dviewer)}>
                                        <span>+</span>
                                    </div>
                                    <Text style={styles.title} onClick={() => CreateNewWorldMap(dviewer)}>Description : New</Text>
                                </div>
                                :
                                <div></div>
                        }

                    <div className="cmenu-editor">

                        {!loaded ?
                            <Loading />
                            : viewer ?
                                mapactive?
                                    wdmap
                                    :
                                    worldmaps ?
                                        listmaps

                                        : <Text>There is no map yet.</Text>
                                : <Text>No users detected</Text>
                        }
                    </div>


                </div>


            </View>

        </View>
    );

};

Editor = firebase((database, props) => {
    const EditorRef = database.child('editormaps');
    const MapActiveRef = database.child('activeMap');
    let WorldMapRef = database.child('activeMap');
    let MonsterRef = database.child('monsters');
    let ItemRef = database.child('items');
    if(props.viewer)
    {

        WorldMapRef = database.child('activeMap/'+props.viewer.id);
    }
    const TileRef = database.child('maptiles');
    return [
        [EditorRef, 'on', 'value', props.LoadEditorMaps],
        [TileRef, 'on', 'value', props.LoadMapTiles],
        [MapActiveRef, 'on', 'value', props.LoadMapActive],
        [WorldMapRef, 'on', 'value', props.ReloadActiveMap],
        [MonsterRef, 'on', 'value', props.LoadMonsters],
        [ItemRef, 'on', 'value', props.LoadItems],
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
    items : React.PropTypes.object,
};


export default connect(state => ({
    loaded: state.editor.loaded,
    viewer: state.users.viewer,
    worldmaps: state.editor.worldmaps,
    dviewer: state.editor.viewer,
    activeMap: state.editor.activeMap,
    maptiles : state.editor.maptiles,
    monsters : state.editor.monsters,
    items : state.editor.items,
}), {LoadEditorMaps, CreateNewWorldMap,LoadMapTiles,loadWorldMap,picktile,pickmonster,LoadViewer,LoadMapActive,ReloadActiveMap,LoadMonsters,LoadItems })(Editor);