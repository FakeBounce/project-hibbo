/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import Character from './Character';
import { Flex,Image,Text } from '../app/components';
import { connect } from 'react-redux';
import { moveCharacter,movingCharacter } from '../../common/dungeons/actions';

type Props = {
    dungeon: Object,
    maptile: Object,
    row: Object,
    col: Object
};

const Maptile = ({ maptile,row,col,dungeon, moveCharacter,movingCharacter,dungeonsOP }: Props) => {
    const styles = {
        title: {
            cursor: 'pointer',
        },
        bg: {
            backgroundImage: "url("+maptile.image+")",
        }
    };
    var character = false;
    var classImage = "case ";
    let error_message = '';
    var move = false;
    let maptileAction;
    if(typeof maptile.is_target !== 'undefined')
    {
        classImage = classImage+ " is_target";
        maptileAction = function(){
            trySkill(dungeon,row,col);
        };
    }
    else{
        maptileAction = function(){
            movingCharacter(dungeon,row,col);
        };
    }
    if(typeof maptile.character !== 'undefined' && maptile.character != null)
    {
        character = true;
        if(dungeon.user.character.is_moving)
        {
            move = dungeon.user.character.is_moving;
        }
    }

    return (
    <Flex>
        {
          character ?
            <Flex className={classImage} style={styles.bg} onClick={maptileAction}>
                <Character dungeon={dungeon} move={move} row={row} col={col} character={maptile.character}/>
            </Flex>
            :
            <Flex className={classImage} style={styles.bg} onClick={maptileAction}>
            </Flex>
        }
    </Flex>
    );
};

Maptile.propTypes = {
    maptile: React.PropTypes.object.isRequired,
    dungeon: React.PropTypes.object.isRequired,
    moveCharacter: React.PropTypes.func.isRequired,
    movingCharacter: React.PropTypes.func.isRequired,
    dungeonsOP: React.PropTypes.object,
};

export default connect(state => ({
    dungeonsOP: state.dungeons.dungeonsOP,
}), { moveCharacter,movingCharacter }) (Maptile);
