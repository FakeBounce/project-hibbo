/**
 * Created by bromanelli on 11/10/2016.
 */

import React from 'react';
import Image from './Image'

type Props = {
  x : string,
  y : string
};

const MapTile = ({ ...props }: Props) => {

  return (
    <Image
      {...props}
    />
  );
};

export default MapTile;
