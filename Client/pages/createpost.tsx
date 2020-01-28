import React, { useState, useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import axios, { AxiosResponse } from 'axios'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'antd'

const CreatePost: React.FC = () => {
  interface Post {
    title: String
    tags: Array<String>
    summary: String
    ingredients: Array<String>
    directions: Array<String>
  }

  interface ingredientItem {
    fdcId: Number
    description: String
    brandOwner: String
  }
  const tagInputRef = useRef<HTMLInputElement>()
  const ingredientInputRef = useRef<HTMLInputElement>()
  const directionInputRef = useRef<HTMLInputElement>()

  const [draftPost, setDraftPost] = useState<Post>({
    title: '',
    tags: [],
    summary: '',
    ingredients: [],
    directions: [],
  })
  const [modalStatus, toggleModal] = useState<boolean>(false)

  const [tempTagValue, setTempTag] = useState<String>('')
  const [tempIngredientValue, setTempIngredient] = useState<String>('')
  const [tempDirectionValue, setTempDirection] = useState<String>('')
  const [searchFoodList, setFoodList] = useState<ingredientItem[]>([])

  const toggle = () => {
    toggleModal(modalStatus ? false : true)
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

  const addIngredientValue = () => {
    const orgArray = draftPost.ingredients
    const newArray = [...orgArray, tempIngredientValue]
    setDraftPost({
      ...draftPost,
      ingredients: newArray,
    })
    ingredientInputRef.current.value = ''
    setTempIngredient('')
  }

  const fetchFoodSearch = async () => {
    const apiKey = process.env.NUTRITION_API_KEY
    const search = tempIngredientValue
    const searchList = await axios.get(
      `https://api.nal.usda.gov/fdc/v1/search?api_key=${apiKey}&generalSearchInput=${search}`
    )
    setFoodList(searchList.data.foods)
    ingredientInputRef.current.value = ''
    toggle()
  }
  console.log(searchFoodList)
  return (
    <Layout title="New Post">
      <Modal title="Search Ingredients" visible={modalStatus}>
        {searchFoodList.map((ingredient, i) => {
          return (
            <li key={i}>
              <h5>{ingredient.description}</h5>
              <p>{ingredient.brandOwner}</p>
            </li>
          )
        })}
      </Modal>
      <div id="createPage">
        <div id="topInfo">
          <h3>Go back</h3>
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
            return <p key={i}>#{tag}</p>
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
          {draftPost.ingredients.map((ingredient, i) => {
            return (
              <li className="tempList" key={i}>
                <h1>{ingredient}</h1>
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
          <h2>500 Calories 50P 100C 20F</h2>
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
          <hr />
          <div id="formButtons">
            <button type="button" id="submitButton">
              Save
            </button>
            <button type="button" id="cancelButton">
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
          margin: 3rem 0;
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
        }
        .tempList p {
          align-self: center;
          margin-left: 0.5rem;
        }
      `}</style>
    </Layout>
  )
}

export default CreatePost
