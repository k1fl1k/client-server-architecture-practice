const { userRepository } = require("./../../repositories/user.repo");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    updateUser: {
        url: "/users/:id",
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
                required: ["name", "email"],
                properties: {
                    name: { type: "string" },
                    email: { type: "string" },
                },
            },
        },
        handler: async (request, reply) => {
            try {
                const targetId = request.params.id;
                const { name, email } = request.body;

                const updated = await userRepository.update(targetId, { name, email });

                return reply.code(200).send(updated);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to update user" });
            }
        },
    },
};