/**
 * Created by Ben on 13/11/2016.
 */

import React from 'react';
import Maptiles from './Maptiles';
import { Flex, Text } from '../app/components';

type Props = {
    map: Object,
};

const Map = ({ map }: Props) => {
    const styles = {
        title: {
            cursor: 'pointer',
        },
        delete: {
            cursor: 'pointer',
        },
    };

    return (
        <Maptiles>
        </Maptiles>
    );
};

Map.propTypes = {
    map: React.PropTypes.object.isRequired
};

export default Map;