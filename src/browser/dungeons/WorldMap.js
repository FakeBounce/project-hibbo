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
    var skills_list = '';
    var error_msg = '';
    if(viewer)
    {
        if(viewer.skills) {
            skills_list = viewer.skills.map(skill => {
                var classObjet = skill.get ? 'objet ' + skill.css : 'objet objetVide';
                return (<div key={skill.id} className={classObjet}></div>);
            })
        }
    }
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
    let doEndTurn = function(dungeon){
        if(!dungeon.user.character.is_attacking && !dungeon.user.character.is_moving && !dungeon.monster_turn)
        {
            EndTurn(dungeon);
        }
    };
    return (
        <View>
          <div className="fix-hauteur">
            <div className="btn-retour" onClick={() => cancelDungeon(dungeon)}>Cancel dungeon</div>
            <Text>{error_msg}</Text>

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
            </div>
            <div className="cadre-boss">
                <button onClick={() => doEndTurn(dungeon)}>End turn</button>
              <div className="progressBoss">
                <progress className="progressBarBoss" max="100" value="45"></progress>
              </div>
            </div>
                <div className="cadre-objets">
                    <div className="objets">
                        {skills_list}
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
