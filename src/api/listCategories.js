import axios from 'axios'

export default async function listCategories() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1'

  try {
    const response = await axios.get(`${URL}/list.php?c=list`)
    return response.data.drinks
  } catch (error) {
    return error
  }
}
