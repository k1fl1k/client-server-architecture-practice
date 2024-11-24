const { authorRepository } = require("./../../repositories/author.repo");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    deleteAuthor: {
        url: "/authors/:id",
        method: "DELETE",
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
                const deleted = await authorRepository.delete(targetId);
                return reply.code(200).send(deleted);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to delete author" });
            }
        },
    },
};