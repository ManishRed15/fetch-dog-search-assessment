Fetch Dog Adoption - Documentation

Overview
The Fetch Dog Adoption project is a React-based web application that allows users to search for shelter dogs, favorite them, and generate a match. The application integrates with the Fetch API for authentication, retrieving dog details, and filtering results.
Features Implemented
This project meets and exceeds the Fetch frontend take-home assessment requirements:z
Authentication
•	Users enter their name and email on the login screen.  
•	Authenticates with the **`POST /auth/login`** endpoint.  
•	Authenticated users are redirected to the search page.  
Search Page
•	Fetches all breeds using **`GET /dogs/breeds`** and allows users to filter by breed.  
•	Retrieves dog data using **`GET /dogs/search`** and 
•	Ensures:
o	Pagination (Results are paginated in sets of 10).
o	Sorting (Default: **breed ascending**; users can toggle between ascending and descending). Displays all fields of the Dog object: Image, Name, Breed, Age, Location (Zip Code)

Favorites and Matching
•	Users can **favorite** multiple dogs.  
•	When finished, users can generate a match using **`POST /dogs/match`**.  
•	The matched dog is displayed with all relevant details.  
Additional Features
UI Enhancements: The application has a good and user-friendly UI using CSS.  
Error Handling: Displays appropriate error messages for authentication failures.  
State Management: Uses React Hooks (`useState`, `useEffect`) for managing API calls and local state.  
Code Organization: Separated components (`Login`, `Search`, `DogCard`) for modular development.  
How to Clone and Run Locally
Step 1: Clone the Repository
Step 2: Install Dependencies
npm install
Step 3: Start the Development Server
npm run dev
This will start the application locally, and you can access it at `http://localhost:5173` (default for Vite).
Step 4: Build for Production
npm run build
Step 5: Preview Production Build
npm run preview
API Endpoints Used
Authentication
-  Login: `POST /auth/login`
-  Logout: `POST /auth/logout`
Dog Search & Filtering
-  Fetch Breeds:`GET /dogs/breeds`
-  Search Dogs: `GET /dogs/search`
-  Get Dog Details: `POST /dogs`
-  Find Match: `POST /dogs/match`

