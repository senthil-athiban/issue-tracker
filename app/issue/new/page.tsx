"use client";
import React from 'react'
import { Button, TextArea, TextField } from '@radix-ui/themes'

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root>
            <TextField.Input placeholder='title' />
        </TextField.Root>
        <TextArea placeholder='Description here' />
        <Button>Submit New Issue</Button>
    </div>
  )
}

export default NewIssuePage