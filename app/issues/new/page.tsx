'use client'
import { Button, TextArea, TextField } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form"
import axios from "axios";
import { useRouter } from "next/navigation";
import "easymde/dist/easymde.min.css";

interface IssueForm {
    title: string
    description: string
}

const NewIssuePage = () => {
    const router = useRouter()
    const { register, control, handleSubmit } = useForm<IssueForm>()
    console.log(register("title"))
    return (
        <form
            onSubmit={handleSubmit((data) => {
                axios.post('/api/issues', data)
                router.push('/issues')
                // console.log(data)
            })}
            className="max-w-xl space-y-3 "
        >
            <TextField.Root placeholder="Title" {...register("title")} />
            <Controller
                control={control}
                name="description"
                render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
            />
            <Button>Submit New Issue</Button>
        </form>
    )
}

export default NewIssuePage