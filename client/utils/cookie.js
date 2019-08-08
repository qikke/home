export function getCookie(name) 
{ 
  var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
      return unescape(arr[2]); 
  else 
      return null; 
} 

export function setCookie(name,value){
      var exp = new Date();
      exp.setTime(exp.getTime() + 7 * 24 * 3600 * 1000);
      document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}
