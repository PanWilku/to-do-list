import "./style.css";
import { formatDistance, subDays } from "date-fns";

const a = formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true });


document.querySelector('#app').innerHTML = `
  <div class="bg-blue-200 flex">
      <h1 class="p-12 bg-emerald-200 font-bold">SIEMA</h1>
  </div>
`
