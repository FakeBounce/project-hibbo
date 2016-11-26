/**
 * Created by bromanelli on 27/10/2016.
 */
var bdd = {
    "users":{
    "user1":{
        "nickname":"Fakebounce",
        "level":2,
        "silver":1500,
        "powerstone":50,
        "created_at":"04/05/2016",
        "last_login":"04/05/2016",
        "characters":{
            "id_char1":true,
            "id_char2":true
        },
        "inventory":{
            "id_inventory":true
        },
        "id_current_dungeon" : true
    },
    "user2": "...",
    "user3": "..."
    },
    "characters": {
    "character1" : {
        "name":"xxxlolxxx",
        "level":1,
        "class":"warrior",
        "life" : 15000,
        "energy" : 1000,
        "armor" : 0,
        "damage" : 100,
        "range" : 1,
        "movement" : 2,
        "damage_reduction_flat" : 50,
        "damage_reduction_percent" : 0,
        "damage_return" : 0,
        "action" : 10, // (exemple : attaquer coûte 10 actions)
        "experience":850,
            "equipped_stuff":{
            "id_stuff1":true,
            "id_stuff3":true
        },
        "equipped_spells":{
            "id_spell1":true,
            "id_spell5":true
        },
        "learned_spells":{
            "id_spell1":true,
            "id_spell5":true,
            "id_spell7":true
        }
    },
    "character2":"...",
    "character3":"..."
    },
    "classes": {
        "class1" : {
            "name":"warrior",
            "type" : "pj",
            "sprites_name" : "warrior",
            "life" : 15000,
            "life_lvl" : 1500,
            "energy" : 1000,
            "energy_lvl" : 100,
            "armor" : 0,
            "damage" : 100,
            "damage_lvl" : 10,
            "range" : 1,
            "range_lvl" : 0.02,
            "movement" : 2,
            "movement_lvl" : 0.05,
            "damage_reduction_flat" : 50,
            "damage_reduction_flat_lvl" : 5,
            "damage_reduction_percent" : 0,
            "damage_reduction_percent_lvl" : 0,
            "damage_return" : 0,
            "damage_return_lvl" : 0,
            "action" : 10, // (exemple : attaquer coûte 10 actions)
            "action_lvl" : 0.05,
            "possible_stuff":{
                "id_stuff1":true,
                "id_stuff3":true
            },
            "possible_spell":{
                "id_spell1":true,
                "id_spell5":true
            }
        },
        "class2":"...",
        "class3":"..."
    },
    "inventory": {
        "inventory1" : {
            "stuffs":{
                "id_stuff1":true,
                "id_stuff5":true
            },
            "items":{
                "id_item1":true,
                "id_item4":true
            },
        },
        "inventory2":"...",
        "inventory3":"..."
    },
    "spells": {
        "spell1" : {
            "name":"lightning strike",
            "animation" : "spell1.gif",
            "damage_instant" : 500,
            "damage_time" : 0,
            "damage_instant_buff" : 0,
            "damage_instant_debuff" : 0,
            "damage_type" : "lightning",
            "damage_debuff_flat" : 0,
            "damage_buff_flat" : 0,
            "damage_debuff_percent" : 0,
            "damage_buff_percent" : 0,
            "damage_return" : 0,
            "life_buff" : 0,
            "life_debuff" : 0,
            "heal_instant" : 0,
            "heal_time" : 0,
            "heal_percent_instant" : 0,
            "heal_percent_time" : 0,
            "movement_instant" : 0,
            "movement_buff" : 0,
            "movement_debuff" : 1,
            "energy_heal" : 0,
            "energy_time" : 0,
            "energy_percent_heal" : 0,
            "energy_percent_time" : 0,
            "range_minimum" : 0,
            "range_linear" : 4,
            "range_diagonal" : 3,
            "aoe_linear" : 0,
            "aoe_diagonal" : 0,
            "range_cone" : false,
            "range_on_target" : false,
            "aoe_front" : false,
            "aoe_back" : false,
            "aoe_right" : false,
            "aoe_left" : false,
            "can_break" : false,
            "cast_time" : 0,
            "duration" : 0,
            "energy_cost" : 500,
            "life_cost" : 0,
            "action_cost" : 5,
            "uses" : -1,
            "rest" : 0,
            "description" : "A lightning come from your hands and strike your ennemy",
        },
        "spell2":"...",
        "spell3":"..."
    },
    "stuffs" : {
        "stuff1" : {
            "stats_id" : true
        },
        "stuff2":"...",
        "stuff3":"..."
    },
    "stats_stuffs": {
        "stats_stuffs1" : {
            "name" : "deadly death blade",
            "money_cost" : 1500000,
            "image" : "deadly_death_blade.png",
            "type" : "one handed weapon",
            // "set" : "deadly death knight of death",
            "lvl_required" : 45,
            "life_buff" : 5000,
            "energy_buff" : 500,
            "armor_buff" : 0,
            "damage_reduction_flat" : 0,
            "damage_reduction_percent" : 0,
            "damage" : 5750,
            "damage_buff_flat" : 0,
            "damage_buff_percent" : 15,
            "skill_damage_buff_flat" : 0,
            "skill_damage_buff_percent" : 0,
            "action" : 10, //(Attaquer : 5 actions)
        },
        "stats_stuffs2":"...",
        "stats_stuffs3":"..."
    },
    "items": {
        "item1" : {
            "name":"life potion v5",
            "damage_instant" : 0,
            "damage_time" : 0,
            "damage_instant_buff" : 0,
            "damage_instant_debuff" : 0,
            "damage_type" : "lightning",
            "damage_debuff_flat" : 0,
            "damage_buff_flat" : 0,
            "damage_debuff_percent" : 0,
            "damage_buff_percent" : 0,
            "damage_return" : 0,
            "life_buff" : 0,
            "life_debuff" : 0,
            "heal_instant" : 0,
            "heal_time" : 0,
            "heal_percent_instant" : 0,
            "heal_percent_time" : 0,
            "movement_instant" : 0,
            "movement_buff" : 0,
            "movement_debuff" : 0,
            "energy_heal" : 0,
            "energy_time" : 0,
            "energy_percent_heal" : 0,
            "energy_percent_time" : 0,
            "range" : 4,
            "spell" : 15,
            "can_break" : false,
            "duration" : 0,
            "action_cost" : 5,
            "inventory" : 1,
            "uses" : 1,
            "rest" : 0,
            "description" : "Heal from all damages",
        },
        "item2":"...",
        "item3":"..."
    },
    "type_dungeons": {
        "type_dungeon1" : {
            "name":"Practice",
            "floors": 3,
            "id_type_map1":true,
            "id_type_map2":true,
            "id_type_map3":true,
            "objective" : "kill_all",
            "description" : "Training dungeon"
        },
        "type_dungeon2":"...",
        "type_dungeon3":"..."
    },
    "type_maps": {
        "type_map1" : {
            "maptiles" : {
                0 : {
                    0 : "id_maptile_wall",
                    1 : "id_maptile_wall",
                    2 : "id_maptile_wall",
                    3 : "id_maptile_wall",
                    4 : "id_maptile_grass",
                    "..." : "...",
                },
                1 : {
                    0 : "id_maptile_wall",
                    1 : "id_maptile_wall",
                    2 : "id_maptile_wall",
                    3 : "id_maptile_wall",
                    4 : "id_maptile_wall",
                    "..." : "...",
                },
                "..." : "...",
            },
            "characters" : {
                0 : {
                    4 : "id_character_monster",
                },
                1 : {
                    3 : "id_character_player",
                    4 : "id_character_monster",
                },
                "..." : "...",
            },
            "items" : {
                0 : {
                    4 : "id_potion_full_life",
                },
                1 : {
                    4 : "id_potion_full_energy",
                },
                "..." : "...",
            },
        },
        "type_map2":"...",
        "type_map3":"..."
    },
    "type_maptiles": {
        "type_maptile1" : {
            "name" : "grass",
            "type" : "walkable",
            "breakable" : true,
            "image" : "grass.png",
            "needed_action" : "kill_all",
            "image_after_action" : "grass_action.png"
        },
        "type_maptile2":"...",
        "type_maptile3":"..."
    },
    "dungeons": {
        "dungeon1" : {
            "id_type_dungeon1": true,
            "floors": 3,
            "current_floor": 1,
            "current_difficulty" : "easy",
            "id_map1":true,
            "id_map2":true,
            "id_map3":true,
            "current_players":{
                "id_user1":true,
                "id_user2": true
            },
            "objective" : "kill_all",
            "objective_done" : false,
            "description" : "Training dungeon"
        },
        "dungeon2":"...",
        "dungeon3":"..."
    },
    "maps": {
        "map1" : {
            "maptiles" : {

            },
            "characters" : {

            },
            "items" : {

            },
        },
        "map2":"...",
        "map3":"..."
    },
    "maptiles": {
        "maptile1" : {
            "id_type_maptile" : true,
            "action_done" : true
        },
        "maptile2":"...",
        "maptile3":"..."
    },
    "type_stores" : {
        "store1": {
            "stuffs" : {
                "stuff1" : {
                    "id" : true,
                },
                "stuff2" : {
                    "id" : true,
                },
            "refresh_cooldown" : 36000
            }
        },
        "store2" : "...",
        "store3" : "..."
    },
    "stores" : {
        "store1": {
            "stuffs" : {
                "stuff1" : {
                    "id" : true,
                    "available" : true
                },
                "stuff2" : {
                    "id" : true,
                    "available" : false
                },
            },
            "refresh_cooldown" : 35999
        },
        "store2" : "...",
        "store3" : "..."
    }
}