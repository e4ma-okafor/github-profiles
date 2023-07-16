const APIURL = 'https://api.github.com/users';
const profiles = document.getElementById('profiles');
const form = document.getElementById('form');
const search = document.getElementById('search');
let profilesArr = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = search.value;
    console.log(user);

    if (user) {
        getUser(user);
        //getRepos(user);
        search.value = '';
    }
})

const getUser = (username) => {
    profiles.innerHTML = '';
    fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
       /* profilesArr = data.map(item => {
            return {
                'userUrl': item.html_url,
                'userID': item.name || item.login,
                'userBio': item.bio ? `<p>${item.bio}</p>` : '',
                'userAvatar': item.avatar_url,
                'userFollowers': item.followers_url,
                'userFollowing': item.following_url,
                'userRepos': item.repos_url,                
            }
        })*/
        console.log(Object.keys(data).length);

        console.log('name: ' + data.name + ', login: ' + data.login.toUpperCase());        
        let card = '';               
        card += `
                <div class="card">
                    <div>
                        <a href="${data.html_url}" class="link">
                            <img src="${data.avatar_url}" alt="${data.name || data.login}" class="avatar">
                        </a>
                    </div>
                    <div class="user-info">
                        <h2>${data.name || data.login.toUpperCase()}</h2>
                        ${data.bio ? `<p>${data.bio}</p>` : ''}
                        <ul>
                            <li>
                                <a href="${data.html_url}?tab=followers" class="link">
                                    ${data.followers}<strong>Followers</strong>
                                </a>
                            </li>
                            <li>
                                <a href="${data.html_url}?tab=following" class="link">
                                    ${data.following}<strong>Following</strong>
                                </a>
                            </li>
                            <li>
                                <a href="${data.html_url}?tab=repositories" class="link">
                                    ${data.public_repos}<strong>Repos</strong>                                
                                </a>
                            </li>
                        </ul>
                        <div id="repos" class="reposContainer"></div>
                    </div>
                </div>
                `
            profiles.innerHTML = card;        
        //displayProfiles(profilesArr);
        getRepos(username);
    })
    .catch(err => {
        console.log(err);
        console.log(typeof err);
        if (typeof err == 'object' || 'undefined') {
            let display = `
                          <div class="card">
                              <h1>This user does not exist</h1>
                          </div>
                          `
            profiles.innerHTML = display;
        } else {
            let errorMessage = `
                           <div class="card">
                               <h1>${err}</h1>
                           </div>
                           `
            profiles.innerHTML = errorMessage;
        }
    })
}
//getUser();

/*const displayProfiles = arr => {
    let card = ``;
    for (let i = 0; i < arr.length; i++) {
        card += `
                <div class="card">
                    <div>
                        <a href="${arr[i].userUrl}" class="link">
                            <img src="${arr[i].userAvatar}" alt="${arr[i].userID}" class="avatar">
                        </a>
                    </div>
                    <div class="user-info">
                        <h2>${arr[i].userID.toUpperCase()}</h2>
                        ${arr[i].userBio}
                        <ul>
                            <li>
                                <a href="${arr[i].userUrl}?tab=followers" class="link">
                                    ${arr[i].userFollowers.length}<strong>Followers</strong>
                                </a>
                            </li>
                            <li>
                                <a href="${arr[i].userUrl}?tab=following" class="link">
                                    ${arr[i].userFollowing.length}<strong>Following</strong>
                                </a>
                            </li>
                            <li>
                                <a href="${arr[i].userUrl}?tab=repositories" class="link">
                                    ${arr[i].userRepos.length}<strong>Repos</strong>                                
                                </a>
                            </li>
                        </ul>
                        <div id="repos"></div>
                    </div>
                </div>
                `
    }
    profiles.innerHTML = card;
}*/


const getRepos = (username) => {       
    fetch(`https://api.github.com/users/${username}/repos?sort=created`)
    .then(response => response.json())
    .then(repos => {
        console.log(repos);
        const repoEl = document.getElementById("repos");
        repoEl.innerHTML = '';
        let repoCard = '';
        repos.forEach(repo => {
            repoCard += `
                    <a href="${repo.html_url}" class="repo link" target="_blank">
                        ${repo.name}
                    </a>
                    `
        });
        repoEl.innerHTML = repoCard;
    })
    .catch(msg => {
        console.log(msg);
        let errDisplay = `
                         <div class="card">
                             <h1>${msg}</h1>
                         </div>
                         `
        repoEl.innerHTML = errDisplay;
    })
} 
//getRepos();

/*const addRepos = (repos) => {
    const repoEl = document.getElementById("repos");
    repoEl.innerHTML = '';
    let repoCard = '';
        repoCard += `
                    <a href="repos.html_url" class="repo link" target="_blank">
                        ${repos.full_name}
                    </a>
                    `
        repoEl.innerHTML = repoCard;
}*/