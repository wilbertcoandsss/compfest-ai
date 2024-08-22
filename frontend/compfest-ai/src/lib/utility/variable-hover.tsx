"use client"

import { useEffect } from 'react';
import { splitTextToLetters } from './string';
import { variableFontHover } from '../animations/variable-hover';
export const VariableHover = ({
  text = "Hover Me"
}:{
  text?: string
}) => {

  useEffect(() => {
    variableFontHover({
      select:'[data-animate="font-weight"]',
      animationDuration: 0.5,
      maxDistance:300,
      minFontWeight:400,
      maxFontWeight:900
    })	 
  }, [])
  
  const letters = splitTextToLetters({
    text
  })

  return (
    <div>
      <h1 className='text-5xl font-restart uppercase'>
        {letters.map((char, i)=>(
          <span key={i} className="char" data-animate="font-weight">{char}</span>
        ))}
      </h1>
    </div>
  );
}