import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { routes } from "./http/routes";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, {
	origin: true,
});

app.register(fastifyMultipart);

app.register(routes, {
	prefix: "/api/v1",
});

const port = process.env.PORT ? Number(process.env.PORT) : 3333;

app.listen({ port }).then(() => {
	console.log(`✅ API running on port ${port} 🚀`);
});
