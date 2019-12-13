export default () => {
    if(localStorage.getItem('correoRP') !== null){
        return true;
    }else{
        return false;
    }
}