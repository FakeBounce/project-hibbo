/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import Character from './Character';
import { Flex,Image } from '../app/components';

type Props = {
    maptile: Object,
    row: Object,
    col: Object
};

const Maptile = ({ maptile,row,col }: Props) => {
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

    return (
    <Flex>
        {character ?
            <Flex>
                <Image src={maptile.image} style={styles.title}/>
                <Character row={row} col={col} character={maptile.character}/>
            </Flex>
            :
            <Flex>
                <Image src={maptile.image} style={styles.title}/>
            </Flex>

        }
    </Flex>
    );
};

Maptile.propTypes = {
    maptile: React.PropTypes.object.isRequired
};

export default Maptile;