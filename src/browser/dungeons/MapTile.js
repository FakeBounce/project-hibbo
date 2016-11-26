/**
 * Created by Ben on 13/11/2016.
 */

import React from 'react';
import { Image } from '../app/components';

type Props = {
    maptile: Object,
};

const Maptile = ({ maptile }: Props) => {
    const styles = {
        title: {
            cursor: 'pointer',
        },
        delete: {
            cursor: 'pointer',
        },
    };

    return (
        <Image style={styles.title}>
            {maptile.id}
        </Image>
    );
};

Maptile.propTypes = {
    maptile: React.PropTypes.object.isRequired
};

export default Maptile;