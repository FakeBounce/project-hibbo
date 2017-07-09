/**
 * Created by Fakebounce on 13/11/2016.
 */


import React from 'react';
import { connect } from 'react-redux';
import { Block, Text } from '../app/components';
import { loadWorldMap } from '../../common/dungeons/actions';



type Props = {
    dungeon: Object,
};

const Dungeon = ({ dungeon,loadWorldMap,viewer }) => {
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
    var test = function()
    {
        loadWorldMap(dungeon,viewer)
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
          <div className="choose-level" onClick={() => test()}>
            <span>{dungeon.numero}</span>
          </div>
          <Text style={styles.title}
                onClick={() => test()}>
            Description : {dungeon.description}
          </Text>
        </div>
      );
    }
};

Dungeon.propTypes = {
    dungeon: React.PropTypes.object.isRequired,
    loadWorldMap: React.PropTypes.func.isRequired,
    viewer: React.PropTypes.object.isRequired,
};

export default connect(state => ({
    viewer: state.dungeons.viewer,
}), { loadWorldMap })(Dungeon);

