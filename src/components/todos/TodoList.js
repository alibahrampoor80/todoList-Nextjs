import {CheckIcon, PencilIcon, TrashIcon} from "@heroicons/react/24/solid";
import Link from "next/link";

const TodoList = ({data, trashTodo, onComplete}) => {

    return <>
        {
            data.map((todos) => {
                return (
                    <div key={todos._id}
                         className="flex items-center justify-between border border-gray-100 mb-4 p-3 md:p-4 rounded-xl">
                        <Link href={`/todos/${todos._id}`}>
                            <span className={`${todos.isCompleted ? "line-through" : ""}`}>{todos.title}</span>
                        </Link>

                        <div className="flex gap-x-3 items-center">
                            <button onClick={() => onComplete(todos._id)}>
                                {
                                    todos.isCompleted ? <CheckIcon className={'w-5 h-5 stroke-green-400'}/> :
                                        <span className={'w-6 h-6 block border-2  rounded-full text-black'}></span>
                                }
                            </button>
                            <button onClick={() => trashTodo(todos._id)}>
                                <TrashIcon className={'w-6 h-6 stroke-red-400'}/>
                            </button>
                            <Link href={`/todos/edit/${todos._id}`}>
                                <PencilIcon className={'w-6 h-6 stroke-blue-400'}/>
                            </Link>

                        </div>

                    </div>
                )
            })
        }

    </>
}
export default TodoList