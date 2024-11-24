const { userRepository } = require("./../../repositories/user.repo");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    createUser: {
        url: "/users",
        method: "POST",
        bodyLimit: 1024,
        schema: {
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
                const { name, email } = request.body;

                const user = await userRepository.create({ name, email });

                return reply.code(201).send(user);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to create user" });
            }
        },
    },
};