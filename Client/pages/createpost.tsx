import React, { useState, useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import axios, { AxiosResponse } from 'axios'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const CreatePost: React.FC = () => {
  interface Post {
    title: String
    tags: Array<String>
    summary: String
    ingredients: Array<String>
    directions: Array<String>
  }
  const tagRef: any = useRef(null)
  const [draftPost, setDraftPost] = useState<Post>({
    title: '',
    tags: [],
    summary: '',
    ingredients: [],
    directions: [],
  })
  const [tempValue, setValue] = useState<String>('')
  const handleInputChange = e => {
    const name = e.target.name
    setDraftPost({
      ...draftPost,
      [name]: e.target.value,
    })
  }
  const handleTempValue = e => {
    const name = e.target.name
    const value = e.target.value
    setValue(value)
  }

  const addValue = () => {
    const orgArray = draftPost.tags
    const newArray = [...orgArray, tempValue]
    setDraftPost({
      ...draftPost,
      tags: newArray,
    })
    clearField()
  }
  const clearField = () => {
    tagRef.current.value = ''
  }
  return (
    <Layout title="New Post">
      <div id="createPage">
        <div id="topInfo">
          {/* <FontAwesomeIcon icon={faChevronLeft} className="backBtn" /> */}
          <h3>Go back</h3>
        </div>
        <h1>Create New Post</h1>

        <form className="newPost">
          {/* <TextField id="outlined-basic" label="Title" variant="outlined" /> */}
          <label>Title*</label>
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
            onChange={handleTempValue}
            ref={tagRef}
          />
          <h4 onClick={addValue}>+ Add new ingredient</h4>
          <label>Summary</label>
          <textarea name="summary" onChange={handleInputChange} />
          <label>Ingredients</label>
          <input type="text" name="ingredient" />
          <h4>+ Add new ingredient</h4>
          <h2>500 Calories 50P 100C 20F</h2>
          <label>Directions</label>
          <input type="text" name="direction" />
          <h4>+ Add new direction</h4>
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
      `}</style>
    </Layout>
  )
}

export default CreatePost
