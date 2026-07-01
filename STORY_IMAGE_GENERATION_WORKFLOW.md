# Story Image Generation & Integration Workflow

## Phase 1: Generate Images with Google Flow (Your Chrome)

### Setup (one-time)
1. Open **labs.google.com/flow** (or labs.google/flow)
2. Make sure you're logged into your Google account (with Flow access)
3. Have the Claude extension connected in Chrome (or use clipboard)

### Image Generation Loop
For each story (story-1 through story-30):
1. Open [`STORY_IMAGE_PROMPTS.md`](./STORY_IMAGE_PROMPTS.md) in this repository
2. Copy the **Style prefix** (the first line about soft watercolor)
3. For each page of the story:
   - Combine: `[style prefix] + [page description]`
   - Paste into Flow's text prompt field
   - Generate image
   - **Download** with filename: `story-{id}-page-{num}.png`
     - Example: `story-1-page-1.png`, `story-1-page-2.png`, etc.

### Example
For Story 1, Page 1:

**Full Prompt to paste:**
```
Soft watercolor children's storybook illustration in warm, gentle colors. Hand-painted style with soft edges and emotional detail. A fast, confident rabbit with long ears running through a lush green forest. Trees and grass around him. Bright, cheerful style.
```

**Expected Output File:**
```
story-1-page-1.png
```

---

## Phase 2: Organize Downloaded Images

After generating all images:

1. Create folder: `public/images/stories/`
2. Move all generated PNG files there:
   ```
   public/images/stories/
   ├── story-1-page-1.png
   ├── story-1-page-2.png
   ├── ...
   ├── story-30-page-6.png (or however many pages story-30 has)
   ```

### File Naming Convention
- **Format:** `story-{story-id}-page-{page-number}.png`
- **Examples:**
  - `story-1-page-1.png` (Story 1, first page)
  - `story-15-page-8.png` (Story 15, eighth page)
  - `story-30-page-6.png` (Story 30, sixth page)

**Do NOT rename files after generation** — the code expects this exact naming.

---

## Phase 3: Wire Images into the Website

Once all images are in `public/images/stories/`, I will:

1. **Update StorybookReader component** (`src/components/stories/StorybookReader.tsx`):
   - Add `coverImage` property to story objects pointing to the cover image
   - For each sentence, map to its page image: `/images/stories/story-{id}-page-{n}.png`

2. **Display images in reader**:
   - Full-width story page with image + sentence below
   - Smooth transitions between pages
   - Mobile-responsive layout

3. **Test on all pages**:
   - Verify images load correctly
   - Check dark mode appearance
   - Responsive design on mobile/tablet/desktop

---

## Quick Reference: Story Page Counts

| Story ID | Story Name | Pages | Difficulty |
|----------|-----------|-------|-----------|
| story-1 | Hare & Tortoise | 9 | Beginner |
| story-2 | Thirsty Crow | 9 | Beginner |
| story-3 | Lion & Mouse | 9 | Beginner |
| story-4 | Greedy Dog | 7 | Beginner |
| story-5 | Clever Fox | 6 | Beginner |
| story-6 | Monkey & Crocodile | 6 | Beginner |
| story-7 | Jackal & Drum | 5 | Beginner |
| story-8 | Tortoise & Geese | 5 | Beginner |
| story-9 | Greedy Woodcutter | 8 | Beginner |
| story-10 | Children's Game | 6 | Beginner |
| story-11 | Peacock's Feathers | 7 | Beginner |
| story-12 | Ganpati's Birthday | 7 | Beginner |
| story-13 | Little Frog's Journey | 7 | Beginner |
| story-14 | Diwali Celebration | 7 | Beginner |
| story-15 | Rainy Day | 6 | Beginner |
| story-16 | First Time at Market | 7 | Beginner |
| story-17 | Bird's Nest | 7 | Intermediate |
| story-18 | Ants' Work | 7 | Intermediate |
| story-19 | Farmer & Seeds | 8 | Intermediate |
| story-20 | Two Goats | 6 | Intermediate |
| story-21 | Monkeys & Moon | 8 | Intermediate |
| story-22 | Fox & Grapes | 7 | Intermediate |
| story-23 | Crow & Pitcher | 9 | Intermediate |
| story-24 | Cat & Mice | 9 | Intermediate |
| story-25 | School Garden | 9 | Intermediate |
| story-26 | Lion & Four Animals | 9 | Advanced |
| story-27 | Merchant & Wish Tree | 9 | Advanced |
| story-28 | Ganpati's Birthday | 8 | Advanced |
| story-29 | Three Wishes | 9 | Advanced |
| story-30 | Brave Mouse | 9 | Advanced |

**Total images to generate: ~217 images** (including initial pages for flow variations)

---

## Tips for Best Results

1. **Be consistent with the style prefix** — use the exact same opening prompt for all images so the art style stays unified
2. **Generate multiple times if needed** — if an image doesn't look right, regenerate with slight wording tweaks
3. **Size matters** — Flow should output landscape-oriented images (wider than tall) for story pages
4. **Character consistency** — animals should look similar across pages of the same story. If a story repeats characters, note their appearance and use similar descriptions for consistency
5. **Color palette** — the soft watercolor style should maintain warm, child-friendly colors throughout

---

## One Story Example: Complete Walkthrough

Let's use **Story 1: ससा आणि कासव (The Hare and the Tortoise)** as a full example.

### Prompts to Generate

**Story 1 - Page 1:**
```
Soft watercolor children's storybook illustration in warm, gentle colors. Hand-painted style with soft edges and emotional detail. A fast, confident rabbit with long ears running through a lush green forest. Trees and grass around him. Bright, cheerful style.
```
→ Save as: `story-1-page-1.png`

**Story 1 - Page 2:**
```
Soft watercolor children's storybook illustration in warm, gentle colors. Hand-painted style with soft edges and emotional detail. Close-up of the rabbit's face showing speed and pride. Wind lines suggest fast movement. Very energetic.
```
→ Save as: `story-1-page-2.png`

*...continue through Page 9 in the same way...*

**Story 1 - Page 9:**
```
Soft watercolor children's storybook illustration in warm, gentle colors. Hand-painted style with soft edges and emotional detail. The rabbit wakes up, shocked! The tortoise is ahead. The rabbit realizes slow and steady wins. Both animals look satisfied.
```
→ Save as: `story-1-page-9.png`

### After Generation
- All 9 images are downloaded
- Place them in: `public/images/stories/`
- Files: `story-1-page-1.png` through `story-1-page-9.png`
- ✓ Ready for integration

---

## Estimated Timeline

- **Image Generation:** ~2-4 hours (217 images, 30-90 seconds each + downloads)
- **Integration:** ~1-2 hours (wiring into component, testing)
- **Total:** ~3-6 hours from start to live stories with images

---

## Next Steps After Generation

Once you've downloaded all images and organized them:

1. **Notify me** with confirmation that images are in `public/images/stories/`
2. **I will:**
   - Update the StorybookReader component to display images
   - Add image properties to all story JSON objects
   - Test on desktop, tablet, mobile
   - Push to GitHub and deploy
3. **Result:** Live storybook section with full illustrations

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Flow not generating images | Check Google account has Flow access; try refreshing page |
| Images look inconsistent | Use the exact style prefix every time; regenerate if needed |
| Files not recognized | Verify naming: must be exactly `story-{id}-page-{num}.png` |
| Missing images after integration | Check folder path is `public/images/stories/` and files are there |
| Images not showing on mobile | I'll ensure responsive CSS; may need to adjust image sizes |

---

**Ready to start? Begin with Story 1 and work through systematically. I'll have everything wired in once you confirm images are uploaded!**
