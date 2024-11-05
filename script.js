function addRow() {
    const table = document.getElementById('quoteTable').getElementsByTagName('tbody')[0];
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
            <td class="services-td center ">
              <select class="services border" >
                <option value="volvo">-- Select a service</option>
                <option value="2">Bookkeeping General Services</option>
                <option value="saab">Payroll Services</option>
                <option value="fiat">Tax Services</option>
                <option value="compliance">Entity Managemenet Services</option>
                <option value="AR">Accounts Receivable Services</option>
                <option value="Additional Services">Additional Services</option>
              </select>
            </td>
            <td class="description-info">
              <input type="text" class="border" placeholder="Descripción" >
              <input type="text" class="border" placeholder="Descripción">
            </td>
            <td class="center"><input type="number"  class="border" placeholder="0" oninput="updateTotal(this)"></td>
            <td class="center"><input type="number"  class="border" placeholder="$0.00" oninput="updateTotal(this)"></td>
            <td class="center"><span class="total border" id="subtotal" >$0.00</span></td>
    `;
  
    table.appendChild(newRow);
      footerMargin()
  }

  function footerMargin() {
    const filas = document.getElementById('quoteTable').getElementsByTagName('tbody')[0];
    const marginFooter = document.querySelector('footer');
    
    // Número de filas menos la primera (para empezar a contar desde la segunda fila)
    const rowCount = filas.rows.length - 1;
    
    if (rowCount > 0) {
        // Calcula el nuevo margen restando 57px por cada fila adicional (después de la primera)
        let margin = 898 - (rowCount * 63); //57
        marginFooter.style.marginTop = margin + 'px';
        console.log('if')
    } else {
        // Si solo hay una fila, establece el margen en 910px
        marginFooter.style.marginTop = '898px';
        console.log( 'else')
    }
}

  // function footerMargin(){
  //   const filas = document.getElementById('quoteTable').getElementsByTagName('tbody')[0];
  //   console.log(filas.rows.length)
  //   const marginFooter = document.querySelector('footer')
  //   if(filas.rows.length > 1){
  //     let margin = filas.rows.length * 57
  //     marginFooter.style.marginTop = (910 - margin) + 'px'
  //     //console.log(marginFooter.style.marginTop)
      
  //   }else{
  //     marginFooter.style.marginTop = '910px'
  //   }
    
  // }

  //crear una funcion para reiniciar el valor del margin y qu reno se modifique

 

  function deleteRow() {

    
    // const margin = document.querySelector('footer')
    // if(margin.style.marginTop < 910){
    //   let add = margin.style.marginTop 
    //   const number = add.match(/\d+/)[0];
    //   console.log(number)
    //   margin.style.marginTop  = (Number(number) + 57) + 'px'
    //   console.log(margin.style.marginTop)
    // }else{
    //   margin.style.marginTop = '910px'
    // }
    const margin = document.querySelector('footer');
    let add = margin.style.marginTop || '0px'; // Asigna '0px' si marginTop está vacío
    const number = Number(add.match(/\d+/)[0]); // Convierte el número de marginTop a tipo numérico
    
    if (number < 910) { // Compara el número directamente con 910
      margin.style.marginTop = (number + 63) + 'px';
      console.log(margin.style.marginTop);
    } else {
      margin.style.marginTop = '898px';
    }
    
    const table = document.getElementById('quoteTable').getElementsByTagName('tbody')[0]; 
     if (table.rows.length > 1) {
      table.deleteRow(-1);
    }

    sumTotal()

  }

  function sumTotal(){
    let subtotal = 0;
  const rows = document.getElementById('quoteTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  console.log(rows);
  
  // for (let i = 0; i < rows.length; i++) {
  //   // const subtotal = ;
  //   const sum = rows.getElementById('subtotal')[0].value;
    
  //   // const sum = 10
  //   let itemTotal = 0
  //   itemTotal += sum

    
  //   console.log(itemTotal);
  //   subtotal += itemTotal;
  // }

  
  // document.getElementById('total').innerText = `$` + subtotal.toFixed(2);

    for(let i=0; i<rows.length; i++){
      let sum = rows[i].getElementsByTagName('span')[0].innerText 
      let suma = parseFloat(sum.slice(1))
      console.log(suma)
      let itemTotal = 0 
      console.log(`sum` + sum);
      itemTotal = suma * 1
      subtotal += itemTotal
      // regresar a sum y quitar signo de pessos para que sirva eliminar slice 1  
    }

    document.getElementById('total').innerText = `$` + subtotal.toFixed(2);
}

// function deleteRow() {
//   const table = document.getElementById('quoteTable').getElementsByTagName('tbody')[0];
//   if (table.rows.length > 1) {
//     table.deleteRow(-1);
//   }

//   sumTotal()
// }

  function updateTotal(element) {
    const row = element.closest('tr');
    const quantity = row.cells[2].getElementsByTagName('input')[0].value || 0;
    const unitPrice = row.cells[3].getElementsByTagName('input')[0].value || 0;
    const total = parseFloat(quantity) * parseFloat(unitPrice);
    row.cells[4].getElementsByClassName('total')[0].textContent =`$`+ total.toFixed(2);
    sumTotal()
  }

  footerMargin()

  function downloadPDF() {
    const textarea = document.querySelectorAll('.border');
    
    textarea.forEach((textarea) => {
      textarea.style.border = 'none';
  });
   
    const quote = document.getElementById('container');
    html2canvas(quote, {
      scale: 2,
      // useCORS: true
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4', true);

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('quote.pdf');
    });
  }