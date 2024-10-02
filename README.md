# How to Cursor in React

Our goal is to learn how to create web applications without learning programming/frameworks. Modern LLMs can write the code for you. They aren't ideal - treat them as rapid helpers that are smart but blind.

This React+TypeScript+Vite+MUI template allows you to run it locally in a Cursor IDE. Replace it with your logic and deploy to web - in minutes.


## Get the tools ready

1. Go here -> [and install Node.js](https://nodejs.org/en/download/prebuilt-installer) version 20
   - On Windows, do it directly to Windows, NOT to WSL-Ubuntu.
   - Don't try installing via your package manager, or you can get an outdated Node version like v12. You need at least v18 for Vite.
3. Install [Cursor IDE](https://www.cursor.com/). If you had it installed before, Cmd+Shift+P "Attempt Update" to get the latest update
4. Install Github Desktop (or make sure you have git on your machine)
5. Log into Github
6. Locally, [git config user.name and user.email](https://www.nobledesktop.com/learn/git/setup-email)

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

# Can I use vanilla HTML/JS/CSS?

Yes! Cursor is just as good in generating plain code. If you don't think you need a React ecosystem, you can ask Cursor to generate an html website on an empty project, with no configuration and scripting. This may work for your case - try to find limits of this approach.


# Do I need a backend?

Do you?

If you simply want to persist data, ask Cursor to save data in local storage. 

If you need to persist it across users or devices, ask Cursor to use [Firestore](https://firebase.google.com/)

If you need authorization, ask Cursor to use [Firebase Authentication](https://firebase.google.com/)

If you need a logic to process user's data on the backend - start with [Firebase Cloud Functions](https://firebase.google.com/)
