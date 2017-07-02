import React from 'react';
import Editor from './Editor';
import linksMessages from '../../common/app/linksMessages';
import { Block, Link, Space, PageHeader, Title, View } from '../app/components';

const EditorPage = () => (
    <View>
        <Title message={linksMessages.editor} />
        <Block>
            <Editor/>
        </Block>
    </View>
);

export default EditorPage;
