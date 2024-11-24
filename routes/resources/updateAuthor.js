const { authorRepository } = require("./../../repositories/author.repo");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    updateAuthor: {
        url: "/authors/:id",
        method: "PUT",
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "string" },
                },
                required: ["id"],
            },
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
                const targetId = request.params.id;
                const { name } = request.body;

                const updated = await authorRepository.update(targetId, { name });

                return reply.code(200).send(updated);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to update author" });
            }
        },
    },
};