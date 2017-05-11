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
    loadWorldMap : React.PropTypes.func.isRequired,
    viewer: React.PropTypes.object,
};

let Dungeons = ({ loaded, dungeons,dungeonsOP, loadWorldMap, viewer }) => {

    const list = dungeonsOP
        .toList();
    return (
    <View>
        {!loaded ?
            <Loading />
            : !dungeons ?
                <Text>No dungeon is online.</Text>
                :
                dungeons.map(dungeon =>
                    <Dungeon key={dungeon.id} dungeon={dungeon} viewer={viewer} loadWorldMap={loadWorldMap}/>
                )
        }
        {viewer ?
            list.map(todo =>
                viewer.id == todo.user.id ?
                <Block key={todo.id}>
                    <Text>{todo.description}</Text>
                </Block>
                    :
                    <Text>No dungeon</Text>
            )
            :
            <Text>Veuillez vous connecter</Text>
        }


        {/*<Text> {test} </Text>*/}
    </View>
    );
};

Dungeons.propTypes = {
    dungeons: React.PropTypes.object,
    loaded: React.PropTypes.bool.isRequired,
    loadWorldMap : React.PropTypes.func.isRequired,
    viewer: React.PropTypes.object,
    dungeonsOP: React.PropTypes.object,
};

Dungeons = firebase((database, props) => {
    const DungeonsRef = database.child('dungeons');
    return [
        [DungeonsRef, 'on', 'value', props.LoadDungeons],
    ];
})(Dungeons);

export default connect(state => ({
    dungeons: state.dungeons.dungeonLoaded,
    dungeonsOP: state.dungeons.dungeonsOP,
    loaded: state.dungeons.loaded,
    viewer: state.dungeons.viewer,
}), { LoadDungeons, loadWorldMap })(Dungeons);
