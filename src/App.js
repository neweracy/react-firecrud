import "./App.css";
import { useState, useEffect, useDebugValue } from "react";
import { Button } from "react-bootstrap";
import { Auth } from "./components/auth";
import { auth, db, storage } from "./config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);

  // new movie state
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState("");
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [fileUpload, setFileUpload] = useState();

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filterData);
      console.log(filterData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async (e) => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
    } catch (error) {
      console.log(error);
    }
    getMovieList();
  };
  const DeleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };
  const UpdateMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
  };
  const uploadFile = async () => {
    if (!fileUpload) return;
      const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
      try {
        await uploadBytes(filesFolderRef, fileUpload);
      } catch (error) {
        console.error(error)
      }
    
  };

  return (
    <div className="App">
      <h1>Firebase</h1>
      <Auth />
      <div>
        <input
          type="text"
          placeholder="movie title.."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release Date.."
          type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
          checked={isNewMovieOscar}
        />
        <label>Recieved an Oscar</label>
        <Button onClick={onSubmitMovie}>Add Movie</Button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => DeleteMovie(movie.id)}>Delete Movie</button>
            <input
              placeholder="new movie title"
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => UpdateMovie(movie.id)}>Update title</button>
          </div>
        ))}
      </div>

      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <Button onClick={uploadFile}>upload file</Button>
      </div>
    </div>
  );
}

export default App;
