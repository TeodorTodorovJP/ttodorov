export default {
  users: {
    username: 'Expected username: string between 4 and 50 characters.',
    password: 'Expected password: between 7 to 15 characters which contain at least one numeric digit and a special character',
    email: 'Invalid email.',
    userAlreadyExists: 'A person with such username already exists.',
    invalidCredentials: 'Invalid username or password',
    invalidUserId: 'No user with such id exists.',
  },
  playLists: {
    playListTitle: 'Expected title: string between 3 and 50 characters.',
    tags: 'Expected tags: array with strings between 3 to 15 characters.',
    genres: 'Expected genres: object with number values. Total of all numbers must not exceed 100.',
    combinedGenresSongsDuration: 'Expected duration: number greater than 1 second.',
    combinedGenresSongs: 'Expected songs: array with at least 1 object.',
  }
};
