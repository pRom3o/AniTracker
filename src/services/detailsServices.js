import { ref } from 'vue'

export const animeDetails = ref({
  title: '',
  banner: '',
  poster: '',
  synopsis: '',
  title_english: '',
  title_japanese: '',
  type: '',
  episodes: 0,
  status: '',
  duration: '',
  aired: '',
  season: '',
  studios: '',
  themes: [],
  demographics: [],
  genres: [],
})

export const fetchAnimeDetails = async (id) => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`)
    if (!response.ok) throw new Error()

    const data = await response.json()

    animeDetails.value = data.data
    animeDetails.value.title = data.data.title
    animeDetails.value.poster = data.data.images.jpg.image_url
    animeDetails.value.synopsis = data.data.synopsis
    animeDetails.value.title_english = data.data.title_english
    animeDetails.value.title_japanese = data.data.title_japanese
    animeDetails.value.type = data.data.type
    animeDetails.value.episodes = data.data.episodes
    animeDetails.value.status = data.data.status
    animeDetails.value.duration = data.data.duration
    animeDetails.value.aired = data.data.aired.string
    animeDetails.value.season = data.data.season
    animeDetails.value.studios = data.data.studios.map((s) => s.name)
    animeDetails.value.demographics = data.data.demographics.map((d) => d.name)
    animeDetails.value.themes = data.data.themes.map((t) => t.name)
    animeDetails.value.genres = data.data.genres
    console.log('anime details: ', animeDetails.value)
  } catch (error) {
    console.log('error: ', error.message)
  }
}

export const fetchAniListBanner = async (mal_id) => {
  const query = `
    query ($idMal: Int) {
      Media(idMal: $idMal, type: ANIME) {
        bannerImage
      }
    }
  `

  const variables = { idMal: mal_id }

  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  })

  const { data } = await response.json()
  return data.Media.bannerImage
}

export const recommendations = ref([])
export const recommendationsById = async (id) => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`)
    if (!response.ok) throw new Error()

    const data = await response.json()
    recommendations.value = data.data.slice(0, 20)
  } catch (error) {
    console.log('error: ', error.message)
  }
}
