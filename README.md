# Project Title
Savebites

## 1. Project Description
With rampant inflation, many people are struggling to pay for their usual groceries. According to Statistics Canada, the annualized inflation rate for groceries hit 11.4% at the start of 2023, and prices have continued to go up since then. The Canadian Broadcasting Corporation recently published a report stating that Canadians are planning to consume less meat due to inflation. 
BCIT tasked us to design an app to improve our city for our COMP 1800 Projects course. So, we at Team BBY12 decided to create an app that helps alleviate the impact of inflation by providing a tool for the community to share deals for meats not found online. By tapping into the power of crowdsourcing, anyone can share their findings with their community in real time. 


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
* 3 - Reommendation after logging in: Check out the Home Page for hot deals and start liking, or adding it to your Favourites list.
* 4 - Also consider uploading a post for any hot deals you may have found and give back to the community.


## 5. Known Bugs and Limitations
Here are some known bugs:
* When a user tries to take a picture with the camera on user's device, the file isn't being saved in the firebase, so it is not showing in the uploaded post. (Camera button is hidden now)
* Map does not default to the closest Safeway, Save-On-Foods, etc.
* Map's icon results is not clickable.


## 6. Features for Future
What we'd like to build in the future:
* Fix mobile camera so users can upload a photo they directly with the phone camera
* Make Map more interactive by allowing it to add a location via touch as opposed to text only.
* We are going to use more Bootstrap libraries in the future to create more animation and beautiful effect to decorate our UI.
* Automatically hide posts on Home Page if the deal has expired.
* Automatically hide posts with a large amount of dislikes.
* Add OCR features so fields are automatically filled in the Upload Posts page.


	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── 404.html                 # 404 Error page 
├── favourite.html           # This is the page where users save their favourite posts and can be accessed by nav bar
├── home_page.html           # Splash page after logging in. A newsfeed of all the popular deals and all posts
├── index.html               # First page with our logo and the Start button
├── login.html               # Used for login and registering new accounts. Accessible by clicking the Start button on our index page.
├── map.html                 # Loads the Google Map API, this is where users can find grocery stores without switching out of the app. Accessible by clicking the Map button on posts.
├── my_posts.html            # This is where users can check their own posts. Can be found via navbar -> my profile
├── setting_page.html        # This is where users can update their profile, check their own posts, and log out to switch account. Can be accessed by clicking profile icon on the nav bar
├── upload.html              # This is where users can create and upload their own posts. It can be accessed via navbar
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


