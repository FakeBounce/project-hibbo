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
import { cancelWorldmap,picktile,pickmaptile,saveWorldmap,viewMonster,pickmonster,pickmapmonster,RemoveWorldmap,ActiveMapDungeon,RemoveMapDungeon} from '../../common/editor/actions';

type Props = {
    worldmap: Object,
    viewer: Object,
};

let EditorMap = ({ worldmap,viewer,cancelWorldmap,RemoveWorldmap, maptiles,picktile,pickmaptile,saveWorldmap,activeTiles,activeMonsters,monsters,viewMonster,pickmonster,pickmapmonster,ActiveMapDungeon,RemoveMapDungeon}) => {
    let editor;
    let listmaptiles = [];
    let listmonsters = [];
    let viewmonster = false;
    let dungeon = false;
    let activeTile = false;
    let activeMonster = false;
    activeTiles.map(active => activeTile = active);
    activeMonsters.map(active => activeMonster = active);

    if (!viewer) {
    } else {


        if (worldmap.viewonmonster && monsters) {
            if(worldmap.active_dungeon != "")
            {
                dungeon = true;
            }
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
            if(worldmap.active_dungeon != "")
            {
                dungeon = true;
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
            if(worldmap.active_dungeon != "")
            {
                dungeon = true;
            }
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
            if(worldmap.active_dungeon != "")
            {
                dungeon = true;
            }
        }

    }

    return (
    <View>
      <div>
        {
          dungeon?
            <div onClick={() => RemoveMapDungeon(worldmap,viewer)} className="btn-editeur-remove">DISABLE DUNGEON</div>
            :
            <div onClick={() => ActiveMapDungeon(worldmap,viewer)} className="btn-editeur-active">ENABLE DUNGEON</div>
        }
      </div>
      <div className="">
        <div className="cadre-gauche-editeur">
          {viewmonster ?
            <div className="btn-haut-editeur">
              <Text onClick={() => viewMonster(worldmap)}><span className="changeSelection">Tiles</span></Text>
            </div>
            :
            <div className="btn-haut-editeur">
              <Text onClick={() => viewMonster(worldmap)}><span className="changeSelection">Monsters</span></Text>
            </div>
          }
          <div className="btn-haut-editeur">
            <Text><span className="changeSelection">Objects</span></Text>
          </div>
          <div className="listEditeur">
            <div className="blockSelection">
              {listmaptiles}
              {listmonsters}
            </div>
          </div>
        </div>
        <div className="cadre-droite">
          <div className="cadre-droite-interact-gauche">{ editor }</div>
          <div className="cadre-droite-interact-droite">
            <div>
              <input className="nameMap" type="text" placeholder="Name of map"/>
            </div>
            <div>
              <h2>Zoom</h2>
              <div className="zoom">
                <div className="zoomPlus"></div>
                <div className="zoomMoins"></div>
              </div>
            </div>
          </div>
        </div>
        <ul className="actionsEditeur">
          <li onClick={() => cancelWorldmap(worldmap)}><div className="btn-editeur-exit">EXIT</div></li>
          <li onClick={() => RemoveWorldmap(worldmap)}><div className="btn-editeur-delete">DELETE</div></li>
          <li onClick={() => saveWorldmap(worldmap)}><div className="btn-editeur-save">SAVE</div></li>
        </ul>
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
}), { RemoveMapDungeon,ActiveMapDungeon,cancelWorldmap,picktile,RemoveWorldmap,pickmaptile,saveWorldmap,viewMonster,pickmonster,pickmapmonster})(EditorMap);
