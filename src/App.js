import './App.css';
import {Route, Routes} from 'react-router-dom';

import Home from './components/Home';
import AdvQueries from './components/AdvQueries';
import Recommendations from './components/Recommendations';
import AddData from './components/AddData';
import UpdateName from './components/UpdateName';
import ViewFlights from './components/ViewFlights';

import { ChakraProvider } from '@chakra-ui/react'

function App() {

  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/advQueries" element={<AdvQueries />}></Route>
        <Route path="/recommendations" element={<Recommendations />}></Route>
        <Route path="/addData" element={<AddData />}></Route>
        <Route path="/updateName" element={<UpdateName />}></Route>
        <Route path="/viewFlights" element={<ViewFlights />}></Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
