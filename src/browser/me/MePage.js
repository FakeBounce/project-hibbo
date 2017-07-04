/**
 * Created by Fakebounce on 13/11/2016.
 */
import React from 'react';
import Me from './Me';
import linksMessages from '../../common/app/linksMessages';
import { Block, Link, Space, PageHeader, Title, View } from '../app/components';

const MePage = () => (
    <View>
        <Title message={linksMessages.editor} />
        <Block>
            <Me/>
        </Block>
    </View>
);

export default MePage;
