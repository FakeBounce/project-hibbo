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

  const styles = {
    margin: '0'
  };

    var classImage = "caseChooseEditeur ";
    var src = maptile.image;
    if(active == "active")
    {
        classImage = classImage+" selected_tile";
    }

    return (
        <div className="edit-object-editor">
            <Image className={classImage} src={src} style={styles} onClick={() => picktile(maptile,viewer,worldmap,row,col)}/>

            <div className="info-editor">
                <div className="headerInfoPerso headerEditorObject">
                    <h3><Image className="caseShowEditor" src={src} style={styles}/></h3>
                    <h3>{maptile.title}</h3>
                    <h4>{maptile.type}</h4>
              </div>
            </div>
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
