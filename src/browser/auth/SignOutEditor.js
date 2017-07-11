/* @flow */
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { FormattedMessage } from 'react-intl';
import { Button, View,Link } from '../app/components';
import { connect } from 'react-redux';
import { signOut } from '../../common/auth/actions';

const SignOutEditor = ({ signOut }, { router }) => {
    const onClick = () => {
        // We have to redirect to home before signOut.
        router.transitionTo({ pathname: '/' });
        // TODO: Router should provide onCompleted callback.
        setImmediate(signOut);
    };
    return (
        <View>
            <div onClick={onClick} className="Link">
                <FormattedMessage {...buttonsMessages.signOut} />
            </div>
        </View>
    );
};

SignOutEditor.propTypes = {
    signOut: React.PropTypes.func.isRequired,
};

SignOutEditor.contextTypes = {
    router: React.PropTypes.object,
};

export default connect(null, { signOut })(SignOutEditor);
