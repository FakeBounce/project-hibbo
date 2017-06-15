/**
 * Created by Fakebounce on 13/11/2016.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Image, Flex } from '../app/components';
import { attackMonster } from '../../common/dungeons/actions';

type Props = {
    character: Object,
    row: Object,
    col: Object,
    move: String
};

const Character = ({ character,row,col,move, attackMonster }: Props) => {
    const styles = {
        margin: '0px 1px 0px 0px'
    };
    let classes= "monster";
    if(move)
    {
        classes= "monster "+move;
        var l = 200;
        var u = 0;
        var r = -50;
        var d = 0;
        styles.margin = u+'px '+l+'px '+d+'px '+r+'px';
        console.log(styles.margin);

    }
    const attack_a_monster = function(){
        attackMonster(character,row,col);
    };
    return (
            <Image className={classes} onClick={attack_a_monster} src={character.image} style={styles}/>
    );
};

Character.propTypes = {
    character: React.PropTypes.object.isRequired,
    attackMonster: React.PropTypes.func.isRequired
};

export default connect(state => ({
    dungeonsOP: state.dungeons.dungeonsOP,
}), { attackMonster }) (Character);


