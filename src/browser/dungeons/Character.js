/**
 * Created by Fakebounce on 13/11/2016.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Image } from '../app/components';
import { attackMonster } from '../../common/dungeons/actions';

type Props = {
    character: Object,
    row: Object,
    col: Object
};

const Character = ({ character,row,col, attackMonster }: Props) => {
    const styles = {
        title: {
            cursor: 'pointer',
        }
    };
    const classes= "monster";
    const attack_a_monster = function(){
        attackMonster(character,row,col);
    };
    return (
        <Image className="monster" onClick={attack_a_monster} src={character.image} style={styles.title}/>
    );
};

Character.propTypes = {
    character: React.PropTypes.object.isRequired,
    attackMonster: React.PropTypes.func.isRequired
};

export default connect(state => ({}), { attackMonster }) (Character);


