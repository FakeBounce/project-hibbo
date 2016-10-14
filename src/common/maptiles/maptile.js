/**
 * Created by bromanelli on 11/10/2016.
 */
import { Record } from '../transit';

const MapTile = Record({
  completed: false,
  createdAt: null,
  id: '',
  title: '',
}, 'maptile');

export default MapTile;
