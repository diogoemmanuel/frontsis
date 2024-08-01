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
    const estoqueOrdenado = [...estoque].sort((a, b) => a.nome.localeCompare(b.nome));

    const currentDate = format(new Date(), 'dd/MM/yyyy HH:mm');
    const title = "Relatório do estoque";
    const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const marginLeft = (doc.internal.pageSize.getWidth() - titleWidth) / 2;

    doc.setFontSize(12);
    doc.text(title, marginLeft, 10);

    const pageWidth = doc.internal.pageSize.getWidth();
    const currentDateWidth = doc.getStringUnitWidth(currentDate) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const marginRight = pageWidth - currentDateWidth - 10;

    doc.setFontSize(10);
    doc.text(currentDate, marginRight, 10, { align: 'right' });

    const tableStyles = {};

    doc.autoTable({
      head: [['Nome', 'Modelo', 'Patrimônio', 'Entrada', 'Saída', 'Local']],
      body: estoqueOrdenado.map(({ nome, modelo, patrimonio, entrada, saida, local }) => [nome, modelo, patrimonio, entrada, saida, local]),
      ...tableStyles
    });

    doc.save("estoque.pdf");
  };



 // Gerar pdf por data


 const handleGeneratePDFdate = () => {
  // Ordenar o estoque alfabeticamente pelo nome
  const estoqueOrdenadoPorNome = [...estoque].sort((a, b) => a.nome.localeCompare(b.nome));

  // Restante do código
  const doc = new jsPDF();
  const currentDate = format(new Date(), 'dd/MM/yyyy HH:mm');
  const title = "Relatório do estoque por Data de Entrada";
  const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const marginLeft = (doc.internal.pageSize.getWidth() - titleWidth) / 2;

  doc.setFontSize(12);
  doc.text(title, marginLeft, 10);

  const pageWidth = doc.internal.pageSize.getWidth();
  const currentDateWidth = doc.getStringUnitWidth(currentDate) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const marginRight = pageWidth - currentDateWidth - 10;

  doc.setFontSize(10);
  doc.text(currentDate, marginRight, 10, { align: 'right' });

  const tableStyles = {};

  // Utilizar a versão ordenada pelo nome para gerar o corpo da tabela
  doc.autoTable({
    head: [['Nome', 'Modelo', 'Patrimônio', 'Entrada', 'Saída', 'Local']],
    body: estoqueOrdenadoPorNome.map(({ nome, modelo, patrimonio, entrada, saida, local }) => [nome, modelo, patrimonio, entrada, saida, local]),
    ...tableStyles
  });

  doc.save("estoque_por_data_crescente.pdf");
};

 // Até aqui

  
  return (
    <>
      <div className='d-flex vh-100 justify-content-center align-items-center'>
        <div className='vh-100 bg-white rounded p-3'>
          <Link to="/create" className='btn btn-success'>Adicionar +</Link>
          <button className='btn btn-primary ms-2' onClick={handleGeneratePDF}>Gerar PDF por ordem alfabetica</button>
          <button className='btn btn-primary ms-2' onClick={handleGeneratePDFdate}>Gerar PDF por data</button>
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
                      <Link
                        to={`update/${data.id}?nome=${data.nome}&modelo=${data.modelo}&patrimonio=${data.patrimonio}&entrada=${data.entrada}&saida=${data.saida}&local=${data.local}`}
                        className='btn btn-primary gx-2'
                      >
                        Editar
                      </Link>
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
