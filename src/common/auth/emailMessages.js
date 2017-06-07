/* @flow */
import { defineMessages } from 'react-intl';

const emailMessages = defineMessages({
  emailLegend: {
    defaultMessage: 'Your Email : ',
    id: 'auth.email.emailLegend',
  },
  passwordLegend: {
    defaultMessage: 'Your Password : ',
    id: 'auth.email.passwordLegend',
  },
  passwordRecoveryLegend: {
    defaultMessage: 'Email Password Recovery',
    id: 'auth.email.passwordRecoveryLegend',
  },
  emailPlaceholder: {
    defaultMessage: 'your@email.com',
    id: 'auth.email.emailPlaceholder',
  },
  passwordPlaceholder: {
    defaultMessage: 'Your Password',
    id: 'auth.email.passwordPlaceholder',
  },
  passwordForgotten: {
    defaultMessage: 'Forgot Your Password?',
    id: 'auth.email.passwordForgotten',
  },
  recoveryEmailSent: {
    defaultMessage: 'Recovery email has been sent.',
    id: 'auth.email.recoveryEmailSent',
  },
  resetPassword: {
    defaultMessage: 'Reset Password',
    id: 'auth.email.resetPassword',
  },
});

export default emailMessages;
