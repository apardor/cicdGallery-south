import example from '../images/githubFooter.svg'
import './styles/main.scss'

let state = {
  logo: 'Logo!',
  search: ''
};
let count = window.history.state?.count || 0;
const template = (state) => {
  if (state) {
    return `
    <header>
    <nav>
      <img src="" alt="" class="logo"/>
      <h1>${state.logo}</h1>
    </nav>
    </header>
    <main>
      <section>
        <form action="/"><input onchange="searchFunc(event)" type="text">
        </form>
      </section>
      <section>
        <article>
          <img src=${state.search} alt="">
        </article>
      </section>
    </main>
    <footer>
      <img src=${example} alt="github logo">
    </footer>
        `;
  }
};
const render = (htmlString, el) => {
  el.innerHTML = htmlString;
};
const update = (newState) => {
  window.history.pushState(
    {  ...state, ...newState },
    "HISTORY",
    `index.html#${count}`
),
  window.dispatchEvent(new Event("statechange"));
};
window.addEventListener("statechange", (e) => {
  render(template(window.history.state), document.querySelector("#root"));
});

// update();

render(template(window.history.state), document.querySelector("#root"));

const retrieveData = async (query) =>{
  const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=VuZcp_-aJVs8boOKxDfB7l4toXLboZFWW7jPl2Abbpk`);
  const data = await response.json();
  return data;
}

window.searchFunc = function (event){
  retrieveData(event.target.value).then(data =>  data.results.forEach(el => update({search: el.urls.thumb})))
 }
