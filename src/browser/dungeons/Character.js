/**
 * Created by Fakebounce on 13/11/2016.
 */
import React from 'react';
import { connect } from 'react-redux';
import {KEYPRESS} from '../../../node_modules/react-key-handler/dist/index';
import { Image, Flex } from '../app/components';
import { attackMonster,endSkill,canAttackMonster,moveCharacter,MonsterTurn,MonsterMove } from '../../common/dungeons/actions';

type Props = {
    character: Object,
    dungeon: Object,
    row: Object,
    col: Object,
    move: String,
    is_targeted: Boolean,
};

const Character = ({ character,dungeon,row,col,move,is_targeted,endSkill, attackMonster,MonsterMove,canAttackMonster,moveCharacter,MonsterTurn }: Props) => {
    const styles = {
        margin : '0',
    };
    let classes = 'monster';
    var gif = '';
    var opposed_img = '';
    let conditions = false;
    if(character.conditions)
    {
      conditions = character.conditions.map(cond => {
          console.log('cond',cond);
          let cond_image = '/assets/images/skills/'+cond.image;
          return(<th><Image className="imgConditionPersonnage" src={cond_image} /></th>);
      });


    }
    console.log('conditions',conditions);

    if(character.is_attacking && character.type == "pj")
    {
        gif = 'pj-'+character.direction;
        console.log(gif);
        classes= "monster a"+gif;
        character.image = "/assets/images/classes/"+character.name+"/anime/a"+character.direction+".gif";
        setTimeout(function(){
            character.image = "/assets/images/classes/"+character.name+"/"+character.direction+".png";
            attackMonster(dungeon,character,character.attacking_row,character.attacking_col);
        },500);
    }
    if(character.is_attacking && character.type == "pnj" && dungeon.monster_turn && dungeon.end_turn)
    {
        classes= "monster monster_a"+character.direction;
        setTimeout(function(){
            MonsterTurn(dungeon,true);
        },500);
    }
    if(character.nextTurn)
    {
        MonsterTurn(dungeon,true);
    }
    if(character.is_moving && character.type == "pnj")
    {
        classes= "monster pj-"+character.direction;
        console.log(classes);
        setTimeout(function(){
            MonsterMove(dungeon);
        },500);
    }
    if(move && character.type == "pj")
    {
        gif = 'pj-'+move;
        console.log(gif);
        classes= "monster "+gif;
        character.image = "/assets/images/classes/"+character.name+"/anime/"+move+".gif";
        console.log(character.image);
        setTimeout(function(){
            character.image = "/assets/images/classes/"+character.name+"/"+move+".png";
            console.log(move);
            console.log(dungeon,row,col);
            moveCharacter(dungeon,row,col);
        },500);
    }
    if(character.try_skill && character.type == "pj")
    {
        if(character.is_moving_instant)
        {
            gif = 'mv'+character.is_moving_instant+'-pj-'+character.direction;
            classes= "monster "+gif;
        }
        else {
            gif = 'pj-'+character.direction;
            classes= "monster a"+gif;
        }
            character.image = "/assets/images/classes/"+character.name+"/anime/a"+character.direction+".gif";
            setTimeout(function(){
                character.image = "/assets/images/classes/"+character.name+"/"+character.direction+".png";
                endSkill(dungeon,character);
            },500);
    }
    if(character.is_attacked && character.type == "pj")
    {
        if(character.attacked_direction == "left")
        {
            opposed_img = 'right';
        }
        if(character.attacked_direction == "right")
        {
            opposed_img = 'left';
        }
        if(character.attacked_direction == "up")
        {
            opposed_img = 'down';
        }
        if(character.attacked_direction == "down")
        {
            opposed_img = 'up';
        }
        classes= classes+" attacked_"+character.attacked_direction;
        character.image = "/assets/images/classes/"+character.name+"/anime/"+opposed_img+".gif";
        setTimeout(function(){
            character.image = "/assets/images/classes/"+character.name+"/"+opposed_img+".png";
        },500);
    }
    if(character.is_attacked && character.type == "pnj")
    {
        classes= classes+" attacked_"+character.attacked_direction;
    }
    const attack_a_monster = function(){
        if(character.type == "pnj" && !is_targeted)
        {
            canAttackMonster(dungeon,character,row,col);
        }
    };
    return (
      <div className="infoBulle">
        <div className="infopersonnage">
          <div className="headerInfoPerso">
            <h3><Image className={classes} src={character.image} />{character.name}</h3>
          </div>
          <ul>
            <li>Health: {character.health}</li>
            <li>Damage: {character.damage}</li>
            <li>Movement: {character.movement}</li>
            <li>Range: {character.range}</li>
          </ul>
          {
            conditions && <div className="titleInfoPerso"><h4>Skills Damage</h4><table className="tableInfoPerso"><tr>{conditions}</tr></table></div>
          }
        </div>
        <Image className={classes} onClick={attack_a_monster} src={character.image} style={styles}/>
      </div>
    );
};

Character.propTypes = {
    character: React.PropTypes.object.isRequired,
    verifloaded: React.PropTypes.number,
    attackMonster: React.PropTypes.func.isRequired,
    moveCharacter: React.PropTypes.func.isRequired
};

export default connect(state => ({
    dungeonsOP: state.dungeons.dungeonsOP,
    verifloaded: state.dungeons.verifloaded,
}), { attackMonster,canAttackMonster,moveCharacter,MonsterTurn,MonsterMove,endSkill }) (Character);


