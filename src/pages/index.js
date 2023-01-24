import axios from "axios";

import { useState} from "react";
import TodoList from "@/components/todos/TodoList";
import TodoForm from "@/components/todos/AddNewTodo";

import Todo from "@/server/models/todo";
import dbConnect from "@/server/utils/dbConnect";
import Layout from "@/containers/Layout";


export default function Home({todos}) {

    const [data, setData] = useState(todos)


    const trashTodo = (id) => {

        axios.delete(`/api/todos/${id}`)
            .then(({data}) => {

                setData(data.todos)

            }).catch(err => console.log(err))
    }


    const addTodo = (e, formData) => {
        e.preventDefault();
        // console.log(formData)
        axios.post(`/api/todos/`, {formData})
            .then(({data}) => {
                setData(data.todos)
            }).catch(err => console.log(err))
    }
    const onComplete = (id) => {
        axios.put(`/api/todos/complete/${id}`)
            .then(({data}) => {
                setData(data.todos)
            }).catch(err => {
            console.log(err)
        })

    }

    return <>
        <Layout>
            <div className="container p-2 xl:max-w-screen-xl mx-auto">
                <section className="flex md:flex-row md:items-start md:justify-center gap-x-8 flex-col gap-y-8">
                    {/* todo form */}
                    <TodoForm onAdd={addTodo}/>
                    <div className="w-full max-w-screen-md bg-white p-2 md:p-4 rounded-xl">

                        {/* todo list */}
                        <TodoList data={data} trashTodo={trashTodo} onComplete={onComplete}/>
                    </div>
                </section>


            </div>

        </Layout>

    </>
}

export async function getServerSideProps(context) {
    dbConnect()
    const todo = await Todo.find({})

    return {
        props: {
            todos: JSON.parse(JSON.stringify(todo))
        }
    }
}