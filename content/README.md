# Blog content

Posts live in `content/blog/`, one Markdown file per post. The file name is the URL:
`content/blog/active-recall-study-method.md` is served at `/en/blog/active-recall-study-method`.
Use lowercase letters, numbers and dashes only.

## Frontmatter

```yaml
---
title: 'Active Recall: The Study Method That Beats Rereading'   # required
description: 'One or two sentences for cards and search results.' # recommended
date: 2026-09-19        # required, YYYY-MM-DD. Posts are sorted newest first
author: freshman        # key in `authors` in lib/blog.ts (defaults to freshman)
cover: /blog/active-recall.png   # optional, put images in public/blog/
coverAlt: 'A student writing on a blank page'
featured: true          # optional, pins the post to the top of /blog
draft: true             # optional, only visible in `npm run dev`
takeaways:              # optional, shown in a "Key takeaways" box
  - First point
  - Second point
---
```

The body is GitHub-flavoured Markdown: headings, lists, tables, links, blockquotes and
images (`![alt](/blog/image.png)`). Raw HTML is stripped. Posts without a `cover` get a
warm placeholder card with the title, so covers can be added later.
