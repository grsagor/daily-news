const loadCategory = () =>{
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error))
}


const displayCategories = categories => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category =>{
        //console.log(category.category_id);
        const categoryName = category.category_name;
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="loadNews('${category.category_id}')">${categoryName}</button>
        `
        categoryContainer.appendChild(div);
    })
}

const loadNews = (id) => {
    //console.log(id);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
}

const displayNews = newses => {


    const numberOfNewses = document.getElementById('number-of-news');
    numberOfNewses.innerHTML = ``;
    const showNumber = document.createElement('div');
    showNumber.innerHTML = `
    <h3>${newses.length} newses found</h3>
    `;
    numberOfNewses.appendChild(showNumber);

    //console.log(newses.length);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML =  ``;
    newses.forEach(news => {
        const viewNumber = news.total_view;
        //const viewString = viewNumber.toString();
        //console.log(viewString);
        const div = document.createElement('div');
        div.setAttribute('id',`dv_${news.total_view}`);
        div.classList.add('sorting');
        div.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
            <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.details.slice(0,300)}...</p>
                    <div class="d-flex justify-content-between">
                    <div>${news.author.name}</div>
                    <div>${news.total_view}</div>
                    <div><i class="fa-solid fa-arrow-right"></i></div>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(div);
    })
    var main = document.getElementById( 'news-container' );

    [].map.call( main.children, Object ).sort( function ( a, b ) {
        return +b.id.match( /\d+/ ) - +a.id.match( /\d+/ );
    }).forEach( function ( elem ) {
        main.appendChild( elem );
    });  
}


loadCategory();