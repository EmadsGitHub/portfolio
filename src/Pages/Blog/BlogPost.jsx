import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import blogsData from '../../data/blogs.json';
import UwfeDashboardNotionBlog from './uwfe-dashboard-NotionBlog';
import TractionControlBlogPost from './traction-control-BlogPost';

export default function BlogPost() {
    const { id } = useParams();
    const blog = blogsData.blogs.find(b => b.id === id);

    if (!blog) {
        return <Navigate to="/blogs" replace />;
    }

    // If this is a Notion import, render the UwfeDashboardNotionBlog component
    if (blog.isNotionImport) {
        return <UwfeDashboardNotionBlog />;
    }
    
    // If this is the traction control blog, render TractionControlBlogPost
    if (blog.id === "traction-control-pid") {
        return <TractionControlBlogPost />;
    }

    // Default fallback (shouldn't reach here with current blogs)
    return <Navigate to="/blogs" replace />;
}


