import React from 'react';
import { Flex,Image,Text } from '../app/components';
import { connect } from 'react-redux';
import { pickobject} from '../../common/editor/actions';

type Props = {
    item: Object,
    viewer: Object,
    row: Object,
    col: Object,
    worldmap: Object,
    active : String,
};

const EditObject = ({ row,col,item, viewer,worldmap,active,pickobject }: Props) => {

    const styles = {
        margin: '0'
    };


    var classImage = "caseChooseEditeur ";

    if(active == "active")
    {
        classImage = classImage+" selected_tile";
    }


    return (
        <Image className={classImage} src={'/assets/images/objets/' + item.image} style={styles} onClick={() => pickobject(item,viewer,worldmap,row,col)}/>
    );
};

EditObject.propTypes = {
    item: React.PropTypes.object.isRequired,
    pickobject: React.PropTypes.func,
    viewer: React.PropTypes.object,
};

export default connect(state => ({
    viewer: state.editor.viewer,
}), { pickobject}) (EditObject);
