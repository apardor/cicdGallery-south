import example from '../images/githubFooter.svg'
import './styles/main.scss'

let state = {
  logo: 'Logo!',
};

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
        <form onsubmit="return false;"><input onchange="searchFunc(event)" type="text">
        </form>
      </section>
      <section>
        ${state.imgs? state.imgs.map(el => {
          return `<article>
            <img src=${el.urls.thumb} alt="">
          </article>`
        }).join(''): ''}
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
  console.log(newState, 'update state')
  window.history.pushState(
    {  ...state, ...newState },
    "HISTORY",
    `index.html${newState ? '#' + newState.query : ''}`
),
  window.dispatchEvent(new Event("statechange"));
};
window.addEventListener("statechange", (e) => {
  render(template(window.history.state), document.querySelector("#root"));
});

update();

render(template(window.history.state), document.querySelector("#root"));

const retrieveData = async (query) =>{
  const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=VuZcp_-aJVs8boOKxDfB7l4toXLboZFWW7jPl2Abbpk`);
  const data = await response.json();
  return data;
}

window.searchFunc = function (event){
  retrieveData(event.target.value).then(data => update({imgs: data.results, query: event.target.value}))
 }