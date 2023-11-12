from fastapi import FastAPI, Depends
from requests_html import AsyncHTMLSession
from transformers import pipeline
from newspaper import Article
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas las origenes
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos
    allow_headers=["*"],  # Permite todos los headers
)

# Función para obtener enlaces de las noticias
def getLinks(result):
    listResultsLinks = []
    for r in result:
        try:
            news_dict = r['link']
            news_dict = list(news_dict)
            listResultsLinks.append(news_dict[0])
        except:
            pass
    return listResultsLinks

listNoconf=['proceso,lajornada,calibre57']
listConf=['elheraldodemexico,excelsior,laprensa']
def getNewsDetails(links, listNoconf,listConf):
    classifier = pipeline('sentiment-analysis', 
                      model="nlptown/bert-base-multilingual-uncased-sentiment")
    results = []
    details = []
    links = links[:15]
    for link in links:  
        results = []
        detail = []
        try:
            url = link
            article = Article(url)
            article.download()
            article.parse()
            detail.append(article.title)
            detail.append(article.authors)
            detail.append(article.canonical_link)
            detail.append(article.meta_description)
            detail.append(article.text)
            result = classifier(article.meta_description)
            detail.append(result[0]['label'].split()[0])
            result = classifier(article.title)
            detail.append(result[0]['label'].split()[0])
            # el modelo tien capacidad de hasta 512 palabras por eso lo freno antes
            result = classifier(article.text[:500])
            detail.append(result[0]['label'].split()[0])
            detail.append(len(article.title) > 1)
            detail.append(article.canonical_link.split('.')[1])
            detail.append(len(article.text))

            results.append( 1 if int(result[0]['label'].split()[0]) < 2 else 0 ) # 1 red flag
            result = classifier(article.title)
            results.append( 1 if int(result[0]['label'].split()[0]) < 2 else 0) # 1 red flag
            # el modelo tien capacidad de hasta 512 palabras por eso lo freno antes
            result = classifier(article.text[:500])
            results.append(1 if int(result[0]['label'].split()[0]) < 2 else 0) # 1 red flag
            results.append(1 if int(len(article.title)) <= 1 else 0) # 1 red flag
            results.append(1 if article.canonical_link.split('.')[1] in listNoconf else 0)

            results.append( 1 if len(article.text) < 100 else 0)
            i = 0 
            print(results)
            for r in results:
                i = i + r 
            if( i <= 1):
                detail.append('articulo  confiable')
            elif( i == 2):
                detail.append('Articulo no tan confiable')
            elif( i == 3):
                detail.append('Articulo dudoso')
            else:
                detail.append('Articulo poco confiable')

            details.append(detail)

        except:
            pass
        
    return details

# Función para buscar noticias
async def googleSearchNews(query: str):
    session = AsyncHTMLSession()
    query = query.replace("", " ")  # Reemplazar '' por ' '
    query = query.replace(" ", "%20")  # Codificar espacios para URL
    r = await session.get(f'https://news.google.com/search?q={query}&hl=es-419&gl=MX')
    await r.html.arender(sleep=1, scrolldown=2)
    articles = r.html.find('article')
    newslist = []
    for item in articles:
        try:
            newsitem = item.find('h3', first=True)
            title = newsitem.text
            link = newsitem.absolute_links
            newsarticle = {'title': title, 'link': link}
            newslist.append(newsarticle)
        except:
            pass
    return newslist

# Funciones getLinks y getNewsDetails van aquí...

@app.get("/get-all-news-data/")
async def get_all_news_data(query: str):
    # Convertir query y obtener resultados de búsqueda
    news_list = await googleSearchNews(query)
    
    # Obtener los enlaces de las noticias
    links = getLinks(news_list)
    
    # Obtener los detalles de las noticias
    details = getNewsDetails(links[:15], listNoconf, listConf)  # Aquí puedes ajustar la cantidad de enlaces a procesar

    return {
        "details": details,
        "news_list": news_list[:15],
        "links": links[:15]
    }