/**
 * Created by Fakebounce on 13/11/2016.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Image, Flex } from '../app/components';
import { attackMonster,canAttackMonster,moveCharacter } from '../../common/dungeons/actions';

type Props = {
    character: Object,
    dungeon: Object,
    row: Object,
    col: Object,
    move: String
};

const Character = ({ character,dungeon,row,col,move, attackMonster,canAttackMonster,moveCharacter }: Props) => {
    const styles = {
        margin: '0px 0px 0px 0px'
    };
    let classes= "monster";
    if(character.is_attacking && character.type == "pj")
    {
        console.log('character : ',character);
        var gif = character.name+'-'+character.direction;
        classes= "monster a"+gif;
        character.image = "/assets/images/classes/"+character.name+"/anime/a"+character.direction+".gif";
        setTimeout(function(){
            character.image = "/assets/images/classes/"+character.name+"/"+character.direction+".png";
            attackMonster(dungeon,character,character.attacking_row,character.attacking_col);
        },1000);
    }
    if(move && character.type == "pj")
    {

        var gif = character.name+'-'+move;
        classes= "monster "+gif;
        character.image = "/assets/images/classes/"+character.name+"/anime/"+move+".gif";
        setTimeout(function(){
            character.image = "/assets/images/classes/"+character.name+"/"+move+".png";
            moveCharacter(dungeon,row,col);
        },1000);
    }
    const attack_a_monster = function(){
        if(character.type == "pnj")
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
    attackMonster: React.PropTypes.func.isRequired,
    moveCharacter: React.PropTypes.func.isRequired
};

export default connect(state => ({
    dungeonsOP: state.dungeons.dungeonsOP,
}), { attackMonster,canAttackMonster,moveCharacter }) (Character);


