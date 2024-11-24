const { bookRepository } = require("./../../repositories/book.repo");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    updateBook: {
        url: "/books/:id",
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
                required: ["title", "authorId"],
                properties: {
                    title: { type: "string" },
                    authorId: { type: "number" },
                },
            },
        },
        handler: async (request, reply) => {
            try {
                const targetId = request.params.id;
                const { title, authorId } = request.body;

                const updated = await bookRepository.update(targetId, { title, authorId });

                return reply.code(200).send(updated);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to update book" });
            }
        },
    },
};