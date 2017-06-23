/**
 * Created by Fakebounce on 13/11/2016.
 */


import React from 'react';
import { Block, Text } from '../app/components';


type Props = {
    dungeon: Object,
    loadWorldMap: () => void,
    viewer: Object,
};

const Dungeon = ({ dungeon,loadWorldMap,viewer }: Props) => {
    const styles = {
      title: {
        cursor: 'pointer',
      },
      lock: {
        cursor: 'default',
      },
      delete: {
            cursor: 'pointer',
        },
    };
    if(dungeon.lock === true){
      return (
        <div className="one-level">
          <div className="level-lock"></div>
          <Text style={styles.lock}>
            Description : {dungeon.description}
          </Text>
        </div>
      );
    } else {
      return (
        <div className="one-level">
          <div className="choose-level" onClick={() => loadWorldMap(dungeon,viewer)}>
            <span>{dungeon.numero}</span>
          </div>
          <Text style={styles.title}
                onClick={() => loadWorldMap(dungeon,viewer)}>
            Description : {dungeon.description}
          </Text>
        </div>
      );
    }
};

Dungeon.propTypes = {
    dungeon: React.PropTypes.object.isRequired,
    loadWorldMap: React.PropTypes.func.isRequired,
    viewer: React.PropTypes.object,
};

export default Dungeon;
