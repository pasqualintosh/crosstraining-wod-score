import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {}
interface IState {}

const Layout: React.FC<IProps> = ({ children }): JSX.Element => {
  return (
    <>
      <ul
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          listStyleType: 'none',
          padding: 0,
        }}>
        <li>
          <Link to={'/'}>generate</Link>
        </li>
        <li>
          <Link to={'/scores/'}>your scores</Link>
        </li>
        <li>
          <Link to={'/profile/'}>profile</Link>
        </li>
      </ul>
      <span
        style={{
          marginTop: '40px',
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {children}
      </span>
      <span
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          listStyleType: 'none',
          padding: 0,
          fontSize: '10px',
          marginTop: '100px',
        }}>
        <p>Want a feature? chat with me: pasqsac[at]yahoo[dot]it</p>
      </span>
    </>
  );
};

export default Layout;
