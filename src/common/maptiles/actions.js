/**
 * Created by bromanelli on 12/10/2016.
 */

import { Range } from 'immutable';

/*
export const saveMaptile = maptile =>  ({ firebase }) => {
  firebase.firebase();
  firebase.child(`users-presence/4f8vev89qz798vz87`)
    .push({
      authenticatedAt: 'hoho',
      user: 'haha',
    });
};
*/
export const MAPTILE_COMPLETED = 'MAPTILE_COMPLETED';
export const FIREBASE_SAVE_MAPTILE = 'FIREBASE_SAVE_MAPTILE';


// CREATE + SAVE VERSION
export const maptileCompleted = () => ({ getUid, now, firebase, firebaseDatabase }) => {
  var id = getUid();
  var id1 = getUid();
  var id2 = getUid();
  var id3 = getUid();
  var id4 = getUid();
  var id5 = getUid();
  var id6 = getUid();
  var id7 = getUid();
  var id8 = getUid();
  var id9 = getUid();
  var id10 = getUid();
  var id11 = getUid();
  var id12 = getUid();
  var id13 = getUid();
  var id14 = getUid();
  var id15 = getUid();
  var id16 = getUid();
  var id17 = getUid();
  var id18 = getUid();
  var id19 = getUid();
  var id20 = getUid();
  var id21 = getUid();
  var id22 = getUid();
  var id23 = getUid();
  var id24 = getUid();
  var id25 = getUid();
  var id26 = getUid();
  var id27 = getUid();
  var id28 = getUid();
  var id29 = getUid();
  var id30 = getUid();
  var id31 = getUid();
  var id32 = getUid();
  var id33 = getUid();
  var id34 = getUid();
  var id35 = getUid();
  var id36 = getUid();
  var id37 = getUid();
  var id38 = getUid();
  var id39 = getUid();
  var id40 = getUid();
  var id41 = getUid();
  var id42 = getUid();
  var id43 = getUid();
  var id44 = getUid();
  var id45 = getUid();
  var id46 = getUid();
  var id47 = getUid();
  var id48 = getUid();
  var id49 = getUid();
  var id50 = getUid();
  var id51 = getUid();
  var id52 = getUid();
  var id53 = getUid();
  var id54 = getUid();
  var id55 = getUid();
  var id56 = getUid();
  var id57 = getUid();
  var id58 = getUid();
  var id59 = getUid();
  var id60 = getUid();
  var id61 = getUid();
  var id62 = getUid();
  var id63 = getUid();
  var id64 = getUid();
  var id65 = getUid();
  var id66 = getUid();
  var id67 = getUid();
  var id68 = getUid();
  var id69 = getUid();
  var id70 = getUid();
  var id71 = getUid();
  var id72 = getUid();
  var id73 = getUid();
  var id74 = getUid();
  var id75 = getUid();
  var id76 = getUid();
  var id77 = getUid();
  var id78 = getUid();
  var id79 = getUid();
  var id80 = getUid();
  var id81 = getUid();
  var id82 = getUid();
  var id83 = getUid();
  var id84 = getUid();
  var id85 = getUid();
  var id86 = getUid();
  var id87 = getUid();
  var id88 = getUid();
  var id89 = getUid();
  var id90 = getUid();
  var id91 = getUid();
  var id92 = getUid();
  var id93 = getUid();
  var id94 = getUid();
  var id95 = getUid();
  var id96 = getUid();
  var dungeon = { description: `Training dungeon`, id: `0665f39f-707c-4a5d-9fab-c3e18456746c`,idMap: `603414e3-d8fc-4b3f-ac56-376160eb7960`,name: `Practice`}
  // firebase.update({
  //     [`classes/Warrior`]:{
  //           name:"Warrior",
  //           type: "pj",
  //           sprites_name: "warrior",
  //           health: 15000,
  //           health_lvl: 1500,
  //           energy: 1000,
  //           energy_lvl: 100,
  //           armor: 0,
  //           damage: 100,
  //           damage_lvl: 10,
  //           range: 1,
  //           range_lvl: 0,
  //           movement: 2,
  //           movement_lvl: 0.05,
  //           damage_reduction_flat: 50,
  //           damage_reduction_flat_lvl: 5,
  //           damage_reduction_percent: 0,
  //           damage_reduction_percent_lvl: 0,
  //           damage_return: 0,
  //           damage_return_lvl: 0,
  //         image:"/assets/images/classes/Warrior/down.png",
  //         basicCost:10,
  //           action: 10, // (exemple : attaquer coûte 10 actions)
  //           action_lvl: 0.05,
  //           learned_spells:{
  //               "54c26aff-c846-44c6-88a4-2c486a9c6257": {
  //               get: true,
  //               id:"54c26aff-c846-44c6-88a4-2c486a9c6257",
  //               css: "objet0",
  //               name:"lightning strike",
  //               // animation: "spell1.gif",
  //               image: "spell1.gif",
  //               damage_instant: 500,
  //               damage_time: 0,
  //               damage_instant_buff: 0,
  //               damage_instant_debuff: 0,
  //               damage_type: "lightning",
  //               damage_debuff_flat: 0,
  //               damage_buff_flat: 0,
  //               damage_debuff_percent: 0,
  //               damage_buff_percent: 0,
  //               damage_return: 0,
  //               life_buff: 0,
  //               life_debuff: 0,
  //               heal_instant: 0,
  //               heal_time: 0,
  //               heal_percent_instant: 0,
  //               heal_percent_time: 0,
  //               movement_instant: 0,
  //               movement_buff: 0,
  //               movement_debuff: 0,
  //               energy_heal: 0,
  //               energy_time: 0,
  //               energy_percent_heal: 0,
  //               energy_percent_time: 0,
  //               range_minimum: 0,
  //               range_linear: 2,
  //               range_diagonal: 0,
  //               aoe_linear: 0,
  //               aoe_diagonal: 0,
  //               range_cone: false,
  //               range_on_target: false,
  //               aoe_front: false,
  //               aoe_back: false,
  //               aoe_right: false,
  //               aoe_left: false,
  //               can_break: false,
  //               cast_time: 0,
  //               duration: 0,
  //               energy_cost: 500,
  //               life_cost: 0,
  //               action_cost: 5,
  //               uses: -1,
  //               rest: 0,
  //               description: "A lightning come from your hands and strike your ennemy",
  //                 image:"assets/images/skills/Cyclone_Axe.jpg",
  //           },
  //         },
  //         equipped_spells: {
  //             0: {
  //                 get: true,
  //                 id:"54c26aff-c846-44c6-88a4-2c486a9c6257",
  //                 css: "objet0",
  //                 name:"lightning strike",
  //                 // animation: "spell1.gif",
  //                 image: "spell1.gif",
  //                 damage_instant: 500,
  //                 damage_time: 0,
  //                 damage_instant_buff: 0,
  //                 damage_instant_debuff: 0,
  //                 damage_type: "lightning",
  //                 damage_debuff_flat: 0,
  //                 damage_buff_flat: 0,
  //                 damage_debuff_percent: 0,
  //                 damage_buff_percent: 0,
  //                 damage_return: 0,
  //                 life_buff: 0,
  //                 life_debuff: 0,
  //                 heal_instant: 0,
  //                 heal_time: 0,
  //                 heal_percent_instant: 0,
  //                 heal_percent_time: 0,
  //                 movement_instant: 0,
  //                 movement_buff: 0,
  //                 movement_debuff: 0,
  //                 energy_heal: 0,
  //                 energy_time: 0,
  //                 energy_percent_heal: 0,
  //                 energy_percent_time: 0,
  //                 range_minimum: 1,
  //                 range_linear: 2,
  //                 range_diagonal: 0,
  //                 aoe_linear: 0,
  //                 aoe_diagonal: 0,
  //                 range_cone: false,
  //                 range_on_target: false,
  //                 aoe_front: false,
  //                 aoe_back: false,
  //                 aoe_right: false,
  //                 aoe_left: false,
  //                 can_break: false,
  //                 cast_time: 0,
  //                 duration: 0,
  //                 energy_cost: 500,
  //                 life_cost: 0,
  //                 action_cost: 5,
  //                 uses: -1,
  //                 rest: 0,
  //                 description: "A lightning come from your hands and strike your ennemy",
  //                 image:"assets/images/skills/Cyclone_Axe.jpg",
  //                 number:0,
  //             },
  //         }
  //   },
  // });
  // firebase.update({
  //   [`maptiles/${id}`]: { completed: false, id: id, title : `Grass Left Door`,image:"/assets/images/grass_left_door.png" },
  // });

     firebase.update({
       [`dungeons/5fc2dadf-4d19-419a-8c9a-3886acdef415`]: { description: "first", name: "first", from_editor : false,id:"5fc2dadf-4d19-419a-8c9a-3886acdef415",lock:false, name : "first",worldmap:"603414e3-d8fc-4b3f-ac56-376160eb7958" },
     });

                // ADD FAKE DUNGEON
  //[`dungeons/${id}`]: { id: id, map:`987654321`, name : `Practice`,description : `Training dungeon` },
  // [`typeDungeons/${id}`]: { id: id, name : `Practice`,description : `Training dungeon`, idMap1: `603414e3-d8fc-4b3f-ac56-376160eb7958`},
  //[`activeDungeons/${id}`]: { createdAt: firebaseDatabase.ServerValue.TIMESTAMP, dungeon: dungeon},

    // firebase.update({
    //     [`monsters/${id}`]: {
    //             id:id,
    //             image:"/assets/images/monsters/remove_monster_tile.png",
    //             damage:0,
    //             health:0,
    //             maxhealth:0,
    //             name:"Remove Monster",
    //             type:"remove",
    //             move: 0,
    //             range: 0
    //         },});
  //ADD FAKE MAP
  //   firebase.update({
  //     [`maps/603414e3-d8fc-4b3f-ac56-376160eb7958`]: {
  //         id: '603414e3-d8fc-4b3f-ac56-376160eb7958', name: `first`,
  //         monsters : {
  //             0: {
  //                 image:"/assets/images/monsters/Warrior.png",
  //                 damage:250,
  //                 health:400,
  //                 maxhealth:400,
  //                 name:"Warrior",
  //                 type:"pnj",
  //                 row: 0,
  //                 col: 1,
  //                 move: 1,
  //                 range: 1,
  //                 is_attacking: false,
  //                 is_moving: false,
  //                 number:0,
  //             },
  //             1: {
  //                 image:"/assets/images/monsters/Warrior.png",
  //                 damage:250,
  //                 health:400,
  //                 maxhealth:400,
  //                 name:"Warrior",
  //                 type:"pnj",
  //                 row: 3,
  //                 col: 1,
  //                 move: 1,
  //                 range: 1,
  //                 is_attacking: false,
  //                 is_moving: false,
  //                 number:1,
  //             }
  //         },
  //         maptiles: {
  //             0: {
  //                 0: {
  //                     completed: false,
  //                     id: id1,
  //                     image: "/assets/images/grass.png",
  //                     title: "forest",
  //                     type: "walkable",
  //                     character: {
  //                         image:"/assets/images/classes/gface.png",
  //                         damage:100,
  //                         health:15000,
  //                         name:"Warrior",
  //                         type:"pj",
  //                     }
  //                 },
  //                 1: {
  //                     completed: false,
  //                     id: id2,
  //                     image: "/assets/images/grass.png",
  //                     title: "forest",
  //                     type: "walkable",
  //                     character: {
  //                         image:"/assets/images/monsters/Warrior.png",
  //                         damage:250,
  //                         health:400,
  //                         maxhealth:400,
  //                         name:"Warrior",
  //                         type:"pnj",
  //                         move: 1,
  //                         range: 1,
  //                         number:0
  //                     }
  //                 },
  //                 2: {
  //                     completed: false,
  //                     id: id3,
  //                     image: "/assets/images/forest.png",
  //                     title: "forest"
  //                 },
  //                 3: {
  //                   completed: false,
  //                   id: id4,
  //                   image: "/assets/images/forest.png",
  //                   title: "forest"
  //                 },
  //                 4: {
  //                   completed: false,
  //                   id: id5,
  //                   image: "/assets/images/forest.png",
  //                   title: "forest"
  //                 },
  //                 5: {
  //                   completed: false,
  //                   id: id6,
  //                   image: "/assets/images/forest.png",
  //                   title: "forest"
  //                 },
  //                 6: {
  //                   completed: false,
  //                   id: id7,
  //                   image: "/assets/images/forest.png",
  //                   title: "forest"
  //                 },
  //                 7: {
  //                   completed: false,
  //                   id: id8,
  //                   image: "/assets/images/forest.png",
  //                   title: "forest"
  //                 },
  //                 8: {
  //                   completed: false,
  //                   id: id9,
  //                   image: "/assets/images/forest.png",
  //                   title: "forest"
  //                 },
  //                 9: {
  //                   completed: false,
  //                   id: id10,
  //                   image: "/assets/images/forest.png",
  //                   title: "forest"
  //                 }
  //             },
  //             1: {
  //               0: {
  //                 completed: false,
  //                 id: id11,
  //                 image: "/assets/images/grass.png",
  //                   type: "walkable",
  //                 title: "forest"
  //               },
  //               1: {
  //                 completed: false,
  //                 id: id12,
  //                 image: "/assets/images/grass.png",
  //                   type: "walkable",
  //                 title: "forest"
  //               },
  //               2: {
  //                 completed: false,
  //                 id: id13,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               },
  //               3: {
  //                 completed: false,
  //                 id: id14,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               },
  //               4: {
  //                 completed: false,
  //                 id: id15,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               },
  //               5: {
  //                 completed: false,
  //                 id: id16,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               },
  //               6: {
  //                 completed: false,
  //                 id: id17,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               },
  //               7: {
  //                 completed: false,
  //                 id: id18,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               },
  //               8: {
  //                 completed: false,
  //                 id: id19,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               },
  //               9: {
  //                 completed: false,
  //                 id: id20,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               }
  //             },
  //             2: {
  //               0: {
  //                 completed: false,
  //                 id: id21,
  //                 image: "/assets/images/grass.png",
  //                   type: "walkable",
  //                 title: "forest",
  //               },
  //               1: {
  //                 completed: false,
  //                 id: id22,
  //                 image: "/assets/images/grass.png",
  //                   type: "walkable",
  //                 title: "forest",
  //               },
  //               2: {
  //                 completed: false,
  //                 id: id23,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               },
  //               3: {
  //                 completed: false,
  //                 id: id24,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               },
  //               4: {
  //                 completed: false,
  //                 id: id25,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               },
  //               5: {
  //                 completed: false,
  //                 id: id26,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               },
  //               6: {
  //                 completed: false,
  //                 id: id27,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               },
  //               7: {
  //                 completed: false,
  //                 id: id28,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               },
  //               8: {
  //                 completed: false,
  //                 id: id29,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               },
  //               9: {
  //                 completed: false,
  //                 id: id30,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               }
  //             },
  //             3: {
  //               0: {
  //                 completed: false,
  //                 id: id31,
  //                 image: "/assets/images/grass.png",
  //                   type: "walkable",
  //                 title: "forest"
  //               },
  //               1: {
  //                 completed: false,
  //                 id: id32,
  //                 image: "/assets/images/grass.png",
  //                   type: "walkable",
  //                 title: "forest",
  //                 character: {
  //                     image:"/assets/images/monsters/Warrior.png",
  //                     damage:250,
  //                     health:400,
  //                     maxhealth:400,
  //                     name:"Warrior",
  //                     type:"pnj",
  //                     move: 1,
  //                     range: 1,
  //                     number:1
  //                 }
  //               },
  //               2: {
  //                 completed: false,
  //                 id: id33,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               },
  //               3: {
  //                 completed: false,
  //                 id: id34,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               },
  //               4: {
  //                 completed: false,
  //                 id: id35,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               },
  //               5: {
  //                 completed: false,
  //                 id: id36,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               },
  //               6: {
  //                 completed: false,
  //                 id: id37,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               },
  //               7: {
  //                 completed: false,
  //                 id: id38,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               },
  //               8: {
  //                 completed: false,
  //                 id: id39,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               },
  //               9: {
  //                 completed: false,
  //                 id: id40,
  //                 image: "/assets/images/forest.png",
  //                 title: "forest"
  //               }
  //             },
  //           4: {
  //             0: {
  //               completed: false,
  //               id: id41,
  //               image: "/assets/images/grass.png",
  //                 type: "walkable",
  //               title: "forest"
  //             },
  //             1: {
  //               completed: false,
  //               id: id42,
  //               image: "/assets/images/grass.png",
  //                 type: "walkable",
  //               title: "forest"
  //             },
  //             2: {
  //               completed: false,
  //               id: id43,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             3: {
  //               completed: false,
  //               id: id44,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             4: {
  //               completed: false,
  //               id: id45,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             5: {
  //               completed: false,
  //               id: id46,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             6: {
  //               completed: false,
  //               id: id47,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             7: {
  //               completed: false,
  //               id: id48,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             8: {
  //               completed: false,
  //               id: id49,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             9: {
  //               completed: false,
  //               id: id50,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             }
  //           },
  //           5: {
  //             0: {
  //               completed: false,
  //               id: id51,
  //               image: "/assets/images/grass.png",
  //                 type: "walkable",
  //               title: "forest"
  //             },
  //             1: {
  //               completed: false,
  //               id: id52,
  //               image: "/assets/images/grass.png",
  //                 type: "walkable",
  //               title: "forest"
  //             },
  //             2: {
  //               completed: false,
  //               id: id53,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             3: {
  //               completed: false,
  //               id: id54,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             4: {
  //               completed: false,
  //               id: id55,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             5: {
  //               completed: false,
  //               id: id56,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             6: {
  //               completed: false,
  //               id: id57,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             7: {
  //               completed: false,
  //               id: id58,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             8: {
  //               completed: false,
  //               id: id59,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             9: {
  //               completed: false,
  //               id: id60,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             }
  //           },
  //           6: {
  //             0: {
  //               completed: false,
  //               id: id61,
  //               image: "/assets/images/grass.png",
  //                 type: "walkable",
  //               title: "forest"
  //             },
  //             1: {
  //               completed: false,
  //               id: id62,
  //               image: "/assets/images/grass.png",
  //                 type: "walkable",
  //               title: "forest"
  //             },
  //             2: {
  //               completed: false,
  //               id: id63,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             3: {
  //               completed: false,
  //               id: id64,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             4: {
  //               completed: false,
  //               id: id65,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             5: {
  //               completed: false,
  //               id: id66,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             6: {
  //               completed: false,
  //               id: id67,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             7: {
  //               completed: false,
  //               id: id68,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             8: {
  //               completed: false,
  //               id: id69,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             9: {
  //               completed: false,
  //               id: id70,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             }
  //           },
  //           7:{
  //             0: {
  //               completed: false,
  //               id: id71,
  //               image: "/assets/images/grass.png",
  //                 type: "walkable",
  //               title: "forest"
  //             },
  //             1: {
  //               completed: false,
  //               id: id72,
  //               image: "/assets/images/grass.png",
  //                 type: "walkable",
  //               title: "forest"
  //             },
  //             2: {
  //               completed: false,
  //               id: id73,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             3: {
  //               completed: false,
  //               id: id74,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             4: {
  //               completed: false,
  //               id: id75,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             5: {
  //               completed: false,
  //               id: id76,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             6: {
  //               completed: false,
  //               id: id77,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             7: {
  //               completed: false,
  //               id: id78,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             8: {
  //               completed: false,
  //               id: id79,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             },
  //             9: {
  //               completed: false,
  //               id: id80,
  //               image: "/assets/images/forest.png",
  //               title: "forest"
  //             }
  //           }
  //         }
  //     }});


  //ADD FAKE SKILLS
  // firebase.update({
  //   [`skills`]: {
  //     0: {
  //       get: true,
  //       id: id81,
  //       css: "objet0",
  //       name:"lightning strike",
  //       // animation: "spell1.gif",
  //       image: "spell1.gif",
  //       damage_instant: 500,
  //       damage_time: 0,
  //       damage_instant_buff: 0,
  //       damage_instant_debuff: 0,
  //       damage_type: "lightning",
  //       damage_debuff_flat: 0,
  //       damage_buff_flat: 0,
  //       damage_debuff_percent: 0,
  //       damage_buff_percent: 0,
  //       damage_return: 0,
  //       life_buff: 0,
  //       life_debuff: 0,
  //       heal_instant: 0,
  //       heal_time: 0,
  //       heal_percent_instant: 0,
  //       heal_percent_time: 0,
  //       movement_instant: 0,
  //       movement_buff: 0,
  //       movement_debuff: 0,
  //       energy_heal: 0,
  //       energy_time: 0,
  //       energy_percent_heal: 0,
  //       energy_percent_time: 0,
  //       range_minimum: 0,
  //       range_linear: 2,
  //       range_diagonal: 0,
  //       aoe_linear: 0,
  //       aoe_diagonal: 0,
  //       range_cone: false,
  //       range_on_target: false,
  //       aoe_front: false,
  //       aoe_back: false,
  //       aoe_right: false,
  //       aoe_left: false,
  //       can_break: false,
  //       cast_time: 0,
  //       duration: 0,
  //       energy_cost: 500,
  //       life_cost: 0,
  //       action_cost: 5,
  //       uses: -1,
  //       rest: 0,
  //       description: "A lightning come from your hands and strike your ennemy",
  //     },
  //     1: {
  //       get: true,
  //       id: id82,
  //       css: "objet1",
  //       title: "fiole1"
  //     },
  //     2: {
  //       get: true,
  //       id: id83,
  //       css: "objet2",
  //       title: "fiole2"
  //     },
  //     3: {
  //       get: true,
  //       id: id84,
  //       css: "objet3",
  //       title: "fiole3"
  //     },
  //     4: {
  //       get: true,
  //       id: id85,
  //       css: "objet4",
  //       title: "fiole4"
  //     },
  //     5: {
  //       get: true,
  //       id: id86,
  //       css: "objet5",
  //       title: "fiole5"
  //     },
  //     6: {
  //       get: true,
  //       id: id87,
  //       css: "objet6",
  //       title: "fiole6"
  //     },
  //     7: {
  //       get: false,
  //       id: id88,
  //       css: "objet7",
  //       title: "fiole7"
  //     },
  //   }
  // });

  //ADD FAKE WEAPONS
  // firebase.update({
  //   [`weapons`]: {
  //     0: {
  //       get: true,
  //       id: id89,
  //       css: "weapon0",
  //       title: "weapon0"
  //     },
  //     1: {
  //       get: true,
  //       id: id90,
  //       css: "weapon1",
  //       title: "weapon1"
  //     },
  //     2: {
  //       get: true,
  //       id: id91,
  //       css: "weapon2",
  //       title: "weapon2"
  //     },
  //     3: {
  //       get: true,
  //       id: id92,
  //       css: "weapon3",
  //       title: "weapon3"
  //     },
  //     4: {
  //       get: true,
  //       id: id93,
  //       css: "weapon4",
  //       title: "weapon4"
  //     },
  //     5: {
  //       get: true,
  //       id: id94,
  //       css: "weapon5",
  //       title: "weapon5"
  //     },
  //     6: {
  //       get: true,
  //       id: id95,
  //       css: "weapon6",
  //       title: "weapon6"
  //     },
  //     7: {
  //       get: false,
  //       id: id96,
  //       css: "weapon7",
  //       title: "weapon7"
  //     }
  //   }});

  return {
    type: MAPTILE_COMPLETED,
    payload: {
      createdAt: now(),
      id: id,
      title: `MapTile #123`,
    },
  };
};




// CREATE ONLY
/*
export const maptileCompleted = () => ({ getUid, now }) => ({
    type: MAPTILE_COMPLETED,
    payload: {
      createdAt: now(),
      id: getUid(),
      title: `MapTile #123`,
    },
});
*/
export const saveMapTile = (maptile) =>  ({ firebase }) => {

  const { ...json } = maptile.toJS();
  const promise = firebase.update({
    [`maptile/${maptile.id}`]: { json },
  });
  return {
    type: FIREBASE_SAVE_MAPTILE,
    payload: promise,
  };
};
