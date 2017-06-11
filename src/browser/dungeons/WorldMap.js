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

let WorldMap = ({ worldmap,dungeon }: Props) => {
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
            {/*<Text>{dungeon.error_message}</Text>*/}
            </div>
            <div className="cadre-objets">
              <div className="objets">
                <div className="objet objet1"></div>
                <div className="objet objet2"></div>
                <div className="objet objet3"></div>
                <div className="objet objet4"></div>
                <div className="objet objet5"></div>
                <div className="objet objet6"></div>
                <div className="objet objet7"></div>
                <div className="objet objet8"></div>
              </div>
            </div>
          </div>
        </View>
    );
};

WorldMap.propTypes = {
    worldmap: React.PropTypes.object.isRequired,
    dungeon: React.PropTypes.object.isRequired,
};

export default WorldMap;
