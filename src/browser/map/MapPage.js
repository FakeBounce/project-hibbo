/**
 * Created by bromanelli on 11/10/2016.
 */
import React from 'react';
import MapTiles from './MapTiles'
import NewMapTile from './NewMapTile'
import Reset from './Reset'
import linksMessages from '../../common/app/linksMessages';
import { Block, Link, Space, PageHeader, Title, View } from '../app/components';

const MapPage = () => (
  <View>
    <Title message={linksMessages.map} />
    <Block>
      <NewMapTile/>
      <MapTiles />
      <Reset/>
    </Block>
  </View>
);

export default MapPage;
