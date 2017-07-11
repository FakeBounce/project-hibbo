/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import MapTile from './MapTile';
import { Block, Flex, Text, View,Image } from '../app/components';
import { firebase } from '../../common/lib/redux-firebase';
import { connect } from 'react-redux';
import { cancelDungeon, EndTurn, MonsterTurn, CanUseSkill, movingCharacter,changeGrid  } from '../../common/dungeons/actions';

type Props = {
    worldmap: Object,
    dungeon: Object,
    viewer: Object
};

let WorldMap = ({ worldmap, dungeon, viewer,dungeonsOP,cancelDungeon,EndTurn,MonsterTurn, CanUseSkill, movingCharacter,changeGrid, move, character }) => {

    var error_msg = '';
    var monster_image = '';
    var monster_health = 100;
    var monster_maxhealth = 100;
    var monster_name = '';
    var grid = "off";
    let is_looted = false;
    let is_dead = false;
    let loots = '';

    if(dungeon.grid)
    {
        grid = "on";
    }

    if(dungeon.is_looted)
    {
        is_looted = true;
        if(dungeon.loot)
        {

            loots = dungeon.loot.map(l => {
                return(<Image className="loot" src={l.img}/>);
            });
        }
    }
    if(dungeon.pj_is_dead)
    {
        is_dead = true;
    }

  onkeydown = (event: KeyboardEvent) => {
    var skills_list = dungeon.user.character.equipped_spells;
    var gif = '';
    let classes= "monster";
    if(event.key === "1" || event.key === "&"){
      CanUseSkill(dungeon, viewer, skills_list[0]);
    }
    if(event.key === "2" || event.key === "é"){
      CanUseSkill(dungeon, viewer, skills_list[1]);
    }
    if(event.key === "3" || event.key === '"'){
      CanUseSkill(dungeon, viewer, skills_list[2]);
    }
    if(event.key === "4" || event.key === "'"){
      CanUseSkill(dungeon, viewer, skills_list[3]);
    }
    if(event.key === "5" || event.key === "("){
      CanUseSkill(dungeon, viewer, skills_list[4]);
    }
    if(event.key === "6" || event.key === "-"){
      CanUseSkill(dungeon, viewer, skills_list[5]);
    }
    if(event.key === "7" || event.key === "è"){
      CanUseSkill(dungeon, viewer, skills_list[6]);
    }
    if(event.key === "8" || event.key === "_"){
      CanUseSkill(dungeon, viewer, skills_list[7]);
    }
    if(event.key === "ArrowUp") {
      return movingCharacter(dungeon, dungeon.user.character.row - 1, dungeon.user.character.col);
    }
    if(event.key === "ArrowDown"){
      return movingCharacter(dungeon, dungeon.user.character.row + 1, dungeon.user.character.col);
    }
    if(event.key === "ArrowLeft"){
      return movingCharacter(dungeon, dungeon.user.character.row, dungeon.user.character.col - 1);
    }
    if(event.key === "ArrowRight"){
      return movingCharacter(dungeon, dungeon.user.character.row, dungeon.user.character.col + 1);
    }
    if(event.keyCode === 32){
      if(!dungeon.user.character.is_attacking && !dungeon.user.character.is_moving && !dungeon.monster_turn)
      {
        EndTurn(dungeon);
      }
    }
  };

    if(dungeon.error_message)
    {
        error_msg = dungeon.error_message;
    }
    if(dungeon.end_turn)
    {
        if(typeof dungeon.monster_moves !== "undefined")
        {
            if(dungeon.monster_moves.length > 0 && !dungeon.monster_turn) {
                MonsterTurn(dungeon);
            }
        }
    }
    if(dungeon.monster_info_row != null && dungeon.monster_info_col != null)
    {
        if(dungeon.dungeon.maptiles[dungeon.monster_info_row][dungeon.monster_info_col].character)
        {
            var monster = dungeon.dungeon.maptiles[dungeon.monster_info_row][dungeon.monster_info_col].character;
            monster_image = monster.image;
            monster_health = monster.health;
            monster_maxhealth = monster.maxhealth;
            monster_name = monster.name;
        }
    }
    let doEndTurn = function(dungeon){
        if(!dungeon.user.character.is_attacking && !dungeon.user.character.is_moving && !dungeon.monster_turn)
        {
            EndTurn(dungeon);
        }
    };
    return (
        <View>
            <div className="cadre-droite">
              <div className="cadre-map-info">
                {/*<div className="cadre-boss">*/}
                {/*<div className="progressBoss">*/}
                {/*{monster_name == '' ?*/}
                {/*<p className="monster_name_hidden">{monster_name}</p>*/}
                {/*:*/}
                {/*<p className="monster_name">{monster_name}</p>*/}
                {/*}*/}
                {/*<progress className="progressBarBoss" max={monster_maxhealth} value={monster_health}></progress>*/}
                {/*<Image className="monster_head" src={monster_image}/>*/}
                {/*</div>*/}
                {/*</div>*/}
                  <h2 className="titre-map">{dungeon.description} <button className="btn-small pull-right" onClick={() => changeGrid(dungeon)}>Grid {grid}</button></h2>
                <div className="btn-map leftbtnendtour"><button className="btn-retour" onClick={() => doEndTurn(dungeon)}>End of turn</button></div>
                <div className="btn-map leftbtnendtour"><button className="btn-retour" onClick={() => cancelDungeon(dungeon)}>Leave dungeon</button></div>
                <div className="info-joueur"><span className="error-map">{error_msg}</span></div>
                  {is_looted &&
                    <div className="infoBulle infoLoot">
                        <h2>Dungeon complete !</h2>
                        <Text>Here is what you looted :</Text>
                        {loots}
                    </div>
                  }
                  {is_dead &&
                    <div className="infoBulle infoLoot">
                        <h2>You are dead.</h2>
                        <h1>GAME OVER</h1>
                    </div>
                  }
              </div>
              <div className="cadre">
                { Object.keys(worldmap.maptiles).map(function (keyRow) {
                  var col = Object.keys(worldmap.maptiles[keyRow]).map(function (keyCol) {
                      let c_row_start = parseInt(dungeon.camera.row_center) - 3;
                      let c_col_start = parseInt(dungeon.camera.col_center) - 5;
                      let c_row_end = parseInt(dungeon.camera.row_center) + 4;
                      let c_col_end = parseInt(dungeon.camera.col_center) + 4;

                      if(c_row_start < 0)
                      {
                          c_row_end = c_row_end+(c_row_start*-1);
                          c_row_start = 0;
                      }
                      if(c_col_start < 0)
                      {
                          c_col_end = c_col_end+(c_col_start*-1);
                          c_col_start = 0;
                      }

                      if(c_row_end > parseInt(dungeon.row_end))
                      {
                          c_row_start = c_row_start+(c_row_end-parseInt(dungeon.row_end));
                          c_row_end = parseInt(dungeon.row_end);
                      }
                      if(c_col_end > parseInt(dungeon.col_end))
                      {
                          c_col_start = c_col_start+(c_col_end-parseInt(dungeon.col_end));
                          c_col_end = parseInt(dungeon.col_end);
                      }
                      if(c_row_start <= keyRow && keyRow<= c_row_end)
                      {
                          if(c_col_start <= keyCol && keyCol <= c_col_end)
                          {
                              return(
                                  <MapTile key={worldmap.maptiles[keyRow][keyCol].id}
                                           dungeon={dungeon} row={keyRow} col={keyCol} maptile={worldmap.maptiles[keyRow][keyCol]}
                                  />
                              );
                          }
                      }
                  });
                return (
                  <Flex key={keyRow} >{col}</Flex>
                );
              })
              }
              </div>
            </div>
      </View>
    );
};

WorldMap.propTypes = {
    worldmap: React.PropTypes.object.isRequired,
    dungeon: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object,
    verifloaded: React.PropTypes.number,
    dungeonsOP: React.PropTypes.object,
};

export default connect(state => ({
    viewer: state.dungeons.viewer,
    dungeonsOP: state.dungeons.dungeonsOP,
    verifloaded: state.dungeons.verifloaded,
}), { cancelDungeon,EndTurn,MonsterTurn, CanUseSkill, movingCharacter,changeGrid })(WorldMap);
