# **Blog Platform – Fullstack Project**

A personal blog platform I built to learn fullstack development from scratch. It features a public blog and an admin dashboard for managing posts and comments.

## 🧰 Tech Stack
- 🎨 **Frontend**: React (TypeScript), TailwindCSS
- 🛠️ **Backend**: Node.js, Express, Prisma ORM, PostgreSQL
- 🔐 **Auth**: JWT (stored in cookies)
- ✅ **Testing**: Vitest

```
📁 /frontenduser – Public blog site (register/login, read + comment)
📁 /frontendadmin – Admin dashboard (create/edit/publish)
📁 /backend – REST API (auth, posts, comments)
```

## ✨ Features

### Admin Dashboard (`/frontendadmin`)
- Secure login with JWT (stored in cookies)
- Create, edit, and delete blog posts
- Publish/unpublish posts with one click
- View all posts in a dashboard table
- Moderate and delete user comments

### Public Blog (`/frontenduser`)
- Browse all published blog posts
- Read full content with a clean UI
- Register/login to post and reply to comments
- Update profile information


## **Screenshots**

<details>
  <summary>📸 Admin Dashboard Screens</summary>

  ![Admin Welcome](./gitImages/adminWelcome.png)  
  ![Add Post](./gitImages/adminAddPost.png)  
  ![Manage Posts](./gitImages/adminManagePosts.png)  
  ![Publish Post](./gitImages/adminPublishPost.png)  
  ![Manage Profile](./gitImages/manageProfileAdmin.png)

</details>

<details>
  <summary>🌐 Public Blog Screens</summary>

  ![User Welcome](./gitImages/userWelcome.png)  
  ![Register](./gitImages/register.png)  
  ![Read and Comment](./gitImages/userReadAndComment.png)  
  ![Manage Profile](./gitImages/manageProfile.png)  
  ![Browse Posts](./gitImages/browsePosts.png)

</details>
