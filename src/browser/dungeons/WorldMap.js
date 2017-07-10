/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import MapTile from './MapTile';
import { Block, Flex, Text, View,Image } from '../app/components';
import { firebase } from '../../common/lib/redux-firebase';
import { connect } from 'react-redux';
import { cancelDungeon, EndTurn, MonsterTurn, CanUseSkill, movingCharacter  } from '../../common/dungeons/actions';

type Props = {
    worldmap: Object,
    dungeon: Object,
    viewer: Object
};

let WorldMap = ({ worldmap, dungeon, viewer,dungeonsOP,cancelDungeon,EndTurn,MonsterTurn, CanUseSkill, movingCharacter, move, character }) => {

    var error_msg = '';
    var monster_image = '';
    var monster_health = 100;
    var monster_maxhealth = 100;
    var monster_name = '';

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
                <h2 className="titre-map">{dungeon.description}</h2>
                <div className="btn-map leftbtnendtour"><button className="btn-retour" onClick={() => doEndTurn(dungeon)}>End of turn</button></div>
                <div className="btn-map leftbtnendtour"><button className="btn-retour" onClick={() => cancelDungeon(dungeon)}>Cancel dungeon</button></div>
                <div className="info-joueur"><span className="error-map">{error_msg}</span></div>
              </div>
              <div className="cadre">
                { Object.keys(worldmap.maptiles).map(function (keyRow) {
                  var col = Object.keys(worldmap.maptiles[keyRow]).map(function (keyCol) {
                    return(
                      <MapTile key={worldmap.maptiles[keyRow][keyCol].id}
                               dungeon={dungeon} row={keyRow} col={keyCol} maptile={worldmap.maptiles[keyRow][keyCol]}
                      />
                    );
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
}), { cancelDungeon,EndTurn,MonsterTurn, CanUseSkill, movingCharacter })(WorldMap);
