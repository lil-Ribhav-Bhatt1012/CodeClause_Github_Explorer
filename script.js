const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const repositoriesContainer = document.getElementById('repositories');
const userDetailsContainer = document.getElementById('userDetails');
const accessToken = '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'; // Replace with your GitHub API token

searchButton.addEventListener('click', () => {
  const username = searchInput.value;
  if (username) {
    searchUser(username);
    searchRepositories(username);
  }
});

function searchUser(username) {
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };

  fetch(`https://api.github.com/users/${username}`, { headers })
    .then(response => response.json())
    .then(user => {
      userDetailsContainer.innerHTML = `
        <h2>${user.name || username}</h2>
        <p>Repositories: ${user.public_repos}</p>
      `;
      fetch(`https://api.github.com/users/${username}/followers`, { headers })
        .then(response => response.json())
        .then(followers => {
          userDetailsContainer.innerHTML += `<p>Followers: ${followers.length}</p>`;
        })
        .catch(error => {
          console.error('Error:', error);
        });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function searchRepositories(username) {
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };

  fetch(`https://api.github.com/users/${username}/repos`, { headers })
    .then(response => response.json())
    .then(repositories => {
      repositoriesContainer.innerHTML = '';
      repositories.forEach(repo => {
        const repositoryDiv = document.createElement('div');
        repositoryDiv.classList.add('repository');
        const title = document.createElement('h3');
        title.textContent = repo.name;
        const description = document.createElement('p');
        description.textContent = repo.description || 'No description available.';
        repositoryDiv.appendChild(title);
        repositoryDiv.appendChild(description);
        repositoriesContainer.appendChild(repositoryDiv);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
