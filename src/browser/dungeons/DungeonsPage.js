/**
 * Created by Fakebounce on 13/11/2016.
 */
import React from 'react';
import Dungeons from './Dungeons';
import Classe from './Classe';
import SignOut from '../auth/SignOut';
import linksMessages from '../../common/app/linksMessages';
import { Block, Link, Space, PageHeader, Title, View } from '../app/components';
import { connect } from 'react-redux';
import { firebase } from '../../common/lib/redux-firebase';
import { LoadClasses,LoadViewer,LoadViewerChanges,LoadSkills, LoadWeapons } from '../../common/dungeons/actions';


let DungeonsPage = ({viewer,dviewer,classes,LoadViewer}) => {

    var dung = [];
    var classe_list = false;
    if(dviewer)
    {
        if(!dviewer.characters)
        {
            classe_list = [];
            for (var classe in classes) {
                classe_list.push(<Classe key={classes[classe].id} classe={classes[classe]}></Classe>)
            }
        }
        else {
            dung.push(<Dungeons/>);
        }
    }
    else {
        LoadViewer(viewer);
    }
    return (
        <View>
            <Title message={linksMessages.dungeon} />
            <Block>
                {dung}
                {classe_list}
            </Block>
            {classe_list &&
                <SignOut/>
            }
        </View>
    );
}

DungeonsPage.propTypes = {
    viewer: React.PropTypes.object,
    dviewer: React.PropTypes.object,
    classes: React.PropTypes.object,
    LoadClasses: React.PropTypes.func,
    LoadViewer: React.PropTypes.func,
};

DungeonsPage = firebase((database, props) => {
    const ClassesRef = database.child('classes');
    const UserRef = database.child('users/'+props.viewer.id);
    const SkillsRef = database.child('skills');
    const WeaponsRef = database.child('weapons');
    return [
        [ClassesRef, 'on', 'value', props.LoadClasses],
        [UserRef, 'on', 'value', props.LoadViewerChanges],
        [WeaponsRef, 'on', 'value', props.LoadWeapons],
        [SkillsRef, 'on', 'value', props.LoadSkills],
    ];
})(DungeonsPage);

export default connect(state => ({
    viewer: state.users.viewer,
    dviewer: state.dungeons.viewer,
    classes: state.dungeons.classes,
}), { LoadClasses,LoadViewer,LoadViewerChanges,LoadSkills, LoadWeapons })(DungeonsPage);
