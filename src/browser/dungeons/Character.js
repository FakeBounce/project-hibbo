/**
 * Created by Fakebounce on 13/11/2016.
 */
import React from 'react';
import { Image } from '../app/components';

type Props = {
    character: Object,
};

const Character = ({ character }: Props) => {
    const styles = {
        title: {
            cursor: 'pointer',
        }
    };
    const classes= "monster";
    return (
        <Image className="monster" src={character.image} style={styles.title}/>
    );
};

Character.propTypes = {
    character: React.PropTypes.object.isRequired
};

export default Character;


