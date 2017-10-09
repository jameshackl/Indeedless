function hidePosting(){
    //add hidden post to storage
    var posts = JSON.parse(localStorage.getItem('hiddenPostings'));
    var posting = document.activeElement.getAttribute("id");
    posts.push(posting);
    localStorage.setItem('hiddenPostings',JSON.stringify(posts));

    //remove from page
    hidePostingElement(posting);


}

function hidePostingElement(post){
    var element = document.querySelector('[data-jk="' + post + '"]');

    if(element != null){
        element.remove();
    }
           
}

function clearHiddenList(){
    localStorage.clear();
}

var postings = Array.from(document.querySelectorAll('.row,.result'));

if(localStorage.getItem('hiddenPostings'))
    {
        //remove hidden postings
        var posts = JSON.parse(localStorage.getItem('hiddenPostings'))
        for (var index = 0; index < posts.length; index++) {
            hidePostingElement(posts[index]);  
        }
    }
else
    {
        //initialize storage
        localStorage.setItem('hiddenPostings','[]');
    }

for(var i = 0; i < postings.length; i++)
    {
        //postings[i].classList.add("highlight_posting");
        var currentPosting = postings[i].getAttribute("data-jk");
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

        //var insertString = '<p>Indeedless: <button>hello</button></p>';
        // var insertString = '<p>Indeedless: <a href="javascript:hidePosting(' + currentPosting +')">Hide Post</a> <a href="javascript:clearHiddenList()">Clear List</a></p>';
        // postings[i].insertAdjacentHTML("beforeend",insertString);
    }


