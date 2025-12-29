import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './NotionBlog.css';

export default function NotionBlog() {
    const [htmlContent, setHtmlContent] = useState('');
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Fetch the HTML file
        fetch('/imported_notion_page/Creating a dashboard for UWFE 2d616f1a113780b9b97dcd75da056692.html')
            .then(response => response.text())
            .then(html => {
                // Extract the body content and style tag
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                // Get the article content
                const article = doc.querySelector('article');
                
                if (article) {
                    // Extract all images before modifying the article
                    const imgElements = article.querySelectorAll('img');
                    const imageArray = [];
                    
                    imgElements.forEach((img, index) => {
                        const src = img.getAttribute('src');
                        if (src && !src.startsWith('http')) {
                            const fullPath = `/imported_notion_page/${src}`;
                            imageArray.push({
                                src: fullPath,
                                alt: img.getAttribute('alt') || `Blog image ${index + 1}`
                            });
                            
                            // Remove the image and its parent figure from the article
                            const figure = img.closest('figure');
                            if (figure) {
                                figure.remove();
                            } else {
                                img.remove();
                            }
                        }
                    });
                    
                    // Strip out all style attributes and Notion-specific classes
                    const allElements = article.querySelectorAll('*');
                    allElements.forEach(element => {
                        element.removeAttribute('style');
                        // Remove max-width constraints
                        if (element.style) {
                            element.style.maxWidth = 'none';
                            element.style.width = '100%';
                        }
                    });
                    
                    setImages(imageArray);
                    setHtmlContent(article.innerHTML);
                }
            })
            .catch(error => {
                console.error('Error loading Notion page:', error);
                setHtmlContent('<p>Error loading blog post. Please try again later.</p>');
            });
    }, []);

    return (
        <div className="notion-blog-full-width">
            <div className="notion-header-section">
                <div className="terminal_prompt">$ cat notion_export.html</div>
            </div>
            
            <div className="notion-two-column">
                <div className="notion-text-column">
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    
                    {/* YouTube Video Section */}
                    <div className="youtube-video-section">
                        <h3>Project Demo</h3>
                        <div className="youtube-embed">
                            <iframe 
                                width="100%" 
                                height="315" 
                                src="https://www.youtube.com/embed/ONjfxRDftp0" 
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                    
                    <div className="notion-footer-nav">
                        <Link to="/blogs" className="back-link back-to-posts">
                            <span>← Back to All Posts</span>
                        </Link>
                        <Link to="/" className="back-link home-link">
                            <span>Home →</span>
                        </Link>
                    </div>
                </div>

                {images.length > 0 && (
                    <div className="notion-image-column">
                        <div className="image-stack">
                            {images.map((image, index) => (
                                <div key={index} className="image-box">
                                    <img src={image.src} alt={image.alt} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


