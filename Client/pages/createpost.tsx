import React, { useState, useEffect, useRef, useContext } from 'react'
import Layout from '../components/Layout'
import axios, { AxiosResponse } from 'axios'
import { UserContext } from '../components/userContext'
import { Modal, Button, Icon, message, Checkbox, Pagination } from 'antd'
import Router from 'next/router'
import { useRouter } from 'next/router'
import firebase from 'firebase'
import firebaseConfig from '../firebase/firebase'
import { start } from 'repl'

firebase.initializeApp(firebaseConfig)

interface Post {
  title: String
  tags: Array<String>
  summary: String
  ingredients: Array<Object>
  directions: Array<String>
  foodPhoto: any
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
  const apiKey = process.env.NUTRITION_API_KEY
  const url = 'http://localhost:5000'
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
  const fileRef = useRef<HTMLInputElement>()

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
    foodPhoto: null,
  })
  const [modalStatus, toggleModal] = useState<boolean>(false)

  const [tempTagValue, setTempTag] = useState<String>('')
  const [tempIngredientValue, setTempIngredient] = useState<String>('')
  const [tempDirectionValue, setTempDirection] = useState<String>('')
  const [searchFoodList, setFoodList] = useState<ingredientItem[]>([])
  const [image, setImage] = useState(null)
  const [fileImageUrl, setFileImageUrl] = useState(null)
  const [isImageLoading, setImageLoading] = useState<Boolean>(false)
  const [boxChecked, setCheckBox] = useState<Boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)

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
    if (tempTagValue === '') {
      message.error('Type in a tag')
    } else {
      const orgArray = draftPost.tags
      const newArray = [...orgArray, tempTagValue]
      setDraftPost({
        ...draftPost,
        tags: newArray,
      })
      tagInputRef.current.value = ''
      setTempTag('')
    }
  }

  //logic for handling directions list
  const handleTempDirectionsValue = e => {
    const value = e.target.value
    setTempDirection(value)
  }

  const addDirectionsValue = () => {
    if (tempDirectionValue === '') {
      message.error('Type in a direction')
    } else {
      const orgArray = draftPost.directions
      const newArray = [...orgArray, tempDirectionValue]
      setDraftPost({
        ...draftPost,
        directions: newArray,
      })
      directionInputRef.current.value = ''
      setTempDirection('')
    }
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

    //reset state list so if nothing is returned it clears last results
    setFoodList([])
    if (search === '') {
      message.error('Enter a food to search for')
    } else {
      const searchList = await axios.get(
        `https://api.nal.usda.gov/fdc/v1/search?api_key=${apiKey}&generalSearchInput=${search}`
      )
      console.log(searchList)
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
  }
  const submitPost = async () => {
    if (
      draftPost.title === '' ||
      draftPost.summary === '' ||
      draftPost.ingredients.length === 0 ||
      draftPost.directions.length === 0 ||
      draftPost.title === ''
    ) {
      message.error('Please fill in all fields')
    } else if (image !== null && draftPost.foodPhoto === null) {
      message.error('Please upload photo')
    } else {
      const loggedInUser = await user._id
      try {
        const post = await axios.post(
          `${url}/foodposts/${loggedInUser}/addpost`,
          draftPost
        )
        message.success('Posted!')
        router.push(`/newsfeed/[id]`, `/newsfeed/${user._id}`)
        clearDraft()
      } catch (error) {
        console.log(error)
        return message.error('Missing info')
      }
    }
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
      foodPhoto: null,
    })
    tagInputRef.current.value = ''
    ingredientInputRef.current.value = ''
    directionInputRef.current.value = ''
  }

  const getImageFile = async e => {
    const file = await e.target.files[0]
    const reader = new FileReader()
    const url = reader.readAsDataURL(file)
    reader.onloadend = e => {
      setFileImageUrl(reader.result)
    }
    setImage(file)
    setCheckBox(false)
  }

  const uploadImg = () => {
    if (image !== null || draftPost.foodPhoto) {
      setImageLoading(true)
      const uploadTask = firebase
        .storage()
        .ref(`images/${image.name}`)
        .put(image)
      uploadTask.on(
        'state_changed',
        snapshot => {},
        error => {
          console.log(error)
        },
        () => {
          firebase
            .storage()
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              setDraftPost({
                ...draftPost,
                foodPhoto: url,
              })
              setImageLoading(false)
              message.success('Image Added')
              fileRef.current.value = ''
            })
        }
      )
    }
  }
  const checkBoxOnChange = e => {
    if (e.target.checked) {
      setDraftPost({
        ...draftPost,
        foodPhoto: 'https://via.placeholder.com/400',
      })
      setCheckBox(true)
      setFileImageUrl(null)
    } else {
      setDraftPost({
        ...draftPost,
        foodPhoto: null,
      })
    }
    fileRef.current.value = ''
  }
  const test = page => {
    console.log(page)
    setCurrentPage(page)
  }

  return (
    <Layout title="New Post">
      <Modal
        title="Search Ingredients"
        visible={modalStatus}
        footer={null}
        onCancel={toggle}
      >
        {/* {searchFoodList.slice(0, 4).map((ingredient, i) => { */}
        {searchFoodList
          .slice((currentPage - 1) * 4, currentPage * 4)
          .map((ingredient, i) => {
            console.log(ingredient)
            const carbohydrates = Math.round(
              ingredient.labelNutrients.carbohydrates.value
            )
            const protein = Math.round(ingredient.labelNutrients.protein.value)
            const fat = Math.round(ingredient.labelNutrients.fat.value)
            const calories = Math.round(
              ingredient.labelNutrients.calories.value
            )
            // const carbohydrates =
            //   ingredient.labelNutrients.carbohydrates.value || 0
            // const protein = ingredient.labelNutrients.protein.value || 0
            // const fat = ingredient.labelNutrients.fat.value || 0
            // const calories = ingredient.labelNutrients.calories.value || 0

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
        <Pagination
          current={currentPage}
          total={searchFoodList.length}
          onChange={test}
          style={{ marginTop: '1rem' }}
        />
      </Modal>
      <div id="createPage">
        <div id="topInfo">
          <Icon
            type="left"
            style={{ alignSelf: 'center', marginRight: '.2rem' }}
          />
          <h3 onClick={() => Router.back()}>Go back</h3>
        </div>
        <h1>Create New Post</h1>
        <form className="newPost">
          <label>Title</label>
          <input type="text" name="title" onChange={handleInputChange} />
          <label>Cover Photo</label>
          <div className="imageUpload">
            <img src={fileImageUrl || draftPost.foodPhoto} />
            <input
              type="file"
              name="file"
              ref={fileRef}
              style={{
                display:
                  image !== null && draftPost.foodPhoto !== null ? 'none' : '',
              }}
              onChange={getImageFile}
            ></input>
            {isImageLoading ? (
              <h1>Uploading...</h1>
            ) : (
              <button
                type="button"
                style={{
                  display:
                    image === null || draftPost.foodPhoto !== null
                      ? 'none'
                      : '',
                }}
                onClick={uploadImg}
              >
                Upload
              </button>
            )}
            <Checkbox onChange={checkBoxOnChange}>Use default image</Checkbox>
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
        .imageUpload img {
          width: 100%;
          margin-bottom: 1.5rem;
        }
        .imageUpload {
          display: flex;
          flex-direction: column;
        }
        .imageUpload button {
          border: 1px #4086e7 solid;
          background-color: transparent;
          color: #4086e7;
          padding: 0.2rem 1.5rem;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .imageUpload input {
          margin-bottom: 1.5rem;
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
