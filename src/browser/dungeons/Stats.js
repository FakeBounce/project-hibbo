/**
 * Created by Fakebounce on 13/11/2016.
 */
import React from 'react';
import { connect } from 'react-redux';

type Props = {
    character: Object,
};

const Stats = ({ character }: Props) => {
    return (
        <div className="stats">
            <div className="stat">
                <div>Level: </div>
                <div>{character.level}</div>
            </div>
            <div className="stat">
                <div>Experience: </div>
                <div>{character.experience}/{character.maxexperience}</div>
            </div>
            <div className="stat">
                <div>Health: </div>
                <div>{character.health}</div>
            </div>
            <div className="stat">
                <div>Energy: </div>
                <div>{character.energy}</div>
            </div>
            <div className="stat">
                <div>AP: </div>
                <div>{character.action}</div>
            </div>
            <div className="stat">
                <div>AP per level: </div>
                <div>{character.action_lvl}</div>
            </div>
            <div className="stat">
                <div>Movement: </div>
                <div>{character.movement}</div>
            </div>
            <div className="stat">
                <div>PM per level: </div>
                <div>{character.movement_lvl}</div>
            </div>
            <div className="stat">
                <div>Damage: </div>
                <div>{character.damage}</div>
            </div>
            <div className="stat">
                <div>Damage per level: </div>
                <div>{character.damage_lvl}</div>
            </div>
            <div className="stat">
                <div>Damage return: </div>
                <div>{character.damage_return}</div>
            </div>
            <div className="stat">
                <div>Dmg return per lvl: </div>
                <div>{character.damage_return_lvl}</div>
            </div>
            <div className="stat">
                <div>Dmg return percent: </div>
                <div>{character.damage_return_percent}</div>
            </div>
            <div className="stat">
                <div>Dmg reduction : </div>
                <div>{character.damage_reduction_flat}</div>
            </div>
            <div className="stat">
                <div>Dmg reduct° per lvl: </div>
                <div>{character.damage_reduction_flat_lvl}</div>
            </div>
            <div className="stat">
                <div>Dmg reduct° percent: </div>
                <div>{character.damage_reduction_percent}</div>
            </div>
            <div className="stat_large">
                <div>Dmg reduct° percent per lvl: </div>
                <div>{character.damage_reduction_percent_lvl}</div>
            </div>
            <div className="stat">
                <div>Damage time: </div>
                <div>{character.damage_time}</div>
            </div>
            <div className="stat">
                <div>Damage time duration: </div>
                <div>{character.damage_time_duration}</div>
            </div>
        </div>
    );
};

Stats.propTypes = {
    character: React.PropTypes.object.isRequired,
};

export default connect()(Stats);