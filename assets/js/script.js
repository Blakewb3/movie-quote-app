var search = document.getElementById("search")
search.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      makeSearch()}});
var go = document.getElementById("go");
go.addEventListener("click", makeSearch);
var p = document.getElementsByTagName('p');
var style = document.getElementById('style');
var header = document.getElementById('header');
var results = document.getElementById('results');
var count = 0;

function makeSearch(event) {
    count ++;
    var quoteSearch = search.value.replace(/ /g, "_")
    if (count === 1) {
        console.log(style.outerHTML);
        console.log("hi");
        style.outerHTML = ('<link id="style" rel="stylesheet" href="./assets/css/style2.css">');
        header.classList.add("header2");
        results.classList.remove('hide');
    }
    
    localStorage.setItem(count , search.value);

    var quoteNumber = localStorage.length;
    var footer = document.getElementById("footer");
    footer.textContent = (quoteNumber + " movies quoted");
	for (let i = 0; i < p.length; i++) {
		const element = p[i];
		element.textContent = ''
		
	}
    const url = ('https://movie-and-tv-shows-quotes.p.rapidapi.com/quotes/from/' + quoteSearch);
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a6814aeb8fmsh277ac29f029a284p12139djsnfda8f4f8b5d5',
            'X-RapidAPI-Host': 'movie-and-tv-shows-quotes.p.rapidapi.com'
        }
    };

    var img = document.getElementById("img");
    var h2 = document.getElementById("h2");
    var quote = document.getElementById("quote");

    fetch(url, options).then(function (res) {
        return res.json();
    }).then(function (data) {
        console.log(data)
        if (data == "No quotes exists for given show!") {
			var p = document.createElement("p");
            quote.appendChild(p);
            p.textContent = "no quote for this movie"
		} else {
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                var p = document.createElement("p");
                quote.appendChild(p);
                p.textContent = element.quote + "  ~" + element.character;
            }
        }
    })
   
    const posterurl = 'http://www.omdbapi.com/?t=' + search.value + '&apikey=b084d09a'


    fetch(posterurl).then(function (res) {
        return res.json();
    }).then(function (data) {
        console.log(data);
        img.src = data.Poster
        h2.textContent = data.Title

    })
}
