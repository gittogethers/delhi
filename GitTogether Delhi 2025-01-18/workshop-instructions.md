# GitHub Copilot Workshop - GitTogether Delhi NCR

## Goal
A common takeaway for everyone to learn how to leverage GitHub Copilot effectively.



## Input prompt: 
System prompt: 
Act like you are a professional frontend engineer with a specialization in React. Respond to the queries and generate code as in you are an expert in Reactjs. 

The application that we are building is a logo generator application with the following components: 

So we have an input form: Brand name, Style of the logo, color, background color, we describe what model user needs to use, image size, quality of the image 
So the above sections consistute the input form parameters for my form to generate the logo. 

Once the user submits this request, we call the Nebius AI endpoint. That the structure for how to use the fetch request on the CURL is defined in the #file:instruct.md which has the a React component that handles the logo generation form and API call using fetch instead of the OpenAI client library helps to generate the actual logo. 

So please incorporate this logic in the existing #codebase to implement a new component for the logo generator And provide the instructions  to run this app. 


I want to create a logo 
---

## Theme

Building an LLM-Powered Application with the help of Github Copilot

---

## Detailed Workshop Instructions

### Prerequisites

1. **GitHub Account**
   - Ensure you have an active GitHub account with access to GitHub Copilot.

2. **Supported IDE**
   - Download and install **Visual Studio Code**

3. **Install GitHub Copilot Extension**
   - Open Visual Studio Code.
   - Navigate to the Extensions view by clicking the Extensions icon.
   - Search for "GitHub Copilot" and install the extension.
   - Sign in with your GitHub account to activate the extension.

---

### Step 1: Getting Started with Copilot

#### Overview of Copilot
1. **What is GitHub Copilot?**
   - An AI-powered tool that accelerates development by generating boilerplate code, offering design pattern suggestions, and simplifying complex problem-solving.
   - Acts as a pair programmer and mentor.

3. **Key Features**
   - Contextual code suggestions based on your project.
   - Convert comments to code.
   - Autofill repetitive code.
   - Provide alternatives to existing code snippets.

4. **Copilot Chat**
   - Slash commands for added functionality:
     - `/explain`: Explains how the selected code works.
     - `/fix`: Proposes a fix for issues.
     - `/tests`: Generates unit tests for selected code.
     - `/help`: Provides general assistance.

#### Using Github Copilot
- Create a new file in your IDE.
- Add a comment describing the functionality you want, for example:
  ```javascript
  // Create a function to calculate the sum of an array
  ```
- Observe Copilot suggesting a complete implementation.


#### Using Github Copilot Chat 

##### Learning With Copilot

You can use Copilot to teach you new concepts, even entire languages and frameworks. Let's learn Rust.


  - Open the chat window and ask: `@vscode what are the best extensions for working with Rust?`. You will see a list of useful extensions.
  - Ask Copilot `what is the file extension for a Rust code file?`. You should see `.rs` as the result.
  - Create a file called `main.rs`, which is a Rust code file.
  - Use CTRL-I in `main.rs` to ask for the starting code: `create a class or module that has the following string methods: reverse, camelCase, capitalize, isPalindrome `. Examine the code, compare to your current language.

##### Bonus 

There's even more to do! Try entering this as a prompt in the chat window:

`I want to learn Rust and I learn best by doing. Create a tutorial for me that covers the basics. Go step by step, but don't move to the next step until I say 'next'. Each step should show me a basic concept in Rust`.

You're on your way to learning Rust!

---

### Step 2: Project Setup

#### Fork and Clone Repository
1. Navigate to the workshop’s provided GitHub repository.
   - Example: 
2. Click **Fork** to create a copy in your GitHub account.
3. Clone the repository locally:
   ```bash
   git clone https://github.com/your-username/repository-name.git
   ```
4. Navigate to the project directory:
   ```bash
   cd repository-name
   ```

#### Install Dependencies
- For JavaScript projects:
  ```bash
  npm install
  ```

---

### Step 3: Prompt Engineering Techniques

#### What is a Prompt?
- In Copilot, a prompt is a code snippet or natural language description used to generate suggestions.

#### Why is Prompt Engineering Important?
- Maximizes Copilot’s utility.
- Reduces repeated iterations.
- Improves suggestion quality by providing context.

#### Techniques
1. **Zero-Shot Prompting**
   - Provide no examples; allow Copilot to infer the solution.
   - Example:
     ```python
     # Write a function to reverse a string
     ```

2. **One-Shot Prompting**
   - Provide one example to guide Copilot.
   - Example:
     ```python
     # Example: Calculate the square of a number
     def square(n):
         return n * n

     # Write a function to calculate the cube of a number
     ```

3. **Few-Shot Prompting**
   - Provide multiple examples for complex tasks.

#### Tips for Crafting Prompts
- Chain prompts for step-by-step solutions.
- Provide clear instructions and examples.
- Format responses and control verbosity as needed.

---

### Step 4: Advanced Features

#### Role Prompting
- Use Copilot to simulate roles:
  - Example: “You are a backend developer. Help me create an API endpoint.”

#### Refactoring and Optimization
- Select a block of code and add a comment:
  ```python
  # Optimize this function for performance
  ```

#### Unit Test Generation
- Use Copilot Chat to generate unit tests:
  ```plaintext
  /tests
  ```

#### Managing AI Hallucinations
- Understand Copilot’s limitations:
  - Verify generated code.
  - Provide feedback to improve future interactions.

---

### Step 5: Finalizing and Sharing

1. **Test Your Application**
   - Ensure the application is functional and free of major bugs.

---

## References

1. [Introduction to GitHub Copilot](https://github.com/microsoft/Mastering-GitHub-Copilot-for-Paired-Programming/tree/main/03-Introduction-to-GitHub-Copilot)
2. [GitHub Copilot Adventures](https://github.com/microsoft/community-content/blob/main/SeasonOfAI-S2-Copilots/github-copilot-adventures.md)
3. [What Can GitHub Copilot Do? Examples](https://github.blog/developer-skills/github/what-can-github-copilot-do-examples/)
4. [GitHub Copilot 1-Day Build Challenge](https://dev.to/devteam/join-us-for-the-github-copilot-1-day-build-challenge-3000-in-prizes-3o2i)
5. [Essential Prompting for GitHub Copilot in VS Code](https://github.com/microsoft/aitour-Essential-Prompting-for-GitHub-Copilot-in-VS-Code)
6. **Advanced Coding: Visual Studio & GitHub Copilot**
7. **GitHub Copilot Introduction** (from provided PDF)
