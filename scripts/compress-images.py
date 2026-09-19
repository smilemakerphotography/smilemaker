"""Prepare photos in src/images for the web.

Usage:  python scripts/compress-images.py
Drop any .jpg/.jpeg/.png into src/images with the right name, then run this.

- Photos are resized to max 1920px on the long edge and converted to WebP
  (quality 82, metadata stripped). The original JPEG/PNG is removed so only
  the .webp remains; keep your camera originals elsewhere.
- logo.png is kept as PNG (transparency) and capped at 512px.
- Files already in .webp are re-encoded only if they are larger than 1920px.

Naming convention (the site reads images by prefix, see src/images.js):
  hero-slideN             homepage slideshow
  service-<slug>          card image for a service (service-wedding, service-baby ...)
  <service-title-slug>-N  photos in a category, e.g. wedding-photography-3, baby-shoots-1
"""
import glob, os
from PIL import Image, ImageOps

IMG_DIR = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', 'src', 'images'))
MAX_PHOTO = 1920
MAX_LOGO = 512
QUALITY = 82

total_before = total_after = 0
for path in sorted(glob.glob(os.path.join(IMG_DIR, '*'))):
    base, ext = os.path.splitext(path)
    ext = ext.lower()
    if ext not in ('.jpg', '.jpeg', '.png', '.webp'):
        continue
    before = os.path.getsize(path)
    im = ImageOps.exif_transpose(Image.open(path))  # apply EXIF rotation, then drop EXIF
    is_logo = os.path.basename(base) == 'logo' and ext == '.png'

    if is_logo:
        if max(im.size) > MAX_LOGO:
            im.thumbnail((MAX_LOGO, MAX_LOGO), Image.LANCZOS)
            im.save(path, 'PNG', optimize=True)
        out = path
    elif ext == '.webp' and max(im.size) <= MAX_PHOTO:
        continue  # already web-ready
    else:
        if max(im.size) > MAX_PHOTO:
            im.thumbnail((MAX_PHOTO, MAX_PHOTO), Image.LANCZOS)
        out = base + '.webp'
        im.save(out, 'WEBP', quality=QUALITY, method=6)
        if out != path:
            os.remove(path)

    after = os.path.getsize(out)
    total_before += before; total_after += after
    print(f'{os.path.basename(out):32} {im.size[0]}x{im.size[1]:<5} {before/1024:7.0f} KB -> {after/1024:6.0f} KB')

print(f'\nTotal: {total_before/1024/1024:.1f} MB -> {total_after/1024/1024:.1f} MB')
