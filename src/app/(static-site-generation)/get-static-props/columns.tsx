'use client';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

export const columns: ColumnDef<TUser>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'username',
    header: 'Username'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'phone',
    header: 'Phone'
  },
  {
    accessorKey: 'website',
    header: 'Website',
    cell: ({ row }) => {
      const website = row.getValue('website')!;
      return (
        <Link
          href={`https://${website}`}
          target='_blank'
          className='hover:underline'
        >
          <>{website}</>
        </Link>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Link href={`users/${user.id}`} className='hover:underline'>
          Detail
        </Link>
      );
    }
  }
];
