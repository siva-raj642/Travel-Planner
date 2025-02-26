# Travel Planner App

## Overview
The **Travel Planner App** is a MERN-based application that allows users to plan and organize their trips effectively. Users can create itineraries, save destinations, and manage their travel schedules effortlessly.

## Features
- **User Authentication**: Secure sign-up and login functionality.
- **Itinerary Management**: Create, edit, and delete trip plans.
- **Saved Itineraries**: Access previously planned trips.
- **Profile Management**: Users can edit and manage their profile details.
- **Interactive Dashboard**: Displays planned trips and important details.

## Tech Stack
### Frontend:
- React (with Vite for fast development)
- Tailwind CSS (for styling)

### Backend:
- Node.js & Express.js (for API handling)
- MongoDB (for storing trip details and user data)

## APIs Used
- **OpenRouteServices**: Used for route planning and travel optimization.

## Installation & Setup
1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/travel-planner-app.git
   cd travel-planner-app
   ```

2. **Install dependencies**:
   ```sh
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. **Set up environment variables** (create a `.env` file in the backend):
   ```env
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Run the development servers**:
   ```sh
   # Start backend server
   cd server
   npm start

   # Start frontend server
   cd ../client
   npm run dev
   ```

## Chatbot Integration
- A chatbot feature is planned to assist users with travel queries.
- Considering alternatives to third-party solutions for better customization.

## Future Enhancements
- Add real-time collaboration features.
- Implement AI-based travel recommendations.
- Enable payment gateway for premium travel services.
- Replace third-party chatbot integration with a better solution.

## Contribution Guidelines
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Commit changes: `git commit -m "Added new feature"`
4. Push to branch: `git push origin feature-branch`
5. Create a Pull Request.

## License
This project is licensed under the **MIT License**.

## Contact
For any queries, feel free to reach out via [your-email@example.com] or create an issue in the repository.

---
**Happy Traveling!**

