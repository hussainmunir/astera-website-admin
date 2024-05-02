import React from 'react';
import { FirstTitle } from './FirstTitle'; 
import { SecondSection } from './SecondSection'
import Section3 from './Section3';

export function NewCollection () {
  return (
    <div className='h-[100vh]'>
      <FirstTitle />
      <SecondSection/>
      <Section3 />
    </div>
  );
};
