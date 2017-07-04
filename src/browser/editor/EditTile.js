/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import { Flex,Image,Text } from '../app/components';
import { connect } from 'react-redux';
import {picktile} from '../../common/editor/actions'

type Props = {
    maptile: Object,
    viewer: Object,
    worldmap: Object,
    row : Object,
    col : Object,
    active : String,
};

const EditTile = ({ maptile,picktile,viewer,worldmap,row,col,active }: Props) => {


    var classImage = "case " + maptile.image;
    var src = maptile.image;
    if(active == "active")
    {
        classImage = classImage+" selected_tile";
    }

    return (
        <div onClick={() => picktile(maptile,viewer,worldmap,row,col)}>
            <Flex className={classImage}>
                <Image src={src}/>
            </Flex>
        </div>
    );
};

EditTile.propTypes = {
    maptile: React.PropTypes.object.isRequired,
    picktile: React.PropTypes.func,
    viewer: React.PropTypes.object,
};

export default connect(state => ({
    viewer: state.editor.viewer,
}), { picktile}) (EditTile);
