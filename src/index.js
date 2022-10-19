import example from '../images/example.jpg'
import './styles/main.scss'
// Create a class property without a constructor
class Game {
  name = 'Violin Charades'
}
const myGame = new Game()
// Create paragraph node
const p = document.createElement('p')
p.textContent = `I like ${myGame.name}.`

// Create heading node
const heading = document.createElement('h1')
heading.textContent = 'Interesting!'

const img = document.createElement('img')
img.setAttribute('src', example);

// Append heading node to the DOM
const app = document.querySelector('#root')
app.append(heading, p, img)

const retrieveData = async () =>{
  const response = await fetch('https://api.unsplash.com/search/photos?query=london&client_id=VuZcp_-aJVs8boOKxDfB7l4toXLboZFWW7jPl2Abbpk', {
    headers: {
      Accept: 'application/json'
      // Authentication: '373620 VuZcp_-aJVs8boOKxDfB7l4toXLboZFWW7jPl2Abbpk',
    }
  });
  const data = await response.json();
  return data;
}

retrieveData().then((data) => {
  console.log(data);
})