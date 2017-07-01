/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import Dungeon from './Dungeon';
import WorldMap from './WorldMap';
import SignOut from '../auth/SignOut';
import { Block, View, Text, Image,Loading } from '../app/components';
import { connect } from 'react-redux';
import { firebase } from '../../common/lib/redux-firebase';
import { cancelDungeon,LoadDungeons,LoadSkills, LoadWeapons, preLoadActiveDungeon, loadWorldMap, ReloadWorldMap,LoadViewer,LoadTutoRef,LoadNextStep,LoadViewerRef,LoadStep } from '../../common/dungeons/actions';

Dungeon.propTypes = {
    dungeon: React.PropTypes.object.isRequired,
    loadWorldMap : React.PropTypes.func.isRequired,
    viewer: React.PropTypes.object,
};

let Dungeons = ({ tutoriel, loaded, dungeons,dungeonsOP,preLoadActiveDungeon,cancelDungeon,LoadViewer, loadWorldMap, viewer,dviewer, LoadTutoRef, LoadStep,LoadNextStep }) => {
    let weapon_list = '';
    let health = 100;
    let maxhealth = 100;
    let energy = 100;
    let maxenergy = 100;
    let experience = 0;
    let maxexperience = 1000;
    if(!dviewer)
    {
        LoadViewer(viewer);
    }
    else
    {
        if (dviewer.weapons) {
            weapon_list = dviewer.weapons.map(weapon => {
                let classObjet = weapon.get ? 'weapon ' + weapon.css : 'weapon objetVide';
                return (<div key={weapon.id} className={classObjet}></div>);
            });
        }
       if(dviewer.tuto && dviewer.tuto < 5)
       {
           if(typeof tutoriel === 'undefined' || tutoriel == null)
           {
               LoadStep(dviewer);
           }
       }
        else if(dungeonsOP)
        {
            var dungeonActive = false;
            var wdmap = [];
            dungeonsOP.map(dungeonOP => dungeon = dungeonOP);
            // dungeonsOP.toList().map(dungeonOP => rows = dungeonOP.dungeon.maptiles.length);
            // dungeonsOP.toList().map(dungeonOP => cols = dungeonOP.dungeon.maptiles[0].length);

            if(dungeon)
            {
                maxhealth = dungeon.user.default_character.maxhealth;
                health = dungeon.user.character.health;
                energy = dungeon.user.character.energy;
                maxenergy = dungeon.user.default_character.maxenergy;
                experience = dungeon.user.character.experience;
                maxexperience = dungeon.user.default_character.maxexperience;
                dungeonActive = true;

                if(viewer)
                {
                    wdmap.push(<WorldMap key={dungeon.dungeon.id} worldmap={dungeon.dungeon} dungeon={dungeon}/>);
                }
            }
            else {
                if(viewer && !viewer.active_dungeon)
                {
                    preLoadActiveDungeon(viewer);
                }
                dungeonActive = false;
            }
        }
    }

    //tuto
    var classN = "";
    var classStep = "";
    if(dviewer && tutoriel){
        classN = "overlay";
        if(tutoriel.class){
            classStep = tutoriel.class;
        }
    }
    return (
    <View className={classStep}>
        <div className={classN}>
         </div>

        <Block>{dviewer && tutoriel &&
        <div className="cadre-tutoriel">
            <div className="tuto-text">{tutoriel.description}</div>
            <div onClick={() => LoadNextStep(dviewer,tutoriel.next)} className="tuto-next">Next</div>
        </div>
        }
        </Block>
        <View className="container_app">
            <div className="cadre-gauche">
                <div className="personnage">
                    <progress className="progressHealth" max={maxhealth} value={health}></progress>
                    <progress className="progressDamage" max={maxenergy} value={energy}></progress>
                    <progress className="progressMore" max={maxexperience} value={experience}></progress>
                </div>
                <div className="cadreweapons">
                    <div className="weapons">
                        {weapon_list}
                    </div>
                </div>
            </div>
            <div className="cadre-droite">
                {!loaded ?
                    <Loading />
                    : viewer ?
                        dungeonActive?

                            wdmap
                        :
                        dungeons ?
                            dungeons.map(dungeon =>
                                <Dungeon key={dungeon.id} dungeon={dungeon} viewer={viewer} loadWorldMap={loadWorldMap}/>
                            )
                            : <Text>Il n'y a pas encore de donjons.</Text>
                    : <Text>Veuillez vous connecter</Text>
                }
            </div>
        </View>
    </View>
    );
};

Dungeons.propTypes = {
    dungeons: React.PropTypes.object,
    loaded: React.PropTypes.bool.isRequired,
    loadWorldMap : React.PropTypes.func.isRequired,
    LoadViewer : React.PropTypes.func.isRequired,
    LoadNextStep : React.PropTypes.func.isRequired,
    LoadStep : React.PropTypes.func.isRequired,
    preLoadActiveDungeon : React.PropTypes.func.isRequired,
    viewer: React.PropTypes.object,
    tutoriel: React.PropTypes.object,
    dviewer: React.PropTypes.object,
    dungeonsOP: React.PropTypes.object,
};

Dungeons = firebase((database, props) => {
    const DungeonsRef = database.child('dungeons');
    const SkillsRef = database.child('skills');
    const WorldMapRef = database.child('activeDungeons/'+props.viewer.id);
    const WeaponsRef = database.child('weapons');
    const ViewerRef = database.child('users/'+props.viewer.id);
    const TutoRef = database.child('tutoriel/'+props.viewer.id);
    return [
        [WeaponsRef, 'on', 'value', props.LoadWeapons],
        [SkillsRef, 'on', 'value', props.LoadSkills],
        [DungeonsRef, 'on', 'value', props.LoadDungeons],
        [WorldMapRef, 'on', 'value', props.ReloadWorldMap],
        [ViewerRef, 'on', 'value', props.LoadViewerRef],
        [TutoRef, 'on', 'value', props.LoadTutoRef],
    ];
})(Dungeons);

export default connect(state => ({
    dungeons: state.dungeons.dungeonLoaded,
    dungeonsOP: state.dungeons.dungeonsOP,
    loaded: state.dungeons.loaded,
    tutoriel: state.dungeons.tutoriel,
    viewer: state.users.viewer,
    dviewer: state.dungeons.viewer,
}), { LoadDungeons,LoadSkills, LoadWeapons, preLoadActiveDungeon,cancelDungeon, loadWorldMap,LoadViewer, ReloadWorldMap ,LoadTutoRef,LoadNextStep,LoadViewerRef,LoadStep})(Dungeons);
