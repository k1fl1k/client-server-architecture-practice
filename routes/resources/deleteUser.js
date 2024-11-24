const { userRepository } = require("./../../repositories/user.repo");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    deleteUser: {
        url: "/users/:id",
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
                const deleted = await userRepository.delete(targetId);
                return reply.code(200).send(deleted);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to delete user" });
            }
        },
    },
};