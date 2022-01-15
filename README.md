# BOUN-SWE573

## SWE573 Project

URL: https://communityplatform-dev.azurewebsites.net/login

## Overview

In this project, the main goal is to develop a platform to bring the community together and encourage them to share their special talents or interests with each other. We have called ‘services’ for this sharing activity. People can provide services and/or take services. Services are provided for time-credit. To be able to take a service, a user must have enough time credit in his/her wallet. A user cannot provide services all the time. To build give-and-take community, the system pushes people to take a service if they have collected 15 hours credit. When a new user signed up, he/she get 5 credits. The credit is determined by the duration of the service. If the service is 5 hours long, it costs 5 hours time credit. The taker’s credit is transferred to the provider when the service is done.

Besides services, users can also organize and/or attend events. Events does not change time credits. They are just to get closer the community. 

![image](https://user-images.githubusercontent.com/6725424/148957477-76713d5e-7310-4665-b9ee-2d718b4f0da3.png)

## System Manual

If a person download this repository and wants to run locally the followed steps should followed.

* Install PostgreSQL, Python 3.9.7, NodeJS 14.x <br />
* Run psql -f postgres_dump.sql -p <port> -U <username> <dbname> <br />
(Because db credentials are given in secret keys, those parts in code should be changed according to new connection credentials) <br />
* Run -> docker network create swe573-network
* For each back-end services the below code should be run with the api’s specific directory and name <br />
  * cd backend_services/user_api <br />
  * docker build ./ -t userapi:v1 --no-cache <br />
  * docker run --name user-api -d -p 80:80 user-api:v1 <br /> (service-api p:81, event-api p:82, feedback-api p:83, attendance-api p:84) <br />
  * docker network connect swe573-network user-api <br />
* For the front-end, local api addresses should be provided inside code manually, because it is getting this configuration during deployment automatically. <br />
* Then the below code should be run under /ui directory <br />
  * npm install <br />
  *	npm start <br />
*	System should be up and ready locally.

## User Manual

The system can be used as below.

! Attention: Because the certificates are created with open ssl, the addresses for the APIs below should be marked as trusted in browser.

https://dev-serviceapi.westus.azurecontainer.io/ <br />
https://dev-userapi.westus.azurecontainer.io/ <br />
https://dev-attendanceapi.westus.azurecontainer.io/ <br />
https://dev-feedbackapi.westus2.azurecontainer.io/ <br />
https://dev-eventapi.westus2.azurecontainer.io/ <br />

## Support
If you need support please contact me on iremacildi@gmail.com.
