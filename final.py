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

# Función para obtener detalles de las noticias
def getNewsDetails(links):
    classifier = pipeline('sentiment-analysis', model="nlptown/bert-base-multilingual-uncased-sentiment")
    details = []
    for link in links:  
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
            detail.append(result[0]['label'])
            result = classifier(article.title)
            detail.append(result[0]['label'])
            result = classifier(article.text[:500])
            detail.append(result[0]['label'])
            details.append(detail)
        except:
            pass
    return details

# Función para buscar noticias
async def googleSearchNews(query: str):
    session = AsyncHTMLSession()
    query = query.replace("_", " ")  # Reemplazar '_' por ' '
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
    details = getNewsDetails(links[:10])  # Aquí puedes ajustar la cantidad de enlaces a procesar

    return {
        "news_list": news_list[:10],
        "links": links[:10],
        "details": details
    }

