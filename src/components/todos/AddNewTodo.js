import {useEffect, useState} from "react";

const TodoForm = ({onAdd}) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    })
    const [isShow, setIsShow] = useState(false)
    const changeHandler = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    // console.log(formData)
    if (!isShow) {
        return (
            <div>
                <button onClick={() => setIsShow(true) }
                        className={'w-full py-2 px-8 bg-blue-800 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out'}>
                    Add New todo
                </button>
            </div>
        )
    }

    return <>

        <form className={'w-full max-w-screen-md bg-white p-2 md:p-4 rounded-xl'} onSubmit={(e) => onAdd(e, formData)}>

            <div className="mb-4">
                <label htmlFor="todo-title" className={'text-gray-600 mb-1 block'}>Title</label>
                <input id={'todo-title'}
                       name={'title'}
                       className={'border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-none w-full block transition duration-300 ease-out'}
                       type="text" value={formData.title}
                       onChange={changeHandler}/>
            </div>
            <div className="mb-8">
                <label htmlFor="todo-description" className={'text-gray-600 mb-1 block'}>Description</label>
                <textarea
                    onChange={changeHandler}
                    value={formData.description}
                    name="description" id="todo-description"
                    className={'border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-none w-full block transition duration-300 ease-out'}>
                </textarea>
            </div>
            <div className="flex items-center gap-x-4">
                <button
                    className={'w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out'}
                    onClick={() => setIsShow(false)}>
                    cancel
                </button>
                <button
                    className={'w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out'}
                    type={'submit'}>add new todo
                </button>


            </div>
        </form>
    </>
}
export default TodoForm