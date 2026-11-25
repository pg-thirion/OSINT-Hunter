# OSINT Hunter

A self-contained fictional open-source intelligence investigation game. Review simulated social profiles, archived websites, domain records, documents and illustrated photo exhibits, compare sources and submit evidence-backed conclusions.

## Play locally

No installation, accounts, API keys or third-party services are required. Serve the repository using a static server:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. Alternatively deploy the root directory on GitHub Pages (Settings > Pages > Deploy from a branch > main > /root) or any static hosting provider.

## Features

- Five complete investigations, 36 exhibits and 15 objectives, with increasing difficulty.
- Searchable evidence library, filters and pinned exhibits.
- Evidence board with annotated exhibit relationships and review activity log.
- Field notes, local autosave, case exports and case resets.
- Scoring rewards accurate conclusions and precise corroboration. Hints deduct 15 points each.
- Case debriefs, agent ranks and progress dashboard.
- Responsive layout, keyboard-operable controls, semantic form controls and no external requests during gameplay.

All sources and identities are fictional. The photo exhibits are stylised SVG training illustrations accompanied by descriptive records, not real-world photographs. The activity log records review order rather than sorting fictional event timestamps.

## Tests

Requires Node.js 18 or later:

```sh
node --check cases.js
node --check app.js
node --test cases.test.js
```

Tests cover data integrity and scoring. For manual browser QA, open every case, search and filter, pin/unpin, add and remove connections, write notes and reload, reveal hints, submit a report, inspect the debrief, export notes and reset progress. Verify the same workflow at mobile widths.

## Architecture and limitations

`cases.js` contains fictional data and the pure scoring functions. `app.js` handles the interface, routing and persistence. `index.html` and `style.css` provide the static shell and responsive design.

Progress is stored in the browser's local storage. It is not synchronised across devices and can be cleared by browser settings. Answers are present in the client-side source code, so this game is intended for self-directed learning rather than secure competitive assessment. There is no live OSINT collection, external lookup, or investigation of real people. No data is sent to an external service by the game.
