const API_KEY = "NPsaIPawfanrkIPBP4jb7bVvqI_cuXim8QjWveB4RYM";

export async function getPopularPhotos() {
  try {
    const res = await fetch(
      `https://api.unsplash.com/photos?order_by=popular&page=1&per_page=20&client_id=${API_KEY}
`
    );

    if (!res.ok) throw new Error("Failed fetching data");
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function photoSearch(query, pageNum) {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&page=${pageNum}&client_id=${API_KEY}`
    );
    if (!res.ok) throw new Error("Failef fetching data");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function getSinglePhoto(photoId) {
  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/${photoId}?client_id=${API_KEY}`
    );
    if (!res.ok) throw new Error("Failef fetching data");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
