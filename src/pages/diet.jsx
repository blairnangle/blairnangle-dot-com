import React, { useState } from 'react';
import Layout from '../components/Layout';
import PocketArticles from '../components/PocketArticles';
import GoodreadsBooks from '../components/GoodreadsBooks';

function Goodreads() {
  const [books, setBooks] = useState([]);

  fetch('https://s3.eu-west-2.amazonaws.com/information-diet.blairnangle.com/goodreads.json').then(
    (response) => response.json(),
  ).then((booksData) => {
    setBooks(booksData);
  }).catch(
    (err) => {
      console.log(err, ' error');
    },
  );

  return <GoodreadsBooks bookList={books} />;
}

function Pocket() {
  const [articles, setArticles] = useState([]);

  fetch('https://s3.eu-west-2.amazonaws.com/information-diet.blairnangle.com/pocket.json').then(
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
          <a href="https://github.com/blairnangle/information-diet">here</a>
          .
        </p>
        <p>
          Thank you for indulging me in this signalling exercise.
        </p>
      </div>
      <Goodreads />
      <Pocket />
    </Layout>
  );
}

export default InformationDiet;
