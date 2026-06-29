# Scouting America AI Merit Badge site

Static GitHub Pages site for live AI Merit Badge sessions. It includes:

- A landing page with official Scouting America references.
- One page for each first-level Artificial Intelligence merit badge requirement.
- A facilitator-friendly "AI or Not?" game.
- A facilitator-friendly "Ethics in AI: What Would You Do?" game.

## Local preview

Open `index.html` directly, or run a local static server:

```powershell
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Shared AI or Not scoring

The AI or Not game supports shared scores through Supabase. To enable it:

1. Create a Supabase project.
2. Open the Supabase SQL editor and run `supabase-schema.sql`.
3. Copy your Project URL and public anon key from Supabase project settings.
4. Paste them into `supabase-config.js`.
5. Commit and redeploy the site.

Use only the public anon key in `supabase-config.js`. Do not put the service role key in this repo. During a live session, give everyone the same session code and ask Scouts to use first names, initials, patrol names, or nicknames instead of full personal details.

## References

- Official requirement page: https://www.scouting.org/merit-badges/artificial-intelligence/
- Scouting America AI Merit Badge support PDF: https://filestore.scouting.org/filestore/Merit_Badge_ReqandRes/Note-to-Counselor-Artificial-Intelligence-(AI)-Merit-Badge.pdf
