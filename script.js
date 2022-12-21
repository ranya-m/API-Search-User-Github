let body = document.querySelector("body");
let form = document.querySelector("form");
let data;

form.addEventListener("submit", (event)=>{
    event.preventDefault();

    let search = form.elements["search"];
    if (search.value.trim() !== "") {
        fetchData(search.value);
    }
}
);


function fetchData(userName) {
    fetch("https://api.github.com/users/"+userName)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        // console.log(response);
        data = response;

        document.querySelector(".homeImg").classList.add("hide");

        document.querySelector(".container-header").innerHTML = ` <img src="${data.avatar_url} /" id="userAvatar"> `;
        document.querySelector("#name").textContent = "User Name : " +data.name ; 
        document.querySelector("#email").textContent = "User Email : " +data.email ;
        document.querySelector("#creationDate").textContent = "Account created at : " +data.created_at ;
        document.querySelector("#publicRepos").textContent = "Number of public repositories : " +data.public_repos ;
       
       // fetch the second data : to see the list of the user's repositories 
       fetch("https://api.github.com/users/"+userName+"/repos")
       .then((response2) => {
           return response2.json();
       })
       .then((response2) => {
           console.log(response2);
           repoDatas = response2; // this is the array that contains all the repositories meaning all the objects

        //  each repository contains the the 2 properties i want to display in text : html_url and name

        let userRepos = document.querySelector("#userRepos");
        
        userRepos.textContent = "Click on the name of a repository to see it's content";

        repoDatas.forEach(elementRepo => {
           let oneRepo = document.createElement("li");
         
           let oneRepoLink = document.createElement("a");
           userRepos.appendChild(oneRepo);
           oneRepo.appendChild(oneRepoLink);
           oneRepoLink.setAttribute("href", `https://github.com/${userName}/${elementRepo.name}`);
           oneRepoLink.setAttribute("target", "_blank");
           oneRepoLink.textContent = elementRepo.name;       
        }
        );
       })
       .catch((err) => console.error(err));
       

        // btn to visit the profile of user
        let btnVisit = document.querySelector("#btnVisit");
        btnVisit.classList.remove("hide");
        btnVisit.addEventListener("click",() => {
            window.location.href = data.html_url;
        }
        );
    
    // (incomplete) Later I want to add a submit control, globally, for if a value is absent for one of the data, I get my own message instead of "null"  
    //    for(property of data) {
    //     if(property == null) {
    //         property.textContent = ` The user does not have this data on their profile `;
    //     }
    //    }
    
    })
    .catch((err) => console.error(err));
}


//(incomplete) function to get a list of users repositories with an overview of each 
// function fetchReposData(userName) {
    // fetch("https://api.github.com/users/"+userName,"/repos")
    // .then((response) => {
    //     return response.json();
    // })
    // .then((response) => {
    //     console.log(response);
    //     repoData = response;

    //     let displayRepos = document.querySelector("#displayRepos");
    //     let displayReposUrl = document.querySelector("#displayReposUrl");

    //     displayRepos.textContent = "description :"+repoData.description;
    //     displayReposUrl.innerHTML = +repoData.html_url;
    // })
    // .catch((err) => console.error(err));
// }