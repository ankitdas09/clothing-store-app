import './App.scss';
import Home from './routes/home/home.component';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/SignIn.component';

const Shop = () => {
  return (
    <div>
      <h3>
        I am the Shop
      </h3>
    </div>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
