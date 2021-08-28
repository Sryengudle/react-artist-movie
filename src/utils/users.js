export const users = [
    {
        id: 1,
        email: 'suryakant@gmai.com',
        password: 'surya'
    },
    {
        id: 2,
        email: 'Demo@gail.com',
        password: 'demo'
    },
    {
        id: 3,
        email: 'Test1@gmail.com',
        password: 'test'
    },
]


export const isUserExist = ({ email, password }) => {
    return email && password ? users.some(item => item.email === email && item.password === password) : false
}

export const validateUser = () => {
    return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : { email: '', password: '' }
}