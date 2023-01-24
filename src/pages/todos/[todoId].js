import {getOneTodo} from "@/api/todos/[todoId]";
import Layout from "@/containers/Layout";

const TodoPage = ({todo}) => {

    return <>

        <Layout>
            <div className="container p-2 xl:max-w-screen-xl mx-auto">
                <div className="w-full max-w-screen-md mx-auto text-center bg-white p-2 md:p-4 rounded-xl">
                    <h1 className={'text-4xl mb-4'}>Todo detail page</h1>
                    <h2 className={'font-bold'}>title: <span className={'font-normal'}>{todo.title}</span></h2>
                    <p className={'font-bold'}>description: <span className={'font-normal'}>{todo.description}</span></p>
                    <span className={'font-bold'}>Complete Task: <span className={'font-normal'}>{JSON.stringify(todo.isCompleted)}</span></span>
                </div>
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