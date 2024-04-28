require('dotenv').config();

const getJSON = async(req, res) => {
    try {
        const response = await fetch(`https://serpapi.com/search.json?api_key=${process.env.SERP_API_KEY}&engine=google_about_this_result&async=true&q=About+${site}`);
        if (response.status === 'Success') {
            const data = await response.json();
            console.log(data);
            return
        } else {
            console.error('Failed to scrape company:',
    }
    
}
