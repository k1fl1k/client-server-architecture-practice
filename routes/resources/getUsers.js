const { userRepository } = require("./../../repositories/user.repo");

module.exports = {
    /**
     * @type {import('fastify').RouteOptions}
     */
    getUsers: {
        url: "/users",
        method: "GET",
        handler: async (request, reply) => {
            try {
                const list = await userRepository.findAll();
                return reply.code(200).send(list);
            } catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: "Failed to fetch users" });
            }
        },
    },
};