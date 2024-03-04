// hooks
import useAuth from '../hooks/useAuth';
//
import { MAvatar } from './@material-extend';
import createAvatar from '../utils/createAvatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
      <MAvatar
          src={'https://www.pngmart.com/files/21/Admin-Profile-Vector-PNG-Clipart.png'}
          alt={user?.username}
          color={user?.photoURL ? 'default' : createAvatar(user?.displayName)?.color}
          {...other}
      >
          {createAvatar(user?.displayName)?.name}
      </MAvatar>
  );
}
