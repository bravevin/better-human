<template>
  <div class="ui raised very padded colorful container segment">
    <h2 class="ui header violet gradient-text">📚 书籍管理 Book Manager</h2>
    <form @submit.prevent="addBookHandler" class="ui form book-form colorful-form">
      <div class="fields">
        <div class="field">
          <input
            v-model="newBook.title"
            placeholder="书名 Title"
            required
            class="ui input colorful-input"
          />
        </div>
        <div class="field">
          <input
            v-model="newBook.author"
            placeholder="作者 Author"
            required
            class="ui input colorful-input"
          />
        </div>
        <div class="field">
          <button type="submit" class="ui primary button colorful-btn">添加 Add</button>
        </div>
      </div>
    </form>
    <table class="ui celled striped compact small violet table book-table colorful-table">
      <thead>
        <tr>
          <th>书名 Title</th>
          <th>作者 Author</th>
          <th style="width: 120px">操作 Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td v-if="editId !== book.id">{{ book.title }}</td>
          <td v-else>
            <input v-model="editBook.title" class="ui input colorful-input" />
          </td>
          <td v-if="editId !== book.id">{{ book.author }}</td>
          <td v-else>
            <input v-model="editBook.author" class="ui input colorful-input" />
          </td>
          <td>
            <template v-if="editId === book.id">
              <button @click="saveEditHandler(book.id)" class="ui green mini button colorful-btn">
                保存 Save
              </button>
              <button @click="cancelEdit" class="ui grey mini button colorful-btn">
                取消 Cancel
              </button>
            </template>
            <template v-else>
              <button @click="startEdit(book)" class="ui blue mini button colorful-btn">
                编辑 Edit
              </button>
              <button @click="deleteBookHandler(book.id)" class="ui red mini button colorful-btn">
                删除 Delete
              </button>
            </template>
          </td>
        </tr>
        <tr v-if="books.length === 0">
          <td colspan="3" style="text-align: center; color: #aaa">暂无书籍 No books</td>
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
.ui.container.segment.colorful {
  margin-top: 2rem !important;
  max-width: 800px !important;
  background: linear-gradient(120deg, #fbc2eb 0%, #a6c1ee 100%) !important;
  border-radius: 24px !important;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15) !important;
  padding: 2.5rem 2rem 2.5rem 2rem !important;
}

.gradient-text {
  background: linear-gradient(90deg, #ff6a00, #ee0979, #2196f3, #43cea2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2.1rem;
  margin-bottom: 1.5rem;
  letter-spacing: 2px;
  text-align: center;
}

.book-form.colorful-form {
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #f9f586 0%, #ffecd2 100%);
  border-radius: 12px;
  padding: 0.7rem 0.5rem;
  box-shadow: 0 2px 8px #fbc2eb55;
}

.book-form .fields {
  display: flex;
  gap: 0.7rem;
}

.book-form .field {
  flex: 1;
}

.colorful-input {
  background: #e0f7fa !important;
  border: 1.5px solid #a7c7e7 !important;
  border-radius: 8px !important;
  font-size: 1rem !important;
  color: #333 !important;
}

.colorful-btn {
  border-radius: 8px !important;
  font-weight: bold !important;
  box-shadow: 0 2px 8px #38f9d755 !important;
  letter-spacing: 1px;
}

.colorful-table {
  background: linear-gradient(90deg, #fbc2eb 0%, #a6c1ee 100%);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px #a6c1ee55;
}

.book-table th,
.book-table td {
  padding: 0.5rem 0.7rem !important;
  background: #f7faff !important;
  border-radius: 6px !important;
  text-align: left;
  height: 2.1rem;
  font-size: 1rem;
}

.book-table th {
  background: linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%) !important;
  color: #3a3a8c !important;
  font-weight: bold !important;
  font-size: 1.05rem !important;
  letter-spacing: 1px;
}

.ui.button.colorful-btn,
.ui.button.colorful-btn:focus {
  background-image: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%) !important;
  color: #fff !important;
  border: none !important;
}

.ui.button.colorful-btn:hover {
  background-image: linear-gradient(90deg, #38f9d7 0%, #43e97b 100%) !important;
}

.ui.button.red.colorful-btn {
  background-image: linear-gradient(90deg, #f85032 0%, #e73827 100%) !important;
}

.ui.button.blue.colorful-btn {
  background-image: linear-gradient(90deg, #2196f3 0%, #43cea2 100%) !important;
}

.ui.button.green.colorful-btn {
  background-image: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%) !important;
}

.ui.button.grey.colorful-btn {
  background-image: linear-gradient(90deg, #b6c0e0 0%, #e0c3fc 100%) !important;
  color: #3a3a8c !important;
}

@media (max-width: 600px) {
  .ui.container.segment.colorful {
    padding: 1rem !important;
  }
  .book-form .fields {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
