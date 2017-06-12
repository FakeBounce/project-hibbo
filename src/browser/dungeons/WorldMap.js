/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import MapTile from './MapTile';
import { Block, Flex, Text, View,Image } from '../app/components';
import { firebase } from '../../common/lib/redux-firebase';
import { connect } from 'react-redux';

type Props = {
    worldmap: Object,
    dungeon: Object,
};

let WorldMap = ({ worldmap,dungeon,viewer }: Props) => {
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
            <div className="cadre-objets">
              <div className="objets">
                  {
                      viewer.skills.map(skill => {
                        var classObjet = skill.get ? 'objet ' + skill.css : 'objet objetVide';
                          return (<div key={skill.id} className={classObjet}></div>);
                      })
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
};



export default connect(state => ({
    viewer: state.dungeons.viewer,
}), { })(WorldMap);
