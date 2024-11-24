const { bookRepository } = require("./../../repositories/book.repo");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    getBook: {
        url: "/books/:id",
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
                const found = await bookRepository.findById(targetId);

                if (!found) {
                    return reply.code(404).send({
                        message: "Book not found",
                    });
                }

                return reply.code(200).send(found);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to fetch book" });
            }
        },
    },
};