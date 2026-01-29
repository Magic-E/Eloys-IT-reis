import { z } from 'zod';
import { assignments, skills, reflections, chatRequestSchema } from './schema';

export const api = {
  assignments: {
    list: {
      method: 'GET' as const,
      path: '/api/assignments',
      responses: {
        200: z.array(z.custom<typeof assignments.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/assignments/:id',
      responses: {
        200: z.custom<typeof assignments.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
  },
  skills: {
    list: {
      method: 'GET' as const,
      path: '/api/skills',
      responses: {
        200: z.array(z.custom<typeof skills.$inferSelect>()),
      },
    },
  },
  reflections: {
    list: {
      method: 'GET' as const,
      path: '/api/reflections',
      responses: {
        200: z.array(z.custom<typeof reflections.$inferSelect>()),
      },
    },
  },
  chat: {
    send: {
      method: 'POST' as const,
      path: '/api/chat',
      input: chatRequestSchema,
      responses: {
        200: z.object({ response: z.string() }),
        500: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
