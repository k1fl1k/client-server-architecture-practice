const { bookRepository } = require("./../../repositories/book.repo");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    getBooks: {
        url: "/books",
        method: "GET",
        handler: async (request, reply) => {
            try {
                const list = await bookRepository.findAll();
                return reply.code(200).send(list);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to fetch books" });
            }
        },
    },
};