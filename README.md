# Dark Monospace Blog

A **dark-themed, programmer-style blogging platform** built with **React.js** and **Supabase**. Designed for **tech enthusiasts and developers**, this blog has a **monospace aesthetic**, responsive design, and full **CRUD functionality**.

---

## 🌟 Features

* Dark, programmer-friendly **monospace UI**.
* **User authentication** with Supabase.
* Users can **create, read, update, and delete** their own blog posts.
* **Edit/Delete** options visible only to post authors.
* **View all posts by a user** by clicking their username in the navbar.
* **Responsive layout** for desktop and mobile devices.
* Posts display **code-style formatting** using monospace font.
* Navbar highlights **username extracted from email**.

---

## 🛠 Tech Stack

* **Frontend:** React.js (Vite)
* **Backend & Database:** Supabase (PostgreSQL + Auth)
* **Styling:** Plain CSS with dark theme and responsive design
* **Routing:** React Router v6

---

## 📁 Folder Structure

```
dark-mono-blog/
├─ public/
│  └─ index.html
├─ src/
│  ├─ components/
│  │  ├─ Navbar.jsx
│  │  └─ PostCard.jsx
│  ├─ pages/
│  │  ├─ Home.jsx
│  │  ├─ PostPage.jsx
│  │  ├─ AuthPage.jsx
│  │  └─ MyPosts.jsx
│  ├─ index.css
│  ├─ main.jsx
│  └─ supabaseClient.js
├─ package.json
└─ README.md
```

---

## ⚡ Installation

1. **Clone the repository**

```bash
git clone <repo-url>
cd dark-mono-blog
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure Supabase**

* Create a project on [Supabase](https://supabase.com/).
* Copy your **API URL** and **anon key**.
* Create `supabaseClient.js`:

```js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

* Create a `posts` table with columns:

| Column       | Type      | Notes              |
| ------------ | --------- | ------------------ |
| id           | UUID      | Primary Key        |
| title        | text      | Required           |
| content      | text      | Required           |
| author\_id   | uuid      | References user id |
| author\_name | text      | Stores user email  |
| created\_at  | timestamp | Default: `now()`   |

---

## 🚀 Running the App

```bash
npm run dev
```

* Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📝 Usage

1. **Sign Up / Login**
2. **Create a Post**

   * Enter a title and content.
   * Click **Post**.
3. **View Posts**

   * Click a post to see the full content.
4. **Edit / Delete Post**

   * Only visible if you are the author.
5. **View My Posts**

   * Click your username in the navbar to see all posts you’ve made.

---

## 🔧 Customization

* Change **colors** in `index.css` using CSS variables:

```css
:root {
  --bg-color: #0d0d0d;
  --text-color: #e0e0e0;
  --accent-color: #00ffcc;
}
```

* Change font by replacing `font-family: "Fira Code", monospace;` in `index.css`.

---

## 📌 Future Enhancements

* Syntax highlighting for code snippets.
* Markdown support for posts.
* Rich text editor with live preview.
* Profile page for setting custom usernames.
* Like/comment system for posts.

---

## 📜 License

MIT License © 2025
