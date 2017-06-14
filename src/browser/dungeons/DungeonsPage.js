/**
 * Created by Fakebounce on 13/11/2016.
 */
import React from 'react';
import Dungeons from './Dungeons';
import Tutoriel from '../tutoriel/Tutoriel';
import linksMessages from '../../common/app/linksMessages';
import { Block, Title, View } from '../app/components';

const DungeonsPage = () => (
    <View>
        <Tutoriel/>
        <Title message={linksMessages.dungeon} />
        <Block>
            <Dungeons/>
        </Block>
    </View>

);

export default DungeonsPage;
