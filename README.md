# BCR - Car Management Dashboard

Aplikasi web express.js untuk management data mobil dengan fungsi CRUD. Aplikasi dibuat sebagai bagian dari challenge chapter 5, fullstack web development course di Binar Academy.

# Frontend Server

## Running Server

    cd frontend
    npm install
    npm start

`npm install` diperlukan **hanya saat penggunaan pertama** untuk menginstall semua dependencies yang diperlukan dalam project.  
Server frontend secara default akan berjalan di `http://localhost:3000/`  
Port server bisa diganti di dalam file `frontend/server.js`

## Server Routing
| Page | Default Route |
|--|--|
| Homepage | `http://localhost:3000/` |
| Add Car | `http://localhost:3000/add` |
| Edit Car | `http://localhost:3000/edit?id={carId}`
 
 

# Backend Server

## Running Server

    cd backend
    npm install
    npm start

`npm install` diperlukan **hanya saat penggunaan pertama** untuk menginstall semua dependencies yang diperlukan dalam project. 
Server frontend secara default akan berjalan di `http://localhost:4000/`
Port server bisa diganti di dalam file `backend/app.js`

## REST API

