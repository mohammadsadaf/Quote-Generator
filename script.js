const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');



let apiQuotes = [];

// show Loading sign
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hides loading sign

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;

}



//Get new quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if the author is blank or not

    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        // Allows us to pass in a string that is then shown in that element
        authorText.textContent = quote.author;
    }
    // Check quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote")
    } else {
        quoteText.classList.remove("long-quote")
    }
    //Set quote, hide loader
    quoteText.textContent = quote.text;
    complete();

}



// Get quotes from API
async function getQuote() {
    loading();
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json ";

    //try allows you to test code and catch catches errors
    try {
        // fetchs data as response and turns it from to json objects.
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        console.log(apiQuotes);
        newQuote();

    } catch (Error) {
        //Catch errors here

    }
}

// tweet quote
function tweetQuote() {
    //Using tamplate quotation `` since it allows variable and parameters
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    // opens new window in a blank tab for twitter
    window.open(twitterUrl, '_blank');
}

// Add event listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On load
getQuote();

