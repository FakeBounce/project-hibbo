/**
 * Created by Fakebounce on 13/11/2016.
 */
import { Record } from '../transit';

const Editor = Record({
    "id": "",
    "name" : "",
    "maptiles" : null,
    "monsters" : null,
    "user_id":"",
    "worldmap_id":"",
    "row_player":"",
    "col_player":"",
}, 'editor');

export default Editor;
