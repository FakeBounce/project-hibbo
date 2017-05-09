import { Record } from '../transit';

const WorldMap = Record({
    id: '',
    maptiles: object,
    name: ''
}, 'worldmap');

export default WorldMap;