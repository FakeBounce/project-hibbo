/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import MapTile from './MapTile';
import EditTile from './EditTile';
import Monster from './Monster';
import EditMonster from './EditMonster';
import { Block, Flex, Text, View,Image,Form,Input } from '../app/components';
import { firebase } from '../../common/lib/redux-firebase';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { FullBlockRight,FullBlockTop,addNameMap,cancelWorldmap,picktile,pickmaptile,saveWorldmap,viewMonster,pickmonster,pickmapmonster,RemoveWorldmap,ActiveMapDungeon,RemoveMapDungeon} from '../../common/editor/actions';

type Props = {
    worldmap: Object,
    viewer: Object,
};

let EditorMap = ({ FullBlockRight,FullBlockTop,addNameMap,fields,worldmap,viewer,cancelWorldmap,RemoveWorldmap, maptiles,picktile,pickmaptile,saveWorldmap,activeTiles,activeMonsters,monsters,viewMonster,pickmonster,pickmapmonster,ActiveMapDungeon,RemoveMapDungeon}) => {
    let editor;
    let listmaptiles = [];
    let listmonsters = [];
    let viewmonster = false;
    let dungeon = false;
    let activeTile = false;
    let activeMonster = false;
    activeTiles.map(active => activeTile = active);
    activeMonsters.map(active => activeMonster = active);

    const onInputKeyDown = event => {
        if (event.key !== 'Enter') return;
        if (!fields.name.value.trim()) return;
        addNameMap(fields.name.value,viewer,worldmap);
        fields.$reset();
    };

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
        let activeConstructMapTop = false;
        let activeConstructMapRight = false;
        let activeUserMapStart = false;

        if(!worldmap.viewonmonster)
        {
            editor = Object.keys(worldmap.worldmap.maptiles).map(function (keyRow) {
                var col = Object.keys(worldmap.worldmap.maptiles[keyRow]).map(function (keyCol) {

                    if(worldmap.worldmap.maptiles[keyRow][keyCol].character && worldmap.worldmap.maptiles[keyRow][keyCol].character.type == "pj") {

                        if(worldmap.worldmap.maptiles[keyRow][keyCol] == worldmap.worldmap.maptiles[worldmap.worldmap.size_map_min][worldmap.worldmap.size_map_min]   )
                        {
                            activeUserMapStart = true;
                        }
                        return(
                            <div>
                                {
                                    activeUserMapStart &&
                                    <div><span className="top" onClick={() => FullBlockTop(keyCol,worldmap, viewer, activeTile)} >+</span></div>
                                 }

                                     <MapTile key={worldmap.worldmap.maptiles[keyRow][keyCol].id} viewer={viewer}
                                     worldmap={worldmap} row={keyRow} col={keyCol} maptile={worldmap.worldmap.maptiles[keyRow][keyCol]}
                                    />
                            </div>);
                    }

                    else
                    {
                        activeConstructMapTop = false;
                        activeConstructMapRight = false;

                        if(worldmap.worldmap.maptiles[keyRow][keyCol] == worldmap.worldmap.maptiles[worldmap.worldmap.size_map_min][keyCol]   )
                        {
                            activeConstructMapTop = true;
                        }

                        if(worldmap.worldmap.maptiles[keyRow][keyCol]  == worldmap.worldmap.maptiles[keyRow][worldmap.worldmap.size_map])
                        {
                            activeConstructMapRight = true;
                        }

                            return(
                            <div>
                                {
                                    activeConstructMapTop &&
                                    <div><span className="top" onClick={() => FullBlockTop(keyCol,worldmap, viewer, activeTile)} >+</span></div>
                                }
                                {
                                    activeConstructMapRight &&
                                    <div><span className="bot" onClick={() => FullBlockRight(keyRow,worldmap, viewer, activeTile)} >+</span></div>
                                }


                            <MapTile key={worldmap.worldmap.maptiles[keyRow][keyCol].id} viewer={viewer}
                                     worldmap={worldmap} row={keyRow} col={keyCol} maptile={worldmap.worldmap.maptiles[keyRow][keyCol]} pickmaptile={pickmaptile}
                            />
                            </div>
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

                     return(

                    <MapTile key={worldmap.worldmap.maptiles[keyRow][keyCol].id} viewer={viewer}
                             worldmap={worldmap} row={keyRow} col={keyCol} maptile={worldmap.worldmap.maptiles[keyRow][keyCol]}
                    />);


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
        <div className="cadre-droite-ed">
          <div className="cadre-droite-interact-gauche">{ editor }</div>
          <div className="cadre-droite-interact-droite">
            <div>
                <Form small>
                    <Input
                        {...fields.name}
                        label="Nom de la carte"
                        maxLength={10}
                        onKeyDown={onInputKeyDown}
                        placeholder={worldmap.name}
                        className = "input-map-editor"
                    />
                </Form>
            </div>
              <div>
                  {
                      dungeon?
                          <div onClick={() => RemoveMapDungeon(worldmap,viewer)} className="btn-editeur-remove">DISABLE DUNGEON</div>
                          :
                          <div onClick={() => ActiveMapDungeon(worldmap,viewer)} className="btn-editeur-active">ENABLE DUNGEON</div>
                  }
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
          <li onClick={() => saveWorldmap(worldmap,viewer)}><div className="btn-editeur-save">SAVE</div></li>
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
    addNameMap: React.PropTypes.func.isRequired,
    fields: React.PropTypes.object.isRequired,
};

EditorMap = fields(EditorMap, {
    path: 'EditorMap',
    fields: ['name'],
});

export default connect(state => ({
    viewer: state.editor.viewer,
    maptiles : state.editor.maptiles,
    monsters : state.editor.monsters,
    activeTiles : state.editor.activeTile,
    activeMonsters : state.editor.activeMonster,
}), { FullBlockRight,FullBlockTop,addNameMap,RemoveMapDungeon,ActiveMapDungeon,cancelWorldmap,picktile,RemoveWorldmap,pickmaptile,saveWorldmap,viewMonster,pickmonster,pickmapmonster})(EditorMap);
