# 🚀 BlinkNote – AI SaaS Template for PDF Summarization

**BlinkNote** is a complete, production-grade SaaS template for building an AI-powered PDF summarization platform. With robust document processing, real-time updates, and a beautiful, responsive UI, BlinkNote serves as the perfect starting point for developers building document-focused AI tools.

---

## 🌐 Live Demo

Experience BlinkNote in action:

🔗 [https://blink-note.vercel.app](https://blink-note.vercel.app)

## Project 
![Project Image](https://blink-note.vercel.app/opengraph_BlinkNote.png)

Try uploading your PDF, generate emoji-rich summaries, manage your documents with ease, and explore the full capabilities of a modern AI-powered SaaS platform.

---

## 💡 Free to Use — No Payment Required!

This is a **personal side project**, built to demonstrate what a modern full-stack AI SaaS platform can look like. **You won’t be charged anything** to use it.

Even though Stripe is integrated, **you can use test card details to activate Pro features**:

- 💳 Card Number: 4242 4242 4242 4242
- 📆 Expiry Date: Any future date (e.g. 12/34)
- 🔒 CVV: Any 3-digit number (e.g. 123)

All payments are in test mode — **no real money is involved**.

---

## ✨ Features

### 📄 Document Processing

- Parse and extract text from PDF files (up to 32MB)
- GPT-4 and Gemini Flash integration for high-quality AI summaries
- Emoji-enhanced summaries with engaging visual output
- Langchain-powered PDF chunking and text processing

### 🧑‍💻 User Experience

- Interactive summary viewer with animations and progress tracking
- Markdown export for easy blog post creation
- Real-time notifications for upload, processing, and completion
- Responsive design across mobile, tablet, and desktop
- Dashboard to manage, view, and delete summaries

### 🔐 Authentication & Security

- Secure Clerk authentication (Google, GitHub, Passkeys)
- Protected routes and API endpoints
- Secure file handling via UploadThing

### 💳 Subscriptions & Payments

- Stripe integration with Basic & Pro plans _(Test Mode Only)_
- Server-side checkout flow with webhooks
- Customer portal for managing billing
- Usage-based limits and plan enforcement

---

## ⚙️ Tech Stack

| Category        | Technology                                  |
| --------------- | ------------------------------------------- |
| Frontend        | React 19, TailwindCSS 4, Shadcn UI          |
| Framework       | Next.js 15 (App Router + Server Components) |
| Authentication  | Clerk                                       |
| AI Integration  | OpenAI GPT-4, Gemini Flash, Langchain       |
| Database        | NeonDB (PostgreSQL)                         |
| File Upload     | UploadThing                                 |
| Payments        | Stripe (test mode)                          |
| Notifications   | Toast notifications                         |
| Types & Tooling | TypeScript, ESLint, Prettier                |
| Deployment      | Vercel                                      |

---

## 📦 Application Highlights

- 📝 Clean, structured AI summaries with key points
- 🎨 Beautiful UI with transitions, reels, and summary cards
- 🔒 End-to-end secure file handling
- 💰 Flexible, upgradeable pricing plans _(with test cards only)_
- 🔄 Path revalidation for real-time UI updates
- 📱 Mobile-friendly with responsive layout
- 📂 Markdown export for summaries
- 🔍 SEO-optimized summary pages
- 📈 Performance-optimized for heavy AI workloads

---

## 📁 Project Structure

- /app # Next.js App Router directory
- /components # Reusable UI components (shadcn)
- /lib # Utility functions and helpers
- /actions # Server actions for DB & API
- /db # NeonDB schema and queries
- /styles # TailwindCSS and global styles
- /public # Static assets

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mundesamarth/BlinkNote.git
cd BlinkNote
```

### 2. Install Dependencies

```
pnpm install
# or
npm install
```

### 3. Set up environment variables

- CLERK_SECRET_KEY=
- CLERK_PUBLISHABLE_KEY=
- OPENAI_API_KEY=
- GEMINI_API_KEY=
- DATABASE_URL=
- UPLOADTHING_SECRET=
- STRIPE_SECRET_KEY=
- NEXT_PUBLIC_STRIPE_KEY=
- STRIPE_WEBHOOK_SECRET=

### 4. Run the Development Server

```
pnpm dev
# or
npm run dev
```

---

## 🙌 Final Words

BlinkNote is more than just a project—it's a demonstration of what modern full-stack development with AI can look like. Whether you're a developer curious about building your own SaaS product or just exploring AI integrations, I hope this template inspires you and helps you move faster.

If you find this useful or inspiring, feel free to ⭐️ the repo, share it with others, or drop me a message. Feedback, contributions, and ideas are always welcome!

Thanks for stopping by! 😊🚀
