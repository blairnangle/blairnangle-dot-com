import React, { useState } from 'react';
import Layout from '../components/Layout';
import PocketArticles from '../components/PocketArticles';
import GoodreadsBooks from '../components/GoodreadsBooks';
import LetterboxdFilms from '../components/LetterboxdFilms';

const bucketHost = 'https://s3.eu-west-2.amazonaws.com/diet.blairnangle.com';

function GoodreadsCurrentlyReading() {
  const [books, setBooks] = useState([]);

  fetch(`${bucketHost}/goodreads-currently-reading.json`).then(
    (response) => response.json(),
  ).then((booksData) => {
    setBooks(booksData);
  }).catch(
    (err) => {
      console.log(err, ' error');
    },
  );

  return <GoodreadsBooks bookList={books} shelf="currentlyReading" />;
}

function GoodreadsRead() {
  const [books, setBooks] = useState([]);

  fetch(`${bucketHost}/goodreads-read.json`).then(
    (response) => response.json(),
  ).then((booksData) => {
    setBooks(booksData);
  }).catch(
    (err) => {
      console.log(err, ' error');
    },
  );

  return <GoodreadsBooks bookList={books} shelf="read" />;
}

function Pocket() {
  const [articles, setArticles] = useState([]);

  fetch(`${bucketHost}/pocket.json`).then(
    (response) => response.json(),
  ).then((articlesData) => {
    setArticles(articlesData);
  }).catch(
    (err) => {
      console.log(err, ' error');
    },
  );

  return <PocketArticles articleList={articles} />;
}

function Letterboxd() {
  const [films, setFilms] = useState([]);

  fetch(`${bucketHost}/letterboxd.json`).then(
    (response) => response.json(),
  ).then((filmsData) => {
    setFilms(filmsData);
  }).catch(
    (err) => {
      console.log(err, ' error');
    },
  );

  return <LetterboxdFilms filmList={films} />;
}

function InformationDiet() {
  return (
    <Layout>
      <h2>My information diet</h2>
      <div>
        <p>
          Do you ever wonder where my half-baked ideas come from?
          Are you ever puzzled by my ability to hold two conflicting
          (yet both wrong) ideas in my head at once?
          Now you can see where they were stolen from!
        </p>
        <p>
          You can see the code that powers this page
          {' '}
          <a href="https://github.com/blairnangle/diet">here</a>
          .
        </p>
        <p>
          Thank you for indulging me in this signalling exercise.
        </p>
      </div>
      <GoodreadsCurrentlyReading />
      <GoodreadsRead />
      <Pocket />
      <Letterboxd />
    </Layout>
  );
}

export default InformationDiet;
