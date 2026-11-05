# **🛠️ maker.mourao.info — 3D Printing & Additive Manufacturing Platform**

A modern, highly responsive web application designed to streamline quote requests for a custom 3D printing and additive manufacturing service. Built with **React**, **TypeScript**, **Tailwind CSS v4**, and **i18n** localization.

👉 **Live Demo:** [https\://maker.mourao.info](https://maker.mourao.info)

## **🎯 Business Problem & Architectural Solution**

Handling 3D printing requests via unstructured messaging often leads to missing critical technical specifications (filament material types, color choices, infill percentages, and 3D model links).

**The Solution:** This platform provides a structured, accessible quote generator where customers define technical parameters (PLA, flexible TPU, PETG) and submit model links. The state is managed locally and serialized into a pre-formatted, URI-encoded order string sent directly to the manufacturer's WhatsApp.

## **✨ Key Features & Technical Highlights**

* **Internationalization (i18n):** Native support for English (`en`) and Brazilian Portuguese (`pt-BR`) with automatic browser language detection via `react-i18next`.  
* **Custom Hook State Management:** Complete decoupling of UI and business logic through the `useCart` hook, synchronized seamlessly with `LocalStorage`.  
* **Strict Type Safety:** Domain model interfaces (`PrintItem`, `FilamentMaterial`) enforcing type safety across component props and state mutations.  
* **Accessible Tech-Dark UI:** High-contrast Dark Mode design complying with WCAG contrast ratios, styled using Tailwind CSS v4.  
* **Git Flow Workflow:** Enterprise-grade branch management (`main`, `develop`, `feature/*`, `release/*`, `docs/*`) ensuring clean production releases.

## **🚀 Tech Stack**

* **Frontend Library:** React 18+ (Vite)  
* **Language:** TypeScript  
* **Styling:** Tailwind CSS v4  
* **Localization:** `react-i18next` & `i18next-browser-languagedetector`  
* **Deployment:** Netlify

## **📁 Ecosystem Integration**

This project is part of the **Mourão Digital Ecosystem**:

* **Developer Portfolio:** [dev.mourao.info](https://dev.mourao.info)  
* **Technical Blog:** [blog.mourao.info](https://blog.mourao.info)  
* **3D Printing Hub:** [maker.mourao.info](https://maker.mourao.info)

## **⚙️ Local Setup**

1. **Clone the repository:**`git clone [https://github.com/devmourao/orcamento-3d.git](https://github.com/devmourao/orcamento-3d.git)`  
2. **Navigate to project directory:**`cd orcamento-3d`  
3. **Install dependencies:**`npm install`  
4. **Start development server:**`npm run dev`

## **🔀 Git Flow Strategy Executed**

* `main`: Production-ready code deployed live.  
* `develop`: Integration branch for finished features.  
* `feature/*`: Isolated branches for UI components, custom hooks, and WhatsApp checkout logic.  
* `docs/*`: Dedicated documentation branch for project showcase.

