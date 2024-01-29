// Replace with your Instagram Access Token
const accessToken = 'IGQWRNbC1fNkN6RDUyQjZAGV2Eyc0M5SUxoUzYwd25oRHY3SGUxd1p1aUx3U1FUb21JNnRsR1Q3d3hMM0ExTElKOFpGT3hYMGlLUjMxTGI3dXVDTm5oQkRLdWtUeFZARY3liM2JRYmRKTGllVWJwNHVwaUs5U2JxN2MZD';

// Array to store Instagram posts
let instagramPosts = [];

// Function to fetch Instagram posts and store in the array
function getInstagramFeed() {
    fetch(`https://graph.instagram.com/v12.0/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`)
        .then(response => response.json())
        .then(data => {
            instagramPosts = data.data;
            displayCarousel();
        })
        .catch(error => console.error(error));
}

// Function to dynamically generate the carousel HTML
function displayCarousel() {
    const carouselContainer = document.getElementById('demo');
    const indicatorsContainer = carouselContainer.querySelector('.carousel-indicators');
    const carouselInner = carouselContainer.querySelector('.carousel-inner');

    // Clear existing indicators and carousel items
    indicatorsContainer.innerHTML = '';
    carouselInner.innerHTML = '';

    // Iterate through Instagram posts and create carousel items
    instagramPosts.forEach((post, index) => {
        indicatorsContainer.innerHTML += `<button type="button" data-bs-target="#demo" data-bs-slide-to="${index}"${index === 0 ? ' class="active"' : ''}></button>`;

        carouselInner.innerHTML += `
        <div class="carousel-item${index === 0 ? ' active' : ''}">
            <a href="${post.permalink}" target="_blank">
            <img src="${post.media_url}" alt="${post.caption}" class="img-fluid custom-max-height">
            </a>
        </div>
        `;
    });
}

// Call the function to fetch and display the Instagram feed
getInstagramFeed();
