
# TechGuy AI Application

TechGuy AI Application is a full-stack CRUD-based application designed to explore, manage, and showcase AI-related tools and applications. The platform provides a search and filter feature, a responsive UI, and dynamic image upload and management functionality. It is built using a **React frontend** and a **Django REST Framework backend**.

## Features

- **CRUD Functionality**: 
  - Create, read, update, and delete AI application entries.
- **Advanced Search**:
  - Search applications with real-time suggestions and keyword highlighting.
- **Image Upload**:
  - Upload and display images for AI applications dynamically.
- **Responsive Design**:
  - Fully responsive and mobile-friendly interface using TailwindCSS and Material-UI.
- **Pagination**:
  - Paginated application gallery for better navigation.
- **Dynamic Dropdown Suggestions**:
  - Provides autocomplete suggestions as users type in the search bar.

## Technologies Used

### Frontend
- **React.js**
- **Material-UI** for components and styling
- **TailwindCSS** for custom styling
- **Axios** for API integration

### Backend
- **Django**
- **Django REST Framework**
- **SQLite** for development (can be swapped for PostgreSQL in production)
- **Django CORS Headers** to allow cross-origin requests

## Setup Instructions

### Prerequisites
- Install **Node.js** and **npm** (or Yarn) for the frontend.
- Install **Python 3.8+** and **pip** for the backend.
- Install **virtualenv** for managing Python virtual environments.

---

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/revisionprojects/techguy.git
   cd techguy/techguy_backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Run database migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

The backend will be available at `http://127.0.0.1:8000`.

---

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../techguy_frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file for API configuration:
   ```bash
   echo "REACT_APP_API_BASE_URL=http://127.0.0.1:8000" > .env
   ```

4. Start the React development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://127.0.0.1:3000`.

---

### Usage

1. **Add Applications**:
   - Click on "Add Application" in the sidebar.
   - Fill out the form to add a new AI application, including uploading an image.

2. **Search Applications**:
   - Use the search bar on the homepage to find applications by name.
   - Real-time suggestions will appear as you type.

3. **Edit or Delete Applications**:
   - Navigate to the "Application List" to edit or delete existing applications.

4. **View Applications**:
   - Explore AI applications in the gallery with pagination support.

---

### Folder Structure

```
techguy/
├── techguy_backend/    # Backend (Django) application
├── techguy_frontend/   # Frontend (React) application
└── README.md           # Project documentation
```

---

### Future Enhancements

- User authentication and authorization
- Deployment to production (e.g., Heroku, AWS)
- Integration with external AI APIs
- Analytics and insights for applications

---

## Contributing

Contributions are welcome! Please open an issue or create a pull request with your changes.

---

## License

This project is licensed under the [MIT License](LICENSE).
