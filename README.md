# 🧠 PrepGenie – Your Personal AI Interviewer

_A smart AI platform to simulate real interviews, analyze your gestures, and give instant feedback._

![Hack4Bengal Logo](https://github.com/user-attachments/assets/8f1c9c02-3744-4ed3-8ca3-422c38432e7d) <!-- Replace with actual path -->



---

## 🚀 Overview

**PrepGenie** is a virtual AI-powered mock interview platform designed to help job seekers prepare for real-world interviews by simulating HR-style conversations, evaluating gestures and posture in real time, and generating instant feedback on their performance.

> _“Not just what you say. How you say it.”_

---

## 🎯 Problem Statement

Many job seekers struggle with:

- Nervous body language (slouching, eye avoidance)
- Poor speaking fluency and unstructured responses
- Lack of personalized feedback
- No access to company-specific interview questions

They don't realize how they *appear* in an interview.

---

## ✅ Our Solution – PrepGenie

PrepGenie uses AI to simulate interviews with:

- 📸 **Facial expression, posture, and gesture detection** (via MediaPipe)
- 🗣 **Voice fluency evaluation** (via Web Speech API)
- 🤖 **Real-time domain-based questions** from an AI Interviewer (GPT-4)
- 📋 **Feedback report** with improvement suggestions (GPT-generated)

---

## 🔧 Features (Hack4Bengal MVP)

- 🎥 Virtual AI Interview Room (split-screen: user + bot)
- 📄 Resume upload or domain selection
- ⏱ Countdown and interview initiation
- 🧍 Real-time camera-based gesture analysis
- 🗣 Voice-to-text conversion and fluency scoring
- 📋 Real-time feedback report generation

---

## 🔁 How It Works

1. User uploads resume or selects domain
2. Countdown begins (3...2...1)
3. Interview starts with webcam and mic activated
4. AI asks 3 domain-specific questions while tracking gestures
5. Post-interview, feedback report is shown with tips

![Flowchart](./assets/flow.png) <!-- Replace with actual image -->

---

## 🧰 Tech Stack

| Layer              | Tools Used                    |
|-------------------|-------------------------------|
| Frontend          | React.js, Tailwind CSS        |
| Gesture Tracking  | MediaPipe (FaceMesh + Pose)   |
| Speech Recognition| Web Speech API                |
| AI Feedback       | OpenAI GPT-4 API              |
| Hosting           | Vercel                        |

---

## 🧠 What Makes PrepGenie Unique?

- 🎯 **Behavior-based feedback** (body language + voice)
- 💬 **Live evaluation** like a real HR interviewer
- ⚙ **Personalized tips** instead of generic scoring
- 🧠 Built with advanced AI + real-time interaction

---

## ⚠️ Challenges We Faced

- Integrating MediaPipe with React camera component
- Syncing mic, camera, and bot AI prompts in real-time
- Creating natural AI flow (question → response → feedback)
- Time constraints for full backend integration

✅ **Solution:** Preloaded smart AI prompts + simplified flow

---

## 🌐 Future Vision

- 🎓 Company-specific question sets
- 📄 Resume parsing and scoring system
- 📞 Full mock interview via WebRTC
- 📊 Performance analytics dashboard
- 🔗 Web3-based badge system for verified mock interviews

---

## 🖥 Demo & Screenshots

<!-- Replace with actual video/image paths -->
![Interview Screen](./assets/interview-screen.png)
![Feedback Report](./assets/report-card.png)

🎥 [Watch the Demo Video](https://your-demo-link.com)

---

## 👨‍💻 Team

**Team Intellisense – Hack4Bengal 2025**

- Tuhin Pramanik 
- Isha Jain  
- Ankit Nayek  
- Subhadeep Malik  

---

## 📜 License

This project is licensed under the MIT License. Feel free to use and modify.

---

## 🙌 Acknowledgements

- Hack4Bengal Hackathon
- Gemini (Gemini API)
- Google MediaPipe
- Web Speech API Team

---

## 📫 Contact

Have feedback or want to collaborate?

- 🌐 [Tuhin Pramanik](https://www.linkedin.com/in/tuhinpramanik/)
- 🌐 [Isha Jain](https://www.linkedin.com/in/ishajain03/)
- 🌐 [Ankit Nayek](https://www.linkedin.com/in/ankit-nayek-912a96292/)
- 🌐 [Subhadeep Malik](https://www.linkedin.com/in/subhadeepmalik004/)

---

