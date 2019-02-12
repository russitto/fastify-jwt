import fastify = require('fastify');
import fastifyJwt = require('./index');

const app = fastify();

app.register(fastifyJwt, { secret: "supersecret" });

app.addHook("preHandler", async (request, reply) =>
{
    try
    {
        await request.jwtVerify();
    }
    catch (err)
    {
        reply.send(err);
    }
});

app.post('/signup', async (req, reply) =>
{
    const token = app.jwt.sign({ user: "userName" });
    let data = await app.jwt.verify(token);
    reply.send({ token });
});
