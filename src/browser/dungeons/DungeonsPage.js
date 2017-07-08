/**
 * Created by Fakebounce on 13/11/2016.
 */
import React from 'react';
import Dungeons from './Dungeons';
import Classe from './Classe';
import SignOut from '../auth/SignOut';
import linksMessages from '../../common/app/linksMessages';
import { Block, Input, View, Button, Form } from '../app/components';
import { connect } from 'react-redux';
import { firebase } from '../../common/lib/redux-firebase';
import { LoadClasses,LoadViewer,LoadViewerChanges,LoadSkills, LoadWeapons, SetPseudo, CreateCharacter } from '../../common/dungeons/actions';
import { fields } from '../../common/lib/redux-fields';


let DungeonsPage = ({viewer,dviewer,classes,LoadViewer, fields, CreateCharacter}) => {

    const onSubmit = event => {
        console.log("classe list",classes);
        if (!fields.class.value.trim()) return;
        if (!fields.pseudo.value.trim()) return;

        var c = null;
        for (var classe in classes) {
            if(classes[classe].name == fields.class.value){
                c = classes[classe];
            }
        }
        CreateCharacter(dviewer,c,fields.pseudo.value)
    };


    const setClass = function() {
        console.log("bonsoir");
    };

    var dung = [];
    var classe_list = false;
    if(dviewer)
    {
        if(!dviewer.characters)
        {
            classe_list = [];
            for (var classe in classes) {
                let src = "/assets/images/classes/"+classe.sprites_name+".png";
                let div = '<label class="classe-choice"><input name="class" type="radio" value="' + classes[classe].name + '" /><img src="/assets/images/classes/'+classes[classe].sprites_name+'.png" /></label>';
                classe_list.push(div);
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
            <h1 className="title-hibbo">HIBBO</h1>
            <Block>
                {dung}
                {!dviewer.characters && classe_list &&
                <Form onSubmit={onSubmit} className="classe_form">
                    <div className="container-classe" dangerouslySetInnerHTML={{__html: classe_list}}>
                    </div>
                    <div className="container-classe-pseudo">
                        <h2>Créer votre personnages</h2>
                        <div className="center-scroll">
                            <div className="div-left">
                                <span style={{
                                    fontWeight: "600"
                                }}>Classe :</span>
                                <span>{}</span>
                            </div>
                            <div className="div-left">
                                <Input
                                    {...fields.pseudo}
                                    className="auth_form_email"
                                    label="Pseudo :"
                                    maxLength={100}
                                    placeholder=""
                                />
                            </div>
                            <Block style={{
                                width: '100%'
                            }}>
                                <Button
                                    style={{
                                        backgroundColor: 'transparent',
                                        backgroundImage: 'url("/assets/images/interface/buttonclasse.png")',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundAttachment: 'scroll',
                                        height: '53px',
                                        width: '190px',
                                        color: '#c9e6f1',
                                        boxShadow: 'none',
                                        textAlign: 'center',
                                        fontSize: '16px',
                                    }}
                                >
                                    Créer mon personnage
                                </Button>
                            </Block>
                            {!dviewer.characters && classe_list &&
                            <SignOut/>
                            }
                        </div>
                    </div>
                </Form>
                }
            </Block>
        </View>

    );
}

DungeonsPage.propTypes = {
    viewer: React.PropTypes.object,
    dviewer: React.PropTypes.object,
    classes: React.PropTypes.object,
    LoadClasses: React.PropTypes.func,
    LoadViewer: React.PropTypes.func,
    fields: React.PropTypes.object.isRequired,
};

DungeonsPage = fields(DungeonsPage, {
    path: 'DungeonsPage',
    fields: ['class', 'pseudo'],
});

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
}), { LoadClasses,LoadViewer,LoadViewerChanges,LoadSkills, LoadWeapons, SetPseudo, CreateCharacter })(DungeonsPage);
