const KEY='peluche-para-maci-v1';
export const defaults={bearName:'Miel',ownerName:'Maci',bow:'#F7B7C4',accessory:'none',expression:'normal',hugs:0,hearts:[],adopted:false,adoptionDate:'',letterOpened:false,sound:false};
export function readPreferences(){
  try{
    const value=JSON.parse(localStorage.getItem(KEY)||'{}');
    if(!value||typeof value!=='object')return {...defaults,hearts:[]};
    const s={...defaults};
    for(const [key,max] of [['bearName',24],['ownerName',32]])if(typeof value[key]==='string'&&value[key].trim())s[key]=value[key].trim().slice(0,max);
    for(const [key,allowed] of [['bow',['#F7B7C4','#A3D9C9','#7FB4E0','#C9E4A6','#FFF3C9']],['accessory',['none','flower','star']],['expression',['normal','happy','shy','sleep','surprise','hug']]])if(allowed.includes(value[key]))s[key]=value[key];
    s.hugs=Number.isSafeInteger(value.hugs)?Math.max(0,value.hugs):0;
    s.hearts=Array.isArray(value.hearts)?[...new Set(value.hearts.filter(n=>Number.isInteger(n)&&n>=0&&n<5))]:[];
    for(const key of ['adopted','letterOpened','sound'])s[key]=value[key]===true;
    if(typeof value.adoptionDate==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value.adoptionDate)&&!Number.isNaN(Date.parse(value.adoptionDate)))s.adoptionDate=value.adoptionDate;
    return s;
  }catch{return {...defaults,hearts:[]};}
}
export function savePreferences(state){try{localStorage.setItem(KEY,JSON.stringify(state));return true;}catch{return false;}}
