(function(){const blurProperty=gsap.utils.checkPrefix("filter"),blurExp=/blur\((.+)?px\)/,getBlurMatch=target=>(gsap.getProperty(target,blurProperty)||"").match(blurExp)||[];gsap.registerPlugin({name:"blur",get(target){return+getBlurMatch(target)[1]||0;},init(target,endValue){let data=this,filter=gsap.getProperty(target,blurProperty),endBlur="blur("+endValue+"px)",match=getBlurMatch(target)[0],index;if(filter==="none"){filter="";}
if(match){index=filter.indexOf(match);endValue=filter.substr(0,index)+
endBlur+
filter.substr(index+match.length);}else{endValue=filter+endBlur;filter+=filter?" blur(0px)":"blur(0px)";}
data.target=target;data.interp=gsap.utils.interpolate(filter,endValue);},render(progress,data){data.target.style[blurProperty]=data.interp(progress);}});})();