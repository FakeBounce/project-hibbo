import React from 'react';
import { Flex,Image,Text } from '../app/components';
import { connect } from 'react-redux';
import Monster from './Monster';

import { pickmaptile,pickmapmonster} from '../../common/editor/actions';

type Props = {
    maptile: Object,
    viewer: Object,
    row: Object,
    col: Object,
    worldmap: Object,
};

const Maptile = ({ row,col,maptile,pickmaptile,pickmapmonster, viewer,worldmap,activemaptile,activemapmonster }: Props) => {

    const styles = {
        bg: {
            backgroundImage: "url("+maptile.image+")",
        }
    };
    var monster = false;
    var viewmonsters = false;
    let listmap = [];
    let player = false;

    if(worldmap.viewonmonster)
    {
        if(typeof maptile.character !== 'undefined' && maptile.character != null )
        {
            monster = true;
            if(maptile.character.type == "pj")
            {
                player = true;
            }
        }
        viewmonsters = true;
    }
    else
    {
        if(typeof maptile.character !== 'undefined' && maptile.character != null )
        {
            monster = true;

            if(maptile.character.type == "pj")
            {
                player = true;
            }
        }

    }





    let activepick;
    let activemonster;

    activemaptile.map(active => activepick = active);
    activemapmonster.map(active => activemonster = active);

    var classImage = "caseEditor " + maptile.image;

    return (
        viewmonsters ?
            monster ?
                player?
                    <Flex className={classImage} style={styles.bg} >
                        <Monster monster={maptile.character} />
                    </Flex>
                    :
                    <Flex className={classImage} style={styles.bg} onClick={() => pickmapmonster(activemonster,viewer,worldmap, row, col)} >
                        <Monster monster={maptile.character} />
                    </Flex>
            :
            <Flex className={classImage} style={styles.bg} onClick={() => pickmapmonster(activemonster,viewer,worldmap, row, col)}>
            </Flex>
        :
        player?
            <Flex className={classImage} style={styles.bg}>
            </Flex>
            :
            <Flex className={classImage} style={styles.bg} onClick={() => pickmaptile(activepick,viewer,worldmap, row, col)}>
            </Flex>

    );
};

Maptile.propTypes = {
    maptile: React.PropTypes.object.isRequired,
    pickmaptile: React.PropTypes.func,
    pickmapmonster: React.PropTypes.func
};

export default connect(state => ({
    activemaptile : state.editor.activeTile,
    activemapmonster : state.editor.activeMonster,
}), { pickmaptile,pickmapmonster}) (Maptile);
