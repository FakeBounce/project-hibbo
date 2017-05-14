/**
 * Created by Fakebounce on 13/11/2016.
 */

import React from 'react';
import Dungeon from './Dungeon';
import WorldMap from './WorldMap';
import { Block, View, Text, Image,Loading } from '../app/components';
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

    if(dungeonsOP)
    {
        var rowsMap = [];
        var colsMap = [];
        var dungeon;
        var rows = 0;
        var cols = 0;
        var dungeonActive = false;
        dungeonsOP.map(dungeonOP => dungeon = dungeonOP);
        // dungeonsOP.toList().map(dungeonOP => rows = dungeonOP.dungeon.maptiles.length);
        // dungeonsOP.toList().map(dungeonOP => cols = dungeonOP.dungeon.maptiles[0].length);

        if(dungeon)
        {
            for (var i=0; i < dungeon.dungeon.maptiles.length; i++) {
                colsMap = [];
                for (var j=0; j < dungeon.dungeon.maptiles[i].length; j++) {
                    colsMap.push(<Image src={dungeon.dungeon.maptiles[i][j].image}></Image>);
                }
                rowsMap.push(<Block>{colsMap}</Block>);
            }
            dungeonActive = true;
        }
        else {
            dungeonActive = false;
        }
    }

    return (
    <View>
        {!loaded ?
            <Loading />
            : viewer ?
                dungeonActive?
                    list.map(worldmap =>
                        viewer.id == worldmap.user.id ?
                            <Block key={worldmap.id}>
                                <Text>{worldmap.description}</Text>
                                <WorldMap worldmap={dungeon.dungeon}/>
                                {/*{rowsMap}*/}
                            </Block>
                            :
                            <Text></Text>
                    )
                :
                dungeons ?
                    dungeons.map(dungeon =>
                        <Dungeon key={dungeon.id} dungeon={dungeon} viewer={viewer} loadWorldMap={loadWorldMap}/>
                    )
                    : <Text>Il n'y a pas encore de donjons.</Text>
            : <Text>Veuillez vous connecter</Text>
        }
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
