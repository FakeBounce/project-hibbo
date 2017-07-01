/**
 * Created by Fakebounce on 13/11/2016.
 */
import React from 'react';
import Dungeons from './Dungeons';
import linksMessages from '../../common/app/linksMessages';
import { Block, Link, Space, PageHeader, Title, View } from '../app/components';

const DungeonsPage = () => (
    <View>
        <h1 className="title-hibbo">HIBBO</h1>
        <Dungeons/>
    </View>
);

export default DungeonsPage;
