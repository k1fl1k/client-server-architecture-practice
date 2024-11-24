const { bookRepository } = require("./../../repositories/book.repo");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    createBook: {
        url: "/books",
        method: "POST",
        bodyLimit: 1024,
        schema: {
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
                const { title, authorId } = request.body;

                const book = await bookRepository.create({ title, authorId });

                return reply.code(201).send(book);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to create book" });
            }
        },
    },
};