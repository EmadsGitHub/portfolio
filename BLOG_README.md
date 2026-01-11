# Blog System

Your portfolio now has a blog extension accessible at `/blogs`!

## How to Add a New Blog Post

Edit `src/data/blogs.json` and add a new entry to the `blogs` array:

```json
{
  "id": "3",
  "title": "Your Blog Title",
  "date": "2024-12-26",
  "author": "Emad Rahman",
  "excerpt": "A brief summary of your blog post that appears in the list view.",
  "content": "# Your Blog Title\n\nYour full blog content here.\n\n## Section Headers\n\nUse markdown-like syntax:\n- # for main title\n- ## for section headers\n- ### for subsection headers\n- - for bullet points\n- 1. for numbered lists\n\n**Note:** Use \\n for line breaks in the JSON string.",
  "tags": ["tag1", "tag2", "tag3"],
  "readTime": "5 min read"
}
```

## Features

### Blog List Page (`/blogs`)
- Shows all blog posts in a card format
- Displays title, date, excerpt, tags, and read time
- Click any card to read the full post
- Terminal-themed design matching your portfolio

### Individual Blog Post (`/blogs/:id`)
- Full blog content with markdown-like formatting
- Metadata (date, author, read time, tags)
- Back navigation to blog list and home
- Responsive design

## Supported Markdown Syntax in Content

The blog post renderer supports:
- `# ` - Main heading (h1)
- `## ` - Section heading (h2)
- `### ` - Subsection heading (h3)
- `- ` - Unordered list items
- `1. ` - Ordered list items
- Regular paragraphs
- `\n` - Line breaks

## Files Structure

```
src/
├── data/
│   └── blogs.json          # All your blog posts data
├── Pages/
│   └── Blog/
│       ├── BlogList.jsx    # Blog list page component
│       ├── BlogPost.jsx    # Individual blog post component
│       └── Blog.css        # Blog styling
└── App.js                  # Routes configured
```

## Navigation

- A "blog" link has been added to your navbar
- From blog pages, users can navigate back to your portfolio
- Blog URLs are shareable (e.g., `/blogs/1`, `/blogs/2`)

## Styling

The blog uses your existing color scheme and terminal aesthetic:
- Accent color: cyan/teal
- Card backgrounds with hover effects
- Responsive design for mobile
- Terminal prompts for that hacker vibe

## Future Enhancements

Consider adding:
- Markdown parser library (like `react-markdown`) for richer formatting
- Code syntax highlighting
- Image support in posts
- Search/filter functionality
- Categories or date-based filtering
- Comments system
- RSS feed




