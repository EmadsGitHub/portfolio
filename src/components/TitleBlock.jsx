import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACTS } from './contactIcons';

// CAD-style title block pinned to the bottom-right corner of the drawing frame.
// Edit the cells below to change what it says.
export default function TitleBlock({ sheet = 1 }) {
    return (
        <aside className="tb" aria-label="Drawing title block and contact details">
            <div className="tb-row">
                <div className="tb-cell tb-notes">
                    <span className="tb-label">UNLESS OTHERWISE SPECIFIED</span>
                    <span className="tb-value">DIMENSIONS ARE IN MM</span>
                    <span className="tb-value">DO NOT SCALE DRAWING</span>
                </div>
                <div className="tb-cell tb-grid">
                    <div className="tb-k">DRAWN</div><div className="tb-v">EMAD RAHMAN</div><div className="tb-v">2026</div>
                    <div className="tb-k">CHECKED</div><div className="tb-v">&mdash;</div><div className="tb-v">&mdash;</div>
                    <div className="tb-k">APPROVED</div><div className="tb-v">&mdash;</div><div className="tb-v">&mdash;</div>
                </div>
                <div className="tb-cell tb-title">
                    <span className="tb-label">TITLE</span>
                    <span className="tb-big">EMAD RAHMAN</span>
                    <span className="tb-value">{sheet === 1 ? "PERSONAL PORTFOLIO" : "BLOG (IN PROGRESS)"} &mdash; SHEET {sheet}</span>
                </div>
            </div>
            <div className="tb-row">
                <div className="tb-cell tb-contact">
                    <span className="tb-label">CONTACT</span>
                    {CONTACTS.map((c) => (
                        <a
                            key={c.id}
                            className="tb-contact-row"
                            href={c.href}
                            target={c.href.startsWith('mailto:') ? undefined : '_blank'}
                            rel={c.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                        >
                            <span className="tb-icon">{c.icon}</span>
                            <span>{c.label}</span>
                        </a>
                    ))}
                </div>
                <div className="tb-cell tb-small">
                    <span className="tb-label">SIZE</span><span className="tb-big">A</span>
                </div>
                <div className="tb-cell tb-small tb-wide">
                    <span className="tb-label">DWG NO.</span><span className="tb-value">ER-PORT-001</span>
                </div>
                <div className="tb-cell tb-small">
                    <span className="tb-label">REV</span><span className="tb-value">2026</span>
                </div>
                <div className="tb-cell tb-small">
                    <span className="tb-label">SCALE</span><span className="tb-value">N.T.S.</span>
                </div>
                <div className="tb-cell tb-small">
                    <span className="tb-label">SHEET</span>
                    {sheet === 1
                        ? <Link to="/blogs" className="tb-value">1 &middot; BLOG &rarr;</Link>
                        : <Link to="/" className="tb-value">2 &middot; &larr; HOME</Link>}
                </div>
            </div>
        </aside>
    );
}
