import React from 'react';
import { User, useUserProviderContext } from '../providers/UserProvider';

interface IProps {}
interface IState {}

const Profile: React.FC<IProps> = (): JSX.Element => {
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const { getCurrentUser, setCurrentUser } = useUserProviderContext();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { value, name } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  React.useEffect(() => {
    const currentUser = getCurrentUser();
    setUser({ ...currentUser });
  }, []);

  return (
    <div className={'profileInputMainContainer'}>
      <span className={'inputContainer'}>
        <label htmlFor={'first_name'}>First name</label>
        <input
          name={'first_name'}
          id={'first_name'}
          type={'text'}
          value={user?.first_name}
          onChange={event => handleInputChange(event)}
        />
      </span>
      <span className={'inputContainer'}>
        <label htmlFor={'last_name'}>Last name</label>
        <input
          name={'last_name'}
          id={'last_name'}
          type={'text'}
          value={user?.last_name}
          onChange={event => handleInputChange(event)}
        />
      </span>
      <span className={'inputContainer'}>
        <label htmlFor={'height'}>Height (cm)</label>
        <input
          name={'height'}
          id={'height'}
          type={'number'}
          value={user?.height}
          onChange={event => handleInputChange(event)}
        />
      </span>
      <span className={'inputContainer'}>
        <label htmlFor={'weight'}>Weight (kg)</label>
        <input
          name={'weight'}
          id={'weight'}
          type={'number'}
          value={user?.weight}
          onChange={event => handleInputChange(event)}
        />
      </span>
      <span className={'inputContainer'}>
        <label htmlFor={'dob'}>
          Date of birth <br />
          (format dd/mm/yyyy)
        </label>
        <input
          name={'dob'}
          id={'dob'}
          type={'text'}
          value={user?.dob ? user?.dob.toString() : ''}
          onChange={event => handleInputChange(event)}
        />
      </span>
      <span>
        <button
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            setCurrentUser({ ...user });
          }}>
          save
        </button>
      </span>
    </div>
  );
};

export default Profile;
