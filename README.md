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