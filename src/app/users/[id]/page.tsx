import { TUser } from '@/app/(static-site-generation)/get-static-props/columns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export async function generateStaticParams() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const users = (await res.json()) as TUser[];

  return users.map(user => {
    return { id: user.id.toString() };
  });
  // Hasilnya seperti berikut
  // return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

async function getUserById(id: string): Promise<TUser> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await res.json();

  return user;
}

interface UserDetailProps {
  params: {
    id: string;
  };
}

export default async function UserDetail({ params }: UserDetailProps) {
  const { id } = params;
  const user = await getUserById(id);

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <section>
        <Card className='w-[350px]'>
          <CardHeader>
            <CardTitle>User</CardTitle>
            <CardDescription>User details by ID: {id}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-y-4'>
              <div>
                <h4 className='mb-2'>Username</h4>
                <p>{user.username}</p>
              </div>
              <div>
                <h4 className='mb-2'>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4 className='mb-2'>Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4 className='mb-2'>Phone</h4>
                <p>{user.phone}</p>
              </div>
              <div>
                <h4 className='mb-2'>Website</h4>
                <p>{user.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
