export default () => {
    if(sessionStorage.getItem('elToken') !== null){
        return true;
    }else{
        return false;
    }
}