import instance from "../axios/index.js";
export async function registerUser(name, email, password) {
  try {
    const response = await instance.post("/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
}

export async function loginUser(email, password) {
  try {
    const response = await instance.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
}

export async function createBook(formData) {
  try {
    const response = await instance.post("/books", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
}

export async function getAllBooks() {
  try {
    const response = await instance.get("/books");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
}

export async function editBook(id, title, author, publisher, year, pages) {
  try {
    const response = await instance.put(`/books/${id}`, {
      title,
      author,
      publisher,
      year,
      pages,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
}

export async function deleteBook(id) {
  try {
    const response = await instance.delete(`/books/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
}

export async function getBookDetailById(id) {
  try {
    const response = await instance.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
}
