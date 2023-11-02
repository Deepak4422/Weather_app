
const API_key="ca0c10a77247a6c52471595fd549b96a";
const icon_url=(icon)=>{
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

const runAPI=async(city, units="metric")=>

{
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=${units}`;
    const getdata=await fetch(url).then((res)=>{return res.json()}).then((data)=>{ return data;});
    const {weather,sys:{country},wind:{speed},main:{feels_like,humidity, pressure, temp, temp_max, temp_min,},name}=getdata;
    const {description,icon}=weather[0];
    return {description,icon_url: icon_url(icon), speed,feels_like,humidity,temp,temp_min,temp_max,pressure,name,country};
}
export {runAPI};