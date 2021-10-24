
import './css/App.css'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import ChatRoom from './ChatRoom'
import './css/animate.css'
import './css/media.css'
import Profile from './Profile/Profile'
import {} from 'dotenv/config'
import Login from './CredentialPages/Login'

function App() {
  return (
    <Router>
      <div className='App'>
        <Route exact path="/" component={Login}></Route>
        <Route path='/profile' component={ChatRoom}></Route>
        <Route path='/user-profile' component={Profile}></Route>
      </div>
    </Router>
  );
}


export default App;
