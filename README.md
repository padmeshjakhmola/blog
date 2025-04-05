# ✨ Modern Blog Platform

Live Site: [https://blog-two-ebon-94.vercel.app](https://blog-two-ebon-94.vercel.app)

A full-stack modern blog application built with **Next.js 14**, **Tailwind CSS**, **Drizzle ORM**, **Neon Postgres**, and **AWS S3** for image storage. This project features full CRUD functionality including blog creation, listing, and deletion, with seamless UI and smooth developer experience.

---

## 🚀 Features

- 📝 **Create Blog** – Add rich blog content with title, description, and an optional image.
- 📖 **Read Blog** – List of all blogs with clean layout.
- 🗑️ **Delete Blog** – Remove blogs instantly from UI and database.
- 🧰 **Built-in API** – Server-side Next.js API routes for managing blogs.
- ☁️ **AWS S3 Integration** – Upload and store blog images securely.
- 🧩 **PostgreSQL with Neon** – Scalable, cloud-based Postgres database.
- 🔧 **Drizzle ORM** – Type-safe, lightweight ORM for fast DB operations.
- 💅 **Tailwind CSS** – Utility-first responsive and modern styling.
- 🔐 **Authentication ready** (optional if added or coming soon).

---

## 🛠️ Tech Stack

| Technology      | Description                      |
| --------------- | -------------------------------- |
| **Next.js**     | Full-stack React framework       |
| **TailwindCSS** | Utility-first CSS framework      |
| **Drizzle ORM** | Type-safe SQL ORM                |
| **Neon DB**     | Serverless Postgres (Cloud)      |
| **AWS S3**      | File/Image storage               |
| **Vercel**      | Deployment platform for frontend |

---

## 📦 Project Structure

## 📁 app ┣ 📁 api ← API routes for server-side logic (CRUD) ┣ 📁 components ← Reusable UI components ┣ 📁 lib ← Database config, actions ┣ 📁 public ← Static assets like icons and logos ┣ 📁 styles ← Global styles if any ┣ 📄 (root)/page.tsx ← Homepage

## 🔧 Installation & Setup

1. **Clone the repo:**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

   ```

2. **Install dependencies:**
   npm install

3. **Add environment variables:**
   Create a .env.local file and add the following:

   DATABASE_URL=your_neon_database_url
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=your_aws_region
   AWS_S3_BUCKET_NAME=your_bucket_name
   NEXT_PUBLIC_S3_BASE_URL=https://your-bucket.s3.amazonaws.com/

4. **Run Locally**
   npm run dev

## 🧠 Learnings

- Leveraged **Drizzle ORM** for an enjoyable schema-first approach.
- Hands-on with file upload to **AWS S3** and handling signed URLs.
- Improved understanding of **serverless functions** and **Next.js API routes**.
- Focused on clean, component-driven UI using **TailwindCSS**.

---

## 🤝 Contributions

Pull requests are welcome!  
Feel free to open an issue or submit a PR for improvements, fixes, or enhancements.

---

## 📬 Contact

Made with ❤️ by **Padmesh Jakhmola**
