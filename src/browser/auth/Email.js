/* @flow */
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import emailMessages from '../../common/auth/emailMessages';
import SignInError from './SignInError';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { resetPassword, signIn, signUp } from '../../common/lib/redux-firebase/actions';
import {
  ButtonOutline as Button,
  Form,
  Input,
  Message,
  Space,
  View,
  focus,
  Loading,
Div
} from '../app/components';

type State = {
  forgetPasswordIsShown: boolean,
  recoveryEmailSent: boolean,
};

class Email extends React.Component {

  static propTypes = {
    disabled: React.PropTypes.bool.isRequired,
    fields: React.PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    resetPassword: React.PropTypes.func.isRequired,
    signIn: React.PropTypes.func.isRequired,
    signUp: React.PropTypes.func.isRequired,
  };

  state: State = {
    forgetPasswordIsShown: false,
    recoveryEmailSent: false,
  };

  onFormSubmit = () => {
    if (this.state.forgetPasswordIsShown) {
      this.resetPassword();
    } else {
      this.signInViaPassword();
    }
  };

  onSignUpClick = () => {
    const { fields, signUp } = this.props;
    signUp('password', fields.$values());
  };

  onForgetPasswordClick = () => {
    const { forgetPasswordIsShown } = this.state;
      this.setState({ forgetPasswordIsShown: !forgetPasswordIsShown });
  };

  resetPassword() {
    const { fields, resetPassword } = this.props;
    const { email } = fields.$values();
    resetPassword(email, () => {
      this.setState({
        forgetPasswordIsShown: false,
        recoveryEmailSent: true,
      });
    });
  }

  signInViaPassword() {
    const { fields, signIn } = this.props;
    signIn('password', fields.$values());
  }

  render() {
    const { disabled, fields, intl } = this.props;
    const { forgetPasswordIsShown, recoveryEmailSent } = this.state;
    const legendMessage = forgetPasswordIsShown
      ? emailMessages.passwordRecoveryLegend
      : emailMessages.emailLegend;

    return (
      <Form onSubmit={this.onFormSubmit} className="auth_form">
          <Input
            {...fields.email}
            className="auth_form_email"
            disabled={disabled}
            label={intl.formatMessage(emailMessages.emailLegend)}
            maxLength={100}
            placeholder=""
            hideLabel
          />
          {!forgetPasswordIsShown &&
            <Input
              {...fields.password}
              className="auth_form_password"
              disabled={disabled}
              label={intl.formatMessage(emailMessages.passwordLegend)}
              maxLength={1000}
              placeholder=""
              type="password"
              hideLabel
            />
          }
          {recoveryEmailSent &&
              <Div className="form_auth_error">
                  {intl.formatMessage(emailMessages.recoveryEmailSent)}
              </Div>

          }
          {!disabled &&
            <SignInError />
          }

          {disabled &&
          <Loading>
              {message => <Message>{message}</Message>}
          </Loading>
          }

          {!forgetPasswordIsShown ?
            <View className="auth_form_actions">
                <Button
                    disabled={disabled}
                    onClick={this.onForgetPasswordClick}
                    type="button"
                    style={{
                        boxShadow: 'none',
                        color: 'white',
                        padding: '30px 16px 0px 16px'
                    }}
                >
                    <FormattedMessage {...emailMessages.passwordForgotten} />
                </Button>
                <Button
                    disabled={disabled}
                    style={{
                    backgroundColor: 'transparent',
                    backgroundImage: 'url("/assets/images/login/login button.png")',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'scroll',
                    height: '53px',
                    width: '115px',
                    color: 'grey',
                    boxShadow: 'none',
                        float: 'right',
                        marginRight: '10px'
                    }}
                >
                    <FormattedMessage {...buttonsMessages.signIn} />
                </Button>
                <Space />
                <Button
                    disabled={disabled}
                    onClick={this.onSignUpClick}
                    type="button"
                    style={{
                    backgroundColor: 'transparent',
                    backgroundImage: 'url("/assets/images/login/register button.png")',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'scroll',
                    height: '53px',
                    width: '115px',
                    color: 'grey',
                    boxShadow: 'none',
                        float: 'right',
                        marginRight: '10px'
                    }}
                >
                    <FormattedMessage {...buttonsMessages.signUp} />
                </Button>
            </View>
          :
            <View className="auth_form_actions">
              <Button
                  disabled={disabled}
                  style={{
                      backgroundColor: 'transparent',
                      backgroundImage: 'url("/assets/images/login/register button.png")',
                      backgroundRepeat: 'no-repeat',
                      backgroundAttachment: 'scroll',
                      height: '53px',
                      width: '115px',
                      color: 'grey',
                      boxShadow: 'none',
                      float: 'right',
                      marginRight: '10px'
                  }}
              >
                <FormattedMessage {...emailMessages.resetPassword} />
              </Button>
              <Space />
              <Button
                disabled={disabled}
                onClick={this.onForgetPasswordClick}
                style={{
                    backgroundColor: 'transparent',
                    backgroundImage: 'url("/assets/images/login/register button.png")',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'scroll',
                    height: '53px',
                    width: '115px',
                    color: 'grey',
                    boxShadow: 'none',
                    float: 'right',
                    marginRight: '10px'
                }}
                type="button"
              >
                <FormattedMessage {...buttonsMessages.dismiss} />
              </Button>
            </View>
          }
      </Form>

    );
  }

}

Email = focus(Email, 'error');

Email = injectIntl(Email);

Email = fields(Email, {
  path: ['auth', 'email'],
  fields: ['email', 'password'],
});

export default connect(state => ({
  disabled: state.auth.formDisabled,
  error: state.auth.error,
}), { resetPassword, signIn, signUp })(Email);
