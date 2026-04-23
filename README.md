# 🤖 Botnify – AI Deepfake Detection System

Botnify is a web-based application that detects whether an image is real or AI-generated (deepfake) using a pretrained AI model. It provides confidence scores, probability insights, and a clean UI for analysis.

---

## 🚀 Live Demo
https://botnify-pmc7nc3br-lokhandwalahuz-1494s-projects.vercel.app/

---

## 🧠 Features
- Upload image for analysis  
- AI-powered deepfake detection (Hugging Face model)  
- Confidence score and probability visualization  
- Technical insights for transparency  
- Recent scans history  
- Deployed on Vercel  

---

## 🏗️ Tech Stack
Frontend: React (Vite), Tailwind CSS, Lucide Icons  
Backend: Node.js, Express.js  
AI: Hugging Face Inference API  

---

## 📁 Project Structure
botnify/
│
├── api/                     # Vercel serverless functions
│   └── detect.js
│
├── public/                  # Static assets
│   └── favicon.ico
│
├── src/                     # React frontend
│   ├── assets/              # Images, icons
│   ├── components/          # Reusable UI components
│   │   ├── Upload.jsx
│   │   ├── ResultCard.jsx
│   │   └── Loader.jsx
│   │
│   ├── pages/               # Page-level components
│   │   └── Home.jsx
│   │
│   ├── services/            # API calls
│   │   └── api.js
│   │
│   ├── utils/               # Helper functions
│   │   └── format.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env                     # Environment variables (ignored)
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.js
├── vercel.json
└── README.md
---

## ⚙️ Installation

git clone https://github.com/your-username/botnify.git

cd botnify
npm install

---

## ▶️ Run
npm run dev

---

## ☁️ Deployment
Deployed on Vercel with serverless API (`/api/detect.js`) and environment variables configured in dashboard.

---

## 📊 How It Works
1. Upload image  
2. Sent to `/api/detect`  
3. Backend calls Hugging Face API  
4. Model returns prediction  
5. UI displays result  

---

## ⚠️ Limitations
- Depends on pretrained model  
- May give inconclusive results  
- Requires internet  

---

## 🔮 Future Improvements
- Video detection  
- Batch processing  
- Better accuracy  
- Auth system  

---

## Author
Huzaifa Lokhandwala  


## License
Educational use
