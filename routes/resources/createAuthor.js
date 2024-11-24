const { authorRepository } = require("./../../repositories/author.repo");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    createAuthor: {
        url: "/authors",
        method: "POST",
        bodyLimit: 1024,
        schema: {
            body: {
                type: "object",
                required: ["name"],
                properties: {
                    name: { type: "string" },
                },
            },
        },
        handler: async (request, reply) => {
            try {
                const { name } = request.body;

                const author = await authorRepository.create({ name });

                return reply.code(201).send(author);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to create author" });
            }
        },
    },
};