# MP-MAP
This application was designed to demonstrate the communication of the back end and front end by using PHP, JavaScript, and MySQL.

### How to run?
  - Download or clone the project and run the file gp-map>public>“index.html”.
  - Or you can run it directly by clicking to this link

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

### MySQL - PHP - Public Configs (Optional) 
- Config the connection to your database
Open the file “config/database.php”
- Config the connection to your API 
Open the file “public/configJS.js”.

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
