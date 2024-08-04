export const apiKey = "AIzaSyC9BWZ9OONuYfC6RsFl4KYnixsF-FOPV4g";

export const valueConverter = (value)=>{
    if(value >= 1000000){
        return Math.floor(value/1000000) + "M";
    } else if(value >= 1000){
        return Math.floor(value/1000) + "k";
    }else{
        return value;
    }
}