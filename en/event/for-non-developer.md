# Welcome Non-Developers to the 2024 Modathon! 🎉

Hello and welcome to all non-developers who are interested in participating in the Nine Chronicles Modathon! Don't worry if you're new to coding—by following this guide, you'll be able to create a simple website that displays Nine Chronicles avatar information. 🌟

Once you've followed through to the end, if you feel inspired, we encourage you to join the Modathon and submit your project. And if you have a cool mod idea but think it's too challenging, head over to the **#mod-ideas** channel in our Discord to find developers who can help bring your vision to life!

## Step 1: Create a GitHub Account

First things first—let’s get you signed up on [GitHub](https://github.com/), a platform where developers store and collaborate on projects. It’s essential for submitting your mod in the Modathon.

1. Visit [GitHub](https://github.com/) and click **Sign Up**.
2. Follow the instructions to create your account—easy as that!

Once you’ve signed up, you’re ready to get started on your first project.

## Step 2: Modding Setup and Goal

Now let’s explain our goal. You'll be setting up your environment to create a website that can display avatar information from Nine Chronicles. We’ll walk you through the basics, and you can follow the [Avatar Information Dapp Guide](https://modding/guide/avatar-information-dapp-guide) later to build the website step-by-step.

By the end of this guide, you'll have everything set up and ready to dive into that guide!

## Step 3: A Simple Introduction to JavaScript and TypeScript

Now, let's talk about two important technologies we'll be using: **JavaScript** and **TypeScript**.

- **JavaScript (JS)** is one of the most popular programming languages for building websites. You can learn more about JS [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript).
- **TypeScript (TS)** is a language that builds on JavaScript, adding extra features to make development easier. We’ll be using TS because it makes our code more reliable. You can learn more about TS [here](https://www.typescriptlang.org/).

Don’t worry! We’ll keep it simple, and by the end, you’ll have your website up and running using TypeScript. 

### Installing Node and npm

To run our TypeScript code, we need to install **Node.js** and its package manager, **npm**. These are tools that help us manage all the code libraries needed to build websites.

Follow the appropriate link below based on your operating system:

- [Install Node.js on Windows](https://nodejs.org/en/download)
- [Install Node.js on macOS](https://nodejs.org/en/download)
- [Install Node.js on Linux](https://nodejs.org/en/download)

Once Node.js and npm are installed, you’ll be ready for the next step!

## Step 4: Installing a Code Editor (VS Code)

Now we need a text editor to write code. We'll be using **Visual Studio Code (VS Code)** because it's free and super easy to use!

1. Download and install VS Code from [here](https://code.visualstudio.com/).
2. Once installed, open it up and let’s get started!

## Step 5: Create and Open a New Folder

In VS Code, we’ll create a new folder for our project and open it to start working.

1. Create a new folder on your computer for the project.
2. Open VS Code and follow [this guide](https://code.visualstudio.com/docs/getstarted/getting-started#_step-1-open-a-folder-in-vs-code) to open that folder.

Great! You’re now ready to start coding!

## Step 6: Verify npm is Working

Now, let’s verify that **npm** (the tool we installed earlier) is working properly. In VS Code, open the terminal by clicking on **Terminal > New Terminal**.
https://code.visualstudio.com/docs/terminal/getting-started

In the terminal, type:

```bash
npm --version
```

If you see a version number, then everything is set up correctly!

## Step 7: Creating Your Website

We’re going to use a popular tool called **React** to build our website. React is a library that makes creating dynamic websites easier.

In your terminal, run the following command to create a project:

```bash
npx create-react-app your-project-name --template @planetarium/9c-mimir-gql
```

Replace `your-project-name` with whatever you want to name your project! This will download a template for your avatar information website.

Once it’s done, navigate into your project’s folder by typing:

```bash
cd your-project-name
```

Now, run these commands to generate some code and start the project:

```bash
npm run codegen
npm run start
```

This will open a new tab in your browser where you can see the website running! 🎉

## Step 8: How Did This Happen?

Let’s quickly explain what just happened:

- **Node and npm**: These tools helped us install the libraries we need to build the website.
- **React**: We used React to create the website structure.
- **Code generation**: The `codegen` command fetched data from Nine Chronicles that we used in the website.

Now that everything is set up, you can follow the [Avatar Information Dapp Guide](https://modding/guide/avatar-information-dapp-guide) to finish building your website.

Even a simple website displaying avatar information is enough to submit for the Modathon! Of course, try to make it your own—don't just submit an exact copy of the tutorial. 😊

## Step 9: Don’t Be Intimidated by Technical Terms!

You might see some technical terms like **GQL** in the guide. Don’t worry about it! Just follow along step by step, and you’ll get the website up and running. After you've completed the guide, take a moment to explore what you've created and understand how it works.

## Step 10: Join the Modathon!

If you’ve made it this far, congratulations! 🎉 You now have a website that displays avatar information. If you're feeling inspired, go ahead and join the Modathon! It’s okay if it’s a simple project—everyone starts somewhere.

Remember, even if you have a great idea but are unsure how to implement it, the **#mod-ideas** channel is there for you. Connect with developers who can help bring your idea to life!

Good luck, and have fun!
