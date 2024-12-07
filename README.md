## Table of Contents

1. [Steps to Run a MERN Stack Website Locally](#steps-to-run-a-mern-stack-website-locally)
   - [Clone the GitHub Repository](#1-clone-the-github-repository)
   - [Set Up the Server (Backend)](#2-set-up-the-server-backend)
   - [Set Up the Client (Frontend)](#3-set-up-the-client-frontend)
   - [Access the Website](#4-access-the-website)

2. [How to Deploy on Vercel](#how-to-deploy-on-vercel)
   - [Sign Up / Log In to Vercel](#1-sign-up--log-in-to-vercel)
   - [Import Your GitHub Repository](#2-import-your-github-repository)
   - [Deploy the API](#3-deploy-the-api)
   - [Deploy the Client](#4-deploy-the-client)
   - [Set Environment Variables in Vercel](#5-set-environment-variables-in-vercel)
   - [Create Deployment to Save Changes](#6-create-deployment-to-save-changes)
   - [Verify the Deployment](#7-verify-the-deployment)
   - [Update CORS Configuration](#8-update-cors-configuration)

3. [How to Get MongoDB URI](#how-to-get-mongodb-uri)

4. [How to Get Cloudinary Environment Variables](#how-to-get-cloudinary-environment-variables)

--------------------------------------------------------------------------------------------------------------------

### Steps to Run a MERN Stack Website Locally:

1. **Clone the GitHub Repository:**
   - Clone the project repository to your local machine.

2. **Set Up the Server (Backend):**
   - Open a terminal or command prompt and navigate to the `api` folder:
     `cd api`
   - Create the `.env` file and add the following content:
     ```
     JWT_SECRET='your_jwt_secret'
     MONGODB_URI='your_mongodb_uri'
     CLIENT_URL=http://localhost:5173
     PORT=3000
     EMAIL_USERNAME=your_email_username
     EMAIL_PASSWORD=your_email_password
     NODE_ENV=development # Set to 'production' for production environment
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     ```
   - Install the server dependencies:
     `npm install`
   - Start the server:
     `npm run dev`

3. **Set Up the Client (Frontend):**
   - Open another terminal or command prompt.
   - Navigate to the `client` folder:
     `cd client`
   - Create the `.env` file and add the following content:
     ```
     VITE_API_BASE_URL=http://localhost:3000
     ```
   - Install the client dependencies:
     `npm install`
   - Start the client-side development server:
     `npm run dev`

4. **Access the Website:**
   - Open your browser and go to `http://localhost:5173`. Your MERN stack website should now be running locally.

--------------------------------------------------------------------------------------------------------------------

### How to Deploy on Vercel

Follow these steps to deploy your MERN stack application to Vercel:

1. **Sign Up / Log In to Vercel**:
   - Go to [Vercel](https://vercel.com/) and sign up or log in with your GitHub account.

2. **Import Your GitHub Repository**:
   - Click on the "Add New" button.
   - Select "Project".
   - Choose the GitHub repository that contains your MERN stack application.

3. **Deploy the API**:
   - **Root Directory**: Set the root directory to `api`.
   - Click on the "Deploy" button.
   - Vercel will start the deployment process for the API. This may take a few minutes.

4. **Deploy the Client**:
   - **Root Directory**: Set the root directory to `client`.
   - Click on the "Deploy" button.
   - Vercel will start the deployment process for the client. This may take a few minutes.

5. **Set Environment Variables in Vercel**:
   - Go to the "Settings" tab of your project in Vercel.
   - Click on "Environment Variables".
   - Add the environment variables for both the frontend and backend:
     - **Backend (`api/.env`)**:
       ```
       JWT_SECRET='your_jwt_secret'
       MONGODB_URI='your_mongodb_uri'
       CLIENT_URL='https://your-frontend-url.vercel.app'
       PORT=3000
       EMAIL_USERNAME='your_email_username'
       EMAIL_PASSWORD='your_email_password'
       NODE_ENV=production
       CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
       CLOUDINARY_API_KEY=your_cloudinary_api_key
       CLOUDINARY_API_SECRET=your_cloudinary_api_secret
       ```
     - **Frontend (`client/.env`)**:
       ```
       VITE_API_BASE_URL='https://your-backend-url.vercel.app'
       ```

6. **Create Deployment to Save Changes**:
   - Go to the "Deployments" tab of your project in Vercel.
   - Click on "Create Deployment" to deploy your project with the new environment variables.
   - Wait for the deployment process to complete. This may take a few minutes.

7. **Verify the Deployment**:
   - Once the deployment of both the API and client is complete, Vercel will provide URLs for both the frontend and backend.
   - Open the provided URLs in your browser to verify that your application is running correctly.

8. **Update CORS Configuration**:
   - Ensure that your backend CORS configuration allows requests from your frontend URL. Add the following code to your `index.js` file if it hasn't been added yet:
     ```javascript
     const corsConfig = {
       origin: process.env.CLIENT_URL,
       credentials: true,
       methods: ["GET", "POST", "PUT", "DELETE"],
     };

     app.options('*', cors(corsConfig));
     app.use(cors(corsConfig));
     ```

By following these steps, you should be able to deploy your MERN stack application to Vercel successfully. If you encounter any issues, refer to the Vercel documentation or seek help from the Vercel community.

--------------------------------------------------------------------------------------------------------------------

## How to Get MongoDB URI

To use MongoDB for your database, you need to obtain the `MONGODB_URI` environment variable. Follow these steps to get it:

1. **Sign Up for MongoDB Atlas**:
   - Go to the [MongoDB Atlas website](https://www.mongodb.com/cloud/atlas) and sign up for a free account if you don't already have one.

2. **Create a New Cluster**:
   - Once logged in, click on "Build a Cluster" and follow the instructions to create a new cluster. Choose the free tier for a no-cost option.

3. **Configure Your Cluster**:
   - After the cluster is created, click on "Connect" and follow the instructions to allow access from your IP address and create a database user.

4. **Get the Connection String**:
   - Once the cluster is configured, you will be provided with a connection string. It will look something like this:
     ```
     mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
     ```

5. **Replace the Placeholders**:
   - Replace `<username>` and `<password>` with the database user credentials you created. Replace `myFirstDatabase` with the name of your database.

6. **Add the Connection String to Your `.env` File**:
   - Copy the connection string and add it to your `.env` file as follows:
     ```
     MONGODB_URI='your_mongodb_uri'
     ```

By following these steps, you will have the necessary `MONGODB_URI` to configure your application for database connectivity.

--------------------------------------------------------------------------------------------------------------------

## How to Get Cloudinary Environment Variables

To use Cloudinary for image uploads, you need to obtain the following environment variables:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Follow these steps to get them:

1. **Sign Up for Cloudinary**:
   - Go to the [Cloudinary website](https://cloudinary.com/) and sign up for a free account if you don't already have one.

2. **Log In to Cloudinary**:
   - Log in to your Cloudinary account.

3. **Navigate to the Dashboard**:
   - Once logged in, you will be redirected to the Cloudinary dashboard.

4. **Find Your Cloudinary Credentials**:
   - On the dashboard, you will see your account details, including the `Cloud Name`, `API Key`, and `API Secret`.

5. **Copy the Credentials**:
   - Copy the `Cloud Name`, `API Key`, and `API Secret` and add them to your `.env` file as follows:
     ```
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     ```

By following these steps, you will have the necessary Cloudinary environment variables to configure your application for image uploads.

