import React from 'react';

// Blog placeholder: an un-drafted sheet of the blueprint set, marked IN PROGRESS.
// The title block (bottom right) carries the sheet number and the link back home.
export default function BlogList() {
    return (
        <div className="wip">
            <div className="wip-stamp" aria-label="Blog in progress">IN PROGRESS</div>
        </div>
    );
}
