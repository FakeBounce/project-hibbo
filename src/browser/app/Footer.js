/* @flow */
import React from 'react';
import { Footer, Link } from '../app/components';
import { FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
  madeByHtml: {
    defaultMessage: 'New Dungeon Crawler RPG : ',
    id: 'footer.madeByHtml',
  },
});

const AppFooter = () => (
  <Footer>
    <FormattedMessage {...messages.madeByHtml} />
    {'\u00a0'}
    Hibbo
  </Footer>
);

export default AppFooter;
