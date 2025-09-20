# ⚖️ LegalEase AI: Demystifying Legal Documents with Generative AI

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-8E44AD?style=for-the-badge&logo=google-gemini&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

### **The Challenge: The Wall of Legal Jargon**

Legal documents are a part of everyday life—from signing a rental agreement to accepting a new job offer or clicking "I agree" on terms of service. Yet, for the average person, these documents are often dense, confusing, and filled with impenetrable jargon. This information asymmetry creates a significant power imbalance, exposing individuals and small businesses to hidden risks and unfavorable terms. How can we empower everyone to understand what they're signing, without needing a law degree?

### **Our Solution: LegalEase AI**

**LegalEase AI** is a generative AI-powered application designed to be a trusted first point of contact for anyone facing a complex legal document. Our solution transforms convoluted legal text into clear, concise, and actionable guidance, empowering users to make informed decisions with confidence.

![LegalEase AI Screenshot](https://storage.googleapis.com/proudcity/mebanenc/uploads/2019/04/legal-document.jpg)


#### **Key Features:**

*   **High-Level Summaries:** Get a quick, easy-to-understand overview of the entire document.
*   **Key Point Extraction:** The AI automatically identifies and explains the most critical clauses, potential risks, and important obligations in simple bullet points.
*   **Interactive Q&A:** Ask specific questions about the document in your own words (e.g., "What happens if I terminate the contract early?") and get instant, context-aware answers.
*   **Multi-Language Support:** The entire interface and all AI-generated content can be switched between English and Hindi, with on-the-fly translation for Q&A in any language.
*   **Secure & Private:** Users upload documents directly from their device for analysis, ensuring their sensitive information remains confidential.

---

### **How We Built It: The Architecture**

LegalEase AI is built on a modern, serverless architecture leveraging the power of Google Cloud and the latest web technologies.

*   **Frontend:** A responsive and intuitive user interface built with **Next.js**, **React**, and **TypeScript**. We used **ShadCN/UI** and **Tailwind CSS** for a clean, professional design.
*   **Backend & AI Orchestration:** We used **Genkit**, an open-source framework from Google, to define our AI flows. This allowed us to structure our prompts and integrate seamlessly with Google's generative AI models.
*   **Core AI Services:**
    *   **Document AI:** For robust, high-fidelity text extraction from uploaded PDFs, images, or DOCX files.
    *   **Gemini 2.5 Flash:** As our core reasoning engine. We crafted specialized prompts to instruct Gemini to act as an expert legal analyst, enabling it to generate summaries and answer questions with high accuracy.
    *   **Cloud Translation API:** To provide seamless multi-language support in the Q&A feature, allowing users to ask questions in their native language and receive answers in their preferred language (English or Hindi).

### **Why We Built This: The Impact**

We believe that understanding legal documents is a fundamental right, not a privilege. By harnessing the power of generative AI, LegalEase AI aims to democratize access to legal information. Our goal is to empower individuals—from tenants and freelancers to small business owners—to protect their interests, avoid potential pitfalls, and navigate the legal landscape with clarity and confidence.

This project is a testament to how generative AI can be used to solve real-world problems and create a more equitable society.

---

### **Getting Started with the Code**

This is a Next.js project bootstrapped with `create-next-app`.

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Set Up Environment Variables:**
    Create a `.env` file in the root of the project and add your Google Cloud project credentials and configuration:
    ```
    GOOGLE_CLOUD_PROJECT="your-gcp-project-id"
    DOCUMENT_AI_LOCATION="your-doc-ai-location" # e.g., us
    DOCUMENT_AI_PROCESSOR_ID="your-doc-ai-processor-id"
    ```

3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

4.  **Run the Genkit Development Server:**
    In a separate terminal, start the Genkit development UI to inspect and test your AI flows:
    ```bash
    npm run genkit:watch
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result, and visit the Genkit developer UI (typically on `http://localhost:4000`) to monitor your flows.
