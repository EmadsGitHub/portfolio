import React from 'react';

// Single-stroke line glyphs so the icons read as drafting symbols rather than logos.
// Shared by the title block's CONTACT cell.
export const CONTACTS = [
    {
        id: 'email',
        label: 'e2rahman@uwaterloo.ca',
        href: 'mailto:e2rahman@uwaterloo.ca',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="5.5" width="18" height="13" rx="1" />
                <path d="M3.5 6.5 12 13l8.5-6.5" />
            </svg>
        ),
    },
    {
        id: 'linkedin',
        label: 'linkedin.com/in/emadrahman1',
        href: 'https://www.linkedin.com/in/emadrahman1/',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" />
                <path d="M8 10.5V17M8 7.6v.1M12 17v-3.8c0-1.5 1-2.5 2.3-2.5S16.5 11.7 16.5 13.2V17M12 10.6V17" />
            </svg>
        ),
    },
    {
        id: 'github',
        label: 'github.com/EmadsGitHub',
        href: 'https://github.com/EmadsGitHub',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 20.5v-2.6c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.2" />
            </svg>
        ),
    },
    {
        id: 'x',
        label: 'x.com/emadddd_r',
        href: 'https://x.com/emadddd_r',
        // The X wordmark: a full diagonal stroke crossed by a second stroke that is
        // broken around it, drawn as an outline so it matches the other glyphs.
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 4h4.6l11.4 16h-4.6z" />
                <path d="M19.4 4 13.3 11M4.6 20l6.2-7.1" />
            </svg>
        ),
    },
];
