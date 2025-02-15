const accessKey = "hpMnMrZxA69RiAULxhPLz7DOQeI76v7-7Yygl1bqi9s";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

// 🎉 कंफेटी सेटअप
const confettiCanvas = document.getElementById("confetti-canvas");
const ctx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

function startConfetti() {
    let confetti = [];
    const colors = ["#ff0", "#f00", "#0f0", "#00f", "#ff7f00", "#9400d3"];

    for (let i = 0; i < 100; i++) {
        confetti.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 8 + 2,
            dx: Math.random() * 4 - 2,
            dy: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
        });
    }

    function draw() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confetti.forEach((c) => {
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
            ctx.fillStyle = c.color;
            ctx.fill();
            c.x += c.dx;
            c.y += c.dy;
        });

        requestAnimationFrame(draw);
    }

    draw();

    setTimeout(() => {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }, 3000);
}

// 🔍 इमेज सर्च करने का फंक्शन
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

        const downloadBtn = document.createElement("button");
        downloadBtn.innerText = "Download";
        downloadBtn.classList.add("download-btn");

        downloadBtn.addEventListener("click", async () => {
            const imageUrl = image.urls.full;
            const imageResponse = await fetch(imageUrl);
            const imageBlob = await imageResponse.blob();
            const imageURL = URL.createObjectURL(imageBlob);

            const a = document.createElement("a");
            a.href = imageURL;
            a.download = "image.jpg";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            startConfetti();
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
