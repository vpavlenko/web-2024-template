
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

