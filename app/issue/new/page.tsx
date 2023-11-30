"use client";
import React from 'react'
import { Button, TextArea, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';


interface IssueForm {
  title: string,
  description: string
}

const NewIssuePage = () => {
  const {register, control, handleSubmit} = useForm<IssueForm>();
  const router = useRouter();  
  
  return (

    /* 
    fetching the data from input field and 
    Sending it back to the api using axios
    */

    <form className='max-w-xl space-y-3' onSubmit={ handleSubmit( async (data) => {
      await axios.post('/api/issues', data)
      router.push('/issue'); // redirecting to issue page
    })}>
        <TextField.Root>
            <TextField.Input placeholder='title' {...register('title')} />
        </TextField.Root>

        <Controller 
          name='description'
          control={control}
          render={ ( { field }) => <SimpleMDE placeholder='Description here' {...field} /> }
        />    
        <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage