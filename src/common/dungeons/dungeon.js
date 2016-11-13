/**
 * Created by Ben on 13/11/2016.
 */
import { Record } from '../transit';

const Dungeon = Record({
    "id_type_dungeon1": true,
    "floors": 1,
    "current_floor": 1,
    "current_difficulty" : "easy",
    "id_map1":true,
    "objective" : "kill_all",
    "objective_done" : false,
    "description" : "Training dungeon"
}, 'dungeon');

export default Dungeon;