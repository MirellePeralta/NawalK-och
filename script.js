async function getSentimentAndArticles() {
    const selectedCandidate = document.getElementById("candidates").value;
    
    // Simulate making a POST request to the API
    const apiResponse = await fetch('http://127.0.0.1:8000/docs#/default/get_all_news_data_get_all_news_data__get', {
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
        if (candidates === "Samuel_Garcia") {
            const respuesta = await fetch('http://127.0.0.1:8000/docs#/default/get_all_news_data_get_all_news_data__get', {
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
        else if (candidates === "Claudia_Sheinbaum") {
            const respuesta = await fetch('http://127.0.0.1:8000/docs#/default/get_all_news_data_get_all_news_data__get', {
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
        else if (candidates === "Xochitl_Galvez") {
            const respuesta = await fetch('http://127.0.0.1:8000/docs#/default/get_all_news_data_get_all_news_data__get', {
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
        const selectedCandidate = document.getElementById("candidates").value.replace(" ", "_");
        
        try {
            const apiResponse = await fetch(`http://127.0.0.1:8000/get-all-news-data/?query=${selectedCandidate}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const responseData = await apiResponse.json();
            displayResults(responseData);
        } catch (error) {
            console.error("Error al obtener los datos: ", error);
        }
    }

function displayResults(data) {
    displayNewsList(data.news_list);
    displayLinks(data.links);
    displayDetails(data.details);
}

function displayNewsList(newsList) {
    const table = document.getElementById("newsListTable");
    table.innerHTML = '<tr><th>Title</th></tr>'; // Resetear y establecer encabezado de la tabla

    newsList.forEach(item => {
        const row = table.insertRow(-1);
        const titleCell = row.insertCell(0);
        titleCell.innerHTML = item.title;
    });
}

function displayLinks(links) {
    const list = document.getElementById("linksList");
    list.innerHTML = ''; // Limpiar lista existente

    links.forEach(link => {
        const listItem = document.createElement("li");
        const linkElement = document.createElement("a");
        linkElement.href = link;
        linkElement.textContent = link;
        linkElement.target = "_blank"; // Abrir en una nueva pestaña
        listItem.appendChild(linkElement);
        list.appendChild(listItem);
    });
}

function displayDetails(details) {
    const container = document.getElementById("detailsContainer");
    container.innerHTML = ''; // Limpiar contenido existente

    details.forEach(detail => {
        const detailDiv = document.createElement("div");
        detailDiv.innerHTML = `
            <h3>${detail[0]}</h3>
            <p>Authors: ${detail[1].join(", ")}</p>
            <p>Link: <a href="${detail[2]}" target="_blank">${detail[2]}</a></p>
            <p>Description: ${detail[3]}</p>
            <p>Text: ${detail[4]}</p>
            <p>Sentiment (Description): ${detail[5]}</p>
            <p>Sentiment (Title): ${detail[6]}</p>
            <p>Sentiment (Text): ${detail[7]}</p>
        `;
        container.appendChild(detailDiv);
    });
}
    function displayResults(data) {
        displayNewsList(data.news_list);
        displayLinks(data.links);
        displayDetails(data.details);
    }

    function displayNewsList(newsList) {
        const table = document.getElementById("newsListTable");
        table.innerHTML = '<tr><th>Title</th></tr>'; // Resetear y establecer encabezado de la tabla

        newsList.forEach(item => {
            const row = table.insertRow(-1);
            const titleCell = row.insertCell(0);
            titleCell.innerHTML = item.title;
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        const Samuel_GarciaDiv = document.querySelector('.Samuel_Garcia');
        Samuel_GarciaDiv.style.display = 'none';  // Oculta la sección inicialmente
    
        document.getElementById('candidates').addEventListener('change', function() {
            if (this.value === 'Samuel_Garcia') {
                Samuel_GarciaDiv.style.display = 'block';
            } else {
                Samuel_GarciaDiv.style.display = 'none';
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const Samuel_GarciaDiv = document.querySelector('.Claudia_Sheinbaum');
        Samuel_GarciaDiv.style.display = 'none';  // Oculta la sección inicialmente
    
        document.getElementById('candidates').addEventListener('change', function() {
            if (this.value === 'Claudia_Sheinbaum') {
                Samuel_GarciaDiv.style.display = 'block';
            } else {
                Samuel_GarciaDiv.style.display = 'none';
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const Samuel_GarciaDiv = document.querySelector('.Xochitl_Galvez');
        Samuel_GarciaDiv.style.display = 'none';  // Oculta la sección inicialmente
    
        document.getElementById('candidates').addEventListener('change', function() {
            if (this.value === 'Xochitl_Galvez') {
                Samuel_GarciaDiv.style.display = 'block';
            } else {
                Samuel_GarciaDiv.style.display = 'none';
            }
        });
    });

    function displayLinks(links) {
        const list = document.getElementById("linksList");
        list.innerHTML = ''; // Limpiar lista existente

        links.forEach(link => {
            const listItem = document.createElement("li");
            const linkElement = document.createElement("a");
            linkElement.href = link;
            linkElement.textContent = link;
            linkElement.target = "_blank"; // Abrir en una nueva pestaña
            listItem.appendChild(linkElement);
            list.appendChild(listItem);
        });
    }

    function displayDetails(details) {
        const container = document.getElementById("detailsContainer");
        container.innerHTML = ''; // Limpiar contenido existente

        details.forEach(detail => {
            const detailDiv = document.createElement("div");
            detailDiv.innerHTML = `
                <h3>${detail[0]}</h3>
                <p>Authors: ${detail[1].join(", ")}</p>
                <p>Link: <a href="${detail[2]}" target="_blank">${detail[2]}</a></p>
                <p>Description: ${detail[3]}</p>
                <P>Result: ${detail[11]}</p>
            `;
            container.appendChild(detailDiv);
        });
    }



// Asegúrate de llamar a getSentimentAndArticles en respuesta a algún evento, como un botón presionado

    