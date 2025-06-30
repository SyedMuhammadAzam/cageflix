# 🎬 Cageflix — The Nicolas Cage Movie Library

**Cageflix** is a Netflix-style movie catalog featuring the unforgettable works of **Nicolas Cage**. Built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**, this app uses IMDB data processed into JSON and supports fuzzy searching.

---

## 🌟 Features

- 🔍 Fuzzy search on `title`, `genre`, `year`, and `runtime`
- 🎨 Beautiful responsive UI with Tailwind CSS
- 🧩 Skeleton loaders and reusable components
- 🛠 IMDB dataset transformed using a script
- 🎥 Movie posters fetched using the OMDb API
- 📁 Modular architecture with clean code

---

## 🧠 Tech Stack

| Tech              | Role                                          |
|-------------------|-----------------------------------------------|
| **Next.js 14**    | Full-stack React Framework                    |
| **TypeScript**    | Type safety                                   |
| **Tailwind CSS**  | Modern styling                                |
| **Shadcn UI**     | Customizable Components Flexibility           |
| **Fuse.js**       | Client-side fuzzy searching                   |
| **OMDb API**      | Poster & metadata retrieval                   |
| **IMDB Datasets** | Base movie data (converted to JSON)           |

---

## 📁 Project Structure

.
├── data/
│ ├── imdb/ # Raw IMDB .tsv datasets
│ └── movies.json # Final preprocessed movie data
│
├── scripts/
│ └── generateMoviesJson.ts # Script to generate movies.json
│
├── src/
│ ├── app/
│ │ ├── api/
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ └── globals.css
│ │
│ ├── components/
│ │ └── ui/
│ │ ├── Header.tsx
│ │ ├── SubHeader.tsx
│ │ ├── MovieCard.tsx
│ │ ├── MovieCardSkeleton.tsx
│ │ └── theme-provider.tsx
│ │
│ └── lib/
│ └── utils.ts
│
├── .env
├── next.config.ts
├── package.json
└── README.md

markdown
Copy
Edit

---

## 🧪 Search Functionality

Implemented with `Fuse.js`, the fuzzy search supports:

- 🎬 **Title** — partial or full names (e.g. *Lord*, *Mand*)
- 🎞️ **Genre** — comma-separated values (e.g. *Action*, *Sci-Fi*)
- 📅 **Year** — release year (e.g. `1997`, `2004`)
- ⏱️ **Runtime** — duration in minutes (e.g. `90`, `120`)

---

## ⚙️ IMDB Data Generation

1. Place `.tsv` files in `data/imdb/`:
   - `title.basics.tsv`
   - `title.principals.tsv`

2. Run the script:
   ```bash
   npx tsx scripts/generateMoviesJson.ts
This generates data/movies.json, which powers the frontend.

🖼️ OMDb Poster Integration
We use the OMDb API to fetch posters.

Get a free OMDb API key

Add to .env:

env
Copy
Edit
NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
Posters are fetched based on IMDb ID from movies.json

▶️ Getting Started
Clone repo

bash
Copy
Edit
git clone https://github.com/SyedMuhammadAzam/cageflix.git
cd cageflix
Install dependencies

bash
Copy
Edit
npm install
Add environment variables

bash
Copy
Edit
echo "NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here" > .env
Generate movies.json

bash
Copy
Edit
npx tsx scripts/generateMoviesJson.ts
Run dev server
npm run dev

⚠️ Known Limitations
OMDb has rate limits (1,000 requests/day on free tier)

Some posters may not exist in OMDb

Search is limited to title, genre, year, and runtime (for now)

No pagination or infinite scroll yet

🌱 Future Improvements
🎭 Fuzzy search for actors and plot

🔎 Fuzzy search with combination of multiple fields

📝 Add pagination or infinite scroll

⭐ Save favorites (localStorage or backend)

📺 YouTube trailer integration (Youtube API)

🌍 i18n support (e.g. German)

🔄 Filters for ratings, runtime, genres