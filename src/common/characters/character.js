/**
 * Created by Ben on 17/05/2017.
 */
import { Record } from '../transit';

const Character = Record({
    image: false,
    type: '',
}, 'character');

export default Character;