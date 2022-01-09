import React, { useState }  from 'react'

const BlogForm = ({ createBlog }) => {
  const blogEntity = {
    title: '',
    author: '',
    url: ''

  }

  const [blogNew,setBlogNew] = useState(blogEntity)

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog(blogNew)
    setBlogNew(blogEntity)
  }


  return (
    <div className="container mt-5">
      <form onSubmit={addBlog}>
        <div className="mb-3">
          <label className="form-label">title</label>
          <input required className="form-control"
            value={blogNew.title}
            onChange={({ target }) => setBlogNew({ ...blogNew, title: target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">author</label>
          <input required className="form-control"
            value={blogNew.author}
            onChange={({ target }) => setBlogNew({ ...blogNew, author: target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">url</label>
          <input className="form-control"
            value={blogNew.url}
            onChange={({ target }) => setBlogNew({ ...blogNew, url: target.value })}
          />
        </div>

        <button className="btn btn-primary" type="submit">Guardar</button>
      </form>
    </div>
  )
}

export default BlogForm