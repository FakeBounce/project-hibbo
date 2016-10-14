/* @flow */
import NewTodo from './NewTodo';
import React from 'react';
import Todos from './Todos';
import linksMessages from '../../common/app/linksMessages';
import { Block, Link, Space, PageHeader, Title, View } from '../app/components';
import { injectIntl, intlShape } from 'react-intl';
import { FormattedMessage } from 'react-intl';

const Navbar = ({ pathname }) => (
  <Block>
    <Link exactly to={pathname}>
      <FormattedMessage {...linksMessages.todo} />
    </Link>
    <Space x={2} />
    <Link to={`${pathname}/profile`}>
      <FormattedMessage {...linksMessages.test} />
    </Link>
  </Block>
);
Navbar.propTypes = {
  pathname: React.PropTypes.string.isRequired,
};

const TestPage = ({ intl }) => (
  <View>
    <Title message={linksMessages.todos} />
    <PageHeader heading={intl.formatMessage(linksMessages.todos)} />
    <NewTodo />
    <Todos />
  </View>
);

TestPage.propTypes = {
  intl: intlShape,
};

export default injectIntl(TestPage);
