const API_URL = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch="

class wikiApi {
  async getData (searchInput) {
    const response = await fetch(API_URL + searchInput)
    return await response.json()
  }
}

export default new wikiApi()
