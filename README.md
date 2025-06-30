# 🎬 Cageflix — The Nicolas Cage Movie Library

**Cageflix** is a Netflix-style movie catalog featuring the unforgettable works of **Nicolas Cage**. Built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**, this app uses IMDB data processed into JSON and supports fuzzy searching.

## 🌐 Live Demo: https://cageflix-alpha.vercel.app/

## 🌟 Features

- 🔍 Fuzzy search on `title`, `genre`, `year`, and `runtime`
- 🎨 Beautiful responsive UI with Tailwind CSS
- 🧩 Skeleton loaders and reusable components
- 🛠 IMDB dataset transformed using a script
- 🎥 Movie posters fetched using the OMDb API
- 📁 Modular architecture with clean code

---

## 🧠 Tech Stack

| Tech              | Role                                |
| ----------------- | ----------------------------------- |
| **Next.js 14**    | Full-stack React Framework          |
| **TypeScript**    | Type safety                         |
| **Tailwind CSS**  | Modern styling                      |
| **Shadcn UI**     | Customizable Components Flexibility |
| **Fuse.js**       | Client-side fuzzy searching         |
| **OMDb API**      | Poster & metadata retrieval         |
| **IMDB Datasets** | Base movie data (converted to JSON) |

---

## 🔍 Search Functionality

Implemented with `Fuse.js`, the fuzzy search supports:

- 🎬 **Title** — partial or full names (e.g. _Lord_, _Mandy_)
- 🎞️ **Genre** — comma-separated values (e.g. _Action_, _Sci-Fi_)
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
   ```

This generates `data/movies.json`, which powers the frontend.

---

## 🖼️ OMDb Poster Integration

We use the OMDb API to fetch posters.

1. Get a free [OMDb API key](https://www.omdbapi.com/apikey.aspx)

2. Add to `.env`:
   ```bash
   NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
   ```

Posters are fetched based on IMDb ID from `movies.json`.

---

## 🚀 Getting Started

### Clone repo

```bash
git clone https://github.com/SyedMuhammadAzam/cageflix.git
cd cageflix
```

### Install dependencies

```bash
npm install
```

### Add environment variables

```bash
echo "NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here" > .env
```

### Generate movies.json

```bash
npx tsx scripts/generateMoviesJson.ts
```

### Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚠️ Known Limitations

- OMDb has rate limits (1,000 requests/day on free tier)
- Some posters may not exist in OMDb
- Search is limited to title, genre, year, and runtime (for now)
- No pagination or infinite scroll yet

---

## 🌱 Future Improvements

- 🎭 Fuzzy search for actors and plot
- 🔎 Fuzzy search with combination of multiple fields
- 📝 Add pagination or infinite scroll
- ⭐ Save favorites (localStorage or backend)
- 📺 YouTube trailer integration (YouTube API)
- 🌍 i18n support (e.g. German)
- 🔄 Filters for ratings, runtime, genres
