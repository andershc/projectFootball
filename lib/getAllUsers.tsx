export default async function first() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if(!res.ok) throw new Error('failed to fetch');
    const data = await res.json();
    return data;
}