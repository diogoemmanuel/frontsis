import { Link } from 'react-router-dom'
import './index.css'
import logoPenedo from '../../img/images-removebg-preview.png'; 



export function Header() {
  return (
    <header>
      <div className='header'>
             
          <img src={logoPenedo} alt='Logo da Prefeitura de Penedo' className='imgPenedo'></img>

          <nav>
          
            
          <a href='http://localhost:3000/create'>  <p>Criar Item</p> </a>  
          <a href='http://localhost:3000/'> <p>Listagem de Itens</p> </a>
         
          </nav>
      </div>
    </header>
  );
}


