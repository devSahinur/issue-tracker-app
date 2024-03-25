'use client'
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form"
import { useState } from "react";
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
    const [error, setError] = useState<string | null>(null)

    return (
        <div className="max-w-xl">
            {error && <Callout.Root color="red" className="mb-5">
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issues', data)
                        router.push('/issues')
                    } catch (error) {
                        console.log(error)
                        setError("An unexpected error occurred")
                    }
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
        </div>
    )
}

export default NewIssuePage