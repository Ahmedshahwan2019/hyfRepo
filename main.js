let gitHubApi = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

function fetchData(url) {
  return fetch(url).then((response) => response.json());
}
function main() {
  const header = document.createElement('header');
  const title = document.createElement('h3');
  const selector = document.createElement('select');
  const selectorDiv = document.createElement('div');
  const container = document.createElement('main');
  const section = document.createElement('section');
  const repoName = document.createElement('div');
  const repoDescriptin = document.createElement('div');
  const repoForks = document.createElement('div');
  const repoUpdate = document.createElement('div');
  const contributor = document.createElement('section');
  const contributorTittle = document.createElement('h4');
  const contributorsDiv = document.createElement('div');
  const ulEl = document.createElement('ul');

  // header
  document.body.appendChild(header);
  header.setAttribute('id', 'top-container');
  header.appendChild(title);
  title.innerText = 'HRF Repositories:';
  title.setAttribute('class', 'title');
  header.appendChild(selectorDiv);
  selectorDiv.classList.add('option');
  selectorDiv.appendChild(selector);
  selector.innerHTML = `<option>--Choose a Repositroy --</option>`;
  selector.classList.add('chose');

  //repo info elements
  document.body.appendChild(container);
  container.setAttribute('class', 'display-container');
  container.appendChild(section);
  section.setAttribute('id', 'display');
  section.appendChild(repoName);
  repoName.setAttribute('class', 'repository-info');
  section.appendChild(repoDescriptin);
  repoDescriptin.setAttribute('class', 'description-info');
  section.appendChild(repoForks);
  repoForks.setAttribute('class', 'forks-info');
  section.appendChild(repoUpdate);
  repoUpdate.setAttribute('class', 'update-info');
  //contributor info elements
  container.appendChild(contributor);
  contributor.setAttribute('id', 'contributors');
  contributor.appendChild(contributorTittle);
  contributorTittle.innerText = 'contributors';
  contributorTittle.setAttribute('class', 'contributor-title');
  contributor.appendChild(contributorsDiv);
  contributorsDiv.appendChild(ulEl);
  ulEl.setAttribute('class', 'list');

  // fetch data
  let option;
  fetchData(gitHubApi).then((data) => {
    data.forEach((repoName) => {
      option += `<option value='${repoName.name}'>${repoName.name}</option>`;
    });
    selector.innerHTML = option;
  });

  selector.addEventListener('change', getRepoInfo);
  function getRepoInfo(e) {
    let optionValue = e.target.value;
    fetchData(gitHubApi).then((data) => {
      console.log(data);

      data.forEach((option) => {
        if (optionValue === option.name) {
          repoName.innerHTML = `<b><span>Repository: </b></span><a href ="${option.html_url}">${option.name}</a>`;
          repoDescriptin.innerHTML = `<p><b><span>description: </b></span>${option.description}</p>`;
          repoForks.innerHTML = `<p><b><span>Fork: </b></span>${option.forks}</p>`;
          repoUpdate.innerHTML = `<p><b><span>Update: </b></span>${option.updated_at}</p>`;
          fetchData(option.contributors_url).then((contributors) => {
            console.log(contributors);
            let users;
            contributors.forEach((user) => {
              const userImage = user.avatar_url;
              const userGithubPage = user.html_url;
              const userName = user.login;
              const userContributuins = user.contributions;
              console.log(userContributuins);
              users += `<li class="user-list"> <img class="user-img" src ="${userImage}"> <a href="${userGithubPage}">${userName}</a> <p class="users">${userContributuins}</p></li>`;
            });
            ulEl.innerHTML = users;
          });
        }
      });
    });
  }
}
main();

///=============poke Api=====================================================

// const pokeApi = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=200';

// function fetchData(url) {
//   return fetch(url).then((response) => response.json());
// }

// function main() {
//   const container = document.createElement('div');
//   const content = document.createElement('div');
//   const btnEl = document.createElement('button');
//   let selectEl = document.createElement('select');
//   let imageEl = document.createElement('img');
//   document.body.appendChild(container);
//   container.appendChild(btnEl);
//   container.appendChild(selectEl);
//   container.appendChild(content);
//   btnEl.innerText = 'Get Pokemon';
//   btnEl.addEventListener('click', fetchData2);
//   function fetchData2() {
//     fetchData(pokeApi).then((data) => {
//       const results = data.results;
//       let option;
//       results.forEach((pokemon) => {
//         option += `<option value="${pokemon.name}">${pokemon.name}</option>`;
//       });
//       selectEl.innerHTML = option;
//     });
//   }
//   selectEl.addEventListener('change', addImage);
//   function addImage(e) {
//     let selectValue = e.target.value;
//     fetchData(pokeApi).then((data) => {
//       const results = data.results;
//       console.log(results);
//       results.forEach((poke) => {
//         if (selectValue === poke.name) {
//           fetchData(poke.url).then((imgData) => {
//             let pokeomImg = imgData.sprites.other.dream_world.front_default;
//             imageEl.srcset = pokeomImg;
//             content.appendChild(imageEl);
//           });
//         }
//       });
//     });
//   }
// }

// main();
//============================================================================================

// function main() {
//   // create and append DOM Element

//   // create main div
//   const container = document.createElement('div');
//   container.setAttribute('id', 'app');
//   document.body.appendChild(container);

//   // create btn
//   const btnEl = document.createElement('button');
//   btnEl.setAttribute('id', 'get-poke');
//   btnEl.innerText = 'Get Pokemon';
//   container.appendChild(btnEl);

//   // create seletEl
//   let selectEl = document.createElement('select');
//   selectEl.setAttribute('id', 'choose');
//   container.appendChild(selectEl);

//   function fetchData() {
//     const PokeApi = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=200';
//     fetch(PokeApi)
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           const error = new Error('HTTP ERORR');
//           console.log(error);
//         }
//       })
//       .then((data) => {
//         const allPokemon = data.results;
//         allPokemon.forEach((pokemon, index) => {
//           console.log(pokemon);
//           fetchData2(pokemon);
//         });
//       });
//   }
//   fetchData();
//   function fetchData2(pokemon) {
//     const url = pokemon.url;
//     fetch(url)
//       .then((response) => response.json())
//       .then((pokemonData) => console.log(pokemonData.species.name));
//   }

//   //main funtion
// }
// main();
