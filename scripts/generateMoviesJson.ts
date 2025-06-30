import fs from "fs";
import path from "path";
import readline from "readline";

const PRINCIPALS_FILE = path.join(
  process.cwd(),
  "data/imdb/title.principals.tsv"
);
const BASICS_FILE = path.join(process.cwd(), "data/imdb/title.basics.tsv");
const OUTPUT_FILE = path.join(process.cwd(), "data/movies.json");

const NICOLAS_CAGE_ID = "nm0000115";

interface Movie {
  id: string;
  title: string;
  year: string;
  runtime: string;
  genres: string[];
}

async function generateMoviesJson() {
  const cageMovieIds = new Set<string>();

  const rlPrincipals = readline.createInterface({
    input: fs.createReadStream(PRINCIPALS_FILE),
    crlfDelay: Infinity,
  });

  for await (const line of rlPrincipals) {
    const [tconst, , nconst, category] = line.split("\t");
    if (
      nconst === NICOLAS_CAGE_ID &&
      (category === "actor" || category === "self")
    ) {
      cageMovieIds.add(tconst);
    }
  }

  const rlBasics = readline.createInterface({
    input: fs.createReadStream(BASICS_FILE),
    crlfDelay: Infinity,
  });

  const movies: Movie[] = [];

  for await (const line of rlBasics) {
    const [tconst, titleType, primaryTitle, startYear, runtimeMinutes, genres] =
      line.split("\t");

    if (cageMovieIds.has(tconst) && titleType === "movie") {
      movies.push({
        id: tconst,
        title: primaryTitle,
        year: startYear,
        runtime: runtimeMinutes,
        genres: genres?.split(",") || [],
      });
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(movies, null, 2));
  console.log(
    `------------ ✅ Done. ${movies.length} Nicolas Cage movies extracted to data/movies.json -----------------`
  );
}

generateMoviesJson();
