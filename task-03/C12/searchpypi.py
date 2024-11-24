#! python3
# searchpypi.py - Opens several search results on PyPI.

import requests, sys, webbrowser, bs4

# Display a message to indicate that the search is in progress.
print('Searching...')

# Construct the search URL using the command-line arguments.
search_url = 'https://www.amazon.in/s?k=' + '+'.join(sys.argv[1:])
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
}
res = requests.get(search_url, headers=headers)


# Download the search results page.

res.raise_for_status()  # Raise an error if the request failed.

# Parse the downloaded page using BeautifulSoup.
soup = bs4.BeautifulSoup(res.text, 'html.parser')

# Retrieve top search result links with the 'package-snippet' class.
linkElems = soup.select('a.a-link-normal.s-no-outline')

# Open a browser tab for each result, up to a maximum of 5.
numOpen = min(5, len(linkElems))
for i in range(numOpen):
    urlToOpen = 'https://www.amazon.in' + linkElems[i].get('href')
    print('Opening', urlToOpen)
    webbrowser.open(urlToOpen)
