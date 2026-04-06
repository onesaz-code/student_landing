# Institution Logos Setup Guide

## 📁 Directory Structure

Create the following folder structure in your project:

```
your-project/
├── public/
│   └── logos/
│       ├── cambridge.png
│       ├── stmarys.png
│       ├── techvalley.png
│       ├── global.png
│       ├── sunrise.png
│       ├── metropolitan.png
│       ├── futureleaders.png
│       ├── innovation.png
│       ├── heritage.png
│       ├── excellence.png
│       ├── brightminds.png
│       └── knowledgehub.png
```

## 🖼️ Logo Requirements

### File Formats
- **Recommended**: PNG with transparent background
- **Also supported**: JPG, SVG
- **Not recommended**: GIF, BMP

### Size & Dimensions
- **Minimum size**: 200x200 pixels
- **Recommended size**: 400x400 pixels or larger
- **Aspect ratio**: Square (1:1) or close to square works best
- **File size**: Keep under 200KB per logo for optimal performance

### Design Guidelines
- Use logos with **transparent backgrounds** (PNG format)
- Ensure logos are **high resolution** to avoid pixelation
- If logos have text, make sure it's **readable at small sizes**
- **White/light logos**: Add a colored background in your image editor
- **Dark/colored logos**: Work best on the white card backgrounds

## 📝 How to Add Your Logos

### Step 1: Prepare Your Logo Files
1. Gather all institution logo files
2. Rename them to match the names in the code (see list below)
3. Optimize file sizes if needed (use TinyPNG or similar)

### Step 2: Current Logo Names Expected
```
cambridge.png       → Cambridge International School
stmarys.png        → St. Mary's College
techvalley.png     → Tech Valley Academy
global.png         → Global University
sunrise.png        → Sunrise Public School
metropolitan.png   → Metropolitan Institute
futureleaders.png  → Future Leaders School
innovation.png     → Innovation University
heritage.png       → Heritage Academy
excellence.png     → Excellence College
brightminds.png    → Bright Minds School
knowledgehub.png   → Knowledge Hub University
```

### Step 3: Upload Your Logos
Place all logo files in the `/public/logos/` directory

### Step 4: Update Institution Data (Optional)
If you want to use different institutions, edit `/components/LogosSection.tsx`:

```tsx
const institutions = [
  { 
    name: 'Your Institution Name',
    type: 'K-12',              // Options: 'K-12', 'College', 'University', 'Higher Ed'
    students: '2,500+',        // Your student count
    logoUrl: '/logos/your-logo-filename.png'  // Path to your logo
  },
  // Add more institutions...
];
```

## 🔧 Troubleshooting

### Logo not showing?
1. **Check file path**: Ensure the logo is in `/public/logos/` directory
2. **Check filename**: Make sure it exactly matches the `logoUrl` in the code
3. **Check file extension**: PNG, JPG, or SVG only
4. **Check file size**: Very large files (>1MB) may load slowly

### Logo looks pixelated?
- Use higher resolution images (at least 400x400px)
- Ensure you're using PNG or SVG format
- Avoid upscaling small logos

### Logo looks stretched?
- The component uses `object-contain` which preserves aspect ratio
- Make sure your logo is close to square dimensions
- If needed, add padding in your image editor

## 💡 Tips for Best Results

1. **Consistent sizing**: All logos should be similar in size and visual weight
2. **Background**: If some logos are light, consider adding a subtle background color
3. **Branding**: Maintain institution brand guidelines when using their logos
4. **Performance**: Compress images without losing quality (use tools like TinyPNG)
5. **Accessibility**: The component already includes alt text for screen readers

## 🎨 Customization

### Change logo display size
Edit the logo container in `/components/LogosSection.tsx`:

```tsx
<div className="w-14 h-14 ...">  {/* Change w-14 h-14 to desired size */}
  <ImageWithFallback ... />
</div>
```

### Change card size
```tsx
<motion.div
  className="flex-shrink-0 w-80 h-36 ..."  {/* Adjust w-80 h-36 */}
>
```

### Add more institutions
Simply add new objects to the `institutions` array following the same structure.

## ✅ Quick Checklist

- [ ] Created `/public/logos/` directory
- [ ] Added all logo files with correct names
- [ ] Logos are PNG format with transparent background
- [ ] Logos are at least 200x200 pixels
- [ ] File sizes are optimized (< 200KB each)
- [ ] Updated institution names if needed
- [ ] Tested that all logos display correctly

---

**Need help?** The ImageWithFallback component will show a placeholder if a logo fails to load, so your site will always look professional even if some logos are missing.
