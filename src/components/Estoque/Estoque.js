import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import './index.css'



function Estoque() {

    const [estoque, setEstoque] = useState([])

    const baseUrl ="https://api-register-users-f7ol.vercel.app";

    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => setEstoque(res.data))
            .catch(err => console.log(err));
    }, [])


    const handleDelete  = async (id)=>{

        try{
            await axios.delete('http://localhost:8081/estoque/'+id )
            window.location.reload()
        }catch(err){
            console.log(err);
        }

    }
    return (

        <>
        

        <div className='d-flex vh-100 justify-content-center align-items-center'>

                      
            <div className='= vh-100 bg-white rounded p-3'>
                <Link to="/create" className='btn btn-success'>Adicionar +</Link>
                <table className='table'>

                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Modelo</th>
                            <th>Patrimônio</th>
                            <th>Entrada</th>
                            <th>Saída</th>
                            <th>Local</th>
                            <th>     </th>
                        </tr>

                    </thead>
                    <tbody>

                        {
                            estoque.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.nome}</td>
                                    <td>{data.modelo}</td>
                                    <td>{data.patrimonio}</td>
                                    <td>{data.entrada}</td>
                                    <td>{data.saida}</td>
                                    <td>{data.local}</td>
                                    <td>
                                    <div>
                                        
                                    </div>
                                  <div className='btns'>
                                    <Link to={`update/${data.id}`} className='btn btn-primary gx-2'>Editar</Link>
                                    <button className='btn btn-danger ms-2' onClick={ e => handleDelete(data.id)}>Excluir</button>
                                    </div>  
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </>

    )
}

export default Estoque