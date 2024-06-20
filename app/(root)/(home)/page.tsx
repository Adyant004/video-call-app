import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'

const Home = () => {

  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US',{ dateStyle: 'full' })).format(now);

  function greetMe() {
    const nowt = new Date();
    const hour = nowt.getHours();
    
    let greeting;
    
    if (hour >= 5 && hour < 12) {
      greeting = "Good morning!";
    } else if (hour >= 12 && hour < 16) {
      greeting = "Good afternoon!";
    } else {
      greeting = "Good evening!";
    }
    
    return `${greeting}`;
  }

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full bg-hero bg-cover rounded-[20px]'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className=' max-w-[270px] self-start rounded py-2 text-4xl text-center  font-bold'>
            {greetMe()}
          </h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {time}
            </h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>
              {date}
            </p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  )
}

export default Home
