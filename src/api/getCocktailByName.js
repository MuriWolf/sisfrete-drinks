import axios from 'axios'

export default async function getCocktailByName(name) {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1'

  try {
    const response = await axios.get(`${URL}/search.php?s=${name}`)
    return response.data
  } catch (error) {
    return error
  }
}
