/* @flow */
import { Record } from '../transit';

const User = Record({
  displayName: '',
  email: '',
  id: '',
  photoURL: '',
  pseudo: '',
}, 'user');

export default User;
