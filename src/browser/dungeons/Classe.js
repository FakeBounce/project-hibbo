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
    const styles = {
        title: {
            textAlign: 'center',
        },
        block: {
            maxWidth: '250px',
            cursor:'pointer',
        },
    };
    var src = "/assets/images/classes/"+classe.sprites_name+".png";
    return (
        <Block style={styles.block} onClick={() => setClass(classe,viewer)}>
            <h3 style={styles.title}>
                {classe.name}
            </h3>
            <Image  src={src} />
        </Block>
    );
};

Classe.propTypes = {
    classe: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired,
};

export default connect(state => ({
    viewer: state.dungeons.viewer,
}), { setClass }) (Classe);


