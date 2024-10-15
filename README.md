# Browser Level Task Tracker

This is a simple task-tracking app built with React, designed to help you manage tasks directly in your browser. You can add tasks, mark tasks as completed, pin/unpin tasks, and remove them. The app is styled using Tailwind CSS, and the task data is managed within the browser's local state.

## Features

- **Add Tasks:** Add new tasks with a title, description, and deadline.
- **Task Status:** Tasks are categorized based on their deadline and completion status:
  - Overdue tasks (past deadline) are marked in red.
  - Tasks due within the next 7 days are marked in yellow.
  - Completed tasks are marked with a different style.
- **Pin/Unpin Tasks:** Pin important tasks for easier access.
- **Delete Tasks:** Delete tasks that are no longer needed.
- **Task Filtering:** View all tasks or just pinned tasks.
- **Task Summary:** See a summary of your tasks, including pinned tasks.

### Key Components

- **AddTask.js:** This component handles the form to add new tasks. It takes input for task title, description, and deadline and then adds the task to the task list.
- **AllTaskList.js:** This component displays all the tasks with functionality to delete or pin tasks. Tasks are visually categorized based on their status (e.g., overdue, due soon).
- **PinnedTaskList.js:** This component lists the tasks that are marked as "pinned" for easier access. You can unpin or delete tasks from this view.

## How to Run the Project Locally

Follow these steps to set up and run the project locally on your machine:

### Prerequisites

- Node.js (>= 14.x.x)
- npm or yarn

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ARMeeru/reactive-task-trackr.git
   cd reactive-task-trackr
   ```

2. **Install dependencies**:
   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. **Start the development server**:
   Using npm:

   ```bash
   npm start
   ```

   Or using yarn:

   ```bash
   yarn start
   ```

4. **Open your browser**:
   The app will automatically open in your default browser, or you can manually open it by navigating to `http://localhost:3000`.

### Running Tests

The project includes unit tests for key components. To run the tests, use the following commands:

```bash
npm test
```

or

```bash
yarn test
```

### Contribution

Feel free to submit pull requests or issues for improvements. The `main` branch is protected, so changes will require an approving review.
