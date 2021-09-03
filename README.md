# Visage Interview Exercise

This repository contains two apps, part of interview exercise.
Follow README.md files in each folder on how to setup.

The app assumes that you have a Postgresql database setup.
You can define configuration in `backend/src/database/config/config.json`.

If all is setup correctly, you should be able to have both apps (backend and frontend)
interacting:
1. Start backend with `cd backend && npm start`
2. Start frontend with `cd frontend && npm run serve`

The frontend knows which how to make api calls to backend from this file: `frontend/vue.config.js`.
