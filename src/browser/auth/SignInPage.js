/* @flow */
import Email from './Email';
import React from 'react';
import SignInError from './SignInError';
import Social from './Social';
import linksMessages from '../../common/app/linksMessages';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import {
    Login,
    Div,
    Loading
} from '../app/components';

let SignInPage = ({ disabled, intl, location, viewer }) => (
  viewer ?
    <Redirect
      to={(
        location.state &&
        location.state.from &&
        location.state.from.pathname
      ) || '/game'}
    />
  :
      <Login className="login_image" >
          <Div className="login_title">Connexion</Div>
          <Email />
      </Login>
);

SignInPage.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  intl: intlShape,
  location: React.PropTypes.object.isRequired,
  viewer: React.PropTypes.object,
};

SignInPage = injectIntl(SignInPage);
1
export default connect(state => ({
  disabled: state.auth.formDisabled,
  viewer: state.users.viewer,
}))(SignInPage);
