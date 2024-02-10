
# OpenAI SQL Translator Web App

## Introduction
This Full Stack application uses React, Node.js, Express, and the OpenAI API to translate natural language into SQL queries. It allows users to interact with the Chinook sample SQLite database through easy-to-understand queries, making database interactions more intuitive and accessible.

## Technologies
- Frontend: React
- Backend: Node.js, Express
- Database: SQLite (Chinook Sample DB)
- APIs: OpenAI, LangChain

## Features
- Natural language to SQL translation
- Query execution on Chinook DB
- User-friendly query results display

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- OpenAI API key

### Setup Instructions

1. **Clone the Repo**
   ```bash
   git clone https://github.com/yourusername/openai-sql-translator.git
   cd openai-sql-translator
   ```

2. **Install Dependencies**
   - Frontend:
     ```bash
     cd frontend && npm install
     ```
   - Backend:
     ```bash
     cd backend && npm install
     ```

3. **Set Up Environment**
   - Create a `.env` in `backend` with `OPENAI_API_KEY=your_key_here`.

4. **Run the Backend**
   ```bash
   cd backend && npm start
   ```

5. **Run the Frontend**
   ```bash
   cd frontend && npm start
   ```
   Visit [http://localhost:3000](http://localhost:3000).

## Usage
Type a natural language query in the input field, e.g., "Show me all albums by AC/DC". The app translates it into SQL, executes it, and displays results.

## Contributing
Contributions are welcome. Feel free to submit pull requests or open issues for suggestions.

## License
MIT License - see LICENSE file for details.
