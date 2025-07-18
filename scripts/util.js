export function init(){
    var c = 0;
    return function counter(){
        c++;
        return c;
    }
}