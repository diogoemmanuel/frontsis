
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import CreateEstoque from './components/CreateEstoque/CreateEstoque';
import Estoque from './components/Estoque/Estoque';
import UpdateEstoque from './components/UpdateEstoque/UpdateEstoque';
import './App.css'
import { Header } from './components/Header/Header';


function App() {
  return (
    <div className="App">
      

      <Header />
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Estoque />}></Route>
        <Route path='/create' element={<CreateEstoque />}></Route>
        <Route path='/update/:id' element={<UpdateEstoque />}></Route>
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
