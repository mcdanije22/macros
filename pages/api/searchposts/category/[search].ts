import { model } from 'mongoose'

const FoodPostModel = model('foodPost')

const searchFoodPostsByCategory = async (req, res) => {
  const {
    query: { search },
  } = req
  switch (search) {
    case 'low calories':
      const caloriesResult = await FoodPostModel.find({
        'macros.calories': {
          $lt: 500,
        },
      })
      res.send(caloriesResult)
      break
    case 'high protein':
      const proteinResult = await FoodPostModel.find({
        'macros.protein': {
          $gt: 30,
        },
      })
      res.send(proteinResult)
      break
    case 'low carbohydrate':
      const carbResult = await FoodPostModel.find({
        'macros.carbohydrates': {
          $lt: 20,
        },
      })
      res.send(carbResult)
      break
    case 'low fat':
      const fatResult = await FoodPostModel.find({
        'macros.fat': {
          $lt: 5,
        },
      })
      res.send(fatResult)
      break
    default:
      break
  }
}

export default searchFoodPostsByCategory
