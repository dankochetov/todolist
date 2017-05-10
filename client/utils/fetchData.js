export function fetchTodos() {
    return new Promise((resolve, reject) => {
        resolve(JSON.parse(window.localStorage.todos || '[]'));
    });
}