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

const Dungeon = ({ dungeon,loadWorldMap,viewer, numero }) => {
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

    let lock = true;
    if(dungeon.from_editor){
        lock = false;
    }

    if(viewer && viewer.dungeons && lock){
        Object.keys(viewer.dungeons).map(du => {
            if(dungeon.id == du){
                lock = viewer.dungeons[du].lock;
            }
        })
    }
    if(lock === true){
      return (
        <div className="one-level">
          <div className="level-lock"></div>
          <Text style={styles.lock}>
          </Text>
        </div>
      );
    } else {
      return (
        <div className="one-level">
          <div className="choose-level" onClick={() => test()}>
            <div>{numero}</div>

          </div>
            { dungeon.from_editor &&
                <span>{dungeon.description}</span>
            }
          <Text style={styles.title}
                onClick={() => test()}>
          </Text>
        </div>
      );
    }
};

Dungeon.propTypes = {
    dungeon: React.PropTypes.object.isRequired,
    loadWorldMap: React.PropTypes.func.isRequired,
    viewer: React.PropTypes.object.isRequired,
    numero: React.PropTypes.number.isRequired,
};

export default connect(state => ({
    viewer: state.dungeons.viewer,
}), { loadWorldMap })(Dungeon);

