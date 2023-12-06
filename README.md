# Project Title
Savebites
## 1. Project Description
With rampant inflation, you deserve to find the lowest meat prices; save your wallet with every bite, Savebites!

## 2. Names of Contributors
List team members and/or short bio's here...
* Dominic Cheung dcheung71@my.bcit.ca - Hi, I am a beginner programmer. Excited to learn Javascript. My favorite food is ramen.
* Maksim Sadreev msadreev@my.bcit.ca  Hi, I am Maksim Sadreev. 
* Tommy Ren tren7@my.bcit.ca - Hi, I am Tommy. 
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* Google maps API
* Google Fonts
* Material Icons
* YouTube tutorials
* Sweet Alerts


## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* 1 - If users are using Savebites for the first time, they will need to click "Start" then register for a new acocunt following the standard Google sign-in interface
* 2 - Once the users have logged in, they are already good to go to start using Savebites.

## 5. Known Bugs and Limitations
Here are some known bugs:
* When a user tries to take a picture with the camera on user's device, the file isn't being saved in the firebase, so it is not showing in the uploaded post. (Camera button is hidden now)
* Map sometimes doesn't show the closest location when typig the location name.


## 6. Features for Future
What we'd like to build in the future:
* Fix mobile camera so users can upload a photo they directly with the phone camera

	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── 404.html                 # error page in case
├── favourite.html           # this is the page where users save their favourite posts and can be accessed from nav bar
├── home_page.html           # this is what the users see after they log in; newsfeed of all the popular deals and all posts
├── index.html               # landing HTML file, this is what users see when you come to url
├── login.html               # aftere the index page when users click start. Can be used for login and registering new accounts.
├── map.html                 # map page when users click on the button on the posts to find the grocery store location
├── my_posts.html            # a page of all posts that the users uploaded. Can be found via navbar -> my profile
├── setting_page.html        # this is the page when users click on profile on the nav bar. Can update account details.
├── upload.html              # this is the page for uploading new posts, can be accessed via navbar.
└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo
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


