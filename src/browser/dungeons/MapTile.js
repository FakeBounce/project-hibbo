/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import Character from './Character';
import { Flex,Image,Text } from '../app/components';
import { connect } from 'react-redux';
import { moveCharacter,movingCharacter,trySkill,endSkill,showAoeSkill } from '../../common/dungeons/actions';

type Props = {
    dungeon: Object,
    maptile: Object,
    row: Object,
    col: Object
};

const Maptile = ({ maptile,row,col,dungeon, moveCharacter,movingCharacter,dungeonsOP,trySkill,endSkill,showAoeSkill }: Props) => {
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
    var tile_hover = '';
    var item = false;

    maptileAction = function(){
        if(typeof maptile.character !== 'undefined')
        {
            if(maptile.character != null)
            {
                return false;
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
    if(typeof maptile.is_movable !== 'undefined')
    {
        if(maptile.is_movable)
        {
            classImage = classImage+ " is_target_aoe";
        }
    }
    if(typeof maptile.is_target_range !== 'undefined')
    {
        if(maptile.is_target_range)
        {
            classImage = classImage+ " is_target_range";
        }
    }
    if(typeof maptile.is_target_movement !== 'undefined')
    {
        if(maptile.is_target_movement)
        {
            classImage = classImage+ " is_target_movement";
        }
    }
    if(typeof maptile.is_target_aoe !== 'undefined')
    {
            if(maptile.is_target_aoe)
            {
                classImage = classImage+ " is_target_aoe";
            }
    }
    if(maptile.aoe_target)
    {
        tile_hover = function(){
            showAoeSkill(dungeon,maptile);
        };
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
    if(typeof maptile.item !== 'undefined' && maptile.item != null)
    {
        let src = "/assets/images/objets/"+maptile.item.image;
        item = <Image className="object" src={src}/>;
    }
    classImage = classImage + ' correctifDisplay';
    return (
    <Flex>
        {
          character ?
            <Flex className={classImage} style={styles.bg} onClick={maptileAction} onMouseEnter={tile_hover}>
                {item}
                <Character is_targeted={is_targeted} dungeon={dungeon} move={move} row={row} col={col} character={maptile.character}/>
            </Flex>
            :
            <Flex className={classImage} style={styles.bg} onClick={maptileAction} onMouseEnter={tile_hover}>
                {item}
            </Flex>
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
}), { moveCharacter,movingCharacter,trySkill,endSkill,showAoeSkill }) (Maptile);
