# Indeedless
I found it tiring to have to filter through the hundreds of posts everyday. This chrome extension adds the option to hide posts. Hidden posts are persistent on the same computer. 

## Installation

Download or clone the repository.

If you downloaded the repository, extract it to a directory.

Go to [chrome://extensions/](chrome://extensions/) 

Enable 'Developer Mode'.

Select 'Load unpacked extension...'

Navigate to repo folder then select 'Ok' to install the extension.

(To update, sync repo folder then select 'Reload' in the extensions manager)

## Usage

After the extension is installed a button will be added to the job postings on Indeed: Hide Post.

Hide Post will hide the post immediately and for anysubsequent visits.

## Options

Clicking the Indeedless icon drops down the settings.

Filters for archived, saved, applied to, and visited posts are available.

To clear the cache of hidden posts, select the 'Clear' button.

## TODO

- make an 'Undo' button.
- provide additional information about posts in the clearing and restoring options.
- make hidden posts persistent across any computer you log into with a google account?
- prefetch multiple pages

## ChangeLog
v0.0.2 
- moved 'Clear List' button to settings. 
- cross domain storage. filtering is applied accross all domains.(currently "https://ca.indeed.com/*","https://www.indeed.ca/*")
