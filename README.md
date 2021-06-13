<h1>TODO List with NodeJS Express for backend, and VueJS on frontend</h1>

Install and run project:

- BACKEND

  - `cd backend`
  - `npm install`
  - `cp .env.example .env`
    - You will need to set a mongo instance
  - `npm run start`

- FRONTEND
  - `cd frontend`
  - `npm install`
  - `npm run serve`

Dockering

- The project is ready to publish containers. You should update some info to publish all project, including database mongoDB
  - Change `docker-compose.yml` with ports you want
  - Change `constantes.js` with url to backend
    - Example: `API_URL: "http://localhost:9077",` or `API_URL: "http://api.todolist.com",`
  - Run `bash run_docker.sh`
