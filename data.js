export const API_KEY='AIzaSyCjMMO1rnkOBnh0ldWgKG8pa2TqwMuhlak';


export const value_converter=(value)=>{
    if(value>=1000000)
    {
        return Math.floor(value/1000000)+'M';
    }
    else if(value>=1000)
    {
        return Math.floor(value/1000)+'K';
    }
}