import React, { useState, useEffect, useRef, useContext } from 'react'
import Layout from '../components/Layout'
import axios, { AxiosResponse } from 'axios'
import { UserContext } from '../components/userContext'
import { Modal, Button, Icon } from 'antd'
import Router from 'next/router'
import { useRouter } from 'next/router'

interface Post {
  title: String
  tags: Array<String>
  summary: String
  ingredients: Array<Object>
  directions: Array<String>
  macros: {
    calories: number
    protein: number
    carbohydrates: number
    fat: number
  }
}

interface ingredientItem {
  fdcId: number
  description: String
  brandOwner: String
  labelNutrients: {
    fat: {
      value: number
    }
    carbohydrates: {
      value: number
    }
    protein: {
      value: number
    }
    calories: {
      value: number
    }
  }
  servingSize: number
  servingSizeUnit: String
}

const CreatePost: React.FC = () => {
  const { user, isUserLoggedIn } = useContext(UserContext)
  const router = useRouter()
  useEffect(() => {
    if (!isUserLoggedIn) {
      router.push('/')
    }
  }, [])
  const tagInputRef = useRef<HTMLInputElement>()
  const ingredientInputRef = useRef<HTMLInputElement>()
  const directionInputRef = useRef<HTMLInputElement>()

  const [draftPost, setDraftPost] = useState<Post>({
    title: '',
    tags: [],
    summary: '',
    ingredients: [],
    directions: [],
    macros: {
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fat: 0,
    },
  })
  const [modalStatus, toggleModal] = useState<boolean>(false)

  const [tempTagValue, setTempTag] = useState<String>('')
  const [tempIngredientValue, setTempIngredient] = useState<String>('')
  const [tempDirectionValue, setTempDirection] = useState<String>('')
  const [searchFoodList, setFoodList] = useState<ingredientItem[]>([])
  const apiKey = process.env.NUTRITION_API_KEY

  const toggle = () => {
    toggleModal(modalStatus ? false : true)
    ingredientInputRef.current.value = ''
    setTempIngredient('')
  }

  const handleInputChange = e => {
    const name = e.target.name
    setDraftPost({
      ...draftPost,
      [name]: e.target.value,
    })
  }

  //logic for handling tags list
  const handleTempTagValue = e => {
    const value = e.target.value
    setTempTag(value)
  }

  const addTagValue = () => {
    const orgArray = draftPost.tags
    const newArray = [...orgArray, tempTagValue]
    setDraftPost({
      ...draftPost,
      tags: newArray,
    })
    tagInputRef.current.value = ''
    setTempTag('')
  }

  //logic for handling directions list
  const handleTempDirectionsValue = e => {
    const value = e.target.value
    setTempDirection(value)
  }

  const addDirectionsValue = () => {
    const orgArray = draftPost.directions
    const newArray = [...orgArray, tempDirectionValue]
    setDraftPost({
      ...draftPost,
      directions: newArray,
    })
    directionInputRef.current.value = ''
    setTempDirection('')
  }

  //logic for handling Ingredients list
  const handleTempIngredientValue = e => {
    const value = e.target.value
    setTempIngredient(value)
  }

  const addFoodToIngredientList = ingredient => {
    const orgArray = draftPost.ingredients
    orgArray.push(ingredient)
    setDraftPost({
      ...draftPost,
      ingredients: orgArray,
    })
    updateMacroStats(ingredient)
    toggle()
  }

  const updateMacroStats = ingredient => {
    const carbohydrates =
      Math.round(ingredient.labelNutrients.carbohydrates.value) +
      draftPost.macros.carbohydrates
    const protein =
      Math.round(ingredient.labelNutrients.protein.value) +
      draftPost.macros.protein
    const fat =
      Math.round(ingredient.labelNutrients.fat.value) + draftPost.macros.fat
    const calories =
      Math.round(ingredient.labelNutrients.calories.value) +
      draftPost.macros.calories
    setDraftPost({
      ...draftPost,
      macros: {
        calories,
        protein,
        carbohydrates,
        fat,
      },
    })
  }
  const fetchFoodSearch = async () => {
    let foodOptions = []
    const search = tempIngredientValue
    const searchList = await axios.get(
      `https://api.nal.usda.gov/fdc/v1/search?api_key=${apiKey}&generalSearchInput=${search}`
    )
    searchList.data.foods.forEach(async el => {
      const food: any = await axios.get(
        `https://api.nal.usda.gov/fdc/v1/${el.fdcId}/?api_key=${apiKey}`
      )
      //only add item to list if it has nutrients listed
      if (typeof food.data.labelNutrients !== 'undefined') {
        foodOptions = [...foodOptions, food.data]
        setFoodList(foodOptions)
      }
    })
    ingredientInputRef.current.value = ''
    toggle()
  }
  const submitPost = () => {
    const url = 'http://localhost:5000'
    const user = '5e48ec58b2be6e0d4acb388e'
    axios
      .post(`${url}/foodposts/${user}/addpost`, draftPost)
      .then(res => console.log(res))
    Router.push('/home')
    clearDraft()
  }
  const clearDraft = () => {
    setDraftPost({
      title: '',
      tags: [],
      summary: '',
      ingredients: [],
      directions: [],
      macros: {
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0,
      },
    })
    tagInputRef.current.value = ''
    ingredientInputRef.current.value = ''
    directionInputRef.current.value = ''
  }
  console.log(draftPost)
  return (
    <Layout title="New Post">
      <Modal
        title="Search Ingredients"
        visible={modalStatus}
        footer={null}
        onCancel={toggle}
      >
        {searchFoodList.slice(0, 5).map((ingredient, i) => {
          const carbohydrates = Math.round(
            ingredient.labelNutrients.carbohydrates.value
          )
          const protein = Math.round(ingredient.labelNutrients.protein.value)
          const fat = Math.round(ingredient.labelNutrients.fat.value)
          const calories = Math.round(ingredient.labelNutrients.calories.value)
          return (
            <li key={i} className="modalFood">
              <div className="topInfo">
                <div className="leftInfo">
                  <h3>
                    <b>{ingredient.description}</b>
                  </h3>
                  <p>{ingredient.brandOwner}</p>
                  <p>
                    Serving size: {ingredient.servingSize}
                    {ingredient.servingSizeUnit}
                  </p>
                </div>
                <div className="rightInfo">
                  <Button
                    type="primary"
                    onClick={() => addFoodToIngredientList(ingredient)}
                  >
                    Add
                  </Button>
                </div>
              </div>
              <div className="macroInfo">
                <p>
                  Calories: {calories} | Protein: {protein} | Carbs:{' '}
                  {carbohydrates} | Fats: {fat}
                </p>
              </div>
            </li>
          )
        })}
      </Modal>
      <div id="createPage">
        <div id="topInfo">
          <Icon
            type="left"
            style={{ alignSelf: 'center', marginRight: '.2rem' }}
          />{' '}
          <h3 onClick={() => Router.back()}>Go back</h3>
        </div>
        <h1>Create New Post</h1>
        <form className="newPost">
          <label>Title</label>
          <input type="text" name="title" onChange={handleInputChange} />
          <label>Cover Photo</label>
          <div className="imageUpload">
            <button type="button">Upload</button>
          </div>
          <label>Tags</label>
          {draftPost.tags.map((tag, i) => {
            return (
              <p key={i} className="tagList">
                #{tag}
              </p>
            )
          })}
          <input
            type="text"
            name="tags"
            onChange={handleTempTagValue}
            ref={tagInputRef}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                addTagValue()
              }
            }}
          />
          <h4 onClick={addTagValue}>+ Add tag</h4>
          <label>Summary</label>
          <textarea name="summary" onChange={handleInputChange} />
          <label>Ingredients</label>
          {draftPost.ingredients.map((ingredient: ingredientItem, i) => {
            return (
              <li className="tempIngredientsList" key={i}>
                <h2>{ingredient.description}</h2>
                <p>
                  {ingredient.brandOwner}, {ingredient.servingSize}
                  {ingredient.servingSizeUnit}
                </p>
              </li>
            )
          })}
          <input
            type="text"
            name="ingredient"
            ref={ingredientInputRef}
            onChange={handleTempIngredientValue}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                fetchFoodSearch()
              }
            }}
          />
          <h4 onClick={fetchFoodSearch}>+ Search new ingredient</h4>

          <label>Directions</label>
          {draftPost.directions.map((direction, i) => {
            return (
              <li className="tempList" key={i}>
                <h1>{i + 1}.</h1>
                <p>{direction}</p>
              </li>
            )
          })}
          <input
            type="text"
            name="direction"
            ref={directionInputRef}
            onChange={handleTempDirectionsValue}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                addDirectionsValue()
              }
            }}
          />
          <h4 onClick={addDirectionsValue}>+ Add direction</h4>
          <h2>
            {draftPost.macros.calories} Calories {draftPost.macros.protein}P{' '}
            {draftPost.macros.carbohydrates}C {draftPost.macros.fat}F
          </h2>
          <hr />
          <div id="formButtons">
            <button type="button" id="submitButton" onClick={submitPost}>
              Save
            </button>
            <button type="button" id="cancelButton" onClick={clearDraft}>
              Delete
            </button>
          </div>
        </form>
      </div>
      <style jsx>{`
        #topInfo {
          display: flex;
          color: #707070;
        }
        #topInfo h3 {
          margin: 0;
        }
        .newPost {
          display: flex;
          flex-direction: column;
        }
        .imageUpload button {
          border: 1px #4086e7 solid;
          background-color: transparent;
          color: #4086e7;
          padding: 0.2rem 1.5rem;
          border-radius: 0.5rem;
        }
        h1 {
          margin-bottom: 1rem;
        }
        input {
          border: 1px #707070 solid;
          padding: 0 0.7rem;
          height: 40px;
          border-radius: 0.3rem;
          font-size: 1.2rem;
        }
        .tagList {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }
        textarea {
          border: 1px #707070 solid;
          height: 150px;
          font-size: 1.2rem;
          border-radius: 0.3rem;
        }
        label {
          margin: 1rem 0;
          font-size: 1.5rem;
        }
        h2 {
          margin: 2rem 0;
        }
        hr {
          margin: 2rem 0;
        }
        #formOptions {
          display: flex;
        }
        #formButtons {
          display: flex;
          justify-content: space-between;
        }
        #formButtons button {
          font-size: 1.5rem;
          width: 8rem;
        }
        #submitButton {
          border: 1px #4086e7 solid;
          background-color: transparent;
          color: #4086e7;
          padding: 0.2rem 1.5rem;
          border-radius: 0.5rem;
        }
        #cancelButton {
          border: none;
          background-color: transparent;
        }
        h4 {
          color: #4e93e9;
        }
        p {
          margin-bottom: 0.5rem;
        }
        .tempList {
          list-style: none;
          display: flex;
          margin-bottom: 0.5rem;
        }
        .tempList h1 {
          margin: 0;
        }
        .tempIngredientsList {
          list-style: none;
          margin-bottom: 0.5rem;
        }
        .tempIngredientsList h2 {
          margin: 0;
          font-size: 1.3rem;
        }
        .tempIngredientsList p {
          font-size: 1rem;
        }
        .tempList p {
          align-self: center;
          margin-left: 0.5rem;
          font-size: 1.2rem;
        }
        .modalFood {
          margin: 0.5rem 0;
          border: 1px solid #e7e7e9;
          padding: 1rem;
          border-radius: 4px;
          box-shadow: 0 2px 14px #aaaaaa;
          min-height: 6rem;
        }
        .topInfo {
          display: flex;
          justify-content: space-between;
        }
        .modalFood .rightInfo {
          align-self: center;
        }

        .modalFood h3,
        p {
          margin: 0;
        }
      `}</style>
    </Layout>
  )
}

export default CreatePost
