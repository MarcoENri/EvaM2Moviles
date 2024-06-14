import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8081", // Cambia esto según tu configuración
  headers: {
    "Content-Type": "application/json",
  },
});

interface Film {
  id?: number;
  title: string;
  director: string;
  budget: number;
  duration: number;
  releaseDate: string;
  genre?: string;
  box_office: number;
}

export const getFilms = () => apiClient.get<Film[]>("/film");
export const getFilmById = (id: number) => apiClient.get<Film>(`/film/${id}`);
export const createFilm = (data: Film) => apiClient.post("/film", data);
export const updateFilm = (id: number, data: Film) => apiClient.put(`/film/${id}`, data);
export const deleteFilm = (id: number) => apiClient.delete(`/film/${id}`);

interface Character {
  id?: number;
  description: string;
  cost: number;
  nameActor: string;
  rol: string;
  importance: string;
  sceneDescription: number; 
}

export const getCharacters = () => apiClient.get<Character[]>("/characters");
export const getCharacterById = (id: number) => apiClient.get<Character>(`/characters/${id}`);
export const createCharacter = (data: Character) => apiClient.post("/characters", data);
export const updateCharacter = (id: number, data: Character) =>
  apiClient.put(`/characters/${id}`, data);
export const deleteCharacter = (id: number) => apiClient.delete(`/characters/${id}`);

interface Scene {
  id?: number;
  description: string;
  minutes: number;
  location: string;
  setting?: string;
  film_id?: number;
}

export const getScenes = () => apiClient.get<Scene[]>("/scene");
export const getSceneById = (id: number) => apiClient.get<Scene>(`/scene/${id}`);
export const createScene = (data: Scene) => apiClient.post("/scene", data);
export const updateScene = (id: number, data: Partial<Scene>) =>
  apiClient.put(`/scene/${id}`, data);
export const deleteScene = (id: number) => apiClient.delete(`/scene/${id}`);

export default apiClient;

