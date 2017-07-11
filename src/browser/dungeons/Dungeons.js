/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import Dungeon from './Dungeon';
import WorldMap from './WorldMap';
import Inventory from './Inventory';
import Skills from './Skills';
import SignOut from '../auth/SignOut';
import Stats from './Stats';
import {KEYPRESS} from '../../../node_modules/react-key-handler/dist/index';
import { Block, View, Text, Image, Loading,Link } from '../app/components';
import { connect } from 'react-redux';
import { firebase } from '../../common/lib/redux-firebase';
import { SwitchCompaign,ChangeTab, DeleteEquipment,switchPannel,endDungeon, AddEquipment, RemoveEquipment, cancelDungeon,LoadDungeons,LoadSkills,CanUseSkill,tryItem, LoadWeapons, preLoadActiveDungeon, loadWorldMap, ReloadWorldMap,LoadViewer,LoadTutoRef,LoadNextStep,LoadViewerRef,LoadStep, Create } from '../../common/dungeons/actions';

let Dungeons = ({ equipments,SwitchCompaign,endDungeon, switchPannel,ChangeTab, tutoriel, loaded,verifloaded, dungeons,dungeonsOP,tryItem, preLoadActiveDungeon,cancelDungeon,CanUseSkill,LoadViewer, loadWorldMap, viewer,dviewer, LoadTutoRef, LoadStep,LoadNextStep , AddEquipment, RemoveEquipment, DeleteEquipment}) => {

    let dungeons_list = '';
    let dungeons_list_editor = '';
    var skills_list = '';
    var object_list = '';
    let dungeon;
    let health = 100;
    let maxhealth = 100;
    let energy = 100;
    let maxenergy = 100;
    let experience = 0;
    let maxexperience = 0;
    let skill_function = false;
    let item_function = false;
    let picture = false;
    let pick_equipment_list = '';
    let end_modal = '';
    let tab = "dungeons";
    let switchbutton = function(){return false;};
    let skill_tab = true;
    let switchcompaign = true;
    let classContainer = "container_app ";

    if(!window.location.hash){
        tab = "dungeons";
    }

    if(!dviewer)
    {
        LoadViewer(viewer);
    }
    else
    {
        if(dviewer.characters && dviewer.characters[dviewer.active]){
            experience = dviewer.characters[dviewer.active].experience;
            maxexperience = dviewer.characters[dviewer.active].maxexperience;
            maxhealth = health = dviewer.characters[dviewer.active].health;
            maxenergy = energy = dviewer.characters[dviewer.active].energy;

            let cpt = 0;
            let styles;

            if(dviewer.characters[dviewer.active].equipped_spells)
            {
                skills_list = dviewer.characters[dviewer.active].equipped_spells.map(skill => {
                    let classSkill = 'skill';
                    cpt++;
                    let skill_image = "assets/images/skills/"+skill.image;
                    return (
                        <div className="oneSkill">
                            <span>{cpt}</span>
                            <Image style={styles} key={skill.id} className={`skills ${classSkill}`} src={skill_image}></Image>
                            <div className="info">
                                <h3>{skill.name}</h3>
                                <h4>Description: {skill.description}</h4>
                                <ul>
                                    <li>Action cost: {skill.action_cost}</li>
                                    <li>Energy cost: {skill.energy_cost}</li>
                                    <li>Damage instant: {skill.damage_instant}</li>
                                </ul>
                            </div>
                        </div>);
                });
            }
        }

        if(dviewer.compaign != null & dviewer.compaign != 'undefined'){
            switchcompaign = dviewer.compaign;
        }

        if(dviewer.tab != null & dviewer.tab != 'undefined'){
            tab = dviewer.tab;
        }

        picture = "/assets/images/infobar/"+dviewer.characters[dviewer.active].name+".png";
        if(dviewer.tuto && dviewer.tuto < 8)
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
                classContainer = classContainer + "dungeon_active";
                if(dungeon.user.default_character)
                {
                    maxhealth = dungeon.user.default_character.maxhealth;
                    health = dungeon.user.character.health;
                    energy = dungeon.user.character.energy;
                    maxenergy = dungeon.user.default_character.maxenergy;
                    experience = dungeon.user.character.experience;
                    maxexperience = dungeon.user.character.maxexperience;
                }
                dungeonActive = true;
                switchbutton = function(){
                    switchPannel(dungeon);
                };
                skill_tab = dungeon.pannel;

                if(dungeon.user.character.equipped_spells) {
                    var cpt = 0;
                    var styles;
                    skills_list = false;
                    skills_list = dungeon.user.character.equipped_spells.map(skill => {
                        var classSkill = 'skill';
                        if(dungeonActive)
                        {
                            skill_function = function (sk) {
                                CanUseSkill(dungeon,dviewer,sk);
                            };
                        }
                        cpt++;
                        var skill_image = "assets/images/skills/"+skill.image;
                        var cd_percent = parseFloat(1);
                        if(skill.cooldown)
                        {
                            cd_percent  = 1 - (Math.round(parseInt(skill.cooldown) * 100.0 / parseInt(skill.rest)) / 100);
                        }
                        styles = {
                            opacity: cd_percent
                        };
                      return (
                          <div className="oneSkill">
                              <span>{cpt}</span>
                              <Image style={styles} key={skill.id} className={`skills ${classSkill}`} onClick={() => skill_function(skill)} src={skill_image}></Image>
                              <div className="info">
                                  <h3>{skill.name}</h3>
                                  <h4>Description: {skill.description}</h4>
                                  <ul>
                                      <li>Action cost: {skill.action_cost}</li>
                                      <li>Energy cost: {skill.energy_cost}</li>
                                      <li>Damage instant: {skill.damage_instant}</li>
                                  </ul>
                              </div>
                          </div>);
                    });
                }

                if(dungeon.user.character.items) {
                    var cpt = 0;
                    var styles;
                    object_list = dungeon.user.character.items.map(item => {
                        var classSkill = 'skill';
                        if(dungeonActive)
                        {
                            item_function = function () {
                                tryItem(dungeon,dungeon.user.character.row,dungeon.user.character.col,cpt);
                            };
                        }
                        cpt++;
                        var skill_image = "assets/images/objets/"+item.image;
                        var cd_percent = parseFloat(1);
                        if(item.cooldown)
                        {
                            cd_percent  = 1 - (Math.round(parseInt(item.cooldown) * 100.0 / parseInt(item.rest)) / 100);
                        }
                        styles = {
                            opacity: cd_percent
                        };
                      return (
                          <div className="oneSkill">
                              <span>{cpt}</span>
                              <Image style={styles} key={item.id} className={`skills ${classSkill}`} onClick={() => item_function(item)} src={skill_image}></Image>
                              <div className="info">
                                  <h3>{item.name}</h3>
                                  <h4>Description: {item.description}</h4>
                              </div>
                          </div>);
                    })
                }

                if(dviewer && typeof dungeon.dungeon !== "undefined") {
                    wdmap.push(<WorldMap key={dungeon.dungeon.id} worldmap={dungeon.dungeon} dungeon={dungeon}/>);
                }

                if(dungeon.is_finished)
                {
                    if(equipments)
                    {
                        endDungeon(dungeon,equipments, dviewer);
                    }
                    else {
                        endDungeon(dungeon,false, dviewer);
                    }
                    dungeon.error_message = 'Dungeon complete';
                }
            }
            else {
                if(dviewer && !dviewer.active_dungeon)
                {
                    preLoadActiveDungeon(dviewer);
                }

                let compteur = 0;
                if(dungeons) {
                    dungeons_list = dungeons.map(dung => {
                        if (compteur < 3 && dung.from_editor != null && dung.from_editor != 'undefined' && dung.from_editor == false) {
                            let classeD = "compaign_dungeon" + compteur;
                            compteur++;
                            return (<div className={classeD}>
                                <Dungeon key={dung.id} dungeon={dung}/>
                            </div>)
                        }
                        return "";
                    });

                    dungeons_list_editor = dungeons.map(dung => {
                        if (dung.from_editor != null && dung.from_editor != 'undefined' && dung.from_editor == true) {
                            return (<div className="dungeon_editor">
                                <Dungeon key={dung.id} dungeon={dung}/>
                            </div>)
                        }
                        return "";
                    });
                }

                dungeonActive = false;
            }
        }
    }
    var displayDiv = "dungeons";

    //tuto
    var classN = "";
    var classStep = "";
    if(dviewer && tutoriel){
        classN = "overlay";
        if(tutoriel.class){
            classStep = tutoriel.class;
        }
    }
    var health_percent = health/maxhealth * 100;
    let healthbar = "<div class='text-info'><span>"+ health +"</span></div><div class='progress vertical-life'><div class='progress-bar progress-bar-life' role='progressbar' aria-valuenow='"+health+"' aria-valuemin='0' aria-valuemax='"+maxhealth+"' style='width:"+health_percent+"%;'></div></div>";
    var energy_percent = energy/maxenergy * 100;
    let energybar = "<div class='text-info'><span>"+ energy +"</span></div><div class='progress vertical-mana'><div class='progress-bar progress-bar-mana' role='progressbar' aria-valuenow='"+energy+"' aria-valuemin='0' aria-valuemax='"+maxenergy+"' style='width:"+energy_percent+"%;'></div></div>";

    return (
        <View className={classStep}>
            <div className={classN}></div>
            <Block>{dviewer && tutoriel &&
            <div className="cadre-tutoriel">
                <div className="tuto-text" dangerouslySetInnerHTML={{__html: tutoriel.description }}></div>
                <div onClick={() => LoadNextStep(dviewer,tutoriel.next)} className="tuto-next">Next</div>
            </div>
            }
            </Block>
            <View className="container_app-img"></View>
            <View className={classContainer}>
                <div className="cadre-gauche-max">
                    <div className="personnage-z">
                        <div className="personnage">
                            { picture &&
                                <Image src={picture}/>
                            }
                        </div>
                        <div className="personnage-info">
                            <div className="personnage-info-pseudo">
                                {dviewer.characters[dviewer.active].pseudo}
                            </div>
                            <div className="personnage-info-class">
                                {dviewer.characters[dviewer.active].name}
                            </div>
                        </div>
                    </div>
                    {tab == "perso" && dviewer.characters[dviewer.active] &&
                        <Stats character={dviewer.characters[dviewer.active]}/>
                    }
                    {tab == "dungeons" && !dungeonActive && dungeons &&
                        <div className="button-dungeons">
                            { switchcompaign ?
                                <div onClick={() => SwitchCompaign(dviewer,true)} className="active">Campaign</div> :
                                <div onClick={() => SwitchCompaign(dviewer,true)} >Campaign</div>}
                            { !switchcompaign ?
                                <div onClick={() => SwitchCompaign(dviewer, false)} className="active">Dungeons from
                                    Editor</div> :
                                <div onClick={() => SwitchCompaign(dviewer, false)}>Dungeons from Editor</div>
                            }
                        </div>
                    }
                </div>
                <div className="cadre-droite-max">
                    <div className="cadre-menu">
                        <div className="cadre-menu-div">
                            <ul className="menu-fixe">
                                {dungeon ?
                                    <div className={tab}>
                                        <a href="#dungeons">
                                            <li className="menu-dungeons"><span className="btn-menu">Dungeons</span></li>
                                        </a>
                                        <li className="menu-perso"><span className="btn-menu">Character</span></li>
                                        <li className="menu-spell"><span className="btn-menu">Skills</span></li>
                                        <li className="menu-option"><span className="btn-menu">Options</span></li>
                                    </div> :
                                    <div className={tab}>
                                        <a href="#dungeons" onClick={() => ChangeTab(dviewer, "dungeons")}><li className="menu-dungeons"><span className="btn-menu">Dungeons</span></li></a>
                                        <a href="#personnage" onClick={() => ChangeTab(dviewer, "perso")}><li className="menu-perso"><span className="btn-menu">Character</span></li></a>
                                        <a href="#skill" onClick={() => ChangeTab(dviewer,"skill")}><li className="menu-spell"><span className="btn-menu">Skills</span></li></a>
                                        <a href="#option" onClick={() => ChangeTab(dviewer,"option")}><li className="menu-option"><span className="btn-menu">Options</span></li></a>
                                    </div>
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="cadre-droite-bas">
                        <div className="cmenu cadre-dungeons">
                            <a name="dungeons" id="dungeons">
                                <div className="fix-h"></div>
                            </a>
                            {!loaded ?
                                <Loading />
                                : viewer ?
                                    dungeonActive?
                                        verifloaded && wdmap
                                        :
                                        dungeons && dungeons_list ?
                                            <div className="container-map">
                                                { switchcompaign ?
                                                    dungeons_list :
                                                    dungeons_list_editor
                                                 }
                                             </div>
                                            : <Text>There are no dungeons yet.</Text>
                                    : <Text>Please login</Text>
                            }
                        </div>
                        <div className="cmenu cadre-perso">
                            <a name="personnage" id="personnage"></a>
                            <Inventory character={dviewer.characters[dviewer.active]} viewer={dviewer} />
                        </div>
                        <div className="cmenu cadre-competence">
                            <a name="skill" id="skill"></a>
                            <Skills character={dviewer.characters[dviewer.active]} viewer={dviewer} />
                        </div>
                        <div className="cmenu cadre-option">
                            <a name="option" id="option"></a>
                            <div className="container-option">
                                <div>
                                    <Link className="btnEidteurOption" exactly to='/editor'>Editor</Link>
                                </div>
                                <SignOut/>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="cadre-bas-max">
                  <div>
                        <div className="infobar-mana">
                            <div className="infobar-mana-div " dangerouslySetInnerHTML={{__html: energybar  }}>
                            </div>
                        </div>
                        <div className="infobar-life">
                            <div className="infobar-life-div " dangerouslySetInnerHTML={{__html: healthbar }}>
                            </div>
                        </div>
                    </div>
                    <div className="infobar">
                        <div>
                            <div className="infobar-experience">
                                <span> XP : {experience} / {maxexperience}</span>
                            </div>
                            <div className="infobar-experience-progress">
                                <progress className="progressMore" max={maxexperience} value={experience}></progress>
                            </div>
                        </div>
                        <div className="infobar-spell-number">
                          <a className="btnSwitch" onClick={() => switchbutton()}></a>
                            {skill_tab ?
                                <div>{skills_list}</div>
                                :
                                <div>{object_list}</div>
                            }
                        </div>
                    </div>
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
    AddEquipment : React.PropTypes.func.isRequired,
    RemoveEquipment : React.PropTypes.func.isRequired,
    DeleteEquipment : React.PropTypes.func.isRequired,
    preLoadActiveDungeon : React.PropTypes.func.isRequired,
    viewer: React.PropTypes.object,
    verifloaded: React.PropTypes.number,
    tutoriel: React.PropTypes.object,
    dviewer: React.PropTypes.object,
    dungeonsOP: React.PropTypes.object,
    equipments: React.PropTypes.object,
};

Dungeons = firebase((database, props) => {
    const DungeonsRef = database.child('dungeons');
    const ViewerRef = database.child('users/'+props.viewer.id);
    const TutoRef = database.child('tutoriel/'+props.viewer.id);
    let WorldMapRef = database.child('activeDungeons');
    if(props.viewer.id)
    {
        WorldMapRef = database.child('activeDungeons/'+props.viewer.id);
    }
    return [
        [DungeonsRef, 'on', 'value', props.LoadDungeons],
        [WorldMapRef, 'off', 'value', props.ReloadWorldMap],
        [ViewerRef, 'on', 'value', props.LoadViewerRef],
        [TutoRef, 'on', 'value', props.LoadTutoRef],
    ];
})(Dungeons);

export default connect(state => ({
    dungeons: state.dungeons.dungeonLoaded,
    dungeonsOP: state.dungeons.dungeonsOP,
    loaded: state.dungeons.loaded,
    tutoriel: state.dungeons.tutoriel,
    verifloaded: state.dungeons.verifloaded,
    viewer: state.users.viewer,
    dviewer: state.dungeons.viewer,
    equipments: state.dungeons.equipments,
}), { SwitchCompaign,ChangeTab, AddEquipment,switchPannel,endDungeon,RemoveEquipment,DeleteEquipment, LoadDungeons,LoadSkills, LoadWeapons,CanUseSkill,tryItem, preLoadActiveDungeon,cancelDungeon, loadWorldMap,LoadViewer, ReloadWorldMap ,LoadTutoRef,LoadNextStep,LoadViewerRef,LoadStep})(Dungeons);

