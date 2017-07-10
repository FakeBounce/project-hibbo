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
export const DELETE_USER = 'DELETE_USER';
export const ADD_DEFAULT_DUNGEON = 'ADD_DEFAULT_DUNGEON';


// CREATE + SAVE VERSION
export const deleteUser = (viewer) => ({ firebase }) => {
    firebase.update({
        [`activeDungeons/${viewer.id}`]:null,
        [`activeMap/${viewer.id}`]:null,
        [`users/${viewer.id}/active`]:null,
        [`users/${viewer.id}/characters`]:null,

    });
    return {
        type: DELETE_USER,
        payload: null,
    };
};

export const addDefaultDungeon = () => ({ firebase}) => {

    firebase.update({
        [`dungeons/5fc2dadf-4d19-419a-8c9a-3886acdef415`]: { description: "first", name: "first", from_editor : false,id:"5fc2dadf-4d19-419a-8c9a-3886acdef415",lock:false, name : "first",worldmap:"603414e3-d8fc-4b3f-ac56-376160eb7958" },
    });
    return {
        type: ADD_DEFAULT_DUNGEON,
        payload: null,
    };
};

export const maptileCompleted = () => ({ getUid, now, firebase, firebaseDatabase }) => {

  //[`dungeons/${id}`]: { id: id, map:`987654321`, name : `Practice`,description : `Training dungeon` },
  // [`typeDungeons/${id}`]: { id: id, name : `Practice`,description : `Training dungeon`, idMap1: `603414e3-d8fc-4b3f-ac56-376160eb7958`},
  //[`activeDungeons/${id}`]: { createdAt: firebaseDatabase.ServerValue.TIMESTAMP, dungeon: dungeon},

    //ADD Monsters
    /*
    firebase.update({
        [`monsters/${id}`]: {
                id:id,
                image:"/assets/images/monsters/remove_monster_tile.png",
                damage:0,
                health:0,
                maxhealth:0,
                name:"Remove Monster",
                type:"remove",
                move: 0,
                range: 0
            },});
    */


  //ADD FAKE MAP
    /*
    firebase.update({
      [`maps/603414e3-d8fc-4b3f-ac56-376160eb7958`]: {
          id: '603414e3-d8fc-4b3f-ac56-376160eb7958', name: `first`,
          monsters : {
              0: {
                  image:"/assets/images/monsters/Warrior.png",
                  damage:250,
                  health:400,
                  maxhealth:400,
                  name:"Warrior",
                  type:"pnj",
                  row: 0,
                  col: 1,
                  move: 1,
                  range: 1,
                  is_attacking: false,
                  is_moving: false,
                  number:0,
              },
              1: {
                  image:"/assets/images/monsters/Warrior.png",
                  damage:250,
                  health:400,
                  maxhealth:400,
                  name:"Warrior",
                  type:"pnj",
                  row: 3,
                  col: 1,
                  move: 1,
                  range: 1,
                  is_attacking: false,
                  is_moving: false,
                  number:1,
              }
          },
          maptiles: {
              0: {
                  0: {
                      completed: false,
                      id: id1,
                      image: "/assets/images/grass.png",
                      title: "forest",
                      type: "walkable",
                      character: {
                          image:"/assets/images/classes/gface.png",
                          damage:100,
                          health:15000,
                          name:"Warrior",
                          type:"pj",
                      }
                  },
                  1: {
                      completed: false,
                      id: id2,
                      image: "/assets/images/grass.png",
                      title: "forest",
                      type: "walkable",
                      character: {
                          image:"/assets/images/monsters/Warrior.png",
                          damage:250,
                          health:400,
                          maxhealth:400,
                          name:"Warrior",
                          type:"pnj",
                          move: 1,
                          range: 1,
                          number:0
                      }
                  },
                  2: {
                      completed: false,
                      id: id3,
                      image: "/assets/images/forest.png",
                      title: "forest"
                  },
                  3: {
                    completed: false,
                    id: id4,
                    image: "/assets/images/forest.png",
                    title: "forest"
                  },
                  4: {
                    completed: false,
                    id: id5,
                    image: "/assets/images/forest.png",
                    title: "forest"
                  },
                  5: {
                    completed: false,
                    id: id6,
                    image: "/assets/images/forest.png",
                    title: "forest"
                  },
                  6: {
                    completed: false,
                    id: id7,
                    image: "/assets/images/forest.png",
                    title: "forest"
                  },
                  7: {
                    completed: false,
                    id: id8,
                    image: "/assets/images/forest.png",
                    title: "forest"
                  },
                  8: {
                    completed: false,
                    id: id9,
                    image: "/assets/images/forest.png",
                    title: "forest"
                  },
                  9: {
                    completed: false,
                    id: id10,
                    image: "/assets/images/forest.png",
                    title: "forest"
                  }
              },
              1: {
                0: {
                  completed: false,
                  id: id11,
                  image: "/assets/images/grass.png",
                    type: "walkable",
                  title: "forest"
                },
                1: {
                  completed: false,
                  id: id12,
                  image: "/assets/images/grass.png",
                    type: "walkable",
                  title: "forest"
                },
                2: {
                  completed: false,
                  id: id13,
                  image: "/assets/images/forest.png",
                  title: "forest"
                },
                3: {
                  completed: false,
                  id: id14,
                  image: "/assets/images/forest.png",
                  title: "forest"
                },
                4: {
                  completed: false,
                  id: id15,
                  image: "/assets/images/forest.png",
                  title: "forest"
                },
                5: {
                  completed: false,
                  id: id16,
                  image: "/assets/images/forest.png",
                  title: "forest"
                },
                6: {
                  completed: false,
                  id: id17,
                  image: "/assets/images/forest.png",
                  title: "forest"
                },
                7: {
                  completed: false,
                  id: id18,
                  image: "/assets/images/forest.png",
                  title: "forest"
                },
                8: {
                  completed: false,
                  id: id19,
                  image: "/assets/images/forest.png",
                  title: "forest"
                },
                9: {
                  completed: false,
                  id: id20,
                  image: "/assets/images/forest.png",
                  title: "forest"
                }
              },
              2: {
                0: {
                  completed: false,
                  id: id21,
                  image: "/assets/images/grass.png",
                    type: "walkable",
                  title: "forest",
                },
                1: {
                  completed: false,
                  id: id22,
                  image: "/assets/images/grass.png",
                    type: "walkable",
                  title: "forest",
                },
                2: {
                  completed: false,
                  id: id23,
                  image: "/assets/images/forest.png",
                  title: "forest"
                },
                3: {
                  completed: false,
                  id: id24,
                  image: "/assets/images/forest.png",
                  title: "forest"
                },
                4: {
                  completed: false,
                  id: id25,
                  image: "/assets/images/forest.png",
                  title: "forest"
                },
                5: {
                  completed: false,
                  id: id26,
                  image: "/assets/images/forest.png",
                  title: "forest"
                },
                6: {
                  completed: false,
                  id: id27,
                  image: "/assets/images/forest.png",
                  title: "forest"
                },
                7: {
                  completed: false,
                  id: id28,
                  image: "/assets/images/forest.png",
                  title: "forest"
                },
                8: {
                  completed: false,
                  id: id29,
                  image: "/assets/images/forest.png",
                  title: "forest"
                },
                9: {
                  completed: false,
                  id: id30,
                  image: "/assets/images/forest.png",
                  title: "forest"
                }
              },
              3: {
                0: {
                  completed: false,
                  id: id31,
                  image: "/assets/images/grass.png",
                    type: "walkable",
                  title: "forest"
                },
                1: {
                  completed: false,
                  id: id32,
                  image: "/assets/images/grass.png",
                    type: "walkable",
                  title: "forest",
                  character: {
                      image:"/assets/images/monsters/Warrior.png",
                      damage:250,
                      health:400,
                      maxhealth:400,
                      name:"Warrior",
                      type:"pnj",
                      move: 1,
                      range: 1,
                      number:1
                  }
                },
                2: {
                  completed: false,
                  id: id33,
                  image: "/assets/images/forest.png",
                  title: "forest"
                },
                3: {
                  completed: false,
                  id: id34,
                  image: "/assets/images/forest.png",
                  title: "forest"
                },
                4: {
                  completed: false,
                  id: id35,
                  image: "/assets/images/forest.png",
                  title: "forest"
                },
                5: {
                  completed: false,
                  id: id36,
                  image: "/assets/images/forest.png",
                  title: "forest"
                },
                6: {
                  completed: false,
                  id: id37,
                  image: "/assets/images/forest.png",
                  title: "forest"
                },
                7: {
                  completed: false,
                  id: id38,
                  image: "/assets/images/forest.png",
                  title: "forest"
                },
                8: {
                  completed: false,
                  id: id39,
                  image: "/assets/images/forest.png",
                  title: "forest"
                },
                9: {
                  completed: false,
                  id: id40,
                  image: "/assets/images/forest.png",
                  title: "forest"
                }
              },
            4: {
              0: {
                completed: false,
                id: id41,
                image: "/assets/images/grass.png",
                  type: "walkable",
                title: "forest"
              },
              1: {
                completed: false,
                id: id42,
                image: "/assets/images/grass.png",
                  type: "walkable",
                title: "forest"
              },
              2: {
                completed: false,
                id: id43,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              3: {
                completed: false,
                id: id44,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              4: {
                completed: false,
                id: id45,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              5: {
                completed: false,
                id: id46,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              6: {
                completed: false,
                id: id47,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              7: {
                completed: false,
                id: id48,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              8: {
                completed: false,
                id: id49,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              9: {
                completed: false,
                id: id50,
                image: "/assets/images/forest.png",
                title: "forest"
              }
            },
            5: {
              0: {
                completed: false,
                id: id51,
                image: "/assets/images/grass.png",
                  type: "walkable",
                title: "forest"
              },
              1: {
                completed: false,
                id: id52,
                image: "/assets/images/grass.png",
                  type: "walkable",
                title: "forest"
              },
              2: {
                completed: false,
                id: id53,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              3: {
                completed: false,
                id: id54,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              4: {
                completed: false,
                id: id55,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              5: {
                completed: false,
                id: id56,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              6: {
                completed: false,
                id: id57,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              7: {
                completed: false,
                id: id58,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              8: {
                completed: false,
                id: id59,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              9: {
                completed: false,
                id: id60,
                image: "/assets/images/forest.png",
                title: "forest"
              }
            },
            6: {
              0: {
                completed: false,
                id: id61,
                image: "/assets/images/grass.png",
                  type: "walkable",
                title: "forest"
              },
              1: {
                completed: false,
                id: id62,
                image: "/assets/images/grass.png",
                  type: "walkable",
                title: "forest"
              },
              2: {
                completed: false,
                id: id63,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              3: {
                completed: false,
                id: id64,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              4: {
                completed: false,
                id: id65,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              5: {
                completed: false,
                id: id66,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              6: {
                completed: false,
                id: id67,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              7: {
                completed: false,
                id: id68,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              8: {
                completed: false,
                id: id69,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              9: {
                completed: false,
                id: id70,
                image: "/assets/images/forest.png",
                title: "forest"
              }
            },
            7:{
              0: {
                completed: false,
                id: id71,
                image: "/assets/images/grass.png",
                  type: "walkable",
                title: "forest"
              },
              1: {
                completed: false,
                id: id72,
                image: "/assets/images/grass.png",
                  type: "walkable",
                title: "forest"
              },
              2: {
                completed: false,
                id: id73,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              3: {
                completed: false,
                id: id74,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              4: {
                completed: false,
                id: id75,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              5: {
                completed: false,
                id: id76,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              6: {
                completed: false,
                id: id77,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              7: {
                completed: false,
                id: id78,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              8: {
                completed: false,
                id: id79,
                image: "/assets/images/forest.png",
                title: "forest"
              },
              9: {
                completed: false,
                id: id80,
                image: "/assets/images/forest.png",
                title: "forest"
              }
            }
          }
      }});
*/

  //ADD FAKE SKILLS
    /*
  firebase.update({
    [`skills`]: {
      0: {
        get: true,
        id: "81b3a0a2-8810-4691-9c95-fa8313bee937",
        css: "objet0",
        name:"Lightning strike",
        // animation: "spell1.gif",
        image: "spell1.gif",
        damage_instant: 500,
        damage_time: 0,
        damage_instant_buff: 0,
        damage_instant_debuff: 0,
        damage_type: "lightning",
        damage_debuff_flat: 0,
        damage_buff_flat: 0,
        damage_debuff_percent: 0,
        damage_buff_percent: 0,
          damage_reduction_flat: 0,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 0,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
        damage_return: 0,
        damage_return_percent: 0,
        life_buff: 0,
        life_debuff: 0,
        heal_instant: 0,
        heal_time: 0,
        heal_percent_instant: 0,
        heal_percent_time: 0,
        movement_instant: 0,
        movement_buff: 0,
        movement_debuff: 0,
        energy_heal: 0,
        energy_time: 0,
        energy_percent_heal: 0,
        energy_percent_time: 0,
        range_minimum: 0,
        range_linear: 2,
        range_diagonal: 0,
        aoe_linear: 0,
        aoe_diagonal: 0,
        range_cone: false,
        range_on_target: false,
        aoe_front: false,
        aoe_back: false,
        aoe_right: false,
        aoe_left: false,
        can_break: false,
        self: false,
        cast_time: 0,
        duration: 0,
        energy_cost: 500,
        life_cost: 0,
        action_cost: 5,
        uses: -1,
        rest: 0,
        description: "A lightning come from your hands and strike your ennemy",
      },
      1: {
          get: true,
          id: "d26a79ab-a020-4f79-af5f-fdb0c56a6a16",
          css: "objet1",
          name:"Cyclone slash",
          // animation: "spell1.gif",
          image: "Cyclone_Axe.jpg",
          damage_instant: 0,
          damage_time: 0,
          damage_instant_buff: 400,
          damage_instant_debuff: 0,
          damage_type: "",
          damage_debuff_flat: 0,
          damage_buff_flat: 0,
          damage_debuff_percent: 0,
          damage_buff_percent: 0,
          damage_reduction_flat: 0,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 0,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
          damage_return: 0,
          damage_return_percent: 0,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 0,
          heal_time: 0,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 0,
          movement_buff: 0,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 0,
          range_linear: 0,
          range_diagonal: 0,
          aoe_linear: 1,
          aoe_diagonal: 1,
          range_cone: false,
          range_on_target: false,
          aoe_front: true,
          aoe_back: true,
          aoe_right: true,
          aoe_left: true,
          can_break: false,
          self: false,
          cast_time: 0,
          duration: 0,
          energy_cost: 400,
          life_cost: 0,
          action_cost: 10,
          uses: -1,
          rest: 0,
          description: "You turn yourself into a slashing tornado",
      },
      2: {
          get: true,
          id: "7fff18a7-1cc3-4a8f-bb5a-e3d5703cf511",
          css: "objet2",
          name:"Defy pain",
          // animation: "spell1.gif",
          image: "defy_pain.jpg",
          damage_instant: 0,
          damage_time: 0,
          damage_instant_buff: 0,
          damage_instant_debuff: 0,
          damage_type: "",
          damage_debuff_flat: 0,
          damage_buff_flat: 0,
          damage_debuff_percent: 0,
          damage_buff_percent: 0,
          damage_reduction_flat: 250,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 0,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
          damage_return: 0,
          damage_return_percent: 0,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 0,
          heal_time: 0,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 0,
          movement_buff: 0,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 0,
          range_linear: 0,
          range_diagonal: 0,
          aoe_linear: 0,
          aoe_diagonal: 0,
          range_cone: false,
          range_on_target: false,
          aoe_front: false,
          aoe_back: false,
          aoe_right: false,
          aoe_left: false,
          can_break: false,
          self: true,
          cast_time: 0,
          duration: 3,
          energy_cost: 250,
          life_cost: 0,
          action_cost: 0,
          uses: -1,
          rest: 5,
          description: "Forgot about pain and relax",
      },
      3: {
          get: true,
          id: "bfff9742-dc2d-4188-acc1-04aa799de74e",
          css: "objet3",
          name:"Disrupting chop",
          // animation: "spell1.gif",
          image: "Disrupting_Chop.jpg",
          damage_instant: 0,
          damage_time: 0,
          damage_instant_buff: 0,
          damage_instant_debuff: 0,
          damage_type: "Buff",
          damage_debuff_flat: 0,
          damage_buff_flat: 1400,
          damage_debuff_percent: 0,
          damage_buff_percent: 0,
          damage_reduction_flat: 0,
          damage_reduction_percent: 0,
          damage_return: 0,
          damage_return_percent: 0,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 0,
          heal_time: 0,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 0,
          movement_buff: 0,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 0,
          range_linear: 0,
          range_diagonal: 0,
          aoe_linear: 0,
          aoe_diagonal: 0,
          range_cone: false,
          range_on_target: false,
          aoe_front: false,
          aoe_back: false,
          aoe_right: false,
          aoe_left: false,
          can_break: false,
          self: true,
          cast_time: 0,
          duration: 2,
          energy_cost: 600,
          life_cost: 0,
          action_cost: 0,
          uses: -1,
          rest: 5,
          description: "Chop your ennemy with a brutal swing !",
      },
      4: {
          get: true,
          id: "c705d362-a1b6-415b-a16e-8d34497af67c",
          css: "objet3",
          name:"Gash",
          // animation: "spell1.gif",
          image: "Gash.jpg",
          damage_instant: 0,
          damage_time: 150,
          damage_instant_buff: 0,
          damage_instant_debuff: 0,
          damage_type: "Bleed",
          damage_debuff_flat: 0,
          damage_buff_flat: 0,
          damage_debuff_percent: 0,
          damage_buff_percent: 0,
          damage_reduction_flat: 0,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 0,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
          damage_return: 0,
          damage_return_percent: 0,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 0,
          heal_time: 0,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 0,
          movement_buff: 0,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 0,
          range_linear: 1,
          range_diagonal: 0,
          aoe_linear: 0,
          aoe_diagonal: 0,
          range_cone: false,
          range_on_target: false,
          aoe_front: false,
          aoe_back: false,
          aoe_right: false,
          aoe_left: false,
          can_break: false,
          self: false,
          cast_time: 0,
          duration: 10,
          energy_cost: 150,
          life_cost: 0,
          action_cost: 5,
          uses: -1,
          rest: 0,
          description: "Cut opponent's veins and make him bleed",
      },
        //Healing_Signet
      5: {
          get: true,
          id: "ce3c54ce-33fd-4f5a-9180-7b639f04c030",
          css: "objet5",
          name:"Healing signet",
          // animation: "spell1.gif",
          image: "Healing_Signet.jpg",
          damage_instant: 0,
          damage_time: 0,
          damage_instant_buff: 0,
          damage_instant_debuff: 0,
          damage_type: "Heal",
          damage_debuff_flat: 0,
          damage_buff_flat: 0,
          damage_debuff_percent: 0,
          damage_buff_percent: 0,
          damage_reduction_flat: 0,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 0,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
          damage_return: 0,
          damage_return_percent: 0,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 1000,
          heal_time: 0,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 0,
          movement_buff: 0,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 0,
          range_linear: 0,
          range_diagonal: 0,
          aoe_linear: 0,
          aoe_diagonal: 0,
          range_cone: false,
          range_on_target: false,
          aoe_front: false,
          aoe_back: false,
          aoe_right: false,
          aoe_left: false,
          can_break: false,
          self: true,
          cast_time: 0,
          duration: 0,
          energy_cost: 250,
          life_cost: 0,
          action_cost: 0,
          uses: -1,
          rest: 0,
          description: "healing signet make you recover from slight injuries",
      },
      6: {
          get: true,
          id: "a7d83741-9ecc-4714-bc83-8cb152520e0e",
          css: "objet6",
          name:"Sprint",
          // animation: "spell1.gif",
          image: "Sprint.jpg",
          damage_instant: 0,
          damage_time: 0,
          damage_instant_buff: 0,
          damage_instant_debuff: 0,
          damage_type: "Buff",
          damage_debuff_flat: 0,
          damage_buff_flat: 0,
          damage_debuff_percent: 0,
          damage_buff_percent: 0,
          damage_reduction_flat: 0,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 0,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
          damage_return: 0,
          damage_return_percent: 0,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 0,
          heal_time: 0,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 0,
          movement_buff: 2,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 0,
          range_linear: 0,
          range_diagonal: 0,
          aoe_linear: 0,
          aoe_diagonal: 0,
          range_cone: false,
          range_on_target: false,
          aoe_front: false,
          aoe_back: false,
          aoe_right: false,
          aoe_left: false,
          can_break: false,
          self: true,
          cast_time: 0,
          duration: 3,
          energy_cost: 100,
          life_cost: 0,
          action_cost: 0,
          uses: -1,
          rest: 6,
          description: "RUN",
      },
      7: {
          get: true,
          id: "c9863368-778c-4ba9-8252-1b7e23317bac",
          css: "objet7",
          name:"Bulls charge",
          // animation: "spell1.gif",
          image: "Bulls_Charge.jpg",
          damage_instant: 2500,
          damage_time: 0,
          damage_instant_buff: 0,
          damage_instant_debuff: 0,
          damage_type: "",
          damage_debuff_flat: 0,
          damage_buff_flat: 0,
          damage_debuff_percent: 0,
          damage_buff_percent: 0,
          damage_reduction_flat: 0,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 0,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
          damage_return: 0,
          damage_return_percent: 0,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 0,
          heal_time: 0,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 4,
          movement_buff: 0,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 1,
          range_linear: 0,
          range_diagonal: 0,
          aoe_linear: 4,
          aoe_diagonal: 0,
          range_cone: false,
          range_on_target: false,
          aoe_front: false,
          aoe_back: false,
          aoe_right: false,
          aoe_left: false,
          can_break: true,
          self: false,
          cast_time: 0,
          duration: 0,
          energy_cost: 500,
          life_cost: 1500,
          action_cost: 10,
          uses: 2,
          rest: 10,
          description: "Use inner strengh to charge like a bull ! Can break some walls.",
      },
      8: {
          get: true,
          id: "4c85ee79-002e-47b1-8744-0cfc45dab1b2",
          css: "objet8",
          name:"Counter Attack",
          // animation: "spell1.gif",
          image: "Counterattack.jpg",
          damage_instant: 0,
          damage_time: 0,
          damage_instant_buff: 0,
          damage_instant_debuff: 0,
          damage_type: "Melee_Counter",
          damage_debuff_flat: 0,
          damage_buff_flat: 0,
          damage_debuff_percent: 0,
          damage_buff_percent: 0,
          damage_reduction_flat: 0,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 0,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
          damage_return: 0,
          damage_return_percent: 50,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 0,
          heal_time: 0,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 0,
          movement_buff: 0,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 0,
          range_linear: 0,
          range_diagonal: 0,
          aoe_linear: 0,
          aoe_diagonal: 0,
          range_cone: false,
          range_on_target: false,
          aoe_front: false,
          aoe_back: false,
          aoe_right: false,
          aoe_left: false,
          can_break: false,
          self: true,
          cast_time: 0,
          duration: 2,
          energy_cost: 100,
          life_cost: 0,
          action_cost: 0,
          uses: -1,
          rest: 5,
          description: "Counter every melee attack and return damage based on ennemy's attack damage",
      },
      9: {
          get: true,
          id: "be082965-270b-4f10-a3f9-a0cb85195645",
          css: "objet9",
          name:"Bear's defense",
          // animation: "spell1.gif",
          image: "Bears_Defense.jpg",
          damage_instant: 0,
          damage_time: 0,
          damage_instant_buff: 0,
          damage_instant_debuff: 0,
          damage_type: "Buff",
          damage_debuff_flat: 0,
          damage_buff_flat: 0,
          damage_debuff_percent: 0,
          damage_buff_percent: 0,
          damage_reduction_flat: 300,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 0,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
          damage_return: 0,
          damage_return_percent: 0,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 0,
          heal_time: 0,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 0,
          movement_buff: 0,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 0,
          range_linear: 0,
          range_diagonal: 0,
          aoe_linear: 0,
          aoe_diagonal: 0,
          range_cone: false,
          range_on_target: false,
          aoe_front: false,
          aoe_back: false,
          aoe_right: false,
          aoe_left: false,
          can_break: false,
          self: true,
          cast_time: 0,
          duration: 5,
          energy_cost: 1000,
          life_cost: 0,
          action_cost: 0,
          uses: 4,
          rest: 10,
          description: "Strengthen your skin with bear's coat",
      },
      10: {
          get: true,
          id: "be5be3c8-bb6c-4e6b-9ef7-73f0c01ed3e0",
          css: "objet10",
          name:"Troll unguent",
          // animation: "spell1.gif",
          image: "Troll_Unguent.jpg",
          damage_instant: 0,
          damage_time: 0,
          damage_instant_buff: 0,
          damage_instant_debuff: 0,
          damage_type: "Buff",
          damage_debuff_flat: 0,
          damage_buff_flat: 0,
          damage_debuff_percent: 0,
          damage_buff_percent: 0,
          damage_reduction_flat: 0,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 0,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
          damage_return: 0,
          damage_return_percent: 0,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 0,
          heal_time: 200,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 0,
          movement_buff: 0,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 0,
          range_linear: 0,
          range_diagonal: 0,
          aoe_linear: 0,
          aoe_diagonal: 0,
          range_cone: false,
          range_on_target: false,
          aoe_front: false,
          aoe_back: false,
          aoe_right: false,
          aoe_left: false,
          can_break: false,
          self: true,
          cast_time: 0,
          duration: 10,
          energy_cost: 500,
          life_cost: 0,
          action_cost: 0,
          uses: -1,
          rest: 10,
          description: "It close open wounds",
      },
      11: {
          get: true,
          id: "dfe30c2a-12ad-4879-9dbb-d4cf42578e8a",
          css: "objet11",
          name:"Fire trap",
          // animation: "spell1.gif",
          image: "Flame_Trap.jpg",
          damage_instant: 500,
          damage_time: 30,
          damage_instant_buff: 0,
          damage_instant_debuff: 0,
          damage_type: "Trap",
          damage_debuff_flat: 0,
          damage_buff_flat: 0,
          damage_debuff_percent: 0,
          damage_buff_percent: 0,
          damage_reduction_flat: 0,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 0,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
          damage_return: 0,
          damage_return_percent: 0,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 0,
          heal_time: 0,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 0,
          movement_buff: 0,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 0,
          range_linear: 0,
          range_diagonal: 0,
          aoe_linear: 1,
          aoe_diagonal: 1,
          range_cone: false,
          range_on_target: false,
          aoe_front: false,
          aoe_back: false,
          aoe_right: false,
          aoe_left: false,
          can_break: false,
          self: true,
          cast_time: 0,
          duration: 10,
          energy_cost: 700,
          life_cost: 0,
          action_cost: 0,
          uses: -1,
          rest: 2,
          description: "Burn those who get trapped",
      },
      12: {
          get: true,
          id: "51a4efa7-e3c7-4567-8128-bf27d7265259",
          css: "objet12",
          name:"Flame Arrows",
          // animation: "spell1.gif",
          image: "Incendiary_Arrows.jpg",
          damage_instant: 0,
          damage_time: 0,
          damage_instant_buff: 0,
          damage_instant_debuff: 0,
          damage_type: "Buff",
          damage_debuff_flat: 0,
          damage_buff_flat: 220,
          damage_debuff_percent: 0,
          damage_buff_percent: 0,
          damage_reduction_flat: 0,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 0,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
          damage_return: 0,
          damage_return_percent: 0,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 0,
          heal_time: 0,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 0,
          movement_buff: 0,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 0,
          range_linear: 0,
          range_diagonal: 0,
          aoe_linear: 0,
          aoe_diagonal: 0,
          range_cone: false,
          range_on_target: false,
          aoe_front: false,
          aoe_back: false,
          aoe_right: false,
          aoe_left: false,
          can_break: false,
          self: true,
          cast_time: 1,
          duration: 4,
          damage_time_duration: 0,
          energy_cost: 500,
          life_cost: 0,
          action_cost: 0,
          uses: -1,
          rest: 4,
          description: "Hit ennemies with inciendary arrows",
      },
      13: {
          get: true,
          id: "bc41bd9f-4699-4080-aa1b-7477393c8437",
          css: "objet13",
          name:"Poisoned Arrows",
          // animation: "spell1.gif",
          image: "Apply_Poison.jpg",
          damage_instant: 0,
          damage_time: 0,
          damage_instant_buff: 0,
          damage_instant_debuff: 0,
          damage_type: "Buff",
          damage_debuff_flat: 0,
          damage_buff_flat: 120,
          damage_debuff_percent: 0,
          damage_buff_percent: 0,
          damage_reduction_flat: 0,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 40,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
          damage_return: 0,
          damage_return_percent: 0,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 0,
          heal_time: 0,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 0,
          movement_buff: 0,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 0,
          range_linear: 0,
          range_diagonal: 0,
          aoe_linear: 0,
          aoe_diagonal: 0,
          range_cone: false,
          range_on_target: false,
          aoe_front: false,
          aoe_back: false,
          aoe_right: false,
          aoe_left: false,
          can_break: false,
          self: true,
          cast_time: 1,
          duration: 4,
          damage_time_duration: 10,
          energy_cost: 500,
          life_cost: 0,
          action_cost: 0,
          uses: -1,
          rest: 4,
          description: "Hit ennemies with poisoned arrows",
      },
      14: {
          get: true,
          id: "082c32e7-c0a9-4701-bc67-f6459452461a",
          css: "objet14",
          name:"Dual shot",
          // animation: "spell1.gif",
          image: "Barrage.jpg",
          damage_instant: 0,
          damage_time: 0,
          damage_instant_buff: 0,
          damage_instant_debuff: 0,
          damage_type: "",
          damage_debuff_flat: 0,
          damage_buff_flat: 0,
          damage_debuff_percent: 0,
          damage_buff_percent: 150,
          damage_reduction_flat: 0,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 0,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
          damage_return: 0,
          damage_return_percent: 0,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 0,
          heal_time: 0,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 0,
          movement_buff: 0,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 0,
          range_linear: 4,
          range_diagonal: 3,
          aoe_linear: 0,
          aoe_diagonal: 0,
          range_cone: false,
          range_on_target: false,
          aoe_front: false,
          aoe_back: false,
          aoe_right: false,
          aoe_left: false,
          can_break: false,
          self: false,
          cast_time: 0,
          duration: 1,
          damage_time_duration: 0,
          energy_cost: 600,
          life_cost: 0,
          action_cost: 10,
          uses: -1,
          rest: 3,
          description: "You shoot two arrows simultaneously at target foe",
      },
      15: {
          get: true,
          id: "495ad8e6-e364-49b1-9443-917712a013f1",
          css: "objet15",
          name:"Marauder's shot",
          // animation: "spell1.gif",
          image: "Marauder's_Shot.jpg",
          damage_instant: 0,
          damage_time: 0,
          damage_instant_buff: 0,
          damage_instant_debuff: 0,
          damage_type: "",
          damage_debuff_flat: 0,
          damage_buff_flat: 0,
          damage_debuff_percent: 0,
          damage_buff_percent: 250,
          damage_reduction_flat: 0,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 0,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
          damage_return: 0,
          damage_return_percent: 0,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 0,
          heal_time: 0,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 0,
          movement_buff: 0,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 0,
          range_linear: 4,
          range_diagonal: 3,
          aoe_linear: 0,
          aoe_diagonal: 0,
          range_cone: false,
          range_on_target: false,
          aoe_front: false,
          aoe_back: false,
          aoe_right: false,
          aoe_left: false,
          can_break: false,
          self: false,
          cast_time: 0,
          duration: 0,
          damage_time_duration: 0,
          energy_cost: 1600,
          life_cost: 0,
          action_cost: 10,
          uses: -1,
          rest: 10,
          description: "Powerful shot to get through all kind of armor",
      },
      16: {
          get: true,
          id: "86d9ae9b-06a4-489b-8686-f309af33e276",
          css: "objet16",
          name:"Natural Stride",
          // animation: "spell1.gif",
          image: "Natural_Stride.jpg",
          damage_instant: 0,
          damage_time: 0,
          damage_instant_buff: 0,
          damage_instant_debuff: 0,
          damage_type: "Buff",
          damage_debuff_flat: 0,
          damage_buff_flat: 0,
          damage_debuff_percent: 0,
          damage_buff_percent: 0,
          damage_reduction_flat: 0,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 0,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
          damage_return: 0,
          damage_return_percent: 0,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 0,
          heal_time: 0,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 0,
          movement_buff: 1,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 0,
          range_linear: 0,
          range_diagonal: 0,
          aoe_linear: 0,
          aoe_diagonal: 0,
          range_cone: false,
          range_on_target: false,
          aoe_front: false,
          aoe_back: false,
          aoe_right: false,
          aoe_left: false,
          can_break: false,
          self: true,
          cast_time: 0,
          duration: 6,
          damage_time_duration: 0,
          energy_cost: 500,
          life_cost: 0,
          action_cost: 0,
          uses: -1,
          rest: 8,
          description: "Speed up with nature's force",
      },
      17: {
          get: true,
          id: "47ce1fb7-0206-407e-942b-daf9c5a898d7",
          css: "objet17",
          name:"Life conservation",
          // animation: "spell1.gif",
          image: "Aura_of_Restoration.jpg",
          damage_instant: 0,
          damage_time: 0,
          damage_instant_buff: 0,
          damage_instant_debuff: 0,
          damage_type: "Buff",
          damage_debuff_flat: 0,
          damage_buff_flat: 0,
          damage_debuff_percent: 0,
          damage_buff_percent: 0,
          damage_reduction_flat: 0,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 0,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
          damage_return: 0,
          damage_return_percent: 0,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 0,
          heal_time: 0,
          heal_on_energy_percent: 25,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 0,
          movement_buff: 0,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 0,
          range_linear: 0,
          range_diagonal: 0,
          aoe_linear: 0,
          aoe_diagonal: 0,
          range_cone: false,
          range_on_target: false,
          aoe_front: false,
          aoe_back: false,
          aoe_right: false,
          aoe_left: false,
          can_break: false,
          self: true,
          cast_time: 0,
          duration: 20,
          damage_time_duration: 0,
          energy_cost: 600,
          life_cost: 0,
          action_cost: 5,
          uses: -1,
          rest: 10,
          description: "Grant some life when using spells",
      },
      18: {
          get: true,
          id: "ffcda306-712e-4201-ae51-ae396f1d303b",
          css: "objet18",
          name:"Fire fist",
          // animation: "spell1.gif",
          image: "Flare.jpg",
          damage_instant: 100,
          damage_time: 0,
          damage_instant_buff: 0,
          damage_instant_debuff: 0,
          damage_type: "",
          damage_debuff_flat: 0,
          damage_buff_flat: 0,
          damage_debuff_percent: 0,
          damage_buff_percent: 0,
          damage_reduction_flat: 0,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 0,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
          damage_return: 0,
          damage_return_percent: 0,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 0,
          heal_time: 0,
          heal_on_energy_percent: 0,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 0,
          movement_buff: 0,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 0,
          range_linear: 0,
          range_diagonal: 0,
          aoe_linear: 0,
          aoe_diagonal: 0,
          range_cone: false,
          range_on_target: false,
          aoe_front: false,
          aoe_back: false,
          aoe_right: false,
          aoe_left: false,
          can_break: false,
          self: false,
          cast_time: 0,
          duration: 0,
          damage_time_duration: 0,
          energy_cost: 100,
          life_cost: 0,
          action_cost: 5,
          uses: -1,
          rest: 0,
          description: "Hit with a fire first !",
      },
      19: {
          get: true,
          id: "fd9d5180-ca9d-4ba2-bde0-7235f6824571",
          css: "objet19",
          name:"Demon's mark",
          // animation: "spell1.gif",
          image: "Mark_of_Rodgort.jpg",
          damage_instant: 0,
          damage_time: 0,
          damage_instant_buff: 0,
          damage_instant_debuff: 0,
          damage_type: "Mark",
          damage_debuff_flat: 0,
          damage_buff_flat: 0,
          damage_debuff_percent: 0,
          damage_buff_percent: 0,
          damage_reduction_flat: 0,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 250,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
          damage_return: 0,
          damage_return_percent: 0,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 0,
          heal_time: 0,
          heal_on_energy_percent: 0,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 0,
          movement_buff: 0,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 0,
          range_linear: 2,
          range_diagonal: 0,
          aoe_linear: 0,
          aoe_diagonal: 0,
          range_cone: false,
          range_on_target: false,
          aoe_front: false,
          aoe_back: false,
          aoe_right: false,
          aoe_left: false,
          can_break: false,
          self: false,
          cast_time: 0,
          duration: 10,
          damage_time_duration: 2,
          energy_cost: 600,
          life_cost: 0,
          action_cost: 5,
          uses: -1,
          rest: 5,
          description: "Mark your ennemy to deal more fire damage",
      },
      20: {
          get: true,
          id: "1c4570d6-26aa-42ec-b48f-6a453d264811",
          css: "objet20",
          name:"Demon's flame",
          // animation: "spell1.gif",
          image: "Rodgort's_Invocation.jpg",
          damage_instant: 1000,
          damage_time: 0,
          damage_instant_buff: 0,
          damage_instant_debuff: 0,
          damage_type: "Fire",
          damage_debuff_flat: 0,
          damage_buff_flat: 0,
          damage_debuff_percent: 0,
          damage_buff_percent: 0,
          damage_reduction_flat: 0,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 0,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
          damage_return: 0,
          damage_return_percent: 0,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 0,
          heal_time: 0,
          heal_on_energy_percent: 0,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 0,
          movement_buff: 0,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 0,
          range_linear: 2,
          range_diagonal: 0,
          aoe_linear: 0,
          aoe_diagonal: 0,
          range_cone: false,
          range_on_target: false,
          aoe_front: false,
          aoe_back: false,
          aoe_right: false,
          aoe_left: false,
          can_break: false,
          self: false,
          cast_time: 0,
          duration: 0,
          damage_time_duration: 0,
          energy_cost: 800,
          life_cost: 0,
          action_cost: 10,
          uses: -1,
          rest: 0,
          description: "Burn opponent to the ground",
      },
      21: {
          get: true,
          id: "964571f5-6fd3-441c-811f-05f6ee133a4d",
          css: "objet21",
          name:"Fireball",
          // animation: "spell1.gif",
          image: "Fireball.jpg",
          damage_instant: 600,
          damage_time: 0,
          damage_instant_buff: 0,
          damage_instant_debuff: 0,
          damage_type: "Fire",
          damage_debuff_flat: 0,
          damage_buff_flat: 0,
          damage_debuff_percent: 0,
          damage_buff_percent: 0,
          damage_reduction_flat: 0,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 0,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
          damage_return: 0,
          damage_return_percent: 0,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 0,
          heal_time: 0,
          heal_on_energy_percent: 0,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 0,
          movement_buff: 0,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 3,
          range_linear: 3,
          range_diagonal: 0,
          aoe_linear: 0,
          aoe_diagonal: 0,
          range_cone: false,
          range_on_target: false,
          aoe_front: false,
          aoe_back: false,
          aoe_right: false,
          aoe_left: false,
          can_break: false,
          self: false,
          cast_time: 0,
          duration: 0,
          damage_time_duration: 0,
          energy_cost: 700,
          life_cost: 0,
          action_cost: 5,
          uses: -1,
          rest: 0,
          description: "Launch a fireball",
      },
      22: {
          get: true,
          id: "b2cbbfa0-fd0e-40fd-afd5-e89f0181dac8",
          css: "objet22",
          name:"Flame pikes",
          // animation: "spell1.gif",
          image: "Flame_Burst.jpg",
          damage_instant: 300,
          damage_time: 0,
          damage_instant_buff: 0,
          damage_instant_debuff: 0,
          damage_type: "Fire",
          damage_debuff_flat: 0,
          damage_buff_flat: 0,
          damage_debuff_percent: 0,
          damage_buff_percent: 0,
          damage_reduction_flat: 0,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 0,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
          damage_return: 0,
          damage_return_percent: 0,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 0,
          heal_time: 0,
          heal_on_energy_percent: 0,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 0,
          movement_buff: 0,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 0,
          range_linear: 1,
          range_diagonal: 0,
          aoe_linear: 2,
          aoe_diagonal: 1,
          range_cone: false,
          range_on_target: false,
          aoe_front: true,
          aoe_back: false,
          aoe_right: false,
          aoe_left: false,
          can_break: false,
          self: false,
          cast_time: 0,
          duration: 0,
          damage_time_duration: 0,
          energy_cost: 250,
          life_cost: 0,
          action_cost: 10,
          uses: -1,
          rest: 0,
          description: "Create flame pikes from the ground",
      },
      23: {
          get: true,
          id: "66a545db-6bbc-4836-a8b6-a6d210543973",
          css: "objet23",
          name:"Flame pillar",
          // animation: "spell1.gif",
          image: "Immolate.jpg",
          damage_instant: 1500,
          damage_time: 0,
          damage_instant_buff: 0,
          damage_instant_debuff: 0,
          damage_type: "Fire",
          damage_debuff_flat: 0,
          damage_buff_flat: 0,
          damage_debuff_percent: 0,
          damage_buff_percent: 0,
          damage_reduction_flat: 0,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 0,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
          damage_return: 0,
          damage_return_percent: 0,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 0,
          heal_time: 0,
          heal_on_energy_percent: 0,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 0,
          movement_buff: 0,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 0,
          range_linear: 3,
          range_diagonal: 0,
          aoe_linear: 1,
          aoe_diagonal: 1,
          range_cone: false,
          range_on_target: true,
          aoe_front: true,
          aoe_back: true,
          aoe_right: true,
          aoe_left: true,
          can_break: false,
          self: false,
          cast_time: 0,
          duration: 0,
          damage_time_duration: 0,
          energy_cost: 3000,
          life_cost: 0,
          action_cost: 10,
          uses: -1,
          rest: 3,
          description: "Create a pillar of burning flames",
      },
      24: {
          get: true,
          id: "5a677dde-fb9c-4cee-bf0b-c172003844db",
          css: "objet24",
          name:"Dancing flame rings",
          // animation: "spell1.gif",
          image: "Searing_Heat.jpg",
          damage_instant: 500,
          damage_time: 0,
          damage_instant_buff: 0,
          damage_instant_debuff: 0,
          damage_type: "Fire",
          damage_debuff_flat: 0,
          damage_buff_flat: 0,
          damage_debuff_percent: 0,
          damage_buff_percent: 0,
          damage_reduction_flat: 0,
          damage_reduction_percent: 0,
          damage_time_buff_flat: 0,
          damage_time_buff_percent: 0,
          damage_time_debuff_flat: 0,
          damage_time_debuff_percent: 0,
          damage_return: 0,
          damage_return_percent: 0,
          life_buff: 0,
          life_debuff: 0,
          heal_instant: 0,
          heal_time: 0,
          heal_on_energy_percent: 0,
          heal_percent_instant: 0,
          heal_percent_time: 0,
          movement_instant: 0,
          movement_buff: 0,
          movement_debuff: 0,
          energy_heal: 0,
          energy_time: 0,
          energy_percent_heal: 0,
          energy_percent_time: 0,
          range_minimum: 0,
          range_linear: 2,
          range_diagonal: 0,
          aoe_linear: 0,
          aoe_diagonal: 0,
          range_cone: false,
          range_on_target: false,
          aoe_front: false,
          aoe_back: false,
          aoe_right: false,
          aoe_left: false,
          can_break: false,
          self: false,
          cast_time: 0,
          duration: 0,
          damage_time_duration: 0,
          energy_cost: 60,
          life_cost: 180,
          action_cost: 0,
          uses: -1,
          rest: 0,
          description: "Infinite flame rings crushing ennemies",
      },
    }
  });*/

  /*//ADD FAKE WEAPONS
  var a = getUid();
  var b = getUid();
  var c = getUid();
  var d = getUid();
  var e = getUid();
  var f = getUid();
  var g = getUid();
  var h = getUid();
  var i = getUid();
  var j = getUid();
  var k = getUid();
  var l = getUid();
  var m = getUid();
  var n = getUid();
  var o = getUid();
  var p = getUid();
  var q = getUid();
  var r = getUid();
  var s = getUid();
  var t = getUid();
  var u = getUid();
  var v = getUid();
  var w = getUid();
  var x = getUid();
  var y = getUid();
  var z = getUid();
  firebase.update({
    [`equipments/${a}`]: {
            name: a,
            img: "/assets/images/weapons/armor_1.png",
            type: "armor",
            classe: "Mage",
            benefits: {
                health:  100,
                energy: 1000,
                spell_damage: 500
            },

        }});

    firebase.update({
        [`users/iZndq6gNXyOeYsS8xDHenTyMQJe2/characters/0/inventory/${a}`]: {
            name: a,
            img: "/assets/images/weapons/armor_1.png",
            type: "armor",
            classe: "Mage",
            benefits: {
                health:  100,
                energy: 1000,
                spell_damage: 500
            },

        }});

    firebase.update({
        [`equipments/${b}`]: {
            name: b,
            img: "/assets/images/weapons/weapon_1.png",
            type: "weapon",
            classe: "Mage",
            benefits: {
                health:  1000,
                energy: 1000,
                spell_damage: 500
            },

        }});

    firebase.update({
        [`users/iZndq6gNXyOeYsS8xDHenTyMQJe2/characters/0/inventory/${b}`]: {
            name: b,
            img: "/assets/images/weapons/weapon_1.png",
            type: "weapon",
            classe: "Mage",
            benefits: {
                health:  1000,
                energy: 1000,
                spell_damage: 500
            },

        }});

    firebase.update({
        [`equipments/${c}`]: {
            name: c,
            img: "/assets/images/weapons/armor_2.png",
            type: "armor",
            classe: "Mage",
            benefits: {
                energy: 3000,
                spell_damage: 1500
            },

        }});

    firebase.update({
        [`users/iZndq6gNXyOeYsS8xDHenTyMQJe2/characters/0/inventory/${c}`]: {
            name: c,
            img: "/assets/images/weapons/armor_2.png",
            type: "armor",
            classe: "Mage",
            benefits: {
                energy: 3000,
                spell_damage: 1500
            },

        }});

    firebase.update({
        [`equipments/${d}`]: {
            name: d,
            img: "/assets/images/weapons/weapon_2.png",
            type: "weapon",
            classe: "Mage",
            benefits: {
                energy: 1000,
                spell_damage: 2000
            },

        }});

    firebase.update({
        [`users/iZndq6gNXyOeYsS8xDHenTyMQJe2/characters/0/inventory/${d}`]: {
            name: d,
            img: "/assets/images/weapons/weapon_2.png",
            type: "weapon",
            classe: "Mage",
            benefits: {
                energy: 1000,
                spell_damage: 2000
            },

        }});

    firebase.update({
        [`equipments/${e}`]: {
            name: e,
            img: "/assets/images/weapons/helmet_1.png",
            type: "helmet",
            classe: "Mage",
            benefits: {
                energy: 1000,
                spell_damage: 1000
            },

        }});

    firebase.update({
        [`users/iZndq6gNXyOeYsS8xDHenTyMQJe2/characters/0/inventory/${e}`]: {
            name: e,
            img: "/assets/images/weapons/helmet_1.png",
            type: "helmet",
            classe: "Mage",
            benefits: {
                energy: 1000,
                spell_damage: 1000
            },

        }});

    firebase.update({
        [`equipments/${f}`]: {
            name: f,
            img: "/assets/images/weapons/boots_6.png",
            type: "boots",
            classe: "Mage",
            benefits: {
                energy: 500,
                spell_damage: 500
            },

        }});

    firebase.update({
        [`equipments/${g}`]: {
            name: g,
            img: "/assets/images/weapons/armor_3.png",
            type: "armor",
            classe: "Mage",
            benefits: {
                energy: 3000,
                spell_damage: 300
            },

        }});

    firebase.update({
        [`equipments/${h}`]: {
            name: h,
            img: "/assets/images/weapons/boots_3.png",
                type: "boots",
                classe: "Mage",
                benefits: {
                    energy: 3000,
                    spell_damage: 300
                },

        }});

    firebase.update({
        [`equipments/${i}`]: {
            name: i,
            img: "/assets/images/weapons/helmet_2.png",
            type: "helmet",
            classe: "Mage",
            benefits: {
                energy: 2000,
                spell_damage: 2000
            },

        }});

    firebase.update({
        [`equipments/${j}`]: {
            name: j,
            img: "/assets/images/weapons/weapon_3.png",
                type: "weapon",
                classe: "Mage",
                benefits: {
                    energy: 5000,
                    spell_damage: 5000
                },
        }});

    firebase.update({
        [`equipments/${k}`]: {
            name: k,
            img: "/assets/images/weapons/weapon_4.png",
                type: "weapon",
                classe: "Ranger",
                benefits: {
                    health: 1000,
                    energy: 1000,
                    damage: 1000
                },
        }});

    firebase.update({
        [`equipments/${l}`]: {
            name: l,
            img: "/assets/images/weapons/armor_6.png",
            type: "armor",
            classe: "Ranger",
            benefits: {
                health: 1000,
                energy: 1000,
                damage: 1000
            },
        }});

    firebase.update({
        [`equipments/${m}`]: {
            name: m,
            img: "/assets/images/weapons/boots_3.png",
            type: "boots",
            classe: "Ranger",
            benefits: {
                health: 1000,
                energy: 1000,
                damage: 1000
            },
        }});

    firebase.update({
        [`equipments/${n}`]: {
            name: n,
            img: "/assets/images/weapons/helmet_5.png",
            type: "helmet",
            classe: "Ranger",
            benefits: {
                health: 1000,
                energy: 1000,
                damage: 1000
            },
        }});

    firebase.update({
        [`equipments/${o}`]: {
            name: o,
            img: "/assets/images/weapons/weapon_5.png",
            type: "weapon",
            classe: "Ranger",
            benefits: {
                health: 1500,
                energy: 1500,
                damage: 1500
            },
        }});

    firebase.update({
        [`equipments/${p}`]: {
            name: p,
            img: "/assets/images/weapons/armor_7.png",
            type: "armor",
            classe: "Ranger",
            benefits: {
                health: 1500,
                energy: 1500,
                damage: 1500
            },
        }});

    firebase.update({
        [`equipments/${q}`]: {
            name: q,
            img: "/assets/images/weapons/boots_4.png",
            type: "boots",
            classe: "Ranger",
            benefits: {
                health: 1500,
                energy: 1500,
                damage: 1500
            },
        }});

    firebase.update({
        [`equipments/${r}`]: {
            name: r,
            img: "/assets/images/weapons/helmet_6.png",
            type: "helmet",
            classe: "Ranger",
            benefits: {
                health: 1500,
                energy: 1500,
                damage: 1500
            },
        }});


    firebase.update({
        [`equipments/${s}`]: {
            name: s,
            img: "/assets/images/weapons/weapon_7.png",
            type: "weapon",
            classe: "Warrior",
            benefits: {
                damage: 1000,
                health: 1500,
                damage_reduction_flat: 200,
                armor: 200
            },
        }});

    firebase.update({
        [`equipments/${t}`]: {
            name: t,
            img: "/assets/images/weapons/armor_4.png",
            type: "armor",
            classe: "Warrior",
            benefits: {
                damage: 1000,
                health: 2000,
                damage_reduction_flat: 200,
                armor: 200
            },
        }});

    firebase.update({
        [`equipments/${u}`]: {
            name: u,
            img: "/assets/images/weapons/boots_1.png",
            type: "boots",
            classe: "Warrior",
            benefits: {
                damage: 1000,
                health: 2000,
                damage_reduction_flat: 200,
                armor: 200
            },
        }});

    firebase.update({
        [`equipments/${v}`]: {
            name: v,
            img: "/assets/images/weapons/helmet_3.png",
            type: "helmet",
            classe: "Warrior",
            benefits: {
                damage: 1000,
                health: 2000,
                damage_reduction_flat: 200,
                armor: 200
            },
        }});

    firebase.update({
        [`equipments/${w}`]: {
            name: w,
            img: "/assets/images/weapons/weapon_8.png",
            type: "weapon",
            classe: "Warrior",
            benefits: {
                damage: 1000,
                health: 1500,
                energy: 1500,
                damage_reduction_flat: 200,
            },
        }});

    firebase.update({
        [`equipments/${w}`]: {
            name: w,
            img: "/assets/images/weapons/helmet_4.png",
            type: "helmet",
            classe: "Warrior",
            benefits: {
                damage: 1000,
                health: 1500,
                energy: 1500,
                damage_return: 200,
            },
        }});

    firebase.update({
        [`equipments/${x}`]: {
            name: x,
            img: "/assets/images/weapons/armor_5.png",
            type: "armor",
            classe: "Warrior",
            benefits: {
                damage: 1500,
                health: 1000,
                armor: 200,
                damage_return: 200,
            },
        }});

    firebase.update({
        [`equipments/${y}`]: {
            name: y,
            img: "/assets/images/weapons/boots_2.png",
            type: "boots",
            classe: "Warrior",
            benefits: {
                damage: 1500,
                health: 1000,
                armor: 200,
                damage_return: 200,
            },
        }});

    firebase.update({
        [`equipments/${z}`]: {
            name: z,
            img: "/assets/images/weapons/weapon_6.png",
            type: "weapon",
            classe: "Warrior",
            benefits: {
                damage: 3000,
                health: 1500,
                energy: 1500,
                spell_damage: 1500
            },
        }});

    // firebase.update({
    //     [`equipments/init_1`]: {
    //         name: "init_1",
    //         img: "/assets/images/weapons/init_1.png",
    //         type: "helmet",
    //         classe: "All",
    //         benefits: {
    //             damage: 100,
    //             health: 100,
    //             energy: 100,
    //         },
    //     }});
    //
    // firebase.update({
    //     [`equipments/init_2`]: {
    //         name: "init_2",
    //         img: "/assets/images/weapons/init_2.png",
    //         type: "armor",
    //         classe: "All",
    //         benefits: {
    //             damage: 100,
    //             health: 100,
    //             energy: 100,
    //         },
    //     }});
    //
    // firebase.update({
    //     [`equipments/init_3`]: {
    //         name: "init_3",
    //         img: "/assets/images/weapons/init_3.png",
    //         type: "boots",
    //         classe: "All",
    //         benefits: {
    //             damage: 100,
    //             health: 100,
    //             energy: 100,
    //         },
    //     }});
    //
    // firebase.update({
    //     [`equipments/init_4`]: {
    //         name: "init_4",
    //         img: "/assets/images/weapons/init_4.png",
    //         type: "weapon",
    //         classe: "All",
    //         benefits: {
    //             damage: 100,
    //             health: 100,
    //             energy: 100,
    //         },
    //     }});*/

  return {
    type: MAPTILE_COMPLETED,
    payload: {
      createdAt: now(),
      id: "",
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
