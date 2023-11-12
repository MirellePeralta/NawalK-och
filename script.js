async function getSentimentAndArticles() {
    const selectedCandidate = document.getElementById("candidates").value;
    
    // Simulate making a POST request to the API
    const apiResponse = await fetch('URL_DE_TU_API', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ candidate: selectedCandidate }),
    });
    
    const responseData = await apiResponse.json();
    displayResults(responseData);
  }
  
  async function enviarCandidato(candidates) {
    try {
        // Verificar si el candidato seleccionado es "Samuel"
        if (candidates === "Samuel") {
            const respuesta = await fetch('https://sheet.best/api/sheets/932a8537-6abe-41b2-b640-fd784aeb21e3', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "Solicitudes": "Solicitud Samuel"  // Colocar "Solicitud" en la columna "Samuel"
                })
            });

            const contenido = await respuesta.json();
            console.log(contenido);
        } 
        else if (candidates === "Claudia") {
            const respuesta = await fetch('https://sheet.best/api/sheets/932a8537-6abe-41b2-b640-fd784aeb21e3', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "Solicitudes": "Solicitud Claudia"  // Colocar "Solicitud" en la columna "Samuel"
                })
            });

            const contenido = await respuesta.json();
            console.log(contenido);
        }
        else if (candidates === "Xochitl") {
            const respuesta = await fetch('https://sheet.best/api/sheets/932a8537-6abe-41b2-b640-fd784aeb21e3', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "Solicitudes": "Solicitud Xochitl"  // Colocar "Solicitud" en la columna "Samuel"
                })
            });

            const contenido = await respuesta.json();
            console.log(contenido);
        }
    } catch (error) {
        console.log(error);
    }
}

    async function getSentimentAndArticles() {
        const selectedCandidate = document.getElementById("candidates").value;
        await enviarCandidato(selectedCandidate);
    
        try {
            // Realiza una solicitud para obtener la información de la hoja de cálculo
            const sheetResponse = await fetch('https://sheet.best/api/sheets/932a8537-6abe-41b2-b640-fd784aeb21e3', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const sheetData = await sheetResponse.json();
            
            // Llena la tabla en el contenedor result-container con los datos obtenidos de la hoja de cálculo
            llenarTabla(sheetData);
        } catch (error) {
            console.log(error);
        }
    }
    
    function llenarTabla(data) {
        const seleccionesTable = document.getElementById("Selecciones");
    
        // Limpiar la tabla antes de agregar nuevos datos
        seleccionesTable.innerHTML = `
            <tr>
                <th>Selecciones</th>
            </tr>
        `;
    
        // Iterar sobre los datos y agregar filas a la tabla
        data.forEach(item => {
            const newRow = seleccionesTable.insertRow(-1);
    
            const cellSeleccion = newRow.insertCell(0);
    
            // Agregar la información correspondiente a la celda
            cellSeleccion.innerHTML = item.Solicitudes;
        });
    }
    