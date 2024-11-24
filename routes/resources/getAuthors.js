const { authorRepository } = require("./../../repositories/author.repo");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    getAuthors: {
        url: "/authors",
        method: "GET",
        handler: async (request, reply) => {
            try {
                const list = await authorRepository.findAll();
                return reply.code(200).send(list);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to fetch authors" });
            }
        },
    },
};