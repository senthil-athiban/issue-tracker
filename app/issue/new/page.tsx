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
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

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
  const [formSubmit, setformSubmit] = useState(false)
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
        setformSubmit(true);
        await axios.post('/api/issues', data)
        router.push('/issue'); // redirecting to issue page 
      } catch (error) {
        setformSubmit(false);
        setError("unexpected Error occurs");
      }
    })}>
        <TextField.Root>
            <TextField.Input placeholder='title' {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller 
          name='description'
          control={control}
          render={ ( { field }) => <SimpleMDE placeholder='Description here' {...field} /> }
        />    
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button>Submit New Issue {formSubmit && <Spinner />}</Button>
    </form>
    </div>
  )
}

export default NewIssuePage