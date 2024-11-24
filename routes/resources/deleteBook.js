const { bookRepository } = require("./../../repositories/book.repo");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    deleteBook: {
        url: "/books/:id",
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
                const deleted = await bookRepository.delete(targetId);
                return reply.code(200).send(deleted);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to delete book" });
            }
        },
    },
};