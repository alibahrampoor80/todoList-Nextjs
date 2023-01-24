import {getOneTodo} from "@/api/todos/[todoId]";
import {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Layout from "@/containers/Layout";

const TodoPage = ({todo}) => {
    const router = useRouter()
    const [checked, setChecked] = useState(todo.isCompleted)
    const [formData, setFormData] = useState({
        title: todo.title,
        description: todo.description,
    })
    const changeHandler = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.put(`/api/todos/${router.query.todoId}`, {todo: {...formData, isCompleted: checked}})
            .then(res => {
                console.log(res.data)
                router.push('/')
            }).catch(err => {
            console.log(err)
        })
    }

    return <>

        <Layout>
            <div className="container p-2 xl:max-w-screen-xl mx-auto">

                <h1>Todo detail page</h1>


                <form className={'w-full  bg-white p-2  rounded-xl'} onSubmit={submitHandler}>

                    <div className="mb-4">
                        <label htmlFor="todo-title" className={'text-gray-600 mb-1 block'}>Title</label>
                        <input id={'todo-title'}
                               name={'title'}
                               className={'border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-none w-full block transition duration-300 ease-out'}
                               type="text" value={formData.title}
                               onChange={changeHandler}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="todo-description" className={'text-gray-600 mb-1 block'}>Description</label>
                        <textarea
                            onChange={changeHandler}
                            value={formData.description}
                            name="description" id="todo-description"
                            className={'border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-none w-full block transition duration-300 ease-out'}>
                </textarea>
                    </div>
                    <div className="mb-4 form-check">
                        <input type="checkbox" name={'checked'}
                               className={'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 checked:rounded-full'}
                               id={'checked'}
                               checked={checked}
                               onChange={() => setChecked(!checked)}/>
                        <label htmlFor="checked" className={'ml-2 text-sm font-medium text-black dark:text-black-300'}>complete
                            todo</label>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <button
                            type={'button'}
                            className={'w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out text-center'}
                            onClick={() => router.push('/')}
                        >
                            Back
                        </button>
                        <button
                            className={'w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out'}
                            type={'submit'}>update todo
                        </button>


                    </div>
                </form>
            </div>
        </Layout>
    </>
}
export default TodoPage

export async function getServerSideProps(context) {
    const {query} = context

    const todo = await getOneTodo(query)
    // console.log(todo)
    return {
        props: {
            todo: JSON.parse(JSON.stringify(todo))
        }
    }
}