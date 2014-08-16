Startpage
================
This is a simple startpage for your Firefox.    
Preview at http://gandalfx.deviantart.com/art/Firefox-Startpage-432313142    
Source  at http://github.com/gandalfx/startpage     

Features:
* Quickly select one of several search engines after entering your search term
* Display random image from a collection
* Scroll/Click through multiple collections of images
* Toggle different styles (defaults are dark and "white")
* Fast page loading (uses local storage of your browser, no external libraries)
* Works without internet connection (for offline use)
* Configurable

Limitations:
* Since I use Firefox this is optimized for Firefox. Other Browsers may require some adjustments (It looks horrible in Opera right now, because Opera sucks).

To gain the instant gratification of using this amazing startpage, you need to
* copy the files into a directory on your computer (e.g. via "git clone")
* create your own config.js (you can just copy example-config.js and adjust it to your needs)
* get your Browser to use them...

in Firefox:
* Type "about:config" into the url-bar
* Get rid of the annoying are-you-sure message (if you haven't already)
* Find the key "browser.newtab.url" and change it's value to the path to your index.html file (e.g. "file:///home/gandalfx/.config/startpage/index.html")

You should immediatly find the startpage in any new tabs you open.

Configuration
-------------
Configuration is stored in three files: `search.conf`, `pictures.conf` and `menus.conf`.
You can create them renaming the `example-*` Files. The file format is rather simple. Anything preceeded by "#" is a comment and will be ignored. Just stick with the pattern you see in the file and you should be fine.

To add a new search engine you will have to find out how it's search URL is built. There is usually a base URL and some sort of GET-Parameter (in the final URL it is preceeded by '?' or '&'). If you don't know anything about that stuff you can drop me a note.

Images may be grouped in collections and collections can be ordered. Each image is paired with a
prefered style (currently only default and "white").
I recommend storing images on your harddrive ("file://" URLs), otherwise loading times may increase significantly.

For your changes in the *.conf files to have any effect you need to reload your configuration by clicking "clear" in the settings menu on the bottom right of the startpage.

About & Contributing
--------------------
I started this mini project mostly to learn (raw) JavaScript, which is why there are no external libraries like jQuery included. It is mostly intended to be fast.

Pull requests, especially with new search engines, are always welcome.

Make sure that pull requests contain an up-to-date version of the minified css and js files
(i.e. run the build.sh script before you commit)
