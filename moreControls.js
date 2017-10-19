function hidePosting(){
    //add hidden post to storage
    var hiddenPosts = {};
    var posting = document.activeElement.getAttribute("id");
    chrome.storage.local.get('hiddenPostings', function(posts){
        posts['hiddenPostings'].push(posting);
        hiddenPosts['hiddenPostings'] = posts;
    });
    chrome.storage.local.set(hiddenPosts);

    //remove from page
    hidePostingElement(posting);
}

function hidePostingElement(post){
    var element = document.querySelector('[data-jk="' + post + '"]');

    if(element != null){
        element.remove();
    }      
}

//TODO: Remove button from posts
function clearHiddenList(){
    localStorage.removeItem('hiddenPostings');
}

//only apply wanted filters
var filters = [];
chrome.storage.local.get(null, function(settings){
    for(setting in settings){
        if(settings[setting] == true){
            filters.push(setting);
        }
    }
});


//after page loads...
//remove hidden postings
chrome.storage.local.get('hiddenPostings', function(posts){
    for (var index = 0; index < posts.length; index++) {
        hidePostingElement(posts[index]);  
}});


var postings = Array.from(document.querySelectorAll('.row,.result'));

for(var i = 0; i < postings.length; i++)    {
    //postings[i].classList.add("highlight_posting");
    var currentPosting = postings[i].getAttribute("data-jk");

    //apply filters from settings
    if(postings[i].innerHTML != null){
        filters.forEach(function(element) {
            if(postings[i].querySelector('.myjobs-serp-link').innerHTML.toUpperCase() == element.toUpperCase()){
                hidePostingElement(currentPosting);
            }
        }, this);
    }

    //inject custom elements    
    var pElement = document.createElement("p");
        pElement.appendChild(document.createTextNode("Indeedless: "));
    var hideButton = document.createElement("button");
        hideButton.setAttribute("id",currentPosting);
        hideButton.appendChild(document.createTextNode("Hide Posting"));
        hideButton.addEventListener('click',function(){hidePosting();});
    var clearButton = document.createElement("button");
        clearButton.appendChild(document.createTextNode("Clear List"));
        clearButton.addEventListener('click',function(){clearHiddenList();});

    pElement.insertAdjacentElement("beforeend",hideButton);
    pElement.insertAdjacentElement("beforeend",clearButton);
    postings[i].insertAdjacentElement("beforeend",pElement);
}


