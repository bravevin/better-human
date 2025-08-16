<template>
  <div class="container">
    <h2>书籍管理列表</h2>
    <form @submit.prevent="addBook" class="book-form">
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
            <button v-else @click="saveEdit(book.id)">保存</button>
            <button v-if="editId === book.id" @click="cancelEdit">取消</button>
            <button @click="deleteBook(book.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const books = ref([
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: '1984', author: 'George Orwell' },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
])

const newBook = ref({ title: '', author: '' })
const editId = ref(null)
const editBook = ref({ title: '', author: '' })

function addBook() {
  if (!newBook.value.title || !newBook.value.author) return
  books.value.push({
    id: Date.now(),
    title: newBook.value.title,
    author: newBook.value.author,
  })
  newBook.value.title = ''
  newBook.value.author = ''
}

function deleteBook(id) {
  books.value = books.value.filter((book) => book.id !== id)
}

function startEdit(book) {
  editId.value = book.id
  editBook.value = { title: book.title, author: book.author }
}

function saveEdit(id) {
  const idx = books.value.findIndex((b) => b.id === id)
  if (idx !== -1) {
    books.value[idx] = { id, ...editBook.value }
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
  max-width: 600px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px #eee;
}
h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}
.book-form {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.book-form input {
  flex: 1;
  padding: 0.5rem;
}
.book-form button {
  padding: 0.5rem 1rem;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
  text-align: left;
}
button {
  margin-right: 0.5rem;
  padding: 0.3rem 0.7rem;
  border: none;
  background: #409eff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}
button:last-child {
  background: #f56c6c;
}
button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
