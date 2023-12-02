"use client";
import React, {useState} from 'react'
import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from "zod";
import { createIssueSchema } from '@/app/validationSchema';

// interface IssueForm {
//   title: string,
//   description: string
// }

// validating the type of schema
type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setError] = useState("")
  const router = useRouter();  
  
  return (
    /* 
    fetching the data from input field and 
    Sending it back to the api using axios
    */
    <div className='max-w-xl '>
      {error && 
        <Callout.Root className='mb-3' color='red'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      }
    <form className='space-y-3' onSubmit={ handleSubmit( async (data) => {
      try {  
        await axios.post('/api/issues', data)
        router.push('/issue'); // redirecting to issue page 
      } catch (error) {
        setError("unexpected Error occurs");
      }
    })}>
        <TextField.Root>
            <TextField.Input placeholder='title' {...register('title')} />
        </TextField.Root>
        {errors.title && <Text color='red' as="p">{errors.title.message}</Text>}
        <Controller 
          name='description'
          control={control}
          render={ ( { field }) => <SimpleMDE placeholder='Description here' {...field} /> }
        />    
        {errors.description && <Text color='red' as="p">{errors.description.message}</Text>}
        <Button>Submit New Issue</Button>
    </form>
    </div>
  )
}

export default NewIssuePage