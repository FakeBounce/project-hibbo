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
        margin: '0px 0px 0px 0px'
    };
    let classes= "monster";
    var gif = '';
    var opposed_img = '';

  onkeydown = (event: KeyboardEvent) => {
    if(event.key === "ArrowUp"){
      console.log('test');
    }
  };

    if(character.is_attacking && character.type == "pj")
    {
        gif = 'pj-'+character.direction;
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
        classes= "monster "+gif;
        character.image = "/assets/images/classes/"+character.name+"/anime/"+move+".gif";
        setTimeout(function(){
            character.image = "/assets/images/classes/"+character.name+"/"+move+".png";
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
            <Image className={classes} onClick={attack_a_monster} src={character.image} style={styles}/>
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


