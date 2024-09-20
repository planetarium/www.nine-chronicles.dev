# Welcome Non-Developers to the 2024 Modathon! 🎉

Hello and welcome to all non-developers who are interested in participating in the Nine Chronicles Modathon! Don't worry if you're new to coding—by following this guide, you'll be able to create a simple website that displays Nine Chronicles avatar information. 🌟

Once you've followed through to the end, if you feel inspired, we encourage you to join the Modathon and submit your project. And if you have a cool mod idea but think it's too challenging, head over to the **#mod-ideas** channel in our Discord to find developers who can help bring your vision to life!

## Step 1: Modding Setup and Goal

Now let’s explain our goal. You'll be setting up your environment to create a website that can display avatar information from Nine Chronicles.  
We’ll walk you through the basics, and you can follow the [Avatar Information Dapp Guide](https://modding/guide/avatar-information-dapp-guide) later to build the website step-by-step.

By the end of this guide, you'll have everything set up and ready to dive into that guide!

## Step 2: JavaScript and Setting Up Node.js

We’ll be using **JavaScript (JS)**, one of the most popular programming languages for building websites. For this project, we’ll actually be using a slightly enhanced version of JavaScript called **TypeScript (TS)**, which makes development easier and more reliable. Don’t worry, they are almost the same, but TypeScript helps catch errors early and makes coding smoother. You can learn more about TypeScript [here](https://www.typescriptlang.org/).

Now, to run our TypeScript code and manage the project, we need to install **Node.js** and its package manager, **npm**. These tools allow us to manage the libraries needed to build the website.

You can download Node.js (which includes npm) from [here](https://nodejs.org/en).

Once Node.js and npm are installed, you’ll be ready to move on to the next step!
![Install Node JS](/images/event/2024modathon/install-nodejs.png){width=240}

## Step 3: Installing a Code Editor (VS Code)

Now we need a text editor to write code. We'll be using **Visual Studio Code (VS Code)** because it's free and super easy to use!

1. Download and install VS Code from [here](https://code.visualstudio.com/).
2. Once installed, open it up and let’s get started!
![Install vscode](/images/event/2024modathon/install-vscode.png)
## Step 4: Create and Open a New Folder

In VS Code, we’ll create a new folder for our project and open it to start working.

1. Create a new folder on your computer for the project.
2. Open VS Code and follow [this guide](https://code.visualstudio.com/docs/getstarted/getting-started#_step-1-open-a-folder-in-vs-code) to open that folder.

Great! You’re now ready to start coding!

## Step 5: Verify npm is Working
Now, let’s verify that **npm** (the tool we installed earlier) is working properly. In VS Code, open the terminal by clicking on [Terminal > New Terminal](https://code.visualstudio.com/docs/terminal/getting-started).

In the terminal, type:

```bash
npm --version
```

If you see a version number, then everything is set up correctly!
![npm version](/images/event/2024modathon/npm-version.png)

## Step 6: Creating Your Website

We’re going to use a popular tool called [React](https://react.dev/) to build our website. React is a library that makes creating dynamic websites easier.

In your terminal, run the following command to create a project:

```bash
npx create-react-app your-project-name --template @planetarium/9c-mimir-gql
```

Replace `your-project-name` with whatever you want to name your project! This will download a template for your avatar information website.

Once it’s done, open the folder in **VS Code**:

1. In **VS Code**, click on **File > Open Folder**.
2. Navigate to your project folder (`your-project-name`), select it, and open it.

Now, run these commands to generate some code and start the project:

```bash
npm run codegen
npm run start
```

This will open a new tab in your browser where you can see the website running! 🎉

Now that everything is set up, you can follow the [Avatar Information Dapp Guide](../modding/guide/avatar-information-dapp-guide) to finish building your website.

You might see some technical terms like **GQL** in the guide. Don’t worry about it! Just follow along step by step, and you’ll get the website up and running. After you've completed the guide, take a moment to explore what you've created and understand how it works.

## Step 7: Adding a README File

Before we upload your project to GitHub, you need to create a **README.md** file. A README file is used to describe your project and provide important information like what it does, how to use it, and any other relevant details.

Here’s how to create one:

1. In VS Code, in your project folder, right-click and select **New File**.
2. Name the file `README.md`.

Now, open the `README.md` file and add some basic information about your project. Here's an example:

```markdown
# My Avatar Information Website

This website displays detailed information about Nine Chronicles avatars

## Features
- Displays avatar information from Nine Chronicles

## How to Use
1. Visit the website and enter the avatar ID.
```

Once you’ve written the description of your project, save the file. This README will help others understand your mod and what it does.

## Step 8: Create a GitHub Account and Upload Your Project

Now that you've built your website, let’s upload it to **GitHub**, a platform where developers store and collaborate on projects. This will allow you to easily share your work and submit it for the Modathon.

### 1. Create a GitHub Account

1. Visit [GitHub](https://github.com/) and click **Sign Up**.
2. Follow the instructions to create your account—it’s quick and easy!

### 2. Upload Your Project to GitHub

Instead of using Git commands (which developers typically use), we'll keep it simple and upload your project via the GitHub website:

1. On GitHub, click the **+** icon at the top right and select **New repository**.
2. Give your repository a name (e.g., `my-avatar-website`), add a short description, and make sure the repository is **Public**.
3. Click **Create repository**.

Now, to upload your files:

1. On your computer, locate your project folder and compress it into a `.zip` file.
2. Go back to your new GitHub repository page.
3. Click **Upload an existing file** and drag the `.zip` file into the upload area.
4. Once your files are uploaded, click **Commit changes**.

That’s it! You’ve successfully uploaded your project. Although developers usually use a tool called `git` to commit changes, this method allows you to easily upload your files through your browser.

Now your website is live on GitHub and ready for others to see!

## Step 9: Join the Modathon!
While a simple website displaying avatar information is a great learning project, unfortunately, you won’t be able to submit something identical or very similar to the example for the Modathon. Submitting an entry too close to this example might be flagged as abuse during judging.

We encourage you to keep learning and explore new ways to make the project your own!

::: tip
Try adding features like inventory lookup or displaying current World Boss status instead of just showing avatar names. Small changes can make a big difference, and you'll learn a lot in the process!
:::

Once you’ve added your own unique twist, you’ll be ready to submit your project for the Modathon. Remember, even if you're not sure how to implement an idea, the `#mod-ideas` channel is available to connect with developers who can help bring your concept to life!

Good luck, and have fun!
