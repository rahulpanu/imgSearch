const key = "87ThjcWOLwHagYuuMzyrZzN1hY3iSIeZ70o3mw77NG4";

const form = document.querySelector("form");
const input = document.querySelector("input");
const searchResult = document.querySelector(".search_results");
const showMore = document.querySelector(".show_more_btn");

let inputData = "";
let page = 1;

async function searchImage(){

    inputData = input.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${key}`;
    
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;
    console.log(results);

    if(page === 1){
        searchResult.innerHTML = "";
    }

    results.map((result) => {
        const imageWraper = document.createElement("div");
        imageWraper.classList.add("search_result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        image.target = "_blank";
        image.textContent = result.alt_description;
        imageLink.innerText = result.alt_description
        

        imageWraper.appendChild(image);
        imageWraper.appendChild(imageLink);
        searchResult.appendChild(imageWraper);        
    });

    page++
    if(page > 1){
        showMore.style.display = "block";
    }
};


form.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImage()
});

showMore.addEventListener("click", (e)=> {
    searchImage();
})