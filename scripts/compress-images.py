"""Resize and compress everything in src/images for the web.

Run after adding new photos:  python scripts/compress-images.py
Photos: max 1920px on the long edge, progressive JPEG q82, metadata stripped.
Logo:   max 512px PNG (it is shown at ~60px in the navbar).
Files that are already small are left untouched.
"""
import glob, os, subprocess
from PIL import Image, ImageOps

IMG_DIR = os.path.join(os.path.dirname(__file__), '..', 'src', 'images')
MAX_PHOTO = 1920
MAX_LOGO = 512
QUALITY = 82

total_before = total_after = 0
for path in sorted(glob.glob(os.path.join(IMG_DIR, '*'))):
    ext = os.path.splitext(path)[1].lower()
    if ext not in ('.jpg', '.jpeg', '.png'):
        continue
    before = os.path.getsize(path)
    im = ImageOps.exif_transpose(Image.open(path))  # apply rotation from EXIF, then drop EXIF
    is_logo = ext == '.png'
    limit = MAX_LOGO if is_logo else MAX_PHOTO
    if max(im.size) > limit:
        im.thumbnail((limit, limit), Image.LANCZOS)
    if is_logo:
        im.save(path, 'PNG', optimize=True)
    else:
        im.convert('RGB').save(path, 'JPEG', quality=QUALITY, optimize=True, progressive=True)
    after = os.path.getsize(path)
    if after >= before:  # compression didn't help, keep the original bytes
        subprocess.run(['git','checkout','--',path], check=False)
        after = before
    total_before += before; total_after += after
    print(f'{os.path.basename(path):32} {im.size[0]}x{im.size[1]:<5} {before/1024:8.0f} KB -> {after/1024:6.0f} KB')

print(f'\nTotal: {total_before/1024/1024:.1f} MB -> {total_after/1024/1024:.1f} MB')
