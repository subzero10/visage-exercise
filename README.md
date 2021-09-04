# Visage Interview Exercise

### Notes:

- This repository contains two apps, part of an interview exercise.
- The app is deployed on heroku.
- The database is postgres.
- There are tests for each project, to demonstrate understanding of test suites and how to write testable code.
- The bonus part of the exercise is done by tracking an upload source id (fingerprintjs), since I did not implement authentication. 

### Start the apps locally:

The backend app assumes that you have a Postgresql database setup.
You can define configuration in `backend/src/database/config/config.json`.

Follow README.md files in each folder on how to setup.

If all is setup correctly, you should be able to have both apps (backend and frontend)
interacting:
1. Start backend with `cd backend && npm start`
2. Start frontend with `cd frontend && npm run serve`

The frontend knows which how to make api calls to backend from this file: `frontend/vue.config.js`.
