# Agnos Frontend Interview Project

## Project Overview

This frontend interview project is built using React and Next.js. The main functionality of the project is to answer questions by clicking on images to select the most painful points. Users can click on the images to indicate areas and proceed to the next question.

### Features

- **Feature 1**: The question asking which specific area of the abdomen hurts the most. By indicate the location of the pain based on an image (default.png). If the image is clicked, it will be highlighted (-highlight.png) with the corresponding caption (-active.png). Clicking on the image where the pain is throughout the abdomen will cast shadows over the entire area, but no caption will appear. The image is centrally positioned in the browser.
  - **Feature 1.1**: The base image of the abdomen is displayed in the center of the browser.<br/>
    ![Feature 1.1](https://media.discordapp.net/attachments/1142427929427574816/1198334362144481280/agnos-frontend-interview.vercel.app_.png)
  - **Feature 1.2**: The image is highlighted with the corresponding caption when clicked.<br/>
    ![Feature 1.2](https://media.discordapp.net/attachments/1142427929427574816/1198334360873607168/agnos-frontend-interview.vercel.app__1.png)
  - **Feature 1.3**: When the pain is throughout the abdomen, the entire area is highlighted.<br/>
    ![Feature 1.3](https://media.discordapp.net/attachments/1142427929427574816/1198338932128108594/agnos-frontend-interview.vercel.app__4.png)
- **Feature 2**: The question about finger pain is asking which specific point on the finger hurts the most. Similarly to the previous scenario.
  - **Feature 2.1**: The base image of the finger is displayed in the center of the browser.<br/>
    ![Feature 2.1](https://media.discordapp.net/attachments/1142427929427574816/1198334361322410045/agnos-frontend-interview.vercel.app__2.png)
  - **Feature 2.2**: The image is highlighted with the corresponding caption when clicked.<br/>
    ![Feature 2.2](https://media.discordapp.net/attachments/1142427929427574816/1198334361674727565/agnos-frontend-interview.vercel.app__3.png)

### Technologies Used

- React
- Next.js

## Getting Started

### Prerequisites

- Node.js and yarn installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ThanatWongsamut/agnos-frontend-interview
   ```

2. Change into the project directory:

   ```bash
   cd agnos-frontend-interview
   ```

3. Install dependencies

   ```bash
   yarn
   ```

### Running the Application

```bash
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

### Project Structure

```
/agnos-frontend-interview
|-- /public                 # Publicly accessible static files
|   |-- /images             # Image files used in the application
|
|-- /src                    # Source code root
|   |-- /app                # Main application
|   |   |-- /_assets        # Assets used in the app
|   |   |   |-- /config     # Configuration files (ex. hand-config.json)
|   |   |
|   |   |-- /_components    # Reusable components
|   |   |   |-- /common     # Common components
|   |   |   |-- /question   # Components related to questions
|   |   |
|   |   |-- /_hooks         # Custom React hooks
|   |   |
|   |   |-- (routes)        # Page components or route-related components
|   |
|   |-- /utils              # Utility functions or modules
|       |-- types           # TypeScript type definitions
|
|--/...                     # Other top-level directories
|--/...                     # Other files and folders
```
