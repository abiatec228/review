import axios from 'axios';

const firebaseAPI =
  'https://authforrickandmorty-default-rtdb.europe-west1.firebasedatabase.app';

const instanceRickAndMortyAPI = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const services = {
  async getCharacters() {
    const response = await instanceRickAndMortyAPI.get('character');
    return response.data;
  },
  async getNextCharacters(nextCharacters: string) {
    const response = await instanceRickAndMortyAPI.get(
      `character?page=${nextCharacters}`,
    );
    return response.data;
  },
};

export const apiHelper = async (url: string) => {
  const getSmth = await axios.get(url);
  return getSmth.data;
};

export const firebaseAPI_Handler = {
  getUserData: async (userUID: string) => {
    return (await axios.get(`${firebaseAPI}/users_data/${userUID}.json`)).data;
  },
  setUserData: (userUID: string) => {
    axios.post(`${firebaseAPI}/users_data/${userUID}.json`, {
      favoriteChars: '',
      additionalData: '',
    });
  },
  putUserData: async (userUID: string, newData: object) => {
    return (
      await axios.put(`${firebaseAPI}/users_data/${userUID}.json`, newData)
    ).data;
  },
};
