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


        info_skill =
            <div className="infobulle-skills">
                <Image className={`skills`} src={img_src}/>
                <h3>{viewer.info_skill.name}</h3>
                <h4>Description: {viewer.info_skill.description}</h4>
                <ul>
                <li>Action cost: {viewer.info_skill.action_cost}</li>
                <li>Energy cost: {viewer.info_skill.energy_cost}</li>
                <li>Damage instant: {viewer.info_skill.damage_instant}</li>
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
            return (
                <div className="skill-block">
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


