const { authorRepository } = require("./../../repositories/author.repo");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    getAuthor: {
        url: "/authors/:id",
        method: "GET",
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "string" },
                },
                required: ["id"],
            },
        },
        handler: async (request, reply) => {
            try {
                const targetId = request.params.id;
                const found = await authorRepository.findById(targetId);

                if (!found) {
                    return reply.code(404).send({
                        message: "Author not found",
                    });
                }

                return reply.code(200).send(found);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to fetch author" });
            }
        },
    },
};