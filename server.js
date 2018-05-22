/* eslint-disable no-console */
require('dotenv').config({ path: './.env.production' });
const express = require('express');
const next = require('next');
const routes = require('./routes');
const Cosmic = require('cosmicjs');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = routes.getRequestHandler(app);
const api = Cosmic();
const bucket = api.bucket({ slug: process.env.BUCKET_SLUG });

app.prepare()
  .then(() => {
    const server = express();

    // API endpoint for site metadata (i.e. title, tag, logo)
    server.get('/api/meta', (req, res) => bucket.getObject({ slug: 'header' })
      .then(object => res.send(object))
      .catch(err => res.status(404).json({
        message: 'Error fetching header data',
        error: err,
      })));

    // API endpoint for social links
    server.get('/api/social-links', (req, res) => {
      const params = {
        type: 'social-links',
      };

      return bucket.getObjects(params)
        .then(objects => res.send(objects))
        .catch(err => res.status(404).json({
          message: 'Error fetching social links',
          error: err,
        }));
    });

    // API endpoint for a list of posts (by page)
    server.get('/api/posts/page/:page', (req, res) => {
      const validatedPage = !Number.isNaN(req.params.page) && parseInt(req.params.page, 10) >= 0
        ? parseInt(req.params.page, 10)
        : 1;
      const postsPerPage = 10;
      const params = {
        limit: postsPerPage,
        skip: (validatedPage - 1) * postsPerPage,
        sort: '+created_at',
        status: 'published',
        type: 'posts',
      };

      return bucket.getObjects(params)
        .then(objects => res.send(objects))
        .catch(err => res.status(404).json({
          message: `Error fetching posts for page ${validatedPage}`,
          error: err,
        }));
    });

    // API endpoint for an individual post
    server.get('/api/post/:slug', (req, res) => bucket.getObject({ slug: req.params.slug })
      .then(object => res.send(object))
      .catch(err => res.status(404).json({
        message: `Error fetching post with slug, ${req.params.slug}`,
        error: err,
      })));

    // Our regular NextJS pages
    server.get('*', (req, res) => handler(req, res));

    server
      .listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
      });
  });
