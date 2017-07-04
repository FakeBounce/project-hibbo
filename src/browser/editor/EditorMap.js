/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import MapTile from './MapTile';
import EditTile from './EditTile';
import Monster from './Monster';
import EditMonster from './EditMonster';
import { Block, Flex, Text, View,Image } from '../app/components';
import { firebase } from '../../common/lib/redux-firebase';
import { connect } from 'react-redux';
import { cancelWorldmap,picktile,pickmaptile,saveWorldmap,viewMonster,pickmonster,pickmapmonster} from '../../common/editor/actions';

type Props = {
    worldmap: Object,
    viewer: Object,
};

let EditorMap = ({ worldmap,viewer,cancelWorldmap, maptiles,picktile,pickmaptile,saveWorldmap,activeTiles,activeMonsters,monsters,viewMonster,pickmonster,pickmapmonster}) => {
    let editor;
    let listmaptiles = [];
    let listmonsters = [];
    let viewmonster = false;

    let activeTile = false;
    let activeMonster = false;
    activeTiles.map(active => activeTile = active);
    activeMonsters.map(active => activeMonster = active);

    if (!viewer) {
    } else {


        if (worldmap.viewonmonster && monsters) {
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

    }

    if(worldmap && worldmap.worldmap)
    {
        if(!worldmap.viewonmonster)
        {
            editor = Object.keys(worldmap.worldmap.maptiles).map(function (keyRow) {
                var col = Object.keys(worldmap.worldmap.maptiles[keyRow]).map(function (keyCol) {
                    if(worldmap.worldmap.maptiles[keyRow][keyCol].character && worldmap.worldmap.maptiles[keyRow][keyCol].character.type == "pj") {

                        return(
                            <MapTile key={worldmap.worldmap.maptiles[keyRow][keyCol].id} viewer={viewer}
                                     worldmap={worldmap} row={keyRow} col={keyCol} maptile={worldmap.worldmap.maptiles[keyRow][keyCol]}
                            />);
                    }

                    else
                    {
                        return(
                            <MapTile key={worldmap.worldmap.maptiles[keyRow][keyCol].id} viewer={viewer}
                                     worldmap={worldmap} row={keyRow} col={keyCol} maptile={worldmap.worldmap.maptiles[keyRow][keyCol]} pickmaptile={pickmaptile}
                            />
                        );
                    }

                });
                return (
                    <Flex key={keyRow} >{col}</Flex>
                );
            });
        }
        else {
            editor = Object.keys(worldmap.worldmap.maptiles).map(function (keyRow) {
                var col = Object.keys(worldmap.worldmap.maptiles[keyRow]).map(function (keyCol) {

                    if(worldmap.worldmap.maptiles[keyRow][keyCol].character && worldmap.worldmap.maptiles[keyRow][keyCol].character.type == "pj") {

                            return(
                            <MapTile key={worldmap.worldmap.maptiles[keyRow][keyCol].id} viewer={viewer}
                                     worldmap={worldmap} row={keyRow} col={keyCol} maptile={worldmap.worldmap.maptiles[keyRow][keyCol]}
                            />);
                    }
                    else
                    {
                        return(
                        <MapTile key={worldmap.worldmap.maptiles[keyRow][keyCol].id} viewer={viewer}
                                 worldmap={worldmap} row={keyRow} col={keyCol} maptile={worldmap.worldmap.maptiles[keyRow][keyCol]} pickmapmonster={pickmapmonster}
                        />
                         );
                       }
                });
                return (
                    <Flex key={keyRow} >{col}</Flex>
                );
            });
            viewmonster = true;
        }

    }

    return (
        <View>
            <div className="">
                <ul className="">
                    <li onClick={() => cancelWorldmap(worldmap)}>EXIT</li>
                    <li onClick={() => saveWorldmap(worldmap)}>SAVE</li>
                </ul>
                <div className="cadre-gauche">
                    {listmaptiles}
                    {listmonsters}
                    {viewmonster?
                        <Text onClick={() => viewMonster(worldmap)}>Change to Tile</Text>
                        :
                        <Text onClick={() => viewMonster(worldmap)}>Change to Monster</Text>
                    }

                </div>

                <div className="cadre-droite">
                    { editor }
                </div>
            </div>
        </View>
    );
};



EditorMap.propTypes = {
    viewer: React.PropTypes.object,
    worldmap: React.PropTypes.object.isRequired,
    maptiles: React.PropTypes.object,
    monsters: React.PropTypes.object,
    activeTiles: React.PropTypes.object,
    activeMonsters: React.PropTypes.object,
};

export default connect(state => ({
    viewer: state.editor.viewer,
    maptiles : state.editor.maptiles,
    monsters : state.editor.monsters,
    activeTiles : state.editor.activeTile,
    activeMonsters : state.editor.activeMonster,
}), { cancelWorldmap,picktile,pickmaptile,saveWorldmap,viewMonster,pickmonster,pickmapmonster})(EditorMap);
