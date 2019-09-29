import React from 'react';
import {Link} from 'react-router-dom';
import { ReactComponent as Logo} from '../../assets/crown.svg';

import {auth} from '../../firebase/firebase.utils';

import './header.styles.scss';

const Header = ({currentUser}) => {
    console.log(currentUser);

    var signOut;

    if(currentUser){
        signOut =
            <div className={'option'} onClick={()=>auth.signOut()}>
                SIGN OUT
            </div>
    }else{
        signOut =
            <Link to={'/signin'} className={'option'}>
                SIGN IN
            </Link>
    }
    return(
      <div className='header'>
        <Link className='logo-container' to ="/">
            <Logo className='logo' />
        </Link>
      <div className="options">
          <Link className="option" to='/shop'>
              SHOP
          </Link>
          <Link className="option" to='/shop'>
              CONTACT
          </Link>
          {signOut}
      </div>
      </div>
    );
}

export default Header;