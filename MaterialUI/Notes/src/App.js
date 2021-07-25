import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
<<<<<<< HEAD

=======
>>>>>>> f075d4f21b132f3f8a2120ae12451a0206eb7f3c
import Notes from './pages/Notes'
import Create from './pages/Create'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Notes />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
