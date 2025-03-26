import { LS_TYPES } from "../types";

const TodosBaseURL = "http://localhost:5000/api/v1/todos";

export const getTodos = async () => {
    const token = localStorage.getItem(LS_TYPES.token) ?? null;
    try {
        const resp = await fetch(`${TodosBaseURL}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if( !resp.ok ) throw new Error( resp.statusText )
        const { todos } = await resp.json();
        return todos;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const createTodo = async (title, description) => {
    console.log({ title, description })
    const token = localStorage.getItem(LS_TYPES.token) ?? null;

    try {
        const resp = await fetch(`${TodosBaseURL}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, description })
        });

        const { todo } = await resp.json();
        return todo; 
    } catch (error) {
        throw new Error(error.message);
    }
}