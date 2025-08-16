import axios from './axios'

const api = axios.create({
  baseURL: '/api/books',
})

export function getBooks() {
  return api.get('')
}

export function addBook(book) {
  return api.post('', book)
}

export function updateBook(id, book) {
  return api.put(`/${id}`, book)
}

export function deleteBook(id) {
  return api.delete(`/${id}`)
}
