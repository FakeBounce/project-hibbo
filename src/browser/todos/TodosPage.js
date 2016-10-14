/* @flow */
import Buttons from './Buttons';
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
    <Link to={`${pathname}/test`}>
      <FormattedMessage {...linksMessages.test} />
    </Link>
  </Block>
);
Navbar.propTypes = {
  pathname: React.PropTypes.string.isRequired,
};

const TodosPage = ({ intl }) => (
  <View>
    <Title message={linksMessages.todos} />
    <PageHeader heading={intl.formatMessage(linksMessages.todos)} />
    <NewTodo />
    <Todos />
    <Buttons />
  </View>
);

TodosPage.propTypes = {
  intl: intlShape,
};

export default injectIntl(TodosPage);
