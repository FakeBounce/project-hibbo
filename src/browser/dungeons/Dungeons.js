/**
 * Created by Ben on 13/11/2016.
 */

import React from 'react';
import Dungeon from './Dungeon';
import { Block, View, Text,Loading } from '../app/components';
import { connect } from 'react-redux';
import { firebase } from '../../common/lib/redux-firebase';
import { LoadDungeons, loadWorldMap } from '../../common/dungeons/actions';

Dungeon.propTypes = {
    dungeon: React.PropTypes.object.isRequired,
    loadWorldMap : React.PropTypes.func.isRequired
};

let Dungeons = ({ loaded, dungeons, loadWorldMap }) => (
    <View>
        {!loaded ?
            <Loading />
            : !dungeons ?
            <Text>No dungeon is online.</Text>
            :
            dungeons.map(dungeon =>
                <Dungeon key={dungeon.id} dungeon={dungeon} loadWorldMap={loadWorldMap} />
            )
        }
    </View>
);

Dungeons.propTypes = {
    dungeons: React.PropTypes.object,
    loaded: React.PropTypes.bool.isRequired,
    loadWorldMap : React.PropTypes.func.isRequired
};

Dungeons = firebase((database, props) => {
    const DungeonsRef = database.child('dungeons');
    return [
        [DungeonsRef, 'on', 'value', props.LoadDungeons],
    ];
})(Dungeons);

export default connect(state => ({
    dungeons: state.dungeons.dungeonLoaded,
    loaded: state.dungeons.loaded,
}), { LoadDungeons, loadWorldMap })(Dungeons);
