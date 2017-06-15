/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import MapTile from './MapTile';
import { Block, Flex, Text, View,Image } from '../app/components';
import { firebase } from '../../common/lib/redux-firebase';
import { connect } from 'react-redux';
import { ReloadWorldMap } from '../../common/dungeons/actions';

type Props = {
    worldmap: Object,
    dungeon: Object,
    viewer: Object
};

let WorldMap = ({ worldmap,dungeon,viewer,dungeonsOP }) => {
    return (
        <View>
          <div className="cadre-gauche"></div>
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
              {viewer.row}
            <div className="cadre-objets">
              <div className="objets">
                  {
                      viewer.skills.map(skill => {
                        var classObjet = skill.get ? 'objet ' + skill.css : 'objet objetVide';
                          return (<div key={skill.id} className={classObjet}></div>);
                      })
                  },
                  {viewer?
                    viewer.weapons.map(weapon => {
                      var classObjet = weapon.get ? 'objet ' + weapon.css : 'objet objetVide';
                      return (<div key={weapon.id} className={classObjet}></div>);
                    })
                      :
                      <div></div>
                  }
              </div>
            </div>
          </div>
        </View>
    );
};

WorldMap.propTypes = {
    worldmap: React.PropTypes.object.isRequired,
    dungeon: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired,
    dungeonsOP: React.PropTypes.object,
};

export default
connect(state => ({
    viewer: state.dungeons.viewer,
    dungeonsOP: state.dungeons.dungeonsOP,
}), {})(WorldMap);
