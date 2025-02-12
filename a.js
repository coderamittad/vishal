const accessKey = "hpMnMrZxA69RiAULxhPLz7DOQeI76v7-7Yygl1bqi9s";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchResult.innerHTML = "";
    }

    data.results.forEach((image) => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("image-container");

        const imgElement = document.createElement("img");
        imgElement.src = image.urls.small;
        imgElement.alt = image.alt_description;

        // Download Button
        const downloadBtn = document.createElement("button");
        downloadBtn.innerText = "Download";
        downloadBtn.classList.add("download-btn");

        // इमेज डाउनलोड करने का सही तरीका
        downloadBtn.addEventListener("click", async () => {
            const imageUrl = image.urls.full;
            const imageResponse = await fetch(imageUrl);
            const imageBlob = await imageResponse.blob();
            const imageURL = URL.createObjectURL(imageBlob);

            const a = document.createElement("a");
            a.href = imageURL;
            a.download = "image.jpg"; // JPG फॉर्मेट में सेव होगा
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });

        imgContainer.appendChild(imgElement);
        imgContainer.appendChild(downloadBtn);
        searchResult.appendChild(imgContainer);
    });

    showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
