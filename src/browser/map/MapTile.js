/**
 * Created by bromanelli on 11/10/2016.
 */
import React from 'react';
import { Flex, Text } from '../app/components';

type Props = {
  maptile: Object,
  maptileCompleted: () => void,
  saveMapTile: () => void,
};

const MapTile = ({ maptile, maptileCompleted, saveMapTile }: Props) => {
  const styles = {
    title: {
      ...(maptile.completed && {
        textDecoration: 'line-through',
      }),
      cursor: 'pointer',
    },
    delete: {
      cursor: 'pointer',
    },
  };

  return (
    <Flex>
      <Text style={styles.title}>
        {maptile.title}
      </Text>
      <Text onClick={() => maptileCompleted(maptile)} style={styles.title}> ------
      </Text>
      <Text onClick={() => saveMapTile(maptile)}>Coucou</Text>
    </Flex>
  );
};

MapTile.propTypes = {
  maptile: React.PropTypes.object.isRequired,
  maptileCompleted: React.PropTypes.func.isRequired,
  saveMapTile: React.PropTypes.func.isRequired,
};

export default MapTile;
