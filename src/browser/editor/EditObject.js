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

    console.log('item',item);

    return (
        <div className="edit-object-editor">

            <Image className={classImage} src={'/assets/images/objets/' + item.image} style={styles} onClick={() => pickobject(item,viewer,worldmap,row,col)}/>

            <div className="info-editor">
                <div className="headerInfoPerso headerEditorObject">
                    <h3><Image className="caseShowEditor" src={'/assets/images/objets/' + item.image} style={styles}/>
                    </h3>
                    <h3>{item.name}</h3>
                    <h4>{item.description}</h4>
                </div>
            </div>
        </div>
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
