import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blogNew) => {
  const config = {
    headers: {
      'Authorization' : token }
  }
  const response = await axios.post(baseUrl,blogNew,config)
  return response.data
}

const update = async (id, blogUpdate) => {
  const config = {
    headers: {
      'Authorization' : token }
  }
  const response = await axios.put(`${baseUrl}/${id}`,blogUpdate,config)
  return response.data

}

const delet = async (id) => {
  const config = {
    headers: {
      'Authorization' : token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`,config)
  return response.data
}


export default { getAll, create, update,delet, setToken }