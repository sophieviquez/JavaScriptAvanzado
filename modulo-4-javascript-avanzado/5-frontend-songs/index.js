const URL = "http://localhost:3000/songs";
const ulElement = document.querySelector("ul");
const registerSongForm = document.querySelector("#registerSongForm");
let songs = [];

registerSongForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // formData

  const songInputElement = document.querySelector("#songName");
  const artistInputElement = document.querySelector("#artistName");

  const song = songInputElement.value;
  const artist = artistInputElement.value;

  const body = {
    id: songs.length + 1,
    name: song,
    artist: artist,
  };

  createSongs(body);
});

const createSongs = async (body) => {
  try {
    // options: configuracion que necesita fetch cuando no un GET
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    // const newUrl = `${URL}/10?genre=banda&anio=2020`;
    const response = await fetch(URL, options);
    // jsonResponse = await response.json(); // vacio 201

    if (response.status === 201) {
      alert("Cancion creada");
      const songs = await getSongs();
      renderSongs(songs);
    } else {
      alert("hay un error");
    }
  } catch (error) {
    console.error(error.message);
  }
};

const getSongs = async () => {
  ulElement.innerHTML = "";
  songs = [];
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    songs = await response.json();
    return songs;
  } catch (error) {
    console.error(error.message);
  }
};

const renderSongs = (songs) => {
  songs.forEach((song) => {
    const liElement = document.createElement("li");
    liElement.innerHTML = `${song.name} - ${song.artist}`;
    ulElement.appendChild(liElement);
  });
};

const renderEmptySongs = () => {
  const labelElement = document.createElement("label");
  labelElement.innerHTML = `no hay canciones disponibles por el momento...`;
  ulElement.appendChild(labelElement);
};

const main = async () => {
  songs = await getSongs();
  songs.length > 0 ? renderSongs(songs) : renderEmptySongs();
  // manejo de excepciones, valores undefined, errores, propiedades faltantes en un json
  // encadenamiento opcion (?.), if/else, ternario, try catch
};

main();
