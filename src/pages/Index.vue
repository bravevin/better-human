<template>
  <div class="container">
    <h2>书籍管理列表</h2>
    <form @submit.prevent="addBookHandler" class="book-form">
      <input v-model="newBook.title" placeholder="书名" required />
      <input v-model="newBook.author" placeholder="作者" required />
      <button type="submit">添加书籍</button>
    </form>
    <table>
      <thead>
        <tr>
          <th>书名</th>
          <th>作者</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td v-if="editId !== book.id">{{ book.title }}</td>
          <td v-else>
            <input v-model="editBook.title" />
          </td>
          <td v-if="editId !== book.id">{{ book.author }}</td>
          <td v-else>
            <input v-model="editBook.author" />
          </td>
          <td>
            <button v-if="editId !== book.id" @click="startEdit(book)">编辑</button>
            <button v-else @click="saveEditHandler(book.id)">保存</button>
            <button v-if="editId === book.id" @click="cancelEdit">取消</button>
            <button @click="deleteBookHandler(book.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getBooks, addBook, updateBook, deleteBook } from '../api/books'

const books = ref([])
const newBook = ref({ title: '', author: '' })
const editId = ref(null)
const editBook = ref({ title: '', author: '' })

async function fetchBooks() {
  const res = await getBooks()
  books.value = res.data
}

onMounted(fetchBooks)

async function addBookHandler() {
  if (!newBook.value.title || !newBook.value.author) return
  const res = await addBook(newBook.value)
  books.value.push(res.data)
  newBook.value.title = ''
  newBook.value.author = ''
}

async function deleteBookHandler(id) {
  await deleteBook(id)
  books.value = books.value.filter((book) => book.id !== id)
}

function startEdit(book) {
  editId.value = book.id
  editBook.value = { title: book.title, author: book.author }
}

async function saveEditHandler(id) {
  const res = await updateBook(id, editBook.value)
  const idx = books.value.findIndex((b) => b.id === id)
  if (idx !== -1) {
    books.value[idx] = res.data
  }
  editId.value = null
  editBook.value = { title: '', author: '' }
}

function cancelEdit() {
  editId.value = null
  editBook.value = { title: '', author: '' }
}
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: 2.5rem auto;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  padding: 2.5rem;
  border-radius: 18px;
  box-shadow: 0 4px 24px #fda08555;
  transition: box-shadow 0.3s;
}
.container:hover {
  box-shadow: 0 8px 32px #f6d36588;
}
h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #fff;
  text-shadow: 1px 2px 8px #fda08588;
  letter-spacing: 2px;
}
.book-form {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
.book-form input {
  flex: 1;
  padding: 0.7rem;
  border-radius: 8px;
  border: 1px solid #fda085;
  background: #fffbe7;
  font-size: 1rem;
  transition: border 0.2s;
}
.book-form input:focus {
  border: 1.5px solid #f6d365;
  outline: none;
}
.book-form button {
  padding: 0.7rem 1.3rem;
  border-radius: 8px;
  background: linear-gradient(90deg, #fda085, #f6d365);
  color: #fff;
  border: none;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px #fda08533;
  transition: background 0.2s;
}
.book-form button:hover {
  background: linear-gradient(90deg, #f6d365, #fda085);
}
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
}
th,
td {
  padding: 0.9rem;
  background: #fffbe7;
  border-radius: 8px;
  text-align: left;
  font-size: 1.05rem;
}
th {
  background: linear-gradient(90deg, #fda085, #f6d365);
  color: #fff;
  letter-spacing: 1px;
  font-weight: bold;
  text-shadow: 1px 1px 6px #fda08544;
}
button {
  margin-right: 0.5rem;
  padding: 0.4rem 1rem;
  border: none;
  background: linear-gradient(90deg, #43cea2, #185a9d);
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 2px 8px #185a9d33;
  transition: background 0.2s;
}
button:last-child {
  background: linear-gradient(90deg, #f85032, #e73827);
}
button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
