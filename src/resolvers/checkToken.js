  
export default () => {
    if(localStorage.getItem('elToken') !== null){
        return true;
    }else{
        return false;
    }
}
