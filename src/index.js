import example from '../images/githubFooter.svg'
import './styles/main.scss'

const header = document.createElement('header')

const nav = document.createElement('nav');
header.append(nav);

const logo = document.createElement('h1')
logo.textContent = 'LOGO!';
nav.append(logo);

const main = document.createElement('main');
const section = document.createElement('section');

const form = document.createElement('form');
form.setAttribute('action', '/');
section.append(form);

const input = document.createElement('input');
input.setAttribute('id', 'contentSearch');
input.setAttribute('type', 'text');
form.append(input);


const imageSection = document.createElement('section');
imageSection.setAttribute('class', 'image-section');
main.append(section, imageSection);



// Append heading node to the DOM
const app = document.querySelector('#root')
const footer = document.createElement('footer');
const svgFooter = document.createElement('img');
svgFooter.setAttribute('src', example)
svgFooter.setAttribute('alt', 'github logo');
footer.append(svgFooter);
app.append(header, main, footer)

const retrieveData = async () =>{
  const response = await fetch('https://api.unsplash.com/search/photos?query=london&client_id=VuZcp_-aJVs8boOKxDfB7l4toXLboZFWW7jPl2Abbpk');
  const data = await response.json();
  return data;
}

const imageGrid = image => {
  const article = document.createElement('article');
  const img = document.createElement('img');
  article.append(img)
  img.setAttribute('src', image)
  img.setAttribute('alt', 'article image');
  imageSection.append(article)
}

retrieveData().then((data) => {
  data.results.forEach(el => imageGrid(el.urls.thumb));
})

