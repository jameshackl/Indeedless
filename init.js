var filterDefaults = [
    {'archived': false},
    {'saved': false},
    {'applied':false},
    {'visited':false}
];

var databaseDefault = {'hiddenPostings':[]};

//check to see if a database exists, if not create one. now every other file can assume it exists
chrome.storage.local.getBytesInUse(function(bytesUsed){
    if(bytesUsed == 0)
    {
        filterDefaults.forEach(function(filter) {
            chrome.storage.local.set(filter,function(){});
        }, this);
        chrome.storage.local.set(databaseDefault,function(){});
    }
});


