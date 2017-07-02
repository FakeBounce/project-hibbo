/**
 * Created by Fakebounce on 13/11/2016.
 */
import React from 'react';
import MapTile from './MapTile';
import { Block, Flex } from '../app/components';
import { connect } from 'react-redux';

const Maptiles = ({ maptiles }) => {

    if (!maptiles.size) {
        return (
            <Block>
                No maptiles yet
            </Block>
        );
    }

    const list = maptiles
        .toList();

    return (
        <Block>
            {list.map(maptile =>
                <Flex key={maptile.id}>
                    <MapTile
                        maptile={maptile}
                    />
                </Flex>
            )}
        </Block>
    );
};

Maptiles.propTypes = {
    maptiles: React.PropTypes.object.isRequired
};
export default connect(state => ({
    maptiles: state.maptiles.map,
}), { })(MapTiles);
