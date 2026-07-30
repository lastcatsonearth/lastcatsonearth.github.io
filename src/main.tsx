import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const query = new URLSearchParams(window.location.search);
const redirect = query.get("p");

if (redirect) {
    window.history.replaceState(
        null,
        "",
        redirect + window.location.hash
    );
}

createRoot(document.getElementById("root")!).render(<App />);
