'use client'
import { Button } from '@radix-ui/themes'
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface Issue {
  id: string;
  title: string;
  description: string;
}


const IssuesPage = () => {
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
  return (
    <div>
      <Button><Link href={'/issues/new'}>New Issue</Link></Button>

      {data.map((issue) => (
        <div key={issue.id} className="border border-gray-300 p-4 mb-4 mt-5 rounded-lg">
          <h1 className="text-xl font-bold mb-2">{issue.title}</h1>
          <p className="text-gray-700">{issue.description}</p>
        </div>
      ))}
    </div>
  )
}

export default IssuesPage