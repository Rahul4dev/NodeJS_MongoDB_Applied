# NodeJS_MongoDB_Applied
### Using Multer, it create a storing engine to store file to upload.
-install it by   
#### npm install --save multer 

it create an object which contains the file & address of the content/file which is being uploaded.

it require this code in app.js  to get all depedencies of tha express and multer from npm.
const express = require('express');
const multer = require('multer');
const express = require({dest: ''uploads/})   // where we store the uploaded file. WE NEVER STORE IT ON DATABASE but only on server.
 
const app = express();
