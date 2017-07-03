/**
 * Created by Fakebounce on 13/11/2016.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Image, Flex,Block } from '../app/components';
import { setClass } from '../../common/dungeons/actions';

type Props = {
    classe: Object,
    viewer: Object,
};

const Classe = ({ classe,viewer,setClass }: Props) => {
    var src = "/assets/images/classes/"+classe.sprites_name+".png";
    return (
        <div className="classe-choice" onClick={() => setClass(classe,viewer)}>

            <Image  src={src} />
            <h3>
                {classe.name}
            </h3>
        </div>

    );
};

Classe.propTypes = {
    classe: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired,
};

export default connect(state => ({
    viewer: state.dungeons.viewer,
}), { setClass }) (Classe);


