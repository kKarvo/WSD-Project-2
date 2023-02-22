# Project 2: Drill and practice

This application provides the user with a list of topics which the user can then
create multiple choice questions for. These questions may be answered, modified,
and deleted by the user themselves or other users of the application. Furthermore,
the applicaiton has a quiz mode in which the user chooses a topic they are
interested in and the applicaiton fetches a random question from that topic. The
user then is presented with the answer options and depending on the users' answer,
feedback is provided.
Additionally the application includes API functions. API GET requests are responded
to with a random question and answeroptions form the database. API POST requests 
are responded to with the information that was the sent answer correct or not.
The main page of the application also provides the user with some simple statistics
of the application database, including the number of topics, questions, and user-
submitted answers.

This application does not have an online deployment location due to difficulties
with registering for fly.io.

## Running the application locally

This application is run with Docker Compose

To run the application, open up terminal in the folder /project1 which includes
the file docker-compose.yml and run the command `docker compose up --build`.

To close the application you can press `ctrl + C` in the same terminal where you
started the application, or open up a new terminal in /project1 which contains
docker-compose.yml and type in `docker compose down`.

When running `docker compose up --build` the application will automatically make
a PostgreSQL database and attach it to your application. The database can be
accessed through the terminal with the command
`docker exec- it database-server psql -U username database`. After gaining
access, the database can be modified through SQL commands.

## Running the tests

The application includes e2e tests in the folder /e2e-playwright/tests. These
can be run by opening the a terminal in the folder /project1 and entering the
command `docker-compose run --entrypoint=npx e2e-playwright playwright test`. It
should be noted that the tests are meant to be done on an empty database. The
database can be reset by the command `docker-compose rm -sf`.
