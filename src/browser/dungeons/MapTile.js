/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import Character from './Character';
import { Flex,Image } from '../app/components';
import { connect } from 'react-redux';
import { moveCharacter } from '../../common/dungeons/actions';

type Props = {
    user: Object,
    maptile: Object,
    row: Object,
    col: Object
};

const Maptile = ({ maptile,row,col,user, moveCharacter }: Props) => {
    const styles = {
        title: {
            cursor: 'pointer',
        },
    };
    var character = false;
    if(typeof maptile.character !== 'undefined')
    {
        character = true;
    }

    const tryMoveCharacter = function(){
        moveCharacter(row,col);
    };

    return (
    <Flex>
        {character ?
            <Flex>
                <Image src={maptile.image} style={styles.title}/>
                <Character row={row} col={col} character={maptile.character}/>
            </Flex>
            :
            <Flex onClick={tryMoveCharacter}>
                <Image src={maptile.image} style={styles.title}/>
            </Flex>

        }
    </Flex>
    );
};

Maptile.propTypes = {
    maptile: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    moveCharacter: React.PropTypes.func.isRequired
};

export default connect(state => ({}), { moveCharacter }) (Maptile);