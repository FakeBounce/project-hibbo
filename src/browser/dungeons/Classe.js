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
        <div className="classe-choice">
            {/*<Image src={src} />*/}
            <h3>

                <input type="radio" value={classe.name} name="class" />
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


