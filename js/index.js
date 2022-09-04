const loadCategory = () =>{
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error))
}


const displayCategories = categories => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category =>{
        const categoryName = category.category_name;
        const div = document.createElement('div');
        div.innerHTML = `
        <button class="bg-warning rounded border border-0 m-1 p-2 fw-semibold" onclick="loadNews('${category.category_id}')">${categoryName}</button>
        `
        categoryContainer.appendChild(div);
    })
}

const loadNews = (id) => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(error => console.log(error))
}

const displayNews = newses => {
    const numberOfNewses = document.getElementById('number-of-news');
    numberOfNewses.innerHTML = ``;
    const showNumber = document.createElement('div');
    showNumber.innerHTML = `
    <h3 class="my-5 bg-warning rounded p-3">${newses.length ? `${newses.length} news found.` : `No news availabe.`}</h3>
    `;
    numberOfNewses.appendChild(showNumber);

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML =  ``;
    newses.forEach(news => {
        const div = document.createElement('div');
        div.setAttribute('id',`dv_${news.total_view}`);
        div.classList.add('sorting');
        div.innerHTML = `
        <div class="row g-0 bg-warning mt-5 p-4 rounded">
            <div class="col-md-3">
            <img src="${news.thumbnail_url}" class="img-thumbnail" alt="...">
            </div>
            <div class="col-md-9 d-flex justify-content-center align-items-center">
                <div class="card-body">
                    <h5 class="card-title my-3">${news.title}</h5>
                    <p class="card-text">${news.details.slice(0,500)}...</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div><img style="height: 30px" class="rounded-circle" src="${news.author.img}"> <span class="fw-bold">${news.author.name ? `${news.author.name}` : `Not Available`}</span></div>
                        <div><span class="fw-bold"><i class="fa-solid fa-eye"></i> ${news.total_view ? `${news.total_view}` : `No Views Yet`}</span></div>
                        <div><button class="border border-0 btn btn-dark text-warning fw-semibold p-2" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadModal('${news._id}')">See Details</button></div>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(div);
    })
    toggleSpinner(false);
    var main = document.getElementById( 'news-container' );

    [].map.call( main.children, Object ).sort( function ( a, b ) {
        return +b.id.match( /\d+/ ) - +a.id.match( /\d+/ );
    }).forEach( function ( elem ) {
        main.appendChild( elem );
    });  
}

const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading === true){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

const loadModal = id => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayModal(data.data[0]))
        .catch(error => console.log(error))
}

const displayModal = data =>{
    const newsTitle = document.getElementById('news-title');
    newsTitle.innerText = data.title;

    const authorImage = document.getElementById('author-img');
    authorImage.innerHTML = `<img class="img-fluid" src="${data.image_url}" alt="">`

    const authorName = document.getElementById('author-name');
    authorName.innerText = data.author.name ? data.author.name : 'Author name not available';

    const newsDetail = document.getElementById('news-details');
    newsDetail.innerText = data.details;

    const totalView = document.getElementById('total-view');
    totalView.innerText = data.total_view ? data.total_view : 'No views yet';
}

loadCategory();