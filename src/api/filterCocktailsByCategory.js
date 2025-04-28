import axios from 'axios'

export default async function filterCocktailsByCategory(category) {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1'

  try {
    const response = await axios.get(`${URL}/filter.php?c=${category}`)
    return response.data.drinks
  } catch (error) {
    return error
  }
}
