import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import { Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Vote from "./components/voting/Vote";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackStats from "./components/FeedbackStats";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        {/* Existing routes */}
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Login} />
        <Route exact path="/signout" />
        <Route exact path="/vote" component={Vote} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/feedback" component={FeedbackForm} />
        <Route exact path="/stats" component={FeedbackStats} />
      </Switch>
    </>
  );
}

export default App;
