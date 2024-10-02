# How to Cursor in React

Our goal is to learn how to create web applications without learning programming/frameworks.

Modern LLMs can write the code for you. They aren't ideal - treat them as rapid helpers that are smart but blind. Try to make them do what you want - give them precise instructions, iterate, step back and retry.

This React+TypeScript+Vite+MUI template allows you to run it locally in a Cursor IDE. Replace it with your logic and deploy to web - in minutes.


## Before we do this freaking tooling: a simple html app 

1. Install [Cursor IDE](https://www.cursor.com/). If you had it installed before, Cmd+Shift+P "Attempt Update" to get the latest update
3. Press `Cmd+I` (`Ctrl+I`) and ask Cursor to make a simple website. Ask for any functionality and UI. Try asking in your language (Spanish, Polish etc.):
<img width="599" alt="Screenshot 2024-10-02 at 13 06 38" src="https://github.com/user-attachments/assets/6df0cba6-da1f-4ec2-8f01-d9d1434a0aab">

```
create a simple html website with easy conversion between 7 main time zones.
time in all of theme is displayed simultaneously, and I can change hh and mm
in any of them in one click or by typing
```

4. Click `Accept All`:
<img width="874" alt="Screenshot 2024-10-02 at 13 07 19" src="https://github.com/user-attachments/assets/1db29fba-8814-4290-ad67-4830d9315301">

5. Open this file `index.html` in your browser (File -> Open):
<img width="588" alt="Screenshot 2024-10-02 at 13 10 37" src="https://github.com/user-attachments/assets/75d2b489-c4bd-4c70-9f60-8fb3b52d3e40">

6. In the same Composer chat, ask for changes:

```
make a solid-looking modern UI, draw real clock faces for each,
align them horizontally, also draw HH:MM numbers
```
<img width="871" alt="Screenshot 2024-10-02 at 13 11 56" src="https://github.com/user-attachments/assets/5fee8527-c21e-4a1d-a35e-523665f6d2d5">


Again, click `Accept All` when available and refresh your page in the browser:

<img width="1123" alt="Screenshot 2024-10-02 at 13 13 45" src="https://github.com/user-attachments/assets/af5511e2-5bf8-45e6-ab14-72a6559e27f1">

7. Try different ideas. You may retry from scratch with a completely different idea in mind. How would you prompt to get that? Research prompt techniques online.

<img width="1120" alt="Screenshot 2024-10-02 at 13 31 56" src="https://github.com/user-attachments/assets/68c64181-2cae-47ba-b71f-e8a76fbd9772">

8. This was a simple single-file application. The true power of Cursor comes in instantly making changes throughout many files in a big project. This allows you to build complex features. For that, we need to use a React library and some tooling - which is what this template's files provide.



## Get the tools ready

1. Go here -> [and install Node.js](https://nodejs.org/en/download/prebuilt-installer) version 20
   - On Windows, do it directly to Windows, NOT to WSL-Ubuntu.
   - Don't try installing via your package manager, or you can get an outdated Node version like v12. You need at least v18 for Vite.
4. Install [git](https://git-scm.com/downloads)
5. [Log into Github](https://github.com/login)
6. If you never committed to git on this machine, run in the terminal with your own name and email:
```
git config --global user.name "Your Name"
```
and
```
git config --global user.email "youremail@example.com"
```

Optionally watch [my stream in Russian](https://www.youtube.com/watch?v=GlSaNy4bPLQ)


## Run locally
Fork this repo:

<img width="1191" alt="Screenshot 2024-09-30 at 22 04 00" src="https://github.com/user-attachments/assets/9f31a473-30c9-4e3b-abc7-69edd4011459">


Then git clone it locally:

```
git clone git@github.com:YOUR-USERNAME/web-2024-template.git
```

Then open this folder in Cursor, open package.json, hover `dev` and click `Run Script`:
<img width="616" alt="Screenshot 2024-10-02 at 11 49 15" src="https://github.com/user-attachments/assets/a75d0dd3-41a9-4730-a25b-b4accc867e09">

Then open the link it gives (with localhost:5137) in your browser.
<img width="1005" alt="Screenshot 2024-10-02 at 11 52 29" src="https://github.com/user-attachments/assets/9fbff3f8-be54-43af-80f3-fc8ed846cf2c">

## Make changes

Open `src/App.tsx`, then press Cmd+I (or Ctrl+I), then type your request. Eg.
```
Instead of a todo list app, make an app to store and edit recipes for dishes.
Allow to recalculate number of portions for each dish.
Populate with 5 boilerplate dishes.
Make funky styling.
```

You can write your mother tounge (Georgian, Ukrainian etc.) - it'll [understand](https://chatgpt.com/share/66fbdfda-a314-800f-997d-1cedbc9f4f92)

Hit Enter, then once it's done - hit Acccept All and reload your live demo in the browser.

## Save changes (commit)

Once you've changed anything, open <img width="170" alt="Screenshot 2024-09-29 at 11 55 25" src="https://github.com/user-attachments/assets/609846a8-9449-453c-b47b-57da07be9f8b"> in Cursor and try to commit and sync your changes to Github.

If you're lost, open a Terminal, press Cmd+K (Ctrl+K) and describe what you want from Git in plain English.

## Deploy

In the Cursor IDE, open a separate Terminal and run:

```
npm run deploy
```

If you get errors during deployment, pasted them to Cursor's Composer, and it'll try to fix. Then retry `npm run deploy` until it succeeds.

Then enable the website link on Github: click "Use your GitHub Pages website":

<img width="1086" alt="Screenshot 2024-09-30 at 22 14 15" src="https://github.com/user-attachments/assets/6fa99fc3-c359-4113-b328-7c5da738eb7c">

<img width="1137" alt="Screenshot 2024-09-30 at 22 15 58" src="https://github.com/user-attachments/assets/1dd5b7d8-4478-4693-bf84-0a466ebbfbda">

<img width="1047" alt="Screenshot 2024-09-30 at 23 40 09" src="https://github.com/user-attachments/assets/178195be-f8fb-40fd-931f-d4b22c923766">

You should see your changes live.

## Tips

- Break down new functionality into smallest possible bits. Don't bundle several unrelated features: if you get an error, you'll lose more time
- Once a Cursor made any small step in the right direction - commit
- Press "+" to start a new Composer and erase unnecessary previous context. Cursor knows what you did before because it looks into the current code
- If Cursor broke things: either Reject All, press "+" and start from the last commit; or try 2-3 attempts at sending error messages to it and ask to fix
- Use `@Codebase` and also mention all files that might have a relevant context
- Ask Cursor to add a debug output and paste it to composer
- Ask Cursor to add a debug UI at the right place in your application. Ask to print out all relevant app state there
- Read about [features](https://www.cursor.com/features)
- Read [the docs](https://docs.cursor.com/)
- https://cursorcasts.com/
- https://github.com/PatrickJS/awesome-cursorrules
- https://cursor.directory/
- https://v0.dev/ and shadcn


# This is so tough, can I do it simpler?

You can try [Replit Agent](https://docs.replit.com/replitai/agent), although this will cost you $25 (no free trial). UX/vision-wise, it's mind-blowing. However, I can't get any meaningful results out of it so far. Worth trying, but it's 2024, so LLMs can still be silly.


# Do I need a backend?

Do you?

If you simply want to persist data, ask Cursor to save data in local storage. 

If you need to persist it across users or devices, ask Cursor to use [Firestore](https://firebase.google.com/)

If you need authorization, ask Cursor to use [Firebase Authentication](https://firebase.google.com/)

If you need a logic to process user's data on the backend - start with [Firebase Cloud Functions](https://firebase.google.com/)
