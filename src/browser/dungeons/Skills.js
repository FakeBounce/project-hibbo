/**
 * Created by Fakebounce on 13/11/2016.
 */
import React from 'react';
import { connect } from 'react-redux';
import {KEYPRESS} from '../../../node_modules/react-key-handler/dist/index';
import { Image } from '../app/components';
import { showSkillInfos,equipSkill,unequipSkill } from '../../common/dungeons/actions';

type Props = {
    character: Object,
    viewer: Object
};


const Skills = ({ character , viewer,showSkillInfos,equipSkill,unequipSkill }: Props) => {
    let skill = '';
    let picture = '';
    let equipment = '';
    let skills_list = '';
    let info_skill = '';
    let equipped_spell = '';

    let skill_function = function(){
        return false;
    };
    // let pick_equipment_list = '';

    if(viewer.info_skill)
    {
        let img_src = "assets/images/skills/"+viewer.info_skill.image;

        if(!viewer.characters[viewer.active].equipped_spells) {
            viewer.characters[viewer.active].equipped_spells = [];
        }
        if(viewer.characters[viewer.active].equipped_spells.length < 8)
        {
            equipped_spell = <div className="equip" onClick={() => equipSkill(viewer,viewer.info_skill)}>Equip spell</div>;
        }
        else{
            equipped_spell = <div>You cannot have more than 8 active spells.</div>;
        }
        if(viewer.info_skill.is_equipped)
        {
            equipped_spell = <div className="equip" onClick={() => unequipSkill(viewer,viewer.info_skill)}>Unequip spell</div>;
        }

        let skill_effect = [];
        let skill = viewer.info_skill;
        if(skill.action_cost != ""){
            skill_effect.push(<li>PA: {skill.action_cost}</li>);
        }
        if(skill.energy_cost != ""){
            skill_effect.push(<li>Energy: {skill.energy_cost}</li>);
        }
        if(skill.damage_instant != ""){
            skill_effect.push(<li>Dmg: {skill.damage_instant}</li>);
        }
        if(skill.damage_type != ""){
            skill_effect.push(<li>Dmg type: {skill.damage_type}</li>);
        }
        if(skill.rest != ""){
            skill_effect.push(<li>Cooldown: {skill.rest}</li>);
        }
        if(skill.uses != ""){
            skill_effect.push(<li>Limited use: {skill.uses}</li>);
        }
        if(skill.range_diagonal != ""){
            skill_effect.push(<li>Range diagonal: {skill.range_diagonal}</li>);
        }
        if(skill.range_linear != ""){
            skill_effect.push(<li>Range linear: {skill.range_linear}</li>);
        }
        if(skill.range_minimum != ""){
            skill_effect.push(<li>Range minimum: {skill.range_minimum}</li>);
        }
        if(skill.range_on_target != ""){
            skill_effect.push(<li>Range target: {skill.range_on_target}</li>);
        }
        if(skill.damage_buff_flat != ""){
            skill_effect.push(<li>Dmg buff: {skill.damage_buff_flat}</li>);
        }
        if(skill.damage_buff_percent != ""){
            skill_effect.push(<li>% Dmg buff: {skill.damage_buff_percent}</li>);
        }
        if(skill.damage_instant_buff != ""){
            skill_effect.push(<li>Dmg instant buff: {skill.damage_instant_buff}</li>);
        }
        if(skill.damage_reduction_flat != ""){
            skill_effect.push(<li>Dmg reduct°: {skill.damage_reduction_flat}</li>);
        }
        if(skill.damage_reduction_percent != ""){
            skill_effect.push(<li>% Dmg reduct°: {skill.damage_reduction_percent}</li>);
        }
        if(skill.damage_return != ""){
            skill_effect.push(<li>Dmg return: {skill.damage_return}</li>);
        }
        if(skill.damage_return_percent != ""){
            skill_effect.push(<li>% Dmg return: {skill.damage_return_percent}</li>);
        }
        if(skill.damage_time != ""){
            skill_effect.push(<li>Dmg time: {skill.damage_time}</li>);
        }
        if(skill.damage_time_buff_flat != ""){
            skill_effect.push(<li>Dmg time buff: {skill.damage_time_buff_flat}</li>);
        }
        if(skill.damage_time_buff_percent != ""){
            skill_effect.push(<li>% Dmg time buff: {skill.damage_time_buff_percent}</li>);
        }
        if(skill.duration != ""){
            skill_effect.push(<li>Duration: {skill.duration}</li>);
        }
        if(skill.energy_heal != ""){
            skill_effect.push(<li>Energy heal: {skill.energy_heal}</li>);
        }
        if(skill.energy_percent_heal != ""){
            skill_effect.push(<li>% Energy heal: {skill.energy_percent_heal}</li>);
        }
        if(skill.energy_percent_time != ""){
            skill_effect.push(<li>% Energy time: {skill.energy_percent_time}</li>);
        }
        if(skill.heal_instant != ""){
            skill_effect.push(<li>Heal: {skill.heal_instant}</li>);
        }
        if(skill.heal_time != ""){
            skill_effect.push(<li>Heal time: {skill.heal_time}</li>);
        }
        if(skill.movement_buff != ""){
            skill_effect.push(<li>Mvt buff: {skill.movement_buff}</li>);
        }
        if(skill.movement_instant != ""){
            skill_effect.push(<li>Movement: {skill.movement_instant}</li>);
        }
        if(skill.aoe_back != "" || skill.aoe_diagonal != "" || skill.aoe_front  != "" || skill.aoe_left  != "" || skill.aoe_linear  != "" || skill.aoe_right  != "")
        {
            skill_effect.push(<li>This skill is AOE.</li>);
        }


        info_skill =
            <div className="infobulle-skills">
                <Image className={`skills`} src={img_src}/>
                <h3>{viewer.info_skill.name}</h3>
                <h4>Description: {viewer.info_skill.description}</h4>
                <ul>
                    {skill_effect}
                </ul>
            </div>;
    }
    if(character.learned_spells) {
        var styles;
        skills_list = Object.keys(character.learned_spells).map(key => {
            let skill = character.learned_spells[key];
            if(character.equipped_spells)
            {
                character.equipped_spells.map(es=> {
                   if(es.id == skill.id)
                   {
                       skill.is_equipped = true;
                       skill.number = es.number;
                   }
                });
            }
            var classSkill = 'skill';
            skill_function = function (sk) {
                // CanUseSkill(dungeon,dviewer,sk);
                showSkillInfos(viewer,sk);
            };
            var skill_image = "assets/images/skills/"+skill.image;
            let keyu = "skill-block" + key;
            return (
                <div className="skill-block" key={keyu}>
                    <div className="oneSkill">
                        <Image key={skill.id} className={`skills ${classSkill}`} onClick={() => skill_function(skill)} src={skill_image}></Image>
                    </div>
                </div>
            );
        });
    }

    return (
        <div className={character.name}>
            <div className="container-skills">
                <div className="skills_tab">
                    {skills_list}
                </div>
            </div>
            <div className="skills-perso">
                <div className="separator"></div>
                {viewer.info_skill &&
                <div>
                    {info_skill}
                    <div className="infobulle-skills">
                        {equipped_spell}
                    </div>
                </div>

                }
            </div>
        </div>

    );
};

Skills.propTypes = {
    character: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired
};

export default connect(state => ({
}), { showSkillInfos,equipSkill,unequipSkill }) (Skills);


