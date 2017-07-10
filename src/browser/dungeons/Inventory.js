/**
 * Created by Fakebounce on 13/11/2016.
 */
import React from 'react';
import { connect } from 'react-redux';
import {KEYPRESS} from '../../../node_modules/react-key-handler/dist/index';
import { Image } from '../app/components';
import { PickEquipment, RemoveEquipment, DeleteEquipment, AddEquipment } from '../../common/dungeons/actions';

type Props = {
    character: Object,
    viewer: Object
};

const Inventory = ({ character , viewer , PickEquipment, RemoveEquipment, AddEquipment, DeleteEquipment }: Props) => {
    console.log(character);
    let equipment = '';
    let picture = '';
    let pick_equipment_list = '';
    const ShowEquipment = function (equip, wear) {
        PickEquipment(viewer, equip, wear);
    };

    if(viewer && viewer.pick_equipment && viewer.pick_equipment.benefits){
        pick_equipment_list = Object.keys(viewer.pick_equipment.benefits).map(benef => {
            return(<div className="inventory_pick_info_benef"><div>{benef} : </div><div>{viewer.pick_equipment.benefits[benef]}</div></div>)
        });
    }

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
            <div className="container-inventory">
                <div className="inventory">
                    {equipment}
                    <div className="equipment-block">
                        <div className="equipment"></div>
                    </div>
                </div>
                {viewer && viewer.pick_equipment != null &&
                    <div className="inventory_pick">
                    <div className="inventory_pick_info">
                        <div className="w20">
                            <div className="equipment-block">
                                <Image src={viewer.pick_equipment.img}/>
                            </div>
                        </div>
                        <div className="w20">
                            <div className="inventory_pick_info_class">
                                <div>Classe :</div>
                                <div>{viewer.pick_equipment.classe}</div>
                            </div>
                            <div className="inventory_pick_info_type">
                                <div>Type :</div>
                                <div>{viewer.pick_equipment.type}</div>
                            </div>
                        </div>
                        <div className="w40">
                            <div className="inventory_pick_benefit">
                                {pick_equipment_list}
                            </div>
                        </div>
                        <div className="w20">
                            <div className="inventory_pick_action">
                                {viewer.pick_equipment.wear != null && viewer.pick_equipment.wear != 'undefined' ?
                                    viewer.pick_equipment.wear == false ?
                                        <div className="equip"
                                             onClick={() => AddEquipment(viewer, viewer.pick_equipment)}>Equip</div>
                                        :
                                        <div className="equip"
                                             onClick={() => RemoveEquipment(viewer, viewer.pick_equipment)}>Remove</div>
                                    : ""

                                }
                                <div className="supp"
                                     onClick={() => DeleteEquipment(viewer, viewer.pick_equipment)}>Delete
                                </div>
                            </div>
                            {viewer.pick_equipment.error &&
                            <div>
                                {viewer.pick_equipment.error}
                            </div>
                            }
                        </div>
                    </div>
                </div>
                }
            </div>
            <div className="inventory-perso">
                <div className="separator"></div>
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
}), { PickEquipment, RemoveEquipment, AddEquipment, DeleteEquipment }) (Inventory);


