export default () => {
    if(localStorage.getItem('correoATS') !== null){
        return true;
    }else{
        return false;
    }
}