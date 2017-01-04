# final-project-frontend

<h1>London Fashion Xchange</h1>

<h2>Overview</h2>
<p>This project was built using a Ruby on Rails API with an AngularJS front end. I utilised the CSS framework Skeleton for styling and Amazon Web Services to enable drag and drop images.</P>

<h2>Technologies</h2>
<p>Ruby on Rails API, PostgreSQL, AngularJS, Skeleton, HTML, SCSS, AWS, Sketch, Trello</p>

<h2>Description</h2>
<p>This was my final project with WDI and was a solo project. I chose to build a clothing exchange website, enabling registered users to offer their clothing or accessories in exchange for an item owned by another user. The first part of this project involved drawing out an ERD to establish the relationships between my models on the API. It was established that an item could only have one owner however a user could have many items. The relationship with the swaps was slightly more complicated as an item could have many offers for exchange from different users.

<p>After the models and ERD were established, I then used Sketch to design my initial wireframes and user journey. I set up a Trello board to manage the tasks and track progres. The first task from a development perspective was to set up the Ruby on Rails back end API. This was also where I set up the drag and drop option for users to upload items that they'd like to exchange. I also utilised Amazon Web Services to host the photos. </p>

<p>The next step was to begin the Angular front end code. Users needed to be able to create a profile, edit their own profile, add items, edit items, delete items and view other users profiles but not edit or delete them. I had models for users, items and requests/offers. The controllers then allowed users to make requests, accept or decline requests and cancel requests. The items and users controllers contained all of the CRUD actions and the auth controller contained the code for user authentication via login and register.</p>

<p>I used Skeleton as my CSS framework of choice for the design aspect of the site, this was easily able to be customised using the basic grid and navbar layout</p>

<h2>What Next</h2>
<p>Things I'd really like to add to this project would be a map showing the locations of all users which would enable users to see how far away they were front each other, aiding in determining if they'd like to proceed with a swap. It would also be useful to integrate login via facebook or instagram.</p>



