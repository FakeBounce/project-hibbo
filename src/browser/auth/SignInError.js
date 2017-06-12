/* @flow */
import React from 'react';
import errorMessages from '../../common/auth/errorMessages';
import { FormattedMessage } from 'react-intl';
import { Div } from '../app/components';
import { connect } from 'react-redux';
import { firebaseMessages } from '../../common/lib/redux-firebase';


const SignInError = ({ error }) => {
  if (!error) return null;

  const message =
    errorMessages[error.name] ||
    firebaseMessages[error.name];

  return (
    <Div className="form_auth_error" >
      {message ?
        <FormattedMessage {...message} values={error.params} />
      :
        error.toString()
      }
    </Div>
  );
};

SignInError.propTypes = {
  error: React.PropTypes.instanceOf(Error),
};

export default connect(state => ({
  error: state.auth.error,
}))(SignInError);
