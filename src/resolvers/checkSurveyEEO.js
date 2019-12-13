export default () => {
    if(localStorage.getItem('correoEEO') !== null){
        return true;
    }else{
        return false;
    }
}