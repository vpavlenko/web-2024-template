# How to Cursor in React

In this guide you'll develop your own web application from scratch using plain English in the Cursor IDE. Cursor is the leading AI-powered code editor, capable of instantly making code changes in complex projects across multiple files.

The development process is changing rapidly. Instead of learning programming languages and frameworks, you'll now need to carefully decompose projects into tasks, provide sufficient context to LLM helpers, and know how to recover from dead ends. Once you master this, you'll be able to start projects outside your area of expertise, even without any developers.

This React+TypeScript+Vite+MUI template allows you to run it locally in a Cursor IDE. Replace it with your logic and deploy to web.

This guide will take around 1 to 2 hours of your time.


- [A simple html app](#a-simple-html-app)
- [A React app](#a-react-app)
  * [Get the tools ready](#get-the-tools-ready)
  * [Run locally](#run-locally)
  * [Make changes](#make-changes)
  * [Save changes (commit)](#save-changes-commit)
  * [Deploy](#deploy)
  * [Bring your idea](#bring-your-idea)
  * [Tips](#tips)
  * [React vs Vanilla JS](#react-vs-vanilla-js)
- [This is so tough, can I do it simpler?](#this-is-so-tough-can-i-do-it-simpler)
- [Do I need a backend?](#do-i-need-a-backend)
  * [Adding Firestore to the project](#adding-firestore-to-the-project)
- [How to create a Telegram bot?](#how-to-create-a-telegram-bot)
- [Troubleshooting](#troubleshooting)
    + [Git authenticity](#git-authenticity)
    + [Empty commit message](#empty-commit-message)
    + [First time Git configuration](#first-time-git-configuration)




# A simple html app

Before we dive into React, let's spend 10-20 minutes in a simpler setup - a simple html website in a single `index.html` file.

1. Install [Cursor IDE](https://www.cursor.com/), select any options during installation, then log in. If you had it installed before, `Cmd/Ctrl+Shift+P` "Attempt Update" to get the latest update
3. Create an empty folder on your computer outside of Cursor. Then, in Cursor open it using `File -> Open Folder...`.
4. Press `Cmd/Ctrl+I` and ask Cursor to make a _simple html website_. **Include the words `simple html website` in your prompt**. Ask for any functionality and UI. Try asking in your language (Spanish, Polish etc.):
```
Create a simple html website with easy conversion between 7 main time zones.
Time in all of theme is displayed simultaneously, and I can change hh and mm
in any of them in one click or by typing.
```
<img width="599" alt="Screenshot 2024-10-02 at 13 06 38" src="https://github.com/user-attachments/assets/6df0cba6-da1f-4ec2-8f01-d9d1434a0aab">

If that fails for some reason, create a new file `index.html` in Cursor, open it, then repeat the generation. This file will be added to the context - it'll be shown above the text box where you type instructions.

Hint: you can also drag'n'drop screenshots of a reference UI to the Composer and ask it to copy the existing style/functionality.

4. Click `[Accept All]`. Trust Cursor, **don't read the code** that it generated – it's not relevant for this task:
<img width="874" alt="Screenshot 2024-10-02 at 13 07 19" src="https://github.com/user-attachments/assets/1db29fba-8814-4290-ad67-4830d9315301">

5. Open this file `index.html` in your browser. What? See below:
   - In Chrome/Firefox/Safari select `File -> Open` or press `Cmd/Ctrl+O`.
   - To see where this file is on your computer, hover over its name in Cursor's left pane.
<img width="588" alt="Screenshot 2024-10-02 at 13 10 37" src="https://github.com/user-attachments/assets/75d2b489-c4bd-4c70-9f60-8fb3b52d3e40">

7. In the same Composer chat, ask for changes:

```
Make a solid-looking modern UI, draw real clock faces for each,
align them horizontally, also draw HH:MM numbers.
```
<img width="871" alt="Screenshot 2024-10-02 at 13 11 56" src="https://github.com/user-attachments/assets/5fee8527-c21e-4a1d-a35e-523665f6d2d5">


Again, click `[Accept All]` when available and refresh your page in the browser:

<img width="1123" alt="Screenshot 2024-10-02 at 13 13 45" src="https://github.com/user-attachments/assets/af5511e2-5bf8-45e6-ab14-72a6559e27f1">

7. Try different ideas. You may retry from scratch with a completely different idea in mind. How would you prompt to get that? Research prompt techniques online.

<img width="1120" alt="Screenshot 2024-10-02 at 13 31 56" src="https://github.com/user-attachments/assets/68c64181-2cae-47ba-b71f-e8a76fbd9772">

8. This was a simple single-file application. The true power of Cursor comes in instantly making changes throughout many files in a big project. This allows you to build complex features. For that, we need to use a React library and some tooling - which is what this template's files provide.


# A React app

Now we'll make a new app from scratch using a modern, more scalable approach - by using a React framework and a handy tooling around it: TypeScript and Vite.

Instructions below exploit many concepts that may be less clear to non-programmers. You **don't need** to understand them to complete this tutorial. However, if you wish to understand them deeper, consult an LLM of your choice: 
- [simple html vs React](https://chatgpt.com/share/670e3c1b-bc88-800f-959a-7ff1b8c7ec9d)
- [git and deployment](https://chatgpt.com/share/670e3d41-dc34-800f-ae6b-c181e6b06cb7)

## Get the tools ready

1. Go here -> [and install Node.js](https://nodejs.org/en/download/prebuilt-installer) version 20
   - On Windows, do it directly to Windows, NOT to WSL-Ubuntu.
   - Don't try installing via your package manager, or you can get an outdated Node version like v12. You need at least v18 for Vite.
5. [Log into Github](https://github.com/login)

Optionally watch [my stream in Russian](https://www.youtube.com/live/NVnHvsuc5Fc)


## Run locally
Fork this very repo:

<img width="1191" alt="Screenshot 2024-09-30 at 22 04 00" src="https://github.com/user-attachments/assets/9f31a473-30c9-4e3b-abc7-69edd4011459">

Then clone it locally using [GitHub Desktop](https://desktop.github.com/download/)

Then open this project (`web-2024-template`) in Cursor (`File -> Open Folder...`), open `package.json`, hover `dev` on line 7 and click `Run Script`:

<img width="616" alt="Screenshot 2024-10-02 at 11 49 15" src="https://github.com/user-attachments/assets/a75d0dd3-41a9-4730-a25b-b4accc867e09">

Then open the link it gives in your browser.

<img width="1005" alt="Screenshot 2024-10-02 at 11 52 29" src="https://github.com/user-attachments/assets/9fbff3f8-be54-43af-80f3-fc8ed846cf2c">

On Windows, you may get errors for `npm` not being found. Try opening a "Command Prompt" type of terminal in Cursor and run `npm run dev` in it:

![photo_2024-10-09_16-53-07](https://github.com/user-attachments/assets/088e8782-a9d0-46b1-a1cd-56f2d1120d0d)


If `npm` is still not found there, it usually means that your installation of Node.js hasn't added a path to `npm` to your PATH variable. Ask Cursor's Chat (or a GPT4/Claude.ai/Bing Copilot/Gemini) on how to debug that.

## Make changes

Open `src/App.tsx`, then press `Cmd/Ctrl+I`, then type your request or paste a screenshot of a desired UI. Eg.
```
Instead of a todo list app, make an app to store and edit recipes for dishes.
Allow to recalculate number of portions for each dish.
Populate with 5 boilerplate dishes.
Make funky styling.
```

You can write your mother tounge (Spanish, Polish etc.) - it'll [understand](https://chatgpt.com/share/66fbdfda-a314-800f-997d-1cedbc9f4f92)

Hit Enter, then once it's done - hit Acccept All and reload your live demo in the browser.

## Save changes (commit)

See [troubleshooting](#troubleshooting) if anything fails.

Once you've changed anything, open <img width="263" alt="372839934-8672006e-9198-4399-9169-0086bf01e961" src="https://github.com/user-attachments/assets/371824e8-420c-4143-8de1-b1b310d78cd5">
 in Cursor and **write a commit message** in the Message field (a short summary of your changes). Don't leave this field blank, type anything - like, `1`.

**Once you wrote a message**, press `[Commit]`, then press `[Sync]`.

The UI here is annoying and humiliating, I know. 

You may also do it from GitHub Desktop. 

If you're lost, open a Terminal, press `Cmd/Ctrl+K` and describe what you want from Git in plain English.

## Deploy

Open `package.json` and run a deploy script:

<img width="822" alt="Screenshot 2024-10-02 at 21 08 37" src="https://github.com/user-attachments/assets/facd4e44-17e5-4bb6-a762-310a6e6bd28c">


If you get errors during deployment, copy them from terminal, paste them to Cursor's Composer, and it'll try to fix. Then retry deploying until it succeeds.

Then refresh the browser tab with your Github repository. After it, enable the website link on Github: uncheck and check back the ✅ `Use your GitHub Pages website`:

<img width="1086" alt="Screenshot 2024-09-30 at 22 14 15" src="https://github.com/user-attachments/assets/6fa99fc3-c359-4113-b328-7c5da738eb7c">

<img width="1137" alt="Screenshot 2024-09-30 at 22 15 58" src="https://github.com/user-attachments/assets/1dd5b7d8-4478-4693-bf84-0a466ebbfbda">

<img width="1437" alt="Снимок экрана 2024-10-02 в 15 15 25" src="https://github.com/user-attachments/assets/047dca0c-b01f-4b52-bd8f-db6598b27feb">


You should see your changes live.

Hint: You don't need to deploy to test every single change - for that you can still run a `dev` script. Deploy when you made a new version.

## Bring your idea

Now you can change this template into any front-end idea that you'd like to create. Depending on your feature set, you may or may not need a back-end - see below for suggestions.

## Tips

- First two weeks of Cursor are free, unless you use it too much.
- Break down new functionality into smallest possible bits. Don't bundle several unrelated features: if you get an error for one of them, you'll lose more time retrying
- Once a Cursor made any small step in the right direction - commit
- Press "+" to start a new Composer and erase unnecessary previous context. Cursor knows what you did before because it looks into the current code
- If Cursor broke things: either Reject All, press "+" and start from the last commit; or try 2-3 attempts at sending error messages to it and ask to fix
- Use `@Codebase` and also mention all files that might have a relevant context
- Ask Cursor to add a debug output and paste it to composer
- Ask Cursor to add a debug UI at the right place in your application. Ask to print out all relevant app state there
- Try attaching reference screenshots and mockups as images to Composer
- Try building anything with OpenAI API, use `@OpenAI`
- Use `@Docs` and `@Web`
- [Search Youtube for tips](https://www.youtube.com/watch?v=1kPr1vy0-QY)
- Read about [features](https://www.cursor.com/features)
- Read [the docs](https://docs.cursor.com/)
- https://cursorcasts.com/
- https://github.com/PatrickJS/awesome-cursorrules and https://cursor.directory/
- https://v0.dev/ and [shadcn/ui](https://ui.shadcn.com/)


## React vs Vanilla JS

Why do we need a framework like React if the generation works nice even in a plain HTML?

My instinctive answer would be "because it scales better": as you grow your app, add more features, libraries, complexity, pages, sections, state - React manages it better. But that's a dev's answer - because React helps you manage the complexity of reasoning about your code and debugging it.

LLMs take the long generation for granted. However, that doesn't mean it's always error-prone. A result depends so much from precise wording, a thoroughly explained mental model of your app and your features, a lot of debug output added at a right time etc. 

So I'd still bet on that with React+TypeScript you'll be able to integrate whatever you need - modern UI kits, payment processing, maps, animations, nav, charts, drag&drop, optimistic updates, dynamic loading - easier and faster.


# This is so tough, can I do it simpler?

You can try [Replit Agent](https://docs.replit.com/replitai/agent), although this will cost you $25 (no free trial). UX/vision-wise, it's mind-blowing. However, I can't get any meaningful results out of it so far. Also, it's heavily leaning towards Flask.

Worth trying, but it's 2024, so LLMs can still be silly.



# Do I need a backend?

If you simply want to persist data, ask Cursor to save data in local storage. 

If you need to persist it across users or devices, ask Cursor to use [Firestore](https://firebase.google.com/)

If you need authorization, ask Cursor to use [Firebase Authentication](https://firebase.google.com/). I recommend you to start with just the Google authorization - it's the easiest to support in the long term.

If you need a logic to process user's data on the backend - start with [Firebase Cloud Functions](https://firebase.google.com/)

## Adding Firestore to the project

1. Ask Cursor:
```
Save data to Firestore
```
2. Log into https://console.firebase.google.com/
3. Create a project.
4. Select "Cloud Firestore", create a database in **test mode**:

<img width="895" alt="Screenshot 2024-10-03 at 15 41 39" src="https://github.com/user-attachments/assets/c69af68e-622b-4276-a612-0d2c914c92d1">

6. In `⚙️ Project Settings` create a web app **</>** (no **Firebase Hosting** needed):

<img width="1089" alt="Screenshot 2024-10-03 at 15 43 31" src="https://github.com/user-attachments/assets/5973592c-af22-44d6-8ad3-2e22f36e26d4">

8. Copy `firebaseConfig` to the file that Cursor created for it:

```js
const firebaseConfig = {
  apiKey: "AIzaNdPrtYYZO3Mo9gmNTQFwqI8fSdn-jKTuWA",
  authDomain: "your-app-43gh9.firebaseapp.com",
  projectId: "your-app-43gh9",
  storageBucket: "your-app-43gh9.appspot.com",
  messagingSenderId: "783999999999",
  appId: "1:783553619737:web:dff6fce9589deaf34",
  measurementId: "G-JL7GNDPV6V"
};
```

9. Reload your app, make sure it has saved the data to the database.
9. Open your database and try to see it there:

<img width="850" alt="Screenshot 2024-10-03 at 16 17 23" src="https://github.com/user-attachments/assets/bb790a30-9ea0-4cfb-b4e7-ca068173e30b">

10. If something breaks, ask Cursor to add a debug output for all Firebase requests.

# How to create a Telegram bot?

1. Create an empty folder on your computer.
2. File -> Open Folder it in Cursor.
3. `Cmd/Ctrl+I`, type `create a simple telegram bot`.
   - Read carefully what it tells you to do
   - If something doesn't work, replace `pip` with `pip3` and `python` with `python3`
   - You need to kill (`Ctrl+C` on Mac/Windows) and rerun your `python3 bot.py` after every code change - since python scripts don't automatically reload after their code has been changed.


# Troubleshooting

If you encountered a tricky situation while running this guide, please send screenshots to [cxielamiko@gmail.com](mailto:cxielamiko@gmail.com) or [Vitaly Pavlenko on Telegram](https://t.me/vitalypavlenko) so I can add the fix for it to

### Git authenticity

<img width="1229" alt="Screenshot 2024-10-02 at 15 52 36" src="https://github.com/user-attachments/assets/c528a173-05c1-402b-8c9d-24cc56179508">

Type `yes`, Enter.

### Empty commit message

<img width="1616" alt="Screenshot 2024-10-02 at 15 53 09" src="https://github.com/user-attachments/assets/b0797dc7-eba1-43ff-a23d-23fd3ddb65c4">

Type `fix` in the file `COMMIT_EDITMSG` (on line 1), then Save the current file.

Next time write a commit message right in the message box:

<img width="252" alt="Screenshot 2024-10-02 at 15 54 23" src="https://github.com/user-attachments/assets/1fd00da2-1d3b-456f-b8f9-66d4d66982f8">

### First time Git configuration

If you see this:

![photo_2024-10-14_13-42-25](https://github.com/user-attachments/assets/4b8179fd-9d88-4cc4-a87b-79db4d00ba19)

Then open any terminal and enter these two lines, modifying their values with your personal data. This marks commits wherever you push your code - most likely, on Github:
```
git config --global user.email "YOUR_EMAIL@gmail.com"
```
```
git config --global user.name "JANE DOE"
```

