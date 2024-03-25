'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';


// Interface for Issue object
interface Issue {
  id: string;
  title: string;
  description: string;
}


export default function Home() {
  const [data, setData] = useState<Issue[]>([]);

  useEffect(() => {
    axios.get('/api/issues')
      .then((res) => {
        setData(res.data.issues);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Logging data to console
  console.log(data);

  // Rendering UI
  return (
    <main className="p-8">
      {/* New Issue Button */}
      <Button className="my-5 cursor-pointer"><Link href={'/issues/new'}>New Issue</Link></Button>
      {/* Mapping over issues and rendering them */}
      {data.map((issue) => (
        <div key={issue.id} className="border border-gray-300 p-4 mb-4 mt-5 rounded-lg">
          <h1 className="text-xl font-bold mb-2">{issue.title}</h1>
          <p className="text-gray-700">{issue.description}</p>
        </div>
      ))}
    </main>
  );
}
