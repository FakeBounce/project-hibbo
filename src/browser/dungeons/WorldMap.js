/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import MapTile from './MapTile';
import { Block, Flex, Text, View,Image } from '../app/components';
import { firebase } from '../../common/lib/redux-firebase';
import { connect } from 'react-redux';
import { cancelDungeon,EndTurn,MonsterTurn } from '../../common/dungeons/actions';

type Props = {
    worldmap: Object,
    dungeon: Object,
    viewer: Object
};

let WorldMap = ({ worldmap,dungeon,viewer,dungeonsOP,cancelDungeon,EndTurn,MonsterTurn }) => {

    var error_msg = '';
    var monster_image = '';
    var monster_health = 100;
    var monster_maxhealth = 100;
    var monster_name = '';

    if(dungeon.error_message)
    {
        error_msg = dungeon.error_message;
    }
    if(dungeon.end_turn)
    {
        if(dungeon.monster_moves.length > 0 && !dungeon.monster_turn && dungeon.end_turn) {
            MonsterTurn(dungeon);
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
          <div className="fix-hauteur">
            <Text>{error_msg}</Text>
            <ul className="menu-fixe">
              <li>MAP</li>
              <li onClick={() => cancelDungeon(dungeon)}>DONGEONS</li>
              <li>MENU</li>
            </ul>

            <Text>{dungeon.description}</Text>
            <div className="cadre-droite">
              <div className="cadre">
                { Object.keys(worldmap.maptiles).map(function (keyRow) {
                  var col = Object.keys(worldmap.maptiles[keyRow]).map(function (keyCol) {
                    return(
                      <MapTile key={worldmap.maptiles[keyRow][keyCol].id}
                               dungeon={dungeon} row={keyRow} col={keyCol} maptile={worldmap.maptiles[keyRow][keyCol]}
                      />
                    );
                  })
                return (
                  <Flex key={keyRow} >{col}</Flex>
                );
              })
              }
                <div className="champs-btn-end">
                  <button className="btn-retour" onClick={() => doEndTurn(dungeon)}>Fin du tour</button>
                </div>
            </div>
            <div className="cadre-boss">
              <div className="progressBoss">
                  {monster_name == '' ?
                      <p className="monster_name_hidden">{monster_name}</p>
                      :
                      <p className="monster_name">{monster_name}</p>
                  }
                <progress className="progressBarBoss" max={monster_maxhealth} value={monster_health}></progress>
                  <Image className="monster_head" src={monster_image}/>
              </div>
            </div>
          </div>
        </div>
      </View>
    );
};

WorldMap.propTypes = {
    worldmap: React.PropTypes.object.isRequired,
    dungeon: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object,
    dungeonsOP: React.PropTypes.object,
};

export default connect(state => ({
    viewer: state.dungeons.viewer,
    dungeonsOP: state.dungeons.dungeonsOP,
}), { cancelDungeon,EndTurn,MonsterTurn })(WorldMap);
