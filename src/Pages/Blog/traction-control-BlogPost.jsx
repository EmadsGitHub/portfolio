import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import blogsData from '../../data/blogs.json';
import './traction-control-Blog.css';

export default function TractionControlBlogPost() {
    const { id } = useParams();
    const blog = blogsData.blogs.find(b => b.id === id);

    if (!blog) {
        return <Navigate to="/blogs" replace />;
    }

    // Helper function to parse bold text (**text**)
    const parseBold = (text) => {
        if (!text) return text;
        const parts = [];
        let lastIndex = 0;
        const regex = /\*\*(.+?)\*\*/g;
        let match;
        
        while ((match = regex.exec(text)) !== null) {
            // Add text before the match
            if (match.index > lastIndex) {
                parts.push(text.substring(lastIndex, match.index));
            }
            // Add the bold text
            parts.push(<strong key={`bold-${match.index}`}>{match[1]}</strong>);
            lastIndex = regex.lastIndex;
        }
        
        // Add remaining text
        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }
        
        return parts.length > 0 ? parts : text;
    };

    // Enhanced markdown-like parsing with exact TSX styling support
    const renderContent = (content) => {
        const lines = content.split('\n');
        const elements = [];
        let i = 0;
        
        while (i < lines.length) {
            const line = lines[i];
            
            // TLDR box: [tldr]content[/tldr]
            if (line.startsWith('[tldr]')) {
                const tldrContent = line.replace('[tldr]', '').replace('[/tldr]', '');
                elements.push(
                    <p key={i} style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '1rem',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                        border: '1px solid var(--border)'
                    }}>
                        {parseBold(tldrContent)}
                    </p>
                );
            }
            // Image stack right: [image-stack-right|width]
            else if (line.startsWith('[image-stack-right|')) {
                const match = line.match(/\[image-stack-right\|([^\]]+)\]/);
                if (match) {
                    const width = match[1];
                    const stackImages = [];
                    let j = i + 1;
                    
                    // Collect images until [/image-stack-right]
                    while (j < lines.length && !lines[j].startsWith('[/image-stack-right]')) {
                        if (lines[j].startsWith('![')) {
                            const imgMatch = lines[j].match(/!\[([^\]]*)\]\(([^|]+)\|?([^|]*)\|?([^|]*)\|?([^)]*)\)/);
                            if (imgMatch) {
                                const [, alt, src, imgWidth, bg, caption] = imgMatch;
                                stackImages.push({ alt, src, width: imgWidth, bg, caption });
                            }
                        }
                        j++;
                    }
                    
                    elements.push(
                        <div key={i} style={{
                            float: 'right',
                            marginLeft: '1.5rem',
                            marginBottom: '1rem',
                            width: width === 'w-72' ? '18rem' : width === 'w-60' ? '15rem' : width === 'w-64' ? '16rem' : '14rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}>
                            {stackImages.map((img, idx) => (
                                <figure key={idx} style={{ margin: 0 }}>
                                    <img 
                                        src={img.src} 
                                        alt={img.alt}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: '8px',
                                            border: '1px solid var(--border)',
                                            background: img.bg === 'bg-white' ? 'white' : 'rgba(255, 255, 255, 0.02)'
                                        }}
                                    />
                                    {img.caption && (
                                        <figcaption style={{
                                            marginTop: '0.5rem',
                                            fontSize: '0.875rem',
                                            color: 'var(--secondary-foreground)',
                                            opacity: 0.7
                                        }}>
                                            {parseBold(img.caption)}
                                        </figcaption>
                                    )}
                                </figure>
                            ))}
                        </div>
                    );
                    
                    i = j; // Skip to after [/image-stack-right]
                    continue;
                }
            }
            // Ordered list with spacing: [ordered-list-spaced] or [ordered-list-spaced-4]
            else if (line.startsWith('[ordered-list-spaced')) {
                const isSpaced4 = line.includes('spaced-4');
                const isSpaced3 = line.includes('spaced-3');
                const listItems = [];
                let j = i + 1;
                
                // Collect list items until [/ordered-list-spaced]
                while (j < lines.length && !lines[j].startsWith('[/ordered-list-spaced')) {
                    if (/^\d+\./.test(lines[j])) {
                        listItems.push(lines[j].substring(lines[j].indexOf('.') + 1).trim());
                    }
                    j++;
                }
                
                elements.push(
                    <ol key={i} style={{
                        listStyleType: 'decimal',
                        paddingLeft: '1.5rem',
                        margin: '1.5rem 0'
                    }}>
                        {listItems.map((item, idx) => (
                            <li key={idx} style={{
                                marginBottom: isSpaced4 ? '1rem' : isSpaced3 ? '0.75rem' : '0.75rem',
                                lineHeight: '1.7'
                            }}>
                                {parseBold(item)}
                            </li>
                        ))}
                    </ol>
                );
                
                i = j; // Skip to after [/ordered-list-spaced]
                continue;
            }
            // Grid layout for multiple images: [grid:2] or [grid:3]
            else if (line.startsWith('[grid:')) {
                const match = line.match(/\[grid:(\d+)\]/);
                if (match) {
                    const columns = parseInt(match[1]);
                    const gridImages = [];
                    
                    // Look ahead for the next images to include in grid
                    let j = i + 1;
                    while (j < lines.length && lines[j].startsWith('![') && gridImages.length < columns) {
                        const imgMatch = lines[j].match(/!\[([^\]]*)\]\(([^|]+)\|?([^|]*)\|?([^|]*)\|?([^)]*)\)/);
                        if (imgMatch) {
                            const [, alt, src, width, bg, caption] = imgMatch;
                            gridImages.push({ alt, src, width, bg, caption });
                            j++;
                        } else {
                            break;
                        }
                    }
                    
                    elements.push(
                        <div key={i} style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${columns}, 1fr)`,
                            gap: '1.5rem',
                            margin: '2rem 0'
                        }}>
                            {gridImages.map((img, idx) => (
                                <figure key={idx} style={{ margin: 0 }}>
                                    <img 
                                        src={img.src} 
                                        alt={img.alt}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: '8px',
                                            border: '1px solid var(--border)',
                                            background: img.bg === 'bg-white' ? 'white' : 'rgba(255, 255, 255, 0.02)'
                                        }}
                                    />
                                    {img.caption && (
                                        <figcaption style={{
                                            marginTop: '0.5rem',
                                            fontSize: '0.875rem',
                                            color: 'var(--secondary-foreground)',
                                            opacity: 0.7,
                                            textAlign: 'center'
                                        }}>
                                            {parseBold(img.caption)}
                                        </figcaption>
                                    )}
                                </figure>
                            ))}
                        </div>
                    );
                    
                    i = j; // Skip the processed image lines
                    continue;
                }
            }
            // Image syntax: ![alt](src|width|float|bg|caption)
            else if (line.startsWith('![')) {
                const match = line.match(/!\[([^\]]*)\]\(([^|]+)\|?([^|]*)\|?([^|]*)\|?([^|]*)\|?([^)]*)\)/);
                if (match) {
                    const [, alt, src, width, float, bg, caption] = match;
                    
                        // Handle width classes and pixel values
                        let actualWidth = 'auto';
                        if (width === 'w-56') actualWidth = '14rem';
                        else if (width === 'w-60') actualWidth = '15rem';
                        else if (width === 'w-64') actualWidth = '16rem';
                        else if (width === 'w-72') actualWidth = '18rem';
                        else if (width === 'w-full') actualWidth = '100%';
                        else if (width.includes('px')) actualWidth = width;
                        else if (width && !isNaN(width.replace('px', ''))) actualWidth = width.includes('px') ? width : width + 'px';
                    
                    const imageStyle = {
                        width: actualWidth,
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                        border: '1px solid var(--border)'
                    };
                    
                    // Handle background styles
                    if (bg === 'bg-white') {
                        imageStyle.background = 'white';
                    } else if (bg === 'bg-muted') {
                        imageStyle.background = 'rgba(255, 255, 255, 0.05)';
                    } else if (bg === 'bg-white-p-4') {
                        imageStyle.background = 'white';
                        imageStyle.padding = '1rem';
                    } else if (bg === 'bg-white-p-2') {
                        imageStyle.background = 'white';
                        imageStyle.padding = '0.5rem';
                    } else if (bg === 'bg-muted-p-2') {
                        imageStyle.background = 'rgba(255, 255, 255, 0.05)';
                        imageStyle.padding = '0.5rem';
                    } else {
                        imageStyle.background = 'rgba(255, 255, 255, 0.02)';
                    }
                    
                    if (float === 'float-right') {
                        imageStyle.float = 'right';
                        imageStyle.marginLeft = '1.5rem';
                        imageStyle.marginBottom = '1rem';
                    } else if (float === 'float-left') {
                        imageStyle.float = 'left';
                        imageStyle.marginRight = '1.5rem';
                        imageStyle.marginBottom = '1rem';
                    }
                    
                    elements.push(
                        <figure key={i} style={{ margin: float ? '0' : '1.5rem 0' }}>
                            <img 
                                src={src} 
                                alt={alt} 
                                style={imageStyle}
                            />
                            {caption && (
                                <figcaption style={{
                                    marginTop: '0.5rem',
                                    fontSize: '0.875rem',
                                    color: 'var(--secondary-foreground)',
                                    opacity: 0.7,
                                    textAlign: float ? 'left' : 'center'
                                }}>
                                    {parseBold(caption)}
                                </figcaption>
                            )}
                        </figure>
                    );
                }
            }
            // Clear float
            else if (line.trim() === '[clear]') {
                elements.push(<div key={i} style={{ clear: 'both' }} />);
            }
            // Skip closing tags - these are just markers, not content
            else if (line.trim() === '[/image-stack-right]' || 
                     line.trim() === '[/ordered-list-spaced]' || 
                     line.trim() === '[/ordered-list-spaced-3]' ||
                     line.trim() === '[/ordered-list-spaced-4]') {
                // Skip this line - it's just a closing marker
                i++;
                continue;
            }
            // Headers
            else if (line.startsWith('### ')) {
                elements.push(<h3 key={i}>{parseBold(line.substring(4))}</h3>);
            }
            else if (line.startsWith('## ')) {
                elements.push(<h2 key={i}>{parseBold(line.substring(3))}</h2>);
            }
            else if (line.startsWith('# ')) {
                elements.push(<h1 key={i}>{parseBold(line.substring(2))}</h1>);
            }
            // List items
            else if (line.startsWith('- ')) {
                elements.push(<li key={i}>{parseBold(line.substring(2))}</li>);
            }
            else if (/^\d+\./.test(line)) {
                elements.push(<li key={i}>{parseBold(line.substring(line.indexOf('.') + 1).trim())}</li>);
            }
            // Empty lines
            else if (line.trim() === '') {
                elements.push(<br key={i} />);
            }
            // Regular paragraphs
            else {
                elements.push(<p key={i}>{parseBold(line)}</p>);
            }
            
            i++;
        }
        
        return elements;
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



