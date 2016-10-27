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
        "...":"...",
        /*
         Remplacer "... : ..." par :
         Vie
         Énergie
         Armure
         Dégâts
         Portée
         Déplacement
         Réduction de dégâts pur
         Réduction de dégâts en %
         Renvoi de dégâts
         Points d’action par tour (exemple : attaquer coûte 10 actions)
         */
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
            "...":"...",
            /*
             Nom des sprites (??)
             Vie
             Vie par niveau (float)
             Énergie
             Énergie par niveau (float)
             Armure
             Dégâts
             Dégâts par niveau (float)
             Portée
             Portée par niveau (float)
             Déplacement
             Déplacement par niveau (float)
             Réduction de dégâts pur
             Réduction de dégâts pur par niveau (float)
             Réduction de dégâts en %
             Réduction de dégâts en % par niveau (float)
             Renvoi de dégâts
             Renvoi de dégâts par niveau (float)
             Points d’action par tour (exemple : attaquer coûte 10 actions)
             Points d’action par tour par niveau (float)
             */
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
            "name":"lightning struck",
            "...":"...",
            /*
             Remplacer "... : ..." par :
             Animation (gif)
             Dégâts instantanés
             Dégâts sur le temps
             Augmentation de dégâts instantanés
             Réduction de dégâts instantanés
             Type de dégâts
             Réduction de dégâts pure (comme une armure, temporaire)
             Augmentation de dégâts pure (temporaire)
             Réduction de dégâts %(comme une armure, temporaire)
             Augmentation de dégâts %(temporaire)
             Renvoi de dégâts
             Augmentation de vie maximum
             Réduction de vie maximum
             Soin instantané
             Soin sur le temps
             Déplacement instantané
             Augmentation des déplacements
             Réduction des déplacements
             Regain d’énergie
             Regain d’énergie sur le temps
             Portée minimale
             Portée linéaire
             Portée diagonale
             Portée linéaire de zone
             Portée diagonale de zone
             Cône (boolean)
             Zone sur cible (boolean)
             Effet de la zone devant (boolean)
             Effet de la zone derrière(boolean)
             Effet de la zone à gauche(boolean)
             Effet de la zone à droite (boolean)
             Casse les objets cassables (boolean)
             Temps d’incantation
             Durée (en tours)
             Coût en énergie
             Coût en vie
             Coût en action
             Nombre d’utilisations
             Temps de repos avant réutilisation
             Description
             */
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
            "name":"deadly death blade",
            "...":"...",
            /*
             Remplacer "... : ..." par :
             Coût
             Image
             Type (Casque, arme…)
             Panoplie
             Niveau requis
             Vie supplémentaire
             Énergie supplémentaire
             Armure supplémentaire
             Réduction de dégâts pure
             Réduction de dégâts %
             Renvoi de dégâts supplémentaire
             Dégâts
             Dégâts supplémentaire purs
             Dégâts supplémentaires %
             Dégâts de compétences purs supplémentaires
             Dégâts de compétences % supplémentaires
             Nombre d’actions requises pour attaque de base (Attaquer : 5 actions)

             */
        },
        "stats_stuffs2":"...",
        "stats_stuffs3":"..."
    },
    "items": {
        "item1" : {
            "name":"life potion v5",
            "...":"...",
            /*
             Remplacer "... : ..." par :
             Image
             Dégâts instantanés
             Dégâts sur le temps
             Augmentation de dégâts instantanés
             Réduction de dégâts instantanés
             Type de dégâts
             Réduction de dégâts pure (comme une armure, temporaire)
             Augmentation de dégâts pure (temporaire)
             Réduction de dégâts %(comme une armure, temporaire)
             Augmentation de dégâts %(temporaire)
             Renvoi de dégâts
             Augmentation de vie maximum
             Réduction de vie maximum
             Soin instantané
             Soin sur le temps
             Déplacement instantané
             Augmentation des déplacements
             Réduction des déplacements
             Regain d’énergie
             Regain d’énergie sur le temps
             Portée
             Sort lié
             Casse les objets cassables (boolean)
             Durée (en tours)
             Coût en action
             Nombre d’emplacements requis (place dans l’inventaire)
             Nombre d’utilisations
             Temps de repos avant réutilisation
             Description
             */
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

            },
            "characters" : {

            },
            "items" : {

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
            "npcs" : {

            },
            "items" : {

            },
            "pcs" : {

            }
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