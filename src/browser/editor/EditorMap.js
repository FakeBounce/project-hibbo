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
import { ZoomMinorEditMap,ZoomEditMap,FullBlockRight,FullBlockTop,addNameMap,cancelWorldmap,picktile,pickmaptile,saveWorldmap,viewMonster,pickmonster,pickmapmonster,RemoveWorldmap,ActiveMapDungeon,RemoveMapDungeon} from '../../common/editor/actions';

type Props = {
    worldmap: Object,
    viewer: Object,
};

let EditorMap = ({ ZoomMinorEditMap,ZoomEditMap,camera,FullBlockRight,FullBlockTop,addNameMap,fields,worldmap,viewer,cancelWorldmap,RemoveWorldmap, maptiles,picktile,pickmaptile,saveWorldmap,activeTiles,activeMonsters,monsters,viewMonster,pickmonster,pickmapmonster,ActiveMapDungeon,RemoveMapDungeon}) => {
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


        console.log('camera',worldmap.camera);


        let activeConstructMapTop = false;
        let activeConstructMapRight = false;

        if(!worldmap.viewonmonster && worldmap.camera)
        {
            editor = Object.keys(worldmap.camera.maptiles).map(function (keyRow) {
                var col = Object.keys(worldmap.camera.maptiles[keyRow]).map(function (keyCol) {


                        activeConstructMapTop = false;
                        activeConstructMapRight = false;
                        if(worldmap.worldmap.size_map == worldmap.camera.size_map)
                        {
                            if(worldmap.worldmap.size_map_min == keyRow)
                            {
                                activeConstructMapTop = true;
                            }

                            if(worldmap.worldmap.size_map  == keyCol)
                            {
                                activeConstructMapRight = true;
                            }
                        }
                        else
                        {

                            if(worldmap.camera.row_start == keyRow )
                            {
                                activeConstructMapTop = true;
                            }

                            if(worldmap.camera.col_end == keyCol )
                            {
                                activeConstructMapRight = true;
                            }
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


                            <MapTile key={worldmap.camera.maptiles[keyRow][keyCol].id} viewer={viewer}
                                     worldmap={worldmap} row={keyRow} col={keyCol} maptile={worldmap.camera.maptiles[keyRow][keyCol]} pickmaptile={pickmaptile}
                            />
                            </div>
                        );


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
            editor = Object.keys(worldmap.camera.maptiles).map(function (keyRow) {
                var col = Object.keys(worldmap.camera.maptiles[keyRow]).map(function (keyCol) {

                     return(

                    <MapTile key={worldmap.camera.maptiles[keyRow][keyCol].id} viewer={viewer}
                             worldmap={worldmap} row={keyRow} col={keyCol} maptile={worldmap.camera.maptiles[keyRow][keyCol]}
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
                        onBlur={onInputKeyDown}
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

                {/*<div className="zoomPlus" onClick={() => ZoomEditMap(worldmap.camera,viewer,worldmap.worldmap.size_map)}></div>*/}
                {/*<div className="zoomMoins" onClick={() => ZoomMinorEditMap(worldmap.camera,viewer,worldmap.worldmap.size_map,worldmap)}></div>*/}

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
    camera: React.PropTypes.object,
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
    camera : state.editor.camera,
    monsters : state.editor.monsters,
    activeTiles : state.editor.activeTile,
    activeMonsters : state.editor.activeMonster,
}), { ZoomMinorEditMap,ZoomEditMap,FullBlockRight,FullBlockTop,addNameMap,RemoveMapDungeon,ActiveMapDungeon,cancelWorldmap,picktile,RemoveWorldmap,pickmaptile,saveWorldmap,viewMonster,pickmonster,pickmapmonster})(EditorMap);
