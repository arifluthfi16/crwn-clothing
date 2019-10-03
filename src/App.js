//Libs
import React from 'react';

// Components
import { Switch, Route } from 'react-router-dom';
import Header from './components/header/header.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';


//CSS
import './App.css';

//Pages
import HomePage from './pages/homepage/homepage.component';
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser : null
    }
  }

  unsubscribeFromAuth = null;


  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot =>  {
          this.setState({
            currentUser : {
              id: snapshot.id,
              ...snapshot.data()
            }
          }, ()=>[
            console.log(this.state)
          ]);
        });
      }
      this.setState({currentUser : userAuth});
    });
  }

  componentWillUnmount() {
    // This will remove the last user login when component unmount
    this.unsubscribeFromAuth();
  }

  render() {
    return (
        <div>
          <Header currentUser={this.state.currentUser}/>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route path='/signin' component={SignInAndSignUpPage} />
          </Switch>
        </div>
    );
  }
}

export default App;
