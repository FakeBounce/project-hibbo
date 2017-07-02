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
import { LoadDungeons, preLoadActiveDungeon, loadWorldMap, ReloadWorldMap,LoadViewer } from '../../common/dungeons/actions';

Dungeon.propTypes = {
    dungeon: React.PropTypes.object.isRequired,
    loadWorldMap : React.PropTypes.func.isRequired,
    viewer: React.PropTypes.object,
};

let Dungeons = ({ loaded, dungeons,dungeonsOP,preLoadActiveDungeon,LoadViewer, loadWorldMap, viewer,dviewer }) => {
    let weapon_list = '';
    var skills_list = '';
    let health = 100;
    let maxhealth = 100;
    let energy = 100;
    let maxenergy = 100;
    let experience = 0;
    let maxexperience = 1000;
    if(dviewer) {
        if (dviewer.weapons) {
            weapon_list = dviewer.weapons.map(weapon => {
                let classObjet = weapon.get ? 'weapon ' + weapon.css : 'weapon objetVide';
                return (<div key={weapon.id} className={classObjet}></div>);
            });
        }

        if(dviewer.skills) {
            skills_list = dviewer.skills.map(skill => {
                var classObjet = skill.get ? 'objet ' + skill.css : 'objet objetVide';
                return (<div key={skill.id} className={classObjet}></div>);
            })
        }
    }
    if(!dviewer)
    {
        LoadViewer(viewer);
    }
    else  {
        if(dungeonsOP)
        {
            let dungeon;
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

                if(dviewer)
                {
                    wdmap.push(<WorldMap key={dungeon.dungeon.id} worldmap={dungeon.dungeon} dungeon={dungeon}/>);
                }
            }

            else
            {
                if(viewer && !viewer.active_dungeon)
                {
                    preLoadActiveDungeon(dviewer);
                }
                dungeonActive = false;
            }

        }
    }

    return (
    <View>
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

            <div className="cadre-objets">
                <div className="objets">
                    {skills_list}
                </div>
            </div>
            <SignOut/>
        </div>
        {!loaded ?
            <Loading />
            : viewer ?
                dungeonActive?
                    wdmap
                :
                dungeons ?
                    dungeons.map(dungeon =>
                        <Dungeon key={dungeon.id} dungeon={dungeon} viewer={dviewer} loadWorldMap={loadWorldMap}/>
                    )
                    : <Text>Il n'y a pas encore de donjons.</Text>
            : <Text>Veuillez vous connecter</Text>
        }
        <div className="one-level">
            <div className="choose-level" >
                <span>+</span>
            </div>
            <Text>
                <a href={window.location.origin + "/editor"}>EDITOR</a>
            </Text>
        </div>
    </View>
    );
};

Dungeons.propTypes = {
    dungeons: React.PropTypes.object,
    loaded: React.PropTypes.bool.isRequired,
    loadWorldMap : React.PropTypes.func.isRequired,
    LoadViewer : React.PropTypes.func.isRequired,
    preLoadActiveDungeon : React.PropTypes.func.isRequired,
    viewer: React.PropTypes.object,
    dviewer: React.PropTypes.object,
    dungeonsOP: React.PropTypes.object,
};

Dungeons = firebase((database, props) => {
    const DungeonsRef = database.child('dungeons');
    const WorldMapRef = database.child('activeDungeons');
    return [
        [DungeonsRef, 'on', 'value', props.LoadDungeons],
        [WorldMapRef, 'on', 'value', props.ReloadWorldMap],
    ];
})(Dungeons);

export default connect(state => ({
    dungeons: state.dungeons.dungeonLoaded,
    dungeonsOP: state.dungeons.dungeonsOP,
    loaded: state.dungeons.loaded,
    viewer: state.users.viewer,
    dviewer: state.dungeons.viewer,
}), { LoadDungeons, preLoadActiveDungeon, loadWorldMap,LoadViewer, ReloadWorldMap })(Dungeons);
