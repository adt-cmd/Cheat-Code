async function fetchData() {
    const url = 'https://famous-quotes4.p.rapidapi.com/random?category=business&count=1';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f7c20d791amshfabbeb31dd518bcp13ffe2jsn27da540d92fd',
            'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        document.getElementById("text").innerHTML = result[0].text
    } catch (error) {
        console.error(error);
    }
}

fetchData();
