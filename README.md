# Web 2024 Template

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

<img width="27" alt="Screenshot 2024-09-29 at 19 36 35" src="https://github.com/user-attachments/assets/0cfd6377-5595-4366-9094-0eff8c1659ca">
→
<img width="254" alt="Screenshot 2024-09-29 at 19 36 20" src="https://github.com/user-attachments/assets/3ecab6a7-9f0d-4033-9b7b-a5d22a2927dd">

## Tips

- Break down functionality into smallest possible bits. Don't bundle several unrelated features: you'll increase the probability of an app crash and your lost time
- Once a Cursor made any small step in the right direction - commit and push
- If Cursor broke things: better Reject All and start from the last commit
- Press "+" to start a new Composer and erase unnecessary previous context. Cursor knows what you did before because it looks into the current code

