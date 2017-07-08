import React from 'react';
import { Flex,Image,Text } from '../app/components';
import { connect } from 'react-redux';
import { pickmonster} from '../../common/editor/actions';

type Props = {
    monster: Object,
    viewer: Object,
    worldmap: Object,
    row: Object,
    col: Object,
    worldmap: Object,
    active : String,
};

const EditMonster = ({ pickmonster,row,col,monster, viewer,worldmap,active }: Props) => {

    const styles = {
        margin: '0'
    };


    var classImage = "case ";

    if(active == "active")
    {
        classImage = classImage+" selected_tile";
    }

    return (
        <Image className={classImage} src={monster.image} style={styles} onClick={() => pickmonster(monster,viewer,worldmap,row,col)}/>
    );
};

EditMonster.propTypes = {
    monster: React.PropTypes.object.isRequired,
    pickmonster: React.PropTypes.func,
    viewer: React.PropTypes.object,
};

export default connect(state => ({
    viewer: state.editor.viewer,
}), { pickmonster}) (EditMonster);
