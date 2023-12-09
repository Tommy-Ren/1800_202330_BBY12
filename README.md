# Project Title
Savebites

## 1. Project Description
As inflation looms, you deserve to find the lowest meat prices; save your wallet with every bite, Savebites!

## 2. Names of Contributors
List team members and/or short bio's here...
* Dominic Cheung dcheung71@my.bcit.ca - Hi, I am a beginner programmer. Excited to learn Javascript. My favorite food is ramen.
* Maksim Sadreev msadreev@my.bcit.ca  Hi, I am Maksim Sadreev. 
* Tommy Ren tren7@my.bcit.ca - Hi, I am Tommy. Let's have fun and create something new.
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* Google maps API
* Google Fonts
* Material Icons
* YouTube tutorials (Maksim: https://www.youtube.com/watch?v=UFD4SP91tSM&t=5427s, https://www.youtube.com/watch?v=CxgOKJh4zWE&t=1s, https://www.youtube.com/playlist?list=PLhPyEFL5u-i3uKNMHSDFx0_EqWiiPsvLk) 
* SweetAlert2
* ChatGPT (Maksim: I used ChatGPT to fix some bugs and to help me with Google Maps API) 
* W3Schools (Tommy: https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_date, https://www.w3schools.com/bootstrap5/index.php/index.php)
* MDN (Tommy: https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* Bootanipp (Tommy: https://bootsnipp.com/tags/profile/4)


## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* 1 - If users are using Savebites for the first time, they will need to click "Start" then register for a new acocunt following the standard Google sign-in interface
* 2 - Once the users have logged in, they are already good to go to start using Savebites.
* 3 - After login, the first page user can see is the Home page. All posts are about good price meat in local grocery stores with a recent date. User can check more detailed information about this item by clicking the view more button. User can add it in favourtie list and give a like or dislike.
* 4 - User can create their own post by clicking the "plus" icon in the nav bar. User need to give a title, a short description, price, expiration date, meat category (pork, beef, chicken), store name, and store address to create a complete post. Once user created the post, user can see their posts on our home page.
* 5 - If users want update their personal information or check the posts they uploaded, they can click the profile icon in the nav bar to go to the setting page. User can click the Edit button to edit their personal information and address. User can click Log Out button to log out and switch account.

## 5. Known Bugs and Limitations
Here are some known bugs:
* When a user tries to take a picture with the camera on user's device, the file isn't being saved in the firebase, so it is not showing in the uploaded post. (Camera button is hidden now)
* Map sometimes doesn't show the closest location when typig the location name.
* Map sometimes shows the icon of current location twice.

## 6. Features for Future
What we'd like to build in the future:
* Fix mobile camera so users can upload a photo they directly with the phone camera
* Fix map so users can use map to set their address directly using a visual map instead of text.
* We are going to use more Bootstrap libraries in the future to create more animation and beautiful effect to decorate our UI.

	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── 404.html                 # 404 Error page HTML file, the page showed when web page not found
├── favourite.html           # Favourite page HTML file, this is the page where users save their favourite posts and can be accessed by nav bar
├── home_page.html           # Home page HTML file, this is what the users see after they log in; newsfeed of all the popular deals and all posts
├── index.html               # Landing HTML file, this is what users see when you come to url
├── login.html               # Login HTML file, a page used for login and registering new accounts. Can be visited aftere the index page when users click Start button
├── map.html                 # Map page HTML file, this is where users can find the grocery store location. Can be visited by clicking the map or location button on the posts.
├── my_posts.html            # My Posts page HTML file, this is where users can check their own posts. Can be found via navbar -> my profile
├── setting_page.html        # Setting page HTML file, this is where users can update their profile, check their own posts, and log out to switch account. Can be accessed by clicking profile  icon on the nav bar
├── upload.html              # Upload page HTML file, this is where users can create and upload their own posts. It can be accessed via navbar
└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── old                      # archive for unused and experimental code
├── images                   # Folder for images
    /favicon.ico             # Taken from: https://icons8.com/icon/38824/meat
    /IMG_4514.jpg            # Took picture myself at Safeway (Dominic)
    /IMG_4515.jpg            # Took picture myself at Safeway (Dominic)
    /IMG_4516.jpg            # Took picture myself at Safeway (Dominic)
    /IMG_4517.jpg            # Took picture myself at Safeway (Dominic)
    /IMG_4518.jpg            # Took picture myself at Safeway (Dominic)
    /LOGO.svg                # SVG file provided by Tommy
    /Savebites.jpg           # logo provided by Tommy
├── scripts                  # Folder for scripts
    /authentication.js       # script for firebase login
    /createPosts.js          # script for creating post cards
    /favourite.js            # script for the favourites page
    /firebaseAPI_BBY12.js    # script for firebase credentials
    /home_page_posts.js      # script for generating cards on home page
    /map.js                  # script for loading google maps
    /my_posts.js             # script for loading cards for posts uploaded by users themselves
    /setting_page.js         # script for the profile page
    /upload.js               # script for uploading new posts
    /username_home.js        # script for customized home screen to show user name and address
├── styles                   # Folder for styles
    /style.css               # Font and Icon imports, media query size to iPhone 15 Pro Max, vanilla CSS adjustments 


```


