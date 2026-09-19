# How to add or remove photos on the website

You do everything on **github.com** — from a phone or a laptop. No software to
install. After every change the website rebuilds itself in about 3 minutes.

**Your photo folders:** <https://github.com/smilemakerphotography/smilemaker/tree/main/src/images>

| Folder        | Where it shows on the website                |
|---------------|----------------------------------------------|
| `hero/`       | The big slideshow at the top of the homepage |
| `wedding/`    | "Wedding Photography" photos                 |
| `model/`      | "Model Shoots" photos                        |
| `portfolio/`  | "Portfolio Creation" photos                  |
| `outdoor/`    | "Outdoor Sessions" photos                    |
| `baby/`       | "Baby Shoots" photos                         |

Inside each service folder, the file called **`cover`** (e.g. `cover.webp`)
is the picture on the service card. All other files are the photos shown
when someone clicks *more photos*.

Photos appear in **alphabetical order**, so name them `01-…`, `02-…` if the
order matters. Any name is fine otherwise. JPG, PNG, HEIC (iPhone) and WebP
all work; there is no need to shrink photos first — the site does that.

---

## Add photos

1. Open the folder link above and tap the folder you want (e.g. `wedding`).
2. Tap **Add file** ▸ **Upload files** (on a phone: tap the **⋯** or **+** button first).
3. Choose the photos from your phone/computer. You can select many at once.
4. Scroll down, keep **"Commit directly to the main branch"** selected,
   and tap the green **Commit changes** button.
5. Wait ~3 minutes, then refresh the website. Done.

## Remove a photo

1. Open the folder and tap the photo's name.
2. Tap the **🗑 trash-can** icon (top-right of the file view; on a phone it is under **⋯**).
3. Tap the green **Commit changes** button.

## Change a service's card image

Upload the new picture into that service's folder with the name
`cover.jpg` (or `cover.png`). It replaces the old one automatically.

## Change the homepage slideshow

Add or remove files in the `hero/` folder. Landscape photos look best there.

---

## Check that it published

Open <https://github.com/smilemakerphotography/smilemaker/actions>.
The top row is the latest change:

- 🟡 yellow dot = still working, wait
- ✅ green tick = live on the website
- ❌ red cross = something went wrong — send the link to your developer

If the website still looks old, do a hard refresh (Ctrl + F5, or on a phone
close the tab and reopen it).

---

## Things to avoid

- Don't rename or delete the **folders** themselves — only the files inside.
- Don't touch anything outside the `src/images` folder.
- Keep your original full-size photos on your own computer. The website
  keeps only a shrunk copy.

## Changing the text (service descriptions, About page)

Text is in code files, so ask your developer — or, if you are comfortable,
edit `src/images.js` on GitHub (the pencil icon), change only the words
inside the quotes, and commit. The site rebuilds the same way.
