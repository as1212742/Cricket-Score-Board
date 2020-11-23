const API_KEY = 'UEEIhMOVeCeH2tBYNMLqTRGROdV2'

export const getMatches = () => {
  const url = `https://cricapi.com/api/matches/?apikey=${API_KEY}`

  return fetch(url)
    .then((response) =>response.json())
    .catch((err) => console.log(err))
}

export const getScore = (id) =>{
  const url = `https://cricapi.com/api/cricketScore?apikey=${API_KEY}&&unique_id=${id}`

  return fetch(url)
    .then((response) =>response.json())
    .catch((err) => console.log(err))
}