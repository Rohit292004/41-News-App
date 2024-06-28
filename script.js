const API_KEY = "ae64fa78b75845159a674bd1289ae050";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews ("India") );

function reload()
{
    window.location.reload();
}

//lastly added
window.addEventListener("load", () => {
    fetchNews("India");
    const searchInput = document.getElementById("search-text");

    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent the default form submission behavior
            const query = searchInput.value.trim();
            if (query) {
                fetchNews(query);
                curSelectedNav?.classList.remove("active");
                curSelectedNav = null;
            }
        }
    });

    const searchButton = document.getElementById("search-button");
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) {
            fetchNews(query);
            curSelectedNav?.classList.remove("active");
            curSelectedNav = null;
        }
    });
});

//lastly added till here

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card")

    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true); //deep clone

        fillDataInCard(cardClone,  article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    // newsSource.innerHTML = article.source;
    newsDesc.innerHTML = article.description;


    const date = new Date(article.publishedAt).toLocaleString("en-us", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} • ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;


function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav ?.classList.remove('active') ; //null nahi to hi remove karna hai
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}



const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");
 
searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});