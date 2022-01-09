/* eslint-disable linebreak-style */
import React from 'react'
import Toggleable from './Toggeable'
import BlogService from '../services/blogs'

const Blog = ({ blog, clickEliminar,userId }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeButton = async () => {
    const blogUpdate = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    await BlogService.update(blog.id, blogUpdate)

  }
  const handleClickEliminar = () => {
    if (window.confirm('Desea eliminar el Blog?')) {
      clickEliminar(blog.id)
    }

  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <Toggleable buttonLabel='Ver'>
          {blog.author} <br/>
          {blog.url} <br/>
          Likes {blog.likes} <button onClick={likeButton}>like</button> <br/>
          {userId === blog.user.id ?
            <button onClick={handleClickEliminar}>Eliminar</button>
            : null
          }
        </Toggleable>
      </div>
    </div>
  )}


export default Blog