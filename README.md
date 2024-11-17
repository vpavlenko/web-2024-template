
![379113570-98bff411-e1e5-4de1-affe-dde8a27920f9 copy](https://github.com/user-attachments/assets/95aa1733-f495-4871-a2c1-fe4e6c0bc54f)

[8 year old girl codes with Cursor AI](https://www.youtube.com/watch?v=o5uvDZ8srHA)

In this guide you'll develop your own web application from scratch using plain English in the Cursor IDE. Cursor is the leading AI-powered code editor, capable of instantly making code changes in complex projects across multiple files.

The development process is changing rapidly. Instead of learning programming languages and frameworks, you'll now need to carefully decompose projects into tasks, provide sufficient context to LLM helpers, and know how to recover from dead ends. Once you master this, you'll be able to start projects outside your area of expertise, even without any developers.

This React+TypeScript+Vite+MUI template allows you to run it locally in a Cursor IDE. Replace it with your logic and deploy to web.

This guide will take around 1 to 2 hours of your time.

- [Idea](#idea)
- [Agents](#agents)
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
  * [Rules](#rules)
- [How to create a Telegram bot?](#how-to-create-a-telegram-bot)
- [Troubleshooting](#troubleshooting)
    + [Git authenticity](#git-authenticity)
    + [Empty commit message](#empty-commit-message)
    + [First time Git configuration](#first-time-git-configuration)


# Idea

Come up with an idea of a web application that you'll try to develop today. You may look at your browser history, look at apps in your phone, or type single letters to a browser search box ('a', 'b', 'c' etc.) to see which websites you're actually using a lot.

# Agents

First, try https://bolt.new/ . If you get stuck on a blank screen:
- try using Chrome instead of Firefox
- ask in the chat "I see the blank screen, please fix"

Then, try Replit Agent. (Ask me privately for credentials.)

Then come back and read further instructions. The rest of the workshop is about Cursor. It's a lower-level tool - it's not an AI agent. However, in practice it's more useful, once you learn to use it.

# A simple html app

Before we dive into React, let's spend 10-20 minutes in a simpler setup - a simple html website in a single `index.html` file. **Don't fork, clone or open the repo locally yet** (in case you already know what that means).

1. Install [Cursor IDE](https://www.cursor.com/), **select any options during the first run** (you can change them afterwards in `Settings... -> Cursor Settings`), then log in. If you had it installed before, `Cmd/Ctrl+Shift+P` "Attempt Update" to get the latest update.
   > This tutorial assumes you use either Cursor's free trial (first two weeks on a new account, limited to 50 requests in total) or Cursor Pro ($20/month). Yes, this tutorial is built around a paid product. Not ready to pay? If your free trial has expired, you may create a new account using a new email (or a `youremail+1@gmail.com` - notice the [plus hack](https://medium.com/verses-education/an-easy-gmail-hack-for-signing-up-multiple-user-accounts-that-require-an-email-address-4aba56e29248)) - and your trial will likely restart
3. Create an empty folder on your computer outside of Cursor. Then, in Cursor open it using `File -> Open Folder...`.
   > The first run opens `.cursor-tutor` folder - you may well just work inside it. To locate it on your computer, hover over its name in Cursor - the tooltip will show you the path to it.
5. Press `Cmd/Ctrl+I` and ask Cursor to make a _simple html website_. **Include the words `simple html website` in your prompt**. Ask for any functionality and UI. Try asking in your language (Spanish, Polish etc.) - it may perform on par with English or worse. Here is the example, feel free to ask for _your own website idea_ at this very stage:
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

6. In the same Composer chat, ask for changes:

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
   - On Windows, **don't** "automatically install the necessary tools": ![dont](https://github.com/user-attachments/assets/4a6bf53a-05c9-436c-9663-64bc2b8fffeb)


    
5. [Log into Github](https://github.com/login)

Optionally watch [my stream in Russian](https://www.youtube.com/live/NVnHvsuc5Fc)


## Run locally
Fork this very repo (say what? see a screenshot below):

> A fork is your own complete copy of this repo that's stored on Github. You save code changes to it. Git and Github help you not to lose any interim code state, should you wish to roll back to it at any time.

<img width="1191" alt="Screenshot 2024-09-30 at 22 04 00" src="https://github.com/user-attachments/assets/9f31a473-30c9-4e3b-abc7-69edd4011459">


Then clone it locally using [GitHub Desktop](https://desktop.github.com/download/). To do that, install it and log into your Github account using `File -> Options` `Sign into Github.com`. As you see `yourusername/web-2024-template` in the list of repos, press `Clone`, then select `For my own purposes`:

> A clone is your copy of a source code from Github servers to your local computer. Your repo's home is online at Github servers. You can clone it to any of your computers. If your repo is public, everyone can fork and clone it. You can make it private.

![Screenshot_5 (2)](https://github.com/user-attachments/assets/d27adef4-6004-4db3-92a4-a29ad62fdaec)


Then open this project (`web-2024-template`) in Cursor (`File -> Open Folder...`), open `package.json`, hover `dev` on line 7 and click `Run Script`:

<img width="616" alt="Screenshot 2024-10-02 at 11 49 15" src="https://github.com/user-attachments/assets/a75d0dd3-41a9-4730-a25b-b4accc867e09">

Then open the link it gives in your browser.

<img width="1005" alt="Screenshot 2024-10-02 at 11 52 29" src="https://github.com/user-attachments/assets/9fbff3f8-be54-43af-80f3-fc8ed846cf2c">

On Windows, you may get errors for `npm` not being found.
   - Restart Cursor after installing Node.js
   - Try opening a "Command Prompt" type of terminal in Cursor and run `npm run dev` in it. If it works, you may configure "Command Prompt" as your default Terminal Profile in Cursor:

![photo_2024-10-09_16-53-07](https://github.com/user-attachments/assets/088e8782-a9d0-46b1-a1cd-56f2d1120d0d)


If `npm` is still not found there, it usually means that your installation of Node.js hasn't added a path to `npm` to your PATH variable. Ask Cursor's Chat (or a GPT4/Claude.ai/Bing Copilot/Gemini) on how to debug that.

## Make changes

Open `src/App.tsx`, then press `Cmd/Ctrl+I`, then type your request or paste a screenshot of a desired UI. **Use `@Codebase` to help Cursor find all relevant files.** Eg.
```
@Codebase Instead of a todo list app, make an app to store and edit recipes for dishes.
Allow to recalculate number of portions for each dish.
Populate with 5 boilerplate dishes.
Make funky styling.
```

<img width="1003" alt="Screenshot 2024-10-23 at 08 49 52" src="https://github.com/user-attachments/assets/c96e7fc5-d154-4413-adb6-4170d416f765">


You can write your mother tounge (Spanish, Polish etc.) - it'll [understand](https://chatgpt.com/share/66fbdfda-a314-800f-997d-1cedbc9f4f92)

Hit Enter, then once it's done - click `[Acccept All]` and reload your live demo in the browser.

## Save changes (commit)

See [troubleshooting](#troubleshooting) if anything fails.

Once you've changed anything, open <img width="263" alt="372839934-8672006e-9198-4399-9169-0086bf01e961" src="https://github.com/user-attachments/assets/371824e8-420c-4143-8de1-b1b310d78cd5">
 in Cursor and **write a commit message** in the Message field (a short summary of your changes). Don't leave this field blank, type anything - like, `1`.

**Once you wrote a message**, press `[Commit]`, then press `[🔄  Sync Changes ... ↑]`.

If prompted like this, press `[Always]` for simplicity:

<img width="752" alt="Screenshot 2024-10-29 at 11 45 24" src="https://github.com/user-attachments/assets/3be87335-563b-4dd4-8080-9398f299470a">


The UI here is annoying and humiliating, I know. [You may fail](#empty-commit-message).

You may also do it from GitHub Desktop. 

If you're lost, open a Terminal, press `Cmd/Ctrl+K` and describe what you want from Git in plain English.

## Deploy

Open `package.json` and run a deploy script:

> When you "deploy", you make your website hosted in the internet so that it gets a direct link and becomes available for everyone to open in their browser, even when you turn your computer off.

<img width="822" alt="Screenshot 2024-10-02 at 21 08 37" src="https://github.com/user-attachments/assets/facd4e44-17e5-4bb6-a762-310a6e6bd28c">


If you get errors during deployment, copy all of them from terminal (`Ctrl/Cmd+A` `Ctrl/Cmd+C` `Ctrl/Cmd+V`), paste them to Cursor's Composer, ask `fix` (it won't generate for an empty prompt), and it'll try to fix. Then retry deploying until it succeeds: Run Script `deploy`, check if there are errors, copy. It should say `Published` when it succeeds.

Alternatively, try closing Cursor and opening it again.

Then **refresh the browser tab with your fork**. After the refresh, enable the website link on Github: uncheck and check back the ✅ `Use your GitHub Pages website`:

<img width="1086" alt="Screenshot 2024-09-30 at 22 14 15" src="https://github.com/user-attachments/assets/6fa99fc3-c359-4113-b328-7c5da738eb7c">

<img width="1137" alt="Screenshot 2024-09-30 at 22 15 58" src="https://github.com/user-attachments/assets/1dd5b7d8-4478-4693-bf84-0a466ebbfbda">

<img width="1437" alt="Снимок экрана 2024-10-02 в 15 15 25" src="https://github.com/user-attachments/assets/047dca0c-b01f-4b52-bd8f-db6598b27feb">


You should see your changes live.

Once your website is online, send its link to [me](https://t.me/vitalypavlenko) and please star [the original guide](https://github.com/vpavlenko/web-2024-template/):

<img width="875" alt="Screenshot 2024-10-28 at 12 33 39" src="https://github.com/user-attachments/assets/c0702500-2a15-48e7-ad51-d2aad9167785">


Hint: You don't need to deploy to test every single change - for that you can still run a `dev` script. Deploy when you made a new version that's tested and is ready to replace the old one.

## Bring your idea

Now you can change this template into any front-end idea that you'd like to create. Depending on your feature set, you may or may not need a back-end - see below for suggestions.

## Tips

- First two weeks of Cursor are free, unless you use it too much. Can you log out and start a new trial with another email like `youremail+1@gmail.com`? Depends on your attitude [towards](https://www.cursor.com/blog/series-a) [capitalism](https://www.youtube.com/watch?v=oFfVt3S51T4).
- Break down new functionality into smallest possible bits. Don't bundle several unrelated features: if you get an error for one of them, you'll lose more time retrying
- Once a Cursor made any small step in the right direction, immediatelly commit to save changes for the future
- You may `··· -> Open composer as pane`. However, never open __CHAT__ instead:
   <img width="675" alt="Screenshot 2024-10-19 at 14 32 38" src="https://github.com/user-attachments/assets/0ef8f876-8eb2-4798-9886-788796866da5">
- If you want to go back to a previous version of your source code, scroll up the Composer's chat and press `checkout` below any of Cursor's replies
- Press "+" to start a new Composer and erase unnecessary previous context. Cursor knows what you did before because it looks into the current code
- Cursor's context is limited: you can't mention a file that's 3 MB long
- If Cursor broke things: either Reject All, press "+" and start from the last commit; or try 2-3 attempts at sending error messages to it and ask to fix
- Use `@Codebase` and also mention all files that might have a relevant context
- Ask Cursor to add a debug output and paste it to composer
- Ask Cursor to add a debug UI at the right place in your application. Ask to print out all relevant app state there
- Try attaching reference screenshots and mockups as images to Composer. Ask it to recreate a design based on a screenshot you've provided
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

1. In your repo, ask Cursor to generate a code to save data to Firestore:
```
Save data to Firestore
```

<img width="527" alt="Screenshot 2024-10-23 at 09 18 21" src="https://github.com/user-attachments/assets/0d514359-b832-48dd-a369-7ad17bf086c4">

It will generate relevant code. Also, it'll tell you to run an installation command in the terminal - since you'll require a `firebase` library. You need to run this command manually in a new terminal. Cursor doesn't run any commands in your terminal on its own due to security reasons - to defer [an AI takeover](https://en.wikipedia.org/wiki/AI_takeover) by several weeks.

<img width="527" alt="Screenshot 2024-10-23 at 09 59 52" src="https://github.com/user-attachments/assets/c4cb0691-4b8d-4b31-bf7d-4ca44cb8d7d0">

<img width="875" alt="Screenshot 2024-10-23 at 10 00 22" src="https://github.com/user-attachments/assets/9dcdf084-e45d-4431-b63f-35f9144fea0f">


<img width="879" alt="Screenshot 2024-10-23 at 10 00 42" src="https://github.com/user-attachments/assets/a845d6af-8a67-4afb-91ca-0c3e9d854e40">



2. Log into https://console.firebase.google.com/
3. Create a project.
4. Select "Cloud Firestore", create a database in **test mode**:

<img width="895" alt="Screenshot 2024-10-03 at 15 41 39" src="https://github.com/user-attachments/assets/c69af68e-622b-4276-a612-0d2c914c92d1">

6. In `⚙️ Project Settings` create a web app **</>** (no **Firebase Hosting** needed):

<img width="1089" alt="Screenshot 2024-10-03 at 15 43 31" src="https://github.com/user-attachments/assets/5973592c-af22-44d6-8ad3-2e22f36e26d4">

7. A previous step should finally show you your own `firebaseConfig`. Copy it to the file that Cursor created for it:

```js
const firebaseConfig = {
  apiKey: "YOU_SHOULD_GET_THIS_KEY_AT_THE_PREVIOUS_STEP",
  authDomain: "your-app-43gh9.firebaseapp.com",
  projectId: "your-app-43gh9",
  storageBucket: "your-app-43gh9.appspot.com",
  messagingSenderId: "783999999999",
  appId: "1:783553619737:web:dff6fce9589deaf34",
  measurementId: "G-JL7GNDPV6V"
};
```

8. Reload your app, make sure it has saved the data to the database.
9. Open your database and try to see it there:

<img width="850" alt="Screenshot 2024-10-03 at 16 17 23" src="https://github.com/user-attachments/assets/bb790a30-9ea0-4cfb-b4e7-ca068173e30b">

10. If something breaks, ask Cursor to add a debug output for all Firebase requests. Also, open a Console tab and a Network tab in your browser's Dev Tools and see if there are any errors in red.

## Rules

If you fail to select a **test mode** in the step 4, you need to go to Rules and allow all reads and writes:

```yaml
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

<img width="857" alt="Screenshot 2024-10-23 at 09 35 50" src="https://github.com/user-attachments/assets/b761546e-272b-4c2b-86d0-78b3302bb95a">

This will allow anyone in the internet to read or write (or erase) any data in your Firestore. If you need any protection - eg. via user authentication - ask a GPT4 to design a strategy of your data protection in Firebase using your authentication strategies, user roles in your app and data schema you have in your Firestore. 


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

![Screenshot_6](https://github.com/user-attachments/assets/12e1d0cc-38f6-4ac8-a2af-c129ee0d9f5f)


![photo_2024-10-14_13-42-25](https://github.com/user-attachments/assets/4b8179fd-9d88-4cc4-a87b-79db4d00ba19)

Then open any terminal and enter these two lines, modifying their values with your personal data. This marks commits wherever you push your code - most likely, on Github:
```
git config --global user.email "YOUR_EMAIL@gmail.com"
```
```
git config --global user.name "JANE DOE"
```

