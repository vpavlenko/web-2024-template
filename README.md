# How to Cursor in React

This template allows you to run it locally in a Cursor IDE, replace it with your logic and deploy to web - in minutes.

## Get the tools ready

1. [Install Node.js](https://nodejs.org/en/download/prebuilt-installer)
   - On Windows, do it directly to Windows, NOT to WSL-Ubuntu.
   - Don't try installing via your package manager, or you can get an outdated Node version like v12. You need at least v18 for Vite.
3. Install [Cursor IDE](https://www.cursor.com/). If you had it installed before, Cmd+Shift+P "Attempt Update" to get the latest update 


## Run locally
Fork this repo:

<img width="1191" alt="Screenshot 2024-09-30 at 22 04 00" src="https://github.com/user-attachments/assets/9f31a473-30c9-4e3b-abc7-69edd4011459">


Then git clone it locally:

```
git clone git@github.com:YOUR-USERNAME/web-2024-template.git
```

Then open this folder in Cursor and do smth like:

```
cd web-2024-template/
npm install
npm run dev
```

## Make changes

Open src/App.tsx, then press Cmd+I (or Ctrl+I), then type your request. Eg.
```
Instead of a todo list app, make an app to store and edit recipes for dishes.
Allow to recalculate number of portions for each dish.
Populate with 5 boilerplate dishes.
Make funky styling.
```

Try writing in your mother tongue - it may work out, idk.

Hit Enter, then once it's done - hit Acccept All and reload your live demo in the browser.

## Deploy

Once you've changed anything, you can deploy to gh-pages with:

```
git add . && git commit -m 'new commit'
npm run deploy && git push origin main
```

Then enable the website link on Github: click "Use your GitHub Pages website":

<img width="1086" alt="Screenshot 2024-09-30 at 22 14 15" src="https://github.com/user-attachments/assets/6fa99fc3-c359-4113-b328-7c5da738eb7c">

<img width="1137" alt="Screenshot 2024-09-30 at 22 15 58" src="https://github.com/user-attachments/assets/1dd5b7d8-4478-4693-bf84-0a466ebbfbda">

<img width="1047" alt="Screenshot 2024-09-30 at 23 40 09" src="https://github.com/user-attachments/assets/178195be-f8fb-40fd-931f-d4b22c923766">

## Tips

- Break down functionality into smallest possible bits. Don't bundle several unrelated features: if you get an error, you'll lose more time
- Once a Cursor made any small step in the right direction - commit and push
- If Cursor broke things: better Reject All and start from the last commit
- Press "+" to start a new Composer and erase unnecessary previous context. Cursor knows what you did before because it looks into the current code
- Read [/features](https://www.cursor.com/features)
- Log into Github (for publishing repos)
6. Log into [Claude](https://claude.ai/) (for asking third-party questions related to Git & life)

# This is so tough, can I do it simpler?

You can try [Replit Agent](https://docs.replit.com/replitai/agent), although this will cost you $25. UI-wise, it's mind-blowing. However, it's not guaranteed you'll be able to get your features implemented rapidly in it. It's 2024, LLMs can still be silly.

