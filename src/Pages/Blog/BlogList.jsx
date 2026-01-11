import React from 'react';
import { Link } from 'react-router-dom';
import blogsData from '../../data/blogs.json';
import './Blog.css';

export default function BlogList() {
    const blogs = blogsData.blogs;

    return (
        <div className="blog-container">
            <div className="blog-header">
                <h1>Blog</h1>
                <div className="terminal_prompt">$ cat blog_posts.log</div>
            </div>

            <div className="blog-list">
                {blogs.map((blog) => (
                    <Link 
                        to={`/blogs/${blog.id}`} 
                        key={blog.id} 
                        className="blog-card"
                    >
                        <div className="blog-card-header">
                            <h2 className="blog-title">{blog.title}</h2>
                            <span className="blog-date">{blog.date}</span>
                        </div>
                        
                        <p className="blog-excerpt">{blog.excerpt}</p>
                        
                        <div className="blog-meta">
                            <span className="blog-readtime">{blog.readTime}</span>
                            <div className="blog-tags">
                                {blog.tags.map((tag, index) => (
                                    <span key={index} className="blog-tag">#{tag}</span>
                                ))}
                            </div>
                        </div>
                        
                        <div className="blog-link-indicator">
                            <span>Read more →</span>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="blog-footer">
                <Link to="/" className="back-link">
                    <span>← Back to Portfolio</span>
                </Link>
            </div>
        </div>
    );
}



