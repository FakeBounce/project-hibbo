/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import Character from './Character';
import { Flex,Image,Text } from '../app/components';
import { connect } from 'react-redux';
import { moveCharacter } from '../../common/dungeons/actions';

type Props = {
    dungeon: Object,
    maptile: Object,
    row: Object,
    col: Object
};

const Maptile = ({ maptile,row,col,dungeon, moveCharacter,dungeonsOP }: Props) => {
    const styles = {
        title: {
            cursor: 'pointer',
        },
    };
    var character = false;
    let error_message = '';
    if(typeof maptile.character !== 'undefined')
    {
        character = true;
    }

    const tryMoveCharacter = function(){
        let isMoving = moveCharacter(dungeon,row,col);
        if(isMoving.component.canMove)
        {
            error_message = '';

        }
        else
        {
            error_message = isMoving.component.message;
            alert(error_message);
        }
    };

  var classImage = "case " + maptile.image;
    return (
    <Flex>
        {
          character ?
            <Flex className={classImage} onClick={tryMoveCharacter}>
                <Character row={row} col={col} character={maptile.character}/>
            </Flex>
            :
            <Flex className={classImage} onClick={tryMoveCharacter}></Flex>
        }
    </Flex>
    );
};

Maptile.propTypes = {
    maptile: React.PropTypes.object.isRequired,
    dungeon: React.PropTypes.object.isRequired,
    moveCharacter: React.PropTypes.func.isRequired,
    dungeonsOP: React.PropTypes.object,
};

export default connect(state => ({
    dungeonsOP: state.dungeons.dungeonsOP,
}), { moveCharacter }) (Maptile);
