    
const isAuthenticated = () => {
    const token = localStorage.getItem('mawiToken');
    return token !== null
}

module.exports = {
    isAuthenticated,
}