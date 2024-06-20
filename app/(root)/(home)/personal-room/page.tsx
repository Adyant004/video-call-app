'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react'

const Table = ({ title, description } : { title: string, description: string }) => {
  return (
    <div className='flex flex-col items-start xl:flex-row gap-2'>
      <h1 className='text-base font-medium lg:text-xl xl:min-w-32'>
        {title}
      </h1>
      <h1 className='truncate text-sm font-bold lg:text-xl max-sm:max-w-[320px]'>
        {description}
      </h1>
    </div>
  )
}

const PersonalRoom = () => {
  const { user } = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast();
  const router = useRouter();

  const meetingId = user?.id;
  const { call } = useGetCallById(meetingId!);

  const startMeeting = async() => {
    if(!client || !user) return;

    const newCall = client.call("default",meetingId!);

    if(!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        }
      })
    }

    router.push(`/meeting/${meetingId}?personal=true`)
  }


  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  return (
    <section className='flex size-full flex-col gap-10'>
      <h1 className='lg:text-3xl text-xl font-bold'>
        Personal Meeting Room
      </h1>
      <div className='flex flex-col w-full gap-8 xl:max-w-[900px]'>
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Meeting Link" description={meetingLink} />
      </div>

      <div className='flex gap-5'>
        <Button onClick={startMeeting} > 
          Start Meeting
        </Button>
        <Button className='rounded-lg' onClick={() => { navigator.clipboard.writeText(meetingLink); toast({ title: 'Link Copied' }) }}  >
          Copy Invitation
        </Button>
      </div>
    </section>
  )
}

export default PersonalRoom
