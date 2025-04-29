import axios from 'axios'

export default async function getCocktailsByFirstLetter(firstLetter) {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1'

  try {
    const response = await axios.get(`${URL}/search.php?f=${firstLetter}`)
    return response.data.drinks
  } catch (error) {
    return error
  }
}
