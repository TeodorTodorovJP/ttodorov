import pool from './pool.js';
import fetch from 'node-fetch';
import bcrypt from 'bcrypt';
import { userRole } from '../common/user-role.js';

// const fetch = require('node-fetch');
(async () => {
  console.log(`Pool started at ${new Date().toTimeString()}`);

  const allGenres = await fetch(`https://api.deezer.com/genre`);
  const allGenresParsed = await allGenres.json();

  const genresToAdd = ['Pop', 'Rap/Hip Hop', 'Rock', 'Metal']; // 'Pop', 'Rap/Hip Hop', 'Rock', 'Metal'
  const referenceGenres = {};

  await Promise.all(allGenresParsed.data.map(async (genre) => {
    if (genresToAdd.includes(genre.name)) {
      referenceGenres[genre.id] = genre.name;
      pool.query(`INSERT INTO genres (genre_id, name, picture) VALUES (?, ?, ?)`, [genre.id, genre.name, genre.picture]);
    }
  }));

  const genres = await pool.query(`SELECT genre_id FROM genres`);

  const allArtistsIds = [];
  await Promise.all(genres.map(async ({ genre_id }) => {
    const artists = await fetch(`https://api.deezer.com/genre/${genre_id}/artists`); // Artists are always 49 (probably the max)
    const artistsParsed = await artists.json();
    console.log(`Artists for genre: ${genre_id} => ${artistsParsed.data.length}`); // How much artists per genre

    await Promise.all(artistsParsed.data.map(async (artist) => {
      if (!allArtistsIds.includes(artist.id)) {
        allArtistsIds.push(artist.id);
        await pool.query(`INSERT INTO artists (artist_id, name, picture, tracklist, genres_genre_id) VALUES (?, ?, ?, ?, ?)`, [artist.id, artist.name, artist.picture_big, artist.tracklist, genre_id]);
      }
    }));
  }
  ));

  const artists = await pool.query(`SELECT artist_id, genres_genre_id FROM artists`);

  let albumTimer = 200;
  const idArr = [];

  await Promise.all(artists.map(async ({ artist_id, genres_genre_id }) => {
    albumTimer = albumTimer + 150;
    setTimeout(async () => {
      const albums = await fetch(`https://api.deezer.com/artist/${artist_id}/albums`);
      const albumsParsed = await albums.json();
      await Promise.all(albumsParsed.data.map(async (album) => {
        if (!idArr.includes(album.id)) {
          idArr.push(album.id);
        } else {
          return;
        }
        if (album.genre_id === genres_genre_id) {
          await pool.query(`INSERT INTO albums (album_id, title, tracklist, genres_genre_id, artists_artist_id) VALUES (?, ?, ?, ?, ?)`, [album.id, album.title, album.tracklist, album.genre_id, artist_id]);
        }
      }));
    }, albumTimer);
  }
  ));

  setTimeout(async () => {
    const tracklists = await pool.query(`SELECT tracklist, album_id, genres_genre_id, artists_artist_id  FROM albums`);

    const trackMax = 1000;

    const genreMaxAdd = {};
    Object.keys(referenceGenres).map((genreId) => genreMaxAdd[genreId] = 0);

    let trackTimer = 200;

    await Promise.all(tracklists.map(async ({ tracklist, album_id, genres_genre_id, artists_artist_id }) => {
      trackTimer = trackTimer + 150;
      setTimeout(async () => {
        try {
          const tracks = await fetch(`${tracklist}`); // deezer requset
          const tracksParsed = await tracks.json();
          await Promise.all(tracksParsed.data.map(async ({ id, title, link, preview, duration, rank }) => {
            if (genreMaxAdd[genres_genre_id] >= trackMax) {
              return;
            }
            genreMaxAdd[genres_genre_id] = (genreMaxAdd[genres_genre_id] + 1);
            await pool.query(`INSERT INTO tracks (track_id, title, link, preview, duration, rank, genres_genre_id, albums_album_id, artists_artist_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [id, title, link, preview, duration, rank, genres_genre_id, album_id, artists_artist_id]);
          }));
        } catch (error) {

        }
      }, trackTimer);
    }
    ));
  }, 30000);

  setTimeout(async () => {
    const roles = [
      { id: 1, name: 'user' },
      { id: 2, name: 'admin' },
    ];

    await Promise.all(roles.map(({ name, id }) => pool.query(`INSERT INTO roles (id, name)
    VALUES (?, ?)`, [id, name])));

    let userId;
    const result1 = await pool.query(`SELECT * FROM users WHERE username = ?`, ['admin']);

    if (result1.length === 0) {
      console.log('Creating user...');

      const result2 = await pool.query(`
        INSERT INTO users (username, password, roles_id)
        VALUES (?, ?, (SELECT id FROM roles WHERE name = ?))
        `, ['admin', await bcrypt.hash('123456$$$', 10), userRole.admin]);

      userId = result2.insertId;
    } else {
      console.log('Admin has already been created.');
      userId = result1[0].id;
    }
  }, 60000 * genresToAdd.length);


  setTimeout(() => {
    console.log(`Pool ended at ${new Date().toTimeString()}`);
    pool.end();
  }, (60000 * genresToAdd.length) + 5000); // how to dynamically calculate it?
})()
    .catch(console.log);
