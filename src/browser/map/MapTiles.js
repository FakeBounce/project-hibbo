/**
 * Created by bromanelli on 11/10/2016.
 */

import React from 'react';
import MapTile from './MapTile';
import { Block, View } from '../app/components';
import { connect } from 'react-redux';
import { maptileCompleted, saveMapTile } from '../../common/maptiles/actions';

const MapTiles = ({ maptiles, maptileCompleted, saveMapTile }) => {

  if (!maptiles.size) {
    return (
      <Block>
        No map tiles yet
      </Block>
    );
  }

  const list = maptiles
    .toList()

  return (
    <View>
      {list.map(maptile =>
        <Block key={maptile.id}>
          <MapTile
            maptile={maptile}
            maptileCompleted={maptileCompleted}
            saveMapTile={saveMapTile}
          />
        </Block>
      )}
    </View>
  );
};

MapTiles.propTypes = {
  maptiles: React.PropTypes.object.isRequired,
  maptileCompleted: React.PropTypes.func.isRequired,
  saveMapTile: React.PropTypes.func.isRequired,
};
export default connect(state => ({
  maptiles: state.maptiles.map,
}), { maptileCompleted, saveMapTile })(MapTiles);
