# 📘 JEE PYQ Chapterwise Explorer

A responsive web app built with **Next.js** to explore chapter-wise Previous Year Questions (PYQs) for JEE Main — across **Physics**, **Chemistry**, and **Mathematics**.

![Preview](./public/preview-desktop-mobile.png)

---

## 🚀 Features

- 📚 **Subject Pages** for Physics, Chemistry, and Mathematics
- 🌗 **Dark & Light Mode Toggle** using Tailwind & ShadCN theme
- 📦 **Reusable UI Components** built with [shadcn/ui](https://ui.shadcn.com)
- 🎨 **Beautiful Icons** powered by [Phosphor Icons](https://phosphoricons.com)
- 🔍 Chapter-level stats: status, progress, question counts
- 📱 Fully **Responsive Design** (mobile-first layout)
- ⚙️ Built with `app/` router and TailwindCSS

---

## 🧱 Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Styling:** Tailwind CSS + ShadCN UI
- **Icons:** [Phosphor Icons](https://phosphoricons.com/)
- **Font:** [Geist](https://vercel.com/font)
- **Routing:** App Router (`app/` directory)

---

## 📂 Folder Structure

my-app/
├── app/
│   ├── chemistry/
│   │   └── page.tsx
│   ├── mathematics/
│   │   └── page.tsx
│   ├── physics/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── favicon.ico
│
├── components/
│   ├── ui/     
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
│
├── data/
│   └── d2d.json

## 💻 Getting Started

```bash
npm install
npm run dev

Then open http://localhost:3000 in your browser.

