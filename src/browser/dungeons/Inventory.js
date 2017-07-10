/**
 * Created by Fakebounce on 13/11/2016.
 */
import React from 'react';
import { connect } from 'react-redux';
import {KEYPRESS} from '../../../node_modules/react-key-handler/dist/index';
import { Image } from '../app/components';
import { PickEquipment } from '../../common/dungeons/actions';

type Props = {
    character: Object,
    viewer: Object
};

const Inventory = ({ character , viewer , PickEquipment }: Props) => {
    console.log(character);
    let equipment = '';
    let picture = '';
    const ShowEquipment = function (equip) {
        PickEquipment(viewer, equip);
    };

    if(character) {
        picture = "/assets/images/classes/"+ character.name +"-profil.png";
        if (character.inventory) {
            equipment = character.inventory.map(equip => {
                return (<div className="equipment-block" onClick={() => ShowEquipment(equip)}>
                    <div className="equipment"><Image src={equip.img}/></div>
                </div>)
            })
        }
    }
    return (
        <div className={character.name}>
            <div className="separator"></div>
            <div className="inventory">
                {equipment}
            </div>
            <div className="inventory-perso">
                <Image className="profil-img" src={picture}/>
                <div className="equipment helmet">
                    {character.equipped_equipments && character.equipped_equipments["helmet"] &&
                        <Image src={character.equipped_equipments["helmet"].img}/>
                    }
                </div>
                < div className="equipment armor">
                    {character.equipped_equipments && character.equipped_equipments["armor"] &&
                        <Image src={character.equipped_equipments["armor"].img}/>
                    }
                </div>
                <div className="equipment weapon">
                    {character.equipped_equipments && character.equipped_equipments["weapon"] &&
                        <Image src={character.equipped_equipments["weapon"].img}/>
                    }
                </div>
                <div className="equipment boots">
                    {character.equipped_equipments && character.equipped_equipments["boots"] &&
                        <Image src={character.equipped_equipments["boots"].img}/>
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
}), { PickEquipment }) (Inventory);


