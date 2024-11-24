const { createUser } = require("./createUser");
const { getUser } = require("./getUser");
const { getUsers } = require("./getUsers");
const { updateUser } = require("./updateUser");
const { deleteUser } = require("./deleteUser");

const { createAuthor } = require("./createAuthor");
const { getAuthor } = require("./getAuthor");
const { getAuthors } = require("./getAuthors");
const { updateAuthor } = require("./updateAuthor");
const { deleteAuthor } = require("./deleteAuthor");

const { createBook } = require("./createBook");
const { getBook } = require("./getBook");
const { getBooks } = require("./getBooks");
const { updateBook } = require("./updateBook");
const { deleteBook } = require("./deleteBook");

module.exports.routes = async function (fastify, opts) {
    // User routes
    fastify.route(createUser);
    fastify.route(getUsers);
    fastify.route(getUser);
    fastify.route(updateUser);
    fastify.route(deleteUser);

    // Author routes
    fastify.route(createAuthor);
    fastify.route(getAuthors);
    fastify.route(getAuthor);
    fastify.route(updateAuthor);
    fastify.route(deleteAuthor);

    // Book routes
    fastify.route(createBook);
    fastify.route(getBooks);
    fastify.route(getBook);
    fastify.route(updateBook);
    fastify.route(deleteBook);
};