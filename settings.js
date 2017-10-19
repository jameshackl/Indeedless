function clearHiddenList(){
    chrome.storage.local.remove('hiddenPostings');
    chrome.storage.local.set({'hiddenPostings':[]});
    //TODO:confirmation dialog
}

function setFilter(filterType){
    var x = {};
    x[filterType] = document.getElementById(filterType).checked;
    chrome.storage.local.set(x);
}

var filters = [
    'archived',
    'saved',
    'applied',
    'visited'
];

//document setup
document.getElementById('clearHidden').addEventListener('click',function(){clearHiddenList();});

filters.forEach(function(filterType) {
    document.getElementById(filterType).addEventListener('click',function(){setFilter([filterType]);});
}, this);

chrome.storage.local.get(function(settings){
    filters.forEach(function(filterType) {
        document.getElementById(filterType).checked = settings[filterType];
    }, this);
}); 