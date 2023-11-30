"use client";
import React, {useState} from 'react'
import { Button, Callout, TextArea, TextField } from '@radix-ui/themes'
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

        <Controller 
          name='description'
          control={control}
          render={ ( { field }) => <SimpleMDE placeholder='Description here' {...field} /> }
        />    
        <Button>Submit New Issue</Button>
    </form>
    </div>
  )
}

export default NewIssuePage