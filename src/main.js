import "./style.css";
import { formatDistance, subDays } from "date-fns";
import { initializeUI } from "./ui.js";

const a = formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true });


function initApp() {

initializeUI();

}

document.addEventListener("DOMContentLoaded", initApp);