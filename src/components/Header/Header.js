import { Link } from 'react-router-dom'
import './index.css'



export function Header() {
  return (
    <header>
      <div className='header'>
              <img src='https://penedo.al.gov.br/wp-content/uploads/2021/03/logo-pmp-2021-horizontal.png' alt='Logo da Prefeitura de Penedo' className='imgPenedo'></img>

          <nav>
          
            
          <a href='http://localhost:3000/create'>  <p>Criar Item</p> </a>  
          <a href='http://localhost:3000/'> <p>Listagem de Itens</p> </a>
          <a href='http://localhost:3000/update/29'> <p >Atualizar Item</p> </a>
          </nav>
      </div>
    </header>
  );
}


