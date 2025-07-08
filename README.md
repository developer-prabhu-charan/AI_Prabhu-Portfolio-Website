# 🌐 PRAXIS: AI-Powered Personal Portfolio

> A futuristic developer portfolio featuring a custom AI assistant, animated UI, and personalized knowledge retrieval — built with React, FastAPI, and Google Gemini AI.

---

## 🚀 About This Project

**PRAXIS** is more than a portfolio — it's a dynamic AI-powered digital presence. This full-stack project seamlessly integrates advanced UI animations, semantic search, and generative AI to offer a real-time, conversational experience.
**PRAXIS** (Prabhu's Reactive Analytical & Experimential Intelligence System)

### 🔮 What makes it unique?

- 🤖 **Generative AI Chat Interface (PRAXIS)**: Built using RAG (Retrieval-Augmented Generation) and powered by **Google Gemini API**.
- 💡 **Contextual Awareness**: PRAXIS can answer queries about you, your projects, and career goals using a custom-trained knowledge base.
- 💻 **Modern Stack**: Built from scratch using **React + TypeScript** in the frontend and **FastAPI + Python** for the backend.
- 🎨 **Smooth UI/UX**: Framer Motion, TailwindCSS, and Vite ensure a blazing-fast and animated experience.
- 📁 **Modular Structure**: Designed with scalability, developer experience, and extensibility in mind.

---

## 🧠 Features

| Feature                     | Description                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| 🎙️ Generative AI Chatbot   | Intelligent assistant trained to talk about your resume, skills, and goals. |
| 🎬 Animated Interface      | Motion-enhanced sections using Framer Motion for stunning effects.          |
| 🧠 RAG-based Retrieval     | Retrieves personal knowledge using `sentence-transformers` for relevance.  |
| 🌐 Fully Responsive Design | Optimized for all devices with custom breakpoints and fluid layouts.        |
| 🔐 Secure API Communication | Environment-protected backend for privacy and performance.                 |

---

## 🛠️ Tech Stack

### 🖥 Frontend
- **React 18 + TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Vite** (Blazing fast builds)

### ⚙️ Backend
- **Python 3.10+**
- **FastAPI** (RESTful & async)
- **SentenceTransformers** (Semantic vector search)
- **Google Gemini API** (Generative AI)

### 🧪 Testing & Deployment (In Future)
- **Vercel** (Frontend hosting)
- **Render / Railway** (Backend deployment)
- **ESLint + Prettier** (Code quality)

---

## 🚧 Installation & Setup

### ✅ Prerequisites
- Node.js & npm
- Python 3.10 or higher
- Google Gemini API Key

---

### 📦 Clone the Repo

```bash
git clone https://github.com/developer-prabhu-charan/Prabhu-Portfolio-Website.git
cd Prabhu-Portfolio-Website
```

### 💻 Setup Frontend

```bash
npm install
npm run dev
```

### 🧠 Setup Backend

```bash
cd Backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 🔐 Add API Key (For PRAXIS AI Assistant)

Create a `.env` file in the `Backend/` directory:

```env
GOOGLE_API_KEY=your_google_gemini_api_key
```

### ▶️ Run the Servers

**Start Backend**:
```bash
uvicorn main:app --reload
```

**Start Frontend**:
```bash
npm run dev
```

---

## 🧠 How PRAXIS Works (Architecture)

```
[ User Input ] 
      ↓
[ React UI + Chat Input ]
      ↓
[ Backend FastAPI Server ]
      ↓
[ Embedding Lookup using Sentence-Transformers ]
      ↓
[ Gemini API (Generative Completion) ]
      ↓
[ Response → React UI ]
```

> All queries are enhanced with personal context — giving PRAXIS the ability to talk like *you*!

---

## 📸 Screenshots

Coming soon... 

---

## 📢 Future Enhancements

- ✅ Upload Resume & Let PRAXIS answer job-related queries
- 🌍 Multilingual support
- 💾 Vector database with Faiss or Pinecone
- 🎙️ Voice input integration

---

## 👤 About Me

**Prabhu Charan**  
B.Tech in Artificial Intelligence & Data Science  
🎯 Robotics | AI Systems | Full-Stack Dev  
📫 [LinkedIn](https://www.linkedin.com/in/prabhu-charan-jerripothula-8006b7352/) | 📧 developerprabhucharan@gmail.com

---

## 📎 Project Links

- 🔗 Live Site: [https://your-vercel-url.app](https://your-vercel-url.app) (FUture Update, Not done yet)
- 📁 Repo: [https://github.com/developer-prabhu-charan/Prabhu-Portfolio-Website](https://github.com/developer-prabhu-charan/Prabhu-Portfolio-Website)

---

> 💡 *"Build a portfolio that talks for you... or talks like you." — PRAXIS AI*
