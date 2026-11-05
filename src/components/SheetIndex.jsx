import React from 'react';
import { NavLink } from 'react-router-dom';

// Sheet index in the bottom-left corner: the list of drawings in this set.
// The current sheet is marked; the other is a link.
const SHEETS = [
    { no: 1, to: '/', title: 'PERSONAL PORTFOLIO', desc: 'HOME' },
    { no: 2, to: '/blogs', title: 'BLOG', desc: 'IN PROGRESS' },
];

export default function SheetIndex() {
    return (
        <nav className="si" aria-label="Sheet index">
            <div className="si-head">
                <span className="si-no">SHT</span>
                <span className="si-title">SHEET INDEX</span>
                <span className="si-desc">STATUS</span>
            </div>
            {SHEETS.map((s) => (
                <NavLink
                    key={s.no}
                    to={s.to}
                    end={s.to === '/'}
                    className={({ isActive }) => `si-row${isActive ? ' si-current' : ''}`}
                >
                    <span className="si-no">{String(s.no).padStart(2, '0')}</span>
                    <span className="si-title">{s.title}</span>
                    <span className="si-desc">{s.desc}</span>
                </NavLink>
            ))}
        </nav>
    );
}
