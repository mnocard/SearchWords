import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pagess/Home';
import About from './pagess/About';
import SignIn from './pagess/SignIn';
import SignUp from './pagess/SignUp';
import Profile from './pagess/Profile';
import Header from './componentss/Header';
import PrivateRoute from './componentss/PrivateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path='/Profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
