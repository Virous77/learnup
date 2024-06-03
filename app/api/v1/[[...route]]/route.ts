import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { zValidator } from '@hono/zod-validator';
import z from 'zod';
import { nanoid } from 'nanoid';
import db from '@/db';
import { user } from '@/db/schema';
import { sendEmail } from '@/lib/email/resend';
import aragon from 'argon2';

const app = new Hono().basePath('/api/v1/');

const userSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  type: z.string().min(2, { message: 'Type is required' }),
  image: z.string(),
});

const createUser = app.post(
  '/register',
  zValidator('json', userSchema, (result, c) => {
    if (!result.success) {
      return c.json({ message: result.error.errors[0].message }, 400);
    }
  }),
  async (c) => {
    try {
      const { name, email, type, image } = c.req.valid('json');
      const password = nanoid();
      const hash = await aragon.hash(password);
      await db.insert(user).values({
        name,
        email,
        image,
        password: hash,
        isVerified: true,
        user_name: email.split('@')[0],
        visibleName: name,
      });
      sendEmail(password, type);
      return c.json({ status: true });
    } catch (error) {
      return c.json({ status: false });
    }
  }
);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export type ICreateUser = typeof createUser;
