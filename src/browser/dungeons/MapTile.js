/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import Character from './Character';
import { Flex,Image,Text } from '../app/components';
import { connect } from 'react-redux';
import { moveCharacter,movingCharacter,trySkill,endSkill } from '../../common/dungeons/actions';

type Props = {
    dungeon: Object,
    maptile: Object,
    row: Object,
    col: Object
};

const Maptile = ({ maptile,row,col,dungeon, moveCharacter,movingCharacter,dungeonsOP,trySkill,endSkill }: Props) => {
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
    var is_targeted = false;

    maptileAction = function(){
        if(typeof maptile.character !== 'undefined')
        {
            if(maptile.character != null)
            {
                if(maptile.character.type == "pj")
                {
                    return false;
                }
            }
        }

        return movingCharacter(dungeon,row,col);
    };
    if(typeof maptile.is_target !== 'undefined')
    {
        if(maptile.is_target)
        {
            classImage = classImage+ " is_target";
            is_targeted = true;
            maptileAction = function(){
                trySkill(dungeon,row,col);
            };
        }
    }
    if(typeof maptile.is_target_aoe !== 'undefined')
    {
            if(maptile.is_target_aoe)
            {
                classImage = classImage+ " is_target_aoe";
            }
    }
    if(dungeon.user.character.is_using_skill)
    {
        if(typeof maptile.is_target !== 'undefined') {
            if (!maptile.is_target)
            {
                maptileAction = function() {
                    endSkill(dungeon, dungeon.user.character);
                }

            }
        }
        else {
            maptileAction = function() {
                endSkill(dungeon, dungeon.dungeon.user);
            }
        }
    }
    if(typeof maptile.character !== 'undefined' && maptile.character != null)
    {
        character = true;
        if(dungeon.user.character.is_moving)
        {
            move = dungeon.user.character.is_moving;
        }
    }

    classImage = classImage + ' correctifDisplay';
    return (
    <Flex>
        {
          character ?
            <Flex className={classImage} style={styles.bg} onClick={maptileAction}>
                <Character is_targeted={is_targeted} dungeon={dungeon} move={move} row={row} col={col} character={maptile.character}/>
            </Flex>
            :
            <Flex className={classImage} style={styles.bg} onClick={maptileAction}></Flex>
        }
    </Flex>
    );
};

Maptile.propTypes = {
    maptile: React.PropTypes.object.isRequired,
    dungeon: React.PropTypes.object.isRequired,
    verifloaded: React.PropTypes.number,
    moveCharacter: React.PropTypes.func.isRequired,
    movingCharacter: React.PropTypes.func.isRequired,
    dungeonsOP: React.PropTypes.object,
};

export default connect(state => ({
    dungeonsOP: state.dungeons.dungeonsOP,
    verifloaded: state.dungeons.verifloaded,
}), { moveCharacter,movingCharacter,trySkill,endSkill }) (Maptile);
