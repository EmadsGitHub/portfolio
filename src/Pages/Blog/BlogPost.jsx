import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import blogsData from '../../data/blogs.json';
import NotionBlog from './NotionBlog';
import './Blog.css';

export default function BlogPost() {
    const { id } = useParams();
    const blog = blogsData.blogs.find(b => b.id === id);

    if (!blog) {
        return <Navigate to="/blogs" replace />;
    }

    // If this is a Notion import, render the NotionBlog component
    if (blog.isNotionImport) {
        return <NotionBlog />;
    }

    // Simple markdown-like parsing
    const renderContent = (content) => {
        return content.split('\n').map((line, index) => {
            // Headers
            if (line.startsWith('### ')) {
                return <h3 key={index}>{line.substring(4)}</h3>;
            }
            if (line.startsWith('## ')) {
                return <h2 key={index}>{line.substring(3)}</h2>;
            }
            if (line.startsWith('# ')) {
                return <h1 key={index}>{line.substring(2)}</h1>;
            }
            // List items
            if (line.startsWith('- ')) {
                return <li key={index}>{line.substring(2)}</li>;
            }
            if (/^\d+\./.test(line)) {
                return <li key={index}>{line.substring(line.indexOf('.') + 1).trim()}</li>;
            }
            // Empty lines
            if (line.trim() === '') {
                return <br key={index} />;
            }
            // Regular paragraphs
            return <p key={index}>{line}</p>;
        });
    };

    return (
        <div className="blog-container">
            <div className="blog-post">
                <div className="blog-post-header">
                    <div className="terminal_prompt">$ cat {blog.id}.md</div>
                    <h1 className="blog-post-title">{blog.title}</h1>
                    <div className="blog-post-meta">
                        <span className="blog-post-date">{blog.date}</span>
                        <span className="blog-post-separator">•</span>
                        <span className="blog-post-author">{blog.author}</span>
                        <span className="blog-post-separator">•</span>
                        <span className="blog-post-readtime">{blog.readTime}</span>
                    </div>
                    <div className="blog-post-tags">
                        {blog.tags.map((tag, index) => (
                            <span key={index} className="blog-tag">#{tag}</span>
                        ))}
                    </div>
                </div>

                <div className="blog-post-content">
                    {renderContent(blog.content)}
                </div>

                <div className="blog-post-footer">
                    <Link to="/blogs" className="back-link">
                        <span>← Back to All Posts</span>
                    </Link>
                    <Link to="/" className="back-link">
                        <span>Home →</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}


