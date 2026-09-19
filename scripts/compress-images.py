"""Prepare every photo under src/images for the web.

Runs automatically on GitHub (see .github/workflows/deploy.yml) whenever a
photo is added, so the owner never has to run it. Developers can run it
locally too:  python scripts/compress-images.py

- Walks every sub-folder (hero/, wedding/, baby/ ...).
- Photos (.jpg/.jpeg/.png/.heic) are rotated per EXIF, resized to max 1920px
  on the long edge and converted to WebP quality 82 with metadata stripped.
  The original is removed so only the .webp remains.
- Existing .webp files are re-encoded only if larger than 1920px.
- logo.png at the top level is kept as PNG (transparency), max 512px.

Exit code 0 always; prints one line per file it touched.
"""
import os
import sys
from PIL import Image, ImageOps

try:  # iPhone photos
    from pillow_heif import register_heif_opener
    register_heif_opener()
    HEIC_OK = True
except ImportError:
    HEIC_OK = False

IMG_DIR = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', 'src', 'images'))
MAX_PHOTO = 1920
MAX_LOGO = 512
QUALITY = 82
PHOTO_EXTS = {'.jpg', '.jpeg', '.png', '.heic', '.heif', '.webp'}

total_before = total_after = 0
changed = []

for root, _dirs, files in os.walk(IMG_DIR):
    for name in sorted(files):
        path = os.path.join(root, name)
        base, ext = os.path.splitext(path)
        ext = ext.lower()
        if ext not in PHOTO_EXTS:
            continue
        if ext in ('.heic', '.heif') and not HEIC_OK:
            print(f'SKIP {name}: install pillow-heif to convert iPhone HEIC photos', file=sys.stderr)
            continue

        before = os.path.getsize(path)
        try:
            im = ImageOps.exif_transpose(Image.open(path))
        except Exception as e:  # corrupt / not really an image
            print(f'SKIP {name}: {e}', file=sys.stderr)
            continue

        is_logo = root == IMG_DIR and name.lower() == 'logo.png'
        if is_logo:
            if max(im.size) <= MAX_LOGO:
                continue
            im.thumbnail((MAX_LOGO, MAX_LOGO), Image.LANCZOS)
            im.save(path, 'PNG', optimize=True)
            out = path
        elif ext == '.webp' and max(im.size) <= MAX_PHOTO:
            continue  # already web-ready
        else:
            if max(im.size) > MAX_PHOTO:
                im.thumbnail((MAX_PHOTO, MAX_PHOTO), Image.LANCZOS)
            out = base + '.webp'
            im.convert('RGBA' if im.mode in ('RGBA', 'LA', 'P') else 'RGB').save(out, 'WEBP', quality=QUALITY, method=6)
            if out != path:
                os.remove(path)

        after = os.path.getsize(out)
        total_before += before
        total_after += after
        rel = os.path.relpath(out, IMG_DIR).replace(os.sep, '/')
        changed.append(rel)
        print(f'{rel:40} {im.size[0]}x{im.size[1]:<5} {before/1024:7.0f} KB -> {after/1024:6.0f} KB')

if changed:
    print(f'\n{len(changed)} file(s): {total_before/1024/1024:.1f} MB -> {total_after/1024/1024:.1f} MB')
else:
    print('All photos already web-ready.')
