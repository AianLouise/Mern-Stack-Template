### Steps to Run a MERN Stack Website Locally:

1. **Clone the GitHub Repository:**
   - Clone the project repository to your local machine.

2. **Set Up the Server (Backend):**
   - Open a terminal or command prompt and navigate to the `api` folder:
     `cd api`
   - Install the server dependencies:
     `npm install`
   - Start the server:
     `npm run dev`

3. **Set Up the Client (Frontend):**
   - Open another terminal or command prompt.
   - Navigate to the `client` folder:
     `cd client`
   - Install the client dependencies:
     `npm install`
   - Start the client-side development server:
     `npm run dev`

4. **Access the Website:**
   - Open your browser and go to `http://localhost:3000`. Your MERN stack website should now be running locally.

--------------------------------------------------------------------------------------------------------------------

### How to Add `.env` Files

1. **Backend (`api/.env`)**:  
   - Go to the `api` folder.
   - Create a file named `.env` if it doesn't already exist.  
   - Add the following content:  
     ```
     JWT_SECRET='your_jwt_secret'
     MONGODB_URI=
     CLIENT_URL=http://localhost:5173
     PORT=3000
     EMAIL_USERNAME=your_email_username
     EMAIL_PASSWORD=your_email_password
     NODE_ENV=development # Set to 'production' for production environment
     ```

2. **Frontend (`client/.env`)**:  
   - Go to the `client` folder.  
   - Create a file named `.env` if it doesn't already exist.  
   - Add the following content:  
     ```
     VITE_API_BASE_URL=http://localhost:3000
     ```

3. **Secure the `.env` Files**:  
   - In both the `api` and `client` folders, add `.env` to the `.gitignore` file to prevent committing sensitive data:  
     ```
     .env
     ```

---

This is how you add `.env` files to your project!

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
       ```
     - **Frontend (`client/.env`)**:
       ```
       VITE_API_BASE_URL='https://your-backend-url.vercel.app'
       ```

6. **Verify the Deployment**:
   - Once the deployment of both the API and client is complete, Vercel will provide URLs for both the frontend and backend.
   - Open the provided URLs in your browser to verify that your application is running correctly.

7. **Update CORS Configuration**:
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