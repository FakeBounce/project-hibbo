/**
 * Created by Fakebounce on 13/11/2016.
 */
import React from 'react';
import { connect } from 'react-redux';
import {KEYPRESS} from '../../../node_modules/react-key-handler/dist/index';
import { Image } from '../app/components';
import { PickEquipment, RemoveEquipment } from '../../common/dungeons/actions';

type Props = {
    character: Object,
    viewer: Object
};

const Inventory = ({ character , viewer , PickEquipment, RemoveEquipment }: Props) => {
    console.log(character);
    let equipment = '';
    let picture = '';
    const ShowEquipment = function (equip, wear) {
        PickEquipment(viewer, equip, wear);
    };

    if(character) {
        picture = "/assets/images/classes/"+ character.name +"-profil.png";
        if (character.inventory) {
            equipment = Object.keys(character.inventory).map(equip => {
                if(character.inventory[equip] && character.inventory[equip].img != null && character.inventory[equip].img != 'undefined') {
                    return (<div className="equipment-block">
                        <div className="equipment"><Image src={character.inventory[equip].img} onClick={() => ShowEquipment(character.inventory[equip], false)}/></div>
                    </div>)
                }
            })
        }
    }
    return (
        <div className={character.name}>
            <div className="separator"></div>
            <div className="inventory">
                {equipment}
                <div className="equipment-block">
                    <div className="equipment"></div>
                </div>
            </div>
            <div className="inventory-perso">
                <Image className="profil-img" src={picture}/>
                <div className="equipment helmet">
                    {character.equipped_equipments && character.equipped_equipments["helmet"] &&
                        <Image className="eq-select" src={character.equipped_equipments["helmet"].img} onClick={() => ShowEquipment(character.equipped_equipments["helmet"], true)}/>
                    }
                </div>
                < div className="equipment armor">
                    {character.equipped_equipments && character.equipped_equipments["armor"] &&
                        <Image className="eq-select" src={character.equipped_equipments["armor"].img} onClick={() => ShowEquipment(character.equipped_equipments["armor"], true)}/>
                    }
                </div>
                <div className="equipment weapon">
                    {character.equipped_equipments && character.equipped_equipments["weapon"] &&
                        <Image className="eq-select" src={character.equipped_equipments["weapon"].img} onClick={() => ShowEquipment(character.equipped_equipments["weapon"], true)}/>
                    }
                </div>
                <div className="equipment boots">
                    {character.equipped_equipments && character.equipped_equipments["boots"] &&
                        <Image className="eq-select" src={character.equipped_equipments["boots"].img} onClick={() => ShowEquipment(character.equipped_equipments["boots"], true)}/>
                    }
                </div>
            </div>
        </div>

    );
};

Inventory.propTypes = {
    character: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired
};

export default connect(state => ({
}), { PickEquipment, RemoveEquipment }) (Inventory);


