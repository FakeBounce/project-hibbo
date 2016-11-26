/**
 * Created by Ben on 13/11/2016.
 */
import React from 'react';
import Dungeons from './Dungeons';
import linksMessages from '../../common/app/linksMessages';
import { Block, Link, Space, PageHeader, Title, View } from '../app/components';

const DungeonsPage = () => (
    <View>
        <Title message={linksMessages.map} />
        <Block>
            <Dungeons>
            </Dungeons>
        </Block>
    </View>
);

export default DungeonsPage;