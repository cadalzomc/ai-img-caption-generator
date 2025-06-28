# 🧠 AI Image Caption Generator

A simple web app that uses an AI model to generate natural-language captions for uploaded images. Powered by Hugging Face's BLIP image captioning model and built with Next.js + TypeScript.

---

## 🚀 Features

- 📷 Upload an image and receive a descriptive caption
- 🤖 Uses Hugging Face Spaces with a BLIP captioning model (`meigo07/blip-captioning-api`)
- ⚡ Real-time inference via the `@gradio/client`
- ✅ TypeScript support with safe error handling
- 🧪 Great starting point for AI-assisted content tools

---

## 🛠 Tech Stack

- **Frontend:** Next.js, TypeScript
- **AI Model:** [BLIP](https://huggingface.co/Salesforce/blip-image-captioning-base)
- **API:** Hugging Face Spaces + Gradio
- **Utilities:** `@gradio/client`, base64 image handling

---

## 📦 Installation

```bash
git clone https://github.com/your-username/ai-image-caption-generator.git
cd ai-image-caption-generator
npm install
npm run dev
