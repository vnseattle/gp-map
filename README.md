# MP-MAP
This application was designed to demonstrate the communication of the back end and front end by using PHP, JavaScript, and MySQL.

### How to run?
  - Download or clone the project and run the file gp-map>public>“index.html”.
  - Or you can run it directly by clicking to this link http://vnsdev.com/gp-map/

### Structure
Folders 
```sh
gp-map
├── api (Server-side)
│   ├── event
│       ├── read.php
│   └── impact
│       ├── read.php
|   └── user
│       ├── read.php
│       ├── random.php
├── config
│   ├── Database.php
├── models
│   ├── Event.php
│   └── Impact.php
│   └── User.php

├── public (Client-side)
│   ├── assets
│   └── scripts
│   └── styles
│   └── index.html
└── README.md
```
  - Folders: API, models, and config were built by PHP, and connect to the MySQL server. The purpose is to create APIs for front-end usage.
  - The public folder was created by JavaScript, HTML to get data from the back end via APIs so you can run the app on any browser or copy it to run separately. 

### Public Configs (Optional) 
- Config the connection to your database
    - Open the file ```“config/Database.php”```
- Config the connection to your API and Google API
    - Open the file ```“public/Scripts/configJS.js”```

### APIs
You can test the APIs by running the following links:

| GET | API |
| ------ | ------ |
| User | [YOUR-HOST]/gp-map/api/__user__/read.php?id=[USER-ID] |
| Impact | [YOUR-HOST]/gp-map/api/__impact__/read.php?id=[USER-ID] |
| Events | [YOUR-HOST]/gp-map/api/__event__/read.php?lat=[LATIDUE]&lng=[LONGITUE]&dis=[DISTANCE]&date=[DATE] |

EXAMPLE 

| GET | API |
| ------ | ------ |
| User | http://vnsdev.com/gp-map/api/user/read.php?id=11531489 |
| Impact | http://vnsdev.com/gp-map/api/impact/read.php?id=11531489 |
| Events | http://vnsdev.com/gp-map/api/event/read.php?lat=30.3328019&lng=-97.7009416&dis=5&date=2015-12-6 |

### Features!

This function is to show events nearby to the user. 

1.	Use Case 1: User accesses the page with their account and sees events nearby.
The user can have a quick view of the events: Title, distance from their house, etc
2.	Use Case 2: User wants to try to move to another location and see events near them at X distance.
By using the tool on the left side, the user can change the date, the new location by providing the address, and distance options.
The red line helps the user keep track of the multiple new locations that they have created.

### Resources

* [jQuery] - JavaScript library designed to simplify HTML DOM.
* [Bootstrap] - Free and open-source CSS framework. 
* [Google Map API] - The Maps JavaScript API lets you customize maps with your own content.