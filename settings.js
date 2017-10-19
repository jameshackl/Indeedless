function clearHiddenList(){
    chrome.storage.local.remove('hiddenPostings');
    chrome.storage.local.set({'hiddenPostings':[]});
    alert('Cleared List'); //TODO: confirmation dialog
}

function setFilter(filterType){
    var x = {};
    x[filterType] = document.getElementById(filterType).checked;
    chrome.storage.local.set(x);
    alert(filterType);
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
        //alert(settings[filterType]);
        document.getElementById(filterType).checked = settings[filterType];
    }, this);
}); 