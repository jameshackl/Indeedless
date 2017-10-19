//button on click function
function hidePosting(){
    //add hidden post to storage
    var posting = document.activeElement.getAttribute("id");
    chrome.storage.local.get('hiddenPostings', function(posts){
        posts['hiddenPostings'].push(posting);
        chrome.storage.local.set(posts);
    });
    
    //remove from page
    hidePostingElement(posting);
}

function hidePostingElement(post){
    var element = document.querySelector('[data-jk="' + post + '"]');

    if(element != null){
        element.remove();
    }      
}

var postings = Array.from(document.querySelectorAll('.row,.result'));
var filters = [];



chrome.storage.local.get(null, function(settings){
    //pull out filter settings first
    for(setting in settings){
        if(settings[setting] == true){
            filters.push(setting);
        }
    }

    //then start formatting the page
    for(var i = 0; i < postings.length; i++){
        var currentPosting = postings[i].getAttribute("data-jk");

        //inject custom elements    
        var pElement = document.createElement("p");
            pElement.appendChild(document.createTextNode("Indeedless: "));
        var hideButton = document.createElement("button");
            hideButton.setAttribute("id",currentPosting);
            hideButton.appendChild(document.createTextNode("Hide Posting"));
            hideButton.addEventListener('click',function(){hidePosting();});
    
        pElement.insertAdjacentElement("beforeend",hideButton);
        postings[i].insertAdjacentElement("beforeend",pElement);

        //apply filters from settings
        if(postings[i].innerHTML != null){
            filters.forEach(function(element) {
                if(!(postings[i].querySelector('.myjobs-serp-link') == null)){//null filter
                    if(postings[i].querySelector('.myjobs-serp-link').innerHTML.toUpperCase()== element.toUpperCase()){
                        hidePostingElement(currentPosting);
                    } 
                }
            }, this);
        }
    }
    
    var postsToHide = settings['hiddenPostings'];
    //hide postings from storage
    for (var i = 0 ; i < postsToHide.length; i++) {
        hidePostingElement(postsToHide[i]);
    } 
});

