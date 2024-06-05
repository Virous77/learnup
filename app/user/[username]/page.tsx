import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import db from '@/db';
import { user } from '@/db/schema';
import { fallBackName } from '@/utils';
import { eq } from 'drizzle-orm';

const getUser = async ({ username }: { username: string }) => {
  return await db.query.user.findFirst({
    where: eq(user.user_name, username),
    columns: {
      password: false,
      isDeleted: false,
    },
  });
};

const UserProfile = async ({ params }: { params: { username: string } }) => {
  const user = await getUser({ username: params.username });

  return (
    <main className="mt-[100px] px-16">
      <section className="flex items-start gap-3">
        <Avatar>
          <AvatarImage
            width={300}
            height={300}
            src={user?.image || ''}
            alt={user?.name || ''}
            aria-label="user profile picture"
          />
          <AvatarFallback>{fallBackName(user?.name || '')}</AvatarFallback>
        </Avatar>

        <div>
          <h1>{user?.name}</h1>
          <p>{user?.user_name}</p>
        </div>
      </section>

      <section>
        <header></header>
      </section>
    </main>
  );
};

export default UserProfile;
