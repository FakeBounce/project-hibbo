/* @flow */
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { FormattedMessage } from 'react-intl';
import { Button, View } from '../app/components';
import { connect } from 'react-redux';
import { signOut } from '../../common/auth/actions';

const SignOut = ({ signOut }, { router }) => {
  const onClick = () => {
    // We have to redirect to home before signOut.
    router.transitionTo({ pathname: '/' });
    // TODO: Router should provide onCompleted callback.
    setImmediate(signOut);
  };
  return (
    <View style={{width: '100%',margin: '5px auto'}}>
      <Button style={{
        backgroundColor: 'transparent',
        backgroundImage: 'url("/assets/images/login/logoutbutton.png")',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        height: '53px',
        width: '195px',
        color: '#fff',
        boxShadow: 'none',
        textAlign: 'center',
        fontSize: '16px',
        margin: '10px auto',
        display:'block',
      }} onClick={onClick}>
        <FormattedMessage {...buttonsMessages.signOut} />
      </Button>
    </View>
  );
};

SignOut.propTypes = {
  signOut: React.PropTypes.func.isRequired,
};

SignOut.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(null, { signOut })(SignOut);
