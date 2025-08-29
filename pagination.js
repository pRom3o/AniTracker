// PAGINATION

// const recommendations = ref([])
// const currentPage = ref(1)
// const perPage = ref(4)
// // const queryType = 'upcoming'

// const getRecommendations = async () => {
//   try {
//     const response = await fetch('https://api.jikan.moe/v4/recommendations/anime')
//     if (!response.ok) throw new Error('Unsuccessful fetch')

//     const data = await response.json()
//     // flatten entries into a single array
//     recommendations.value = data.data.flatMap((rec) => rec.entry)
//     console.log(recommendations.value)
//   } catch (error) {
//     console.error('Error fetching recommendations:', error.message)
//   }
// }

// const isSmallScreen = ref(false)
// // const isSmallmid = ref(false)

// const paginatedRecommendations = computed(() => {
//   const start = (currentPage.value - 1) * perPage.value
//   return recommendations.value.slice(start, start + perPage.value)
// })

// const totalPages = computed(() => Math.ceil(recommendations.value.length / perPage.value))

// const updatePerPage = () => {
//   if (window.innerWidth < 740) {
//     // mobile
//     perPage.value = 1
//     isSmallScreen.value = true
//   } else {
//     perPage.value = 4
//     isSmallScreen.value = false
//   }
// }

// onMounted(() => {
//   updatePerPage()
//   window.addEventListener('resize', updatePerPage)
// })

// onUnmounted(() => {
//   window.removeEventListener('resize', updatePerPage)
// })

// onMounted(() => {
//   getRecommendations()
//   console.log('paginated: ', paginatedRecommendations.value)
// })
