const bearer = [{ bearerAuth: [] }];
const respuesta = { 200: { description: 'Operación exitosa' }, 400: { description: 'Solicitud inválida' }, 401: { description: 'No autenticado' } };

export default {
  openapi: '3.0.3',
  info: { title: 'JuegoIA API', version: '1.0.0', description: 'API REST para jugadores, progreso y misiones.' },
  servers: [{ url: 'http://localhost:3000/api/v1' }],
  components: {
    securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } },
    schemas: {
      Registro: { type: 'object', required: ['username', 'email', 'password'], properties: { username: { type: 'string', example: 'jugador1' }, email: { type: 'string', format: 'email' }, password: { type: 'string', minLength: 8 } } },
      Login: { type: 'object', required: ['email', 'password'], properties: { email: { type: 'string', format: 'email' }, password: { type: 'string' } } },
      Progreso: { type: 'object', properties: { nivel: { type: 'integer', example: 2 }, experiencia_actual: { type: 'integer', example: 150 }, puntuacion_maxima: { type: 'integer', example: 900 } } },
      Mision: { type: 'object', required: ['nombre_mision'], properties: { nombre_mision: { type: 'string', example: 'Completar tutorial' }, completada: { type: 'boolean' } } }
    }
  },
  paths: {
    '/auth/registro': { post: { tags: ['Autenticación'], summary: 'Registrar jugador', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Registro' } } } }, responses: { 201: { description: 'Jugador registrado' }, 409: { description: 'Correo existente' } } } },
    '/auth/login': { post: { tags: ['Autenticación'], summary: 'Iniciar sesión', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Login' } } } }, responses: respuesta } },
    '/auth/perfil': { get: { tags: ['Autenticación'], summary: 'Consultar perfil, progreso y misiones', security: bearer, responses: respuesta } },
    '/juego/progreso': {
      get: { tags: ['Progreso'], summary: 'Consultar progreso propio', security: bearer, responses: respuesta },
      patch: { tags: ['Progreso'], summary: 'Actualizar progreso propio', security: bearer, requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Progreso' } } } }, responses: respuesta }
    },
    '/juego/misiones': {
      get: { tags: ['Misiones'], summary: 'Listar misiones propias', security: bearer, responses: respuesta },
      post: { tags: ['Misiones'], summary: 'Crear misión', security: bearer, requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Mision' } } } }, responses: { 201: { description: 'Misión creada' }, 401: { description: 'No autenticado' } } }
    },
    '/juego/misiones/{idMision}': {
      patch: { tags: ['Misiones'], summary: 'Actualizar una misión propia', security: bearer, parameters: [{ name: 'idMision', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Mision' } } } }, responses: respuesta },
      delete: { tags: ['Misiones'], summary: 'Eliminar una misión propia', security: bearer, parameters: [{ name: 'idMision', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 204: { description: 'Misión eliminada' }, 404: { description: 'No encontrada' } } }
    }
  }
};
