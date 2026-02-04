# learnmarathi

A structured Marathi literacy curriculum and content starter pack for ages 4–10, now paired with a responsive web app overview.

## What's included
- Curriculum map and MVP scope in `docs/`.
- Lesson template and JSON schema in `content/schema/`.
- Sample lessons, vocabulary, and stories in `content/`.
- Responsive web experience in `index.html`, `styles.css`, and `app.js`.

## Folder guide
- `docs/`
  - `curriculum.md`: Level-by-level scope & sequence.
  - `lesson-template.md`: Lesson architecture and data contract.
  - `mvp.md`: MVP scope checklist.
- `content/`
  - `schema/lesson.schema.json`: JSON schema for lesson definitions.
  - `lessons/`: Sample lessons for Level 1 and Level 2.
  - `vocab/word_list.json`: Starter vocabulary themes.
  - `stories/`: Graded reading samples.

## Run locally
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

## Next steps
- Expand lessons per level using the schema.
- Add audio/image/stroke assets.
- Build dashboards and assessments on top of the content model.
