import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios, { AxiosResponse } from 'axios'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const CreatePost: React.FC = () => {
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
          <input type="text" />
          <label>Cover Photo</label>
          <div className="imageUpload">
            <button type="button">Upload</button>
          </div>
          <label>Tags</label>
          <input type="text" />
          <label>Summary</label>
          <textarea />
          <label>Ingredients</label>
          <p>+ Add new ingredients</p>
          <h2>500 Calories 50P 100C 20F</h2>
          <label>Directions</label>
          <p>+ Add new directions</p>
          <hr />
          <div id="formOptions">
            <button type="button">Save</button>
            <p>Delete</p>
          </div>
        </form>
      </div>
      <style jsx>{`
        #topInfo {
          display: flex;
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
          margin: 2rem 0;
        }
        #formOptions {
          display: flex;
        }
        #formOptions button {
          border: 1px #4086e7 solid;
          background-color: transparent;
          color: #4086e7;
          padding: 0.2rem 1.5rem;
          border-radius: 0.5rem;
        }
      `}</style>
    </Layout>
  )
}

export default CreatePost
