
import './css/App.css'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Login from './CredentialPages/Login'
import ChatRoom from './ChatRoom'
import Profile from './Profile/Profile'
import './css/animate.css'
import './css/media.css'
import {} from 'dotenv/config'

function App() {
  console.log(process.env)
  console.log(process.env.REACT_APP_API_KEY)
  return (
    <Router>
      <div className='App'>
        <Route exact path='/' component={Login}></Route>
        <Route path='/profile' component={ChatRoom}></Route>
        <Route path='/user-profile' component={Profile}></Route>
      </div>
    </Router>
  );
}


export default App;
