import { Metadata } from 'next';
import { TUser, columns } from './columns';
import { DataTable } from './data-table';

export const metadata: Metadata = {
  title: 'WAHAHAHA INI TITLE BARU DI HALAMAN /get-static-props'
};

// This function can be named anything
async function getUsers(): Promise<TUser[]> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const users = await res.json();

  return users;
}

export default async function GetStaticProps() {
  const users = await getUsers();

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <section>
        <h1 className='mb-4 text-2xl font-bold'>Users</h1>
        <DataTable columns={columns} data={users} />
      </section>
    </main>
  );
}
