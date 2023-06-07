import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import './index.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';


function Estoque() {
  const [estoque, setEstoque] = useState([]);
  const baseUrl = "https://api-register-users-f7ol.vercel.app";
  const tableRef = useRef();

  useEffect(() => {
    axios.get('http://localhost:8081/')
      .then(res => setEstoque(res.data))
      .catch(err => console.log(err));
  }, []);


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este item do estoque?");
    if (!confirmDelete) return;

    try {
      await axios.delete('http://localhost:8081/estoque/' + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
  
    const currentDate = format(new Date(), 'dd/MM/yyyy HH:mm'); // Obtém a data e hora atual formatada
    const title = "Relatório do estoque";
    const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const marginLeft = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
  
    doc.setFontSize(12); // Define o tamanho da fonte para a data e hora no cabeçalho
    doc.text(title, marginLeft, 10);
  
    const pageWidth = doc.internal.pageSize.getWidth();
    const currentDateWidth = doc.getStringUnitWidth(currentDate) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const marginRight = pageWidth - currentDateWidth - 10;
  
    doc.setFontSize(10); // Define um tamanho menor para a data e hora no cabeçalho
    doc.text(currentDate, marginRight, 10, { align: 'right' }); // Adiciona a data e hora de geração do PDF no cabeçalho
  
    const tableStyles = {
      // Estilos da tabela
    };
  
    doc.autoTable({
      head: [['Nome', 'Modelo', 'Patrimônio', 'Entrada', 'Saída', 'Local']],
      body: estoque.map(({ nome, modelo, patrimonio, entrada, saida, local }) => [nome, modelo, patrimonio, entrada, saida, local]),
      ...tableStyles
    });
  
    doc.save("estoque.pdf");
  };
  
  

  
  
  

  return (
    <>
      <div className='d-flex vh-100 justify-content-center align-items-center'>
        <div className='vh-100 bg-white rounded p-3'>
          <Link to="/create" className='btn btn-success'>Adicionar +</Link>
          <button className='btn btn-primary ms-2' onClick={handleGeneratePDF}>Gerar PDF</button>
          <table className='table' ref={tableRef}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Modelo</th>
                <th>Patrimônio</th>
                <th>Entrada</th>
                <th>Saída</th>
                <th>Local/Setor</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {estoque.map((data, i) => (
                <tr key={i}>
                  <td>{data.nome}</td>
                  <td>{data.modelo}</td>
                  <td>{data.patrimonio}</td>
                  <td>{data.entrada}</td>
                  <td>{data.saida}</td>
                  <td>{data.local}</td>
                  <td>
                    <div></div>
                    <div className='btns'>
                      <Link to={`update/${data.id}`} className='btn btn-primary gx-2'>Editar</Link>
                      <button className='btn btn-danger ms-2' onClick={e => handleDelete(data.id)}>Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Estoque;
