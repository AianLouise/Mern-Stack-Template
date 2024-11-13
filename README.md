To run a MERN stack website from GitHub, follow these steps:

1. Clone the GitHub repository to your local machine.
2. Open a terminal or command prompt and navigate to the root folder of the project.
3. Install the dependencies for the server-side code by running the following command:

```bash
cd api
npm install
```

4. Start the server by running the following command:

```bash
npm run dev
```

5. Open another terminal or command prompt and navigate to the client-side folder by running the following command:

```bash
cd client
```

6. Install the dependencies for the client-side code by running the following command:

```bash
npm install
```

7. Start the client-side development server by running the following command:

```bash
npm run dev
```

8. Your MERN stack website should now be running locally. You can access it by opening a web browser and navigating to `http://localhost:3000`.

Remember to replace `api` and `client` with the actual folder names of your project.


### Tutorial on How the API Side of a MERN Stack Authentication Project Works

This tutorial will explain how the API side of a MERN stack authentication project is structured and how it works. We will cover the setup and functioning of controllers, models, routes, and utility functions.

#### Project Structure

Here is a simplified structure of the API side:

```
/api
  /controllers
    auth.controller.js
    user.controller.js
  /models
    user.model.js
  /routes
    auth.route.js
    user.route.js
  /utils
    error.js
    verifyUser.js
  index.js
```

### Step-by-Step Guide

#### 1. Setting Up the Server

##### `index.js`

This is the entry point for the server.

```js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log(error));

const __dirname = path.resolve();
const app = express();

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({ 
    success: false,
    message,
    statusCode: statusCode,
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### 2. Models

##### `user.model.js`

Defines the structure of the user data in MongoDB.

```js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s",
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
```

### 3. Controllers

Controllers handle the logic for various API endpoints.

##### `auth.controller.js`

Handles authentication-related actions such as signup, signin, and Google OAuth.

```js
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

// Register new user
export const signup = async (req, res, next) => {
  try {
    const hashedPassword = bcryptjs.hashSync(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

// Login user
export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(errorHandler(404, 'User not found!'));

    const isPasswordCorrect = bcryptjs.compareSync(req.body.password, user.password);
    if (!isPasswordCorrect) return next(errorHandler(400, 'Invalid credentials!'));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('access_token', token, { httpOnly: true }).status(200).json({ message: 'Login successful!' });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

// Google OAuth login/signup (placeholder)
export const google = (req, res) => {
  res.send('Google OAuth functionality to be implemented.');
};

// Signout user
export const signout = (req, res) => {
  res.clearCookie('access_token').status(200).json({ message: 'Signout successful!' });
};
```

##### `user.controller.js`

Handles user-related actions such as updating and deleting user information.

```js
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
  res.json({ message: 'API is working!' });
};

// Update user
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Delete user
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('Account has been deleted!');
  } catch (error) {
    next(error);
  }
};
```

### 4. Routes

Routes define the endpoints and link them to controller functions.

##### `auth.route.js`

Defines routes for authentication-related actions.

```js
import express from 'express';
import { signup, signin, google, signout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.get('/signout', signout);

export default router;
```

##### `user.route.js`

Defines routes for user-related actions.

```js
import express from 'express';
import { test, updateUser, deleteUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;
```

### 5. Utilities

Utility functions assist with common tasks.

##### `error.js`

Custom error handler.

```js
export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
```

##### `verifyUser.js`

Middleware to verify JWT tokens.

```js
import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, 'You are not authenticated!'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Token is not valid!'));

    req.user = user;
    next();
  });
};
```

### Conclusion

By following this tutorial, you now have a clear understanding of how the API side of a MERN stack authentication project is structured and works. The controllers handle the business logic, the models define the data structure, the routes link the endpoints to the controllers, and the utilities provide common functionalities.
