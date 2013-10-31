// JavaScript Document

function Channel(channelName,channelLogo){
	this.channelName=channelName==null? "NONAME" : channelName;
	this.channelLogo=channelLogo==null? "../android_res/drawable/video.png" : channelLogo;
}

function parseChannelFromXML(xmlFile){
	var channelList=null;
	var xmlDoc=loadXML(xmlFile);
    if(xmlDoc!=null){
		channelList=new Array();
		var elements=xmlDoc.getElementsByTagName("Channel");
		for(var i=0;i<elements.length;i++){
			 var channelName = elements[i].getElementsByTagName("ChannelName")[0].firstChild.nodeValue;
             var channelLogo = elements[i].getElementsByTagName("ChannelLogo")[0].firstChild.nodeValue; 
			 var channel=new Channel(channelName,channelLogo); 
			 channelList[i]=channel;
		}
	}else{
		document.writeln("error:parse xml(xmlDoc==null).");
	}
	return channelList;
}

function loadXML(xmlFile){
	var xmlhttp = new window.XMLHttpRequest();
	xmlhttp.open("GET",xmlFile,false);
	xmlhttp.send(null);
	var xmlDoc = xmlhttp.responseXML.documentElement;
/*	try{//Internet Explorer
  		var xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
  	}catch(e){
 		try{//Firefox, Mozilla, Opera, etc.
    		xmlDoc=document.implementation.createDocument("","",null);
    	}catch(e) {
			alert(e.message);
		}
  	}

	try{
  		xmlDoc.async=false;
  		xmlDoc.load(xmlFile);
  	}catch(e){
		alert(e.message);
	}
*/
	return xmlDoc;
}

function loadChannelList(){
	var channelList=parseChannelFromXML(hybrid.getChannelXml());
	var listBody=document.getElementById("listBody");
	for(var i=0;i<channelList.length;i++){
		var channel=channelList[i];
		listBody.appendChild(createListItem(channel));
	}
}

function createListItem(channel){
	var div=document.createElement("div");
	div.className="listItem";
	div.onclick=function(){
		changeChecked(this);
	}
	div.onmousedown=function(){
		changeItemBackground(this,true);
	}
	div.onmouseup=function(){
		changeItemBackground(this,false);
	}
	
	
	var span=document.createElement("span");
	
	var imgChannelLogo=document.createElement("img");
	imgChannelLogo.className="channelLogo";
	imgChannelLogo.src=channel.channelLogo;
	
	var spanChannelName=document.createElement("span");
	spanChannelName.className="channelName";
	spanChannelName.innerHTML=channel.channelName;
	
	var inputCheckbox=document.createElement("input");
	inputCheckbox.className="checkbox";
	inputCheckbox.type="checkbox";
	
	var hr=document.createElement("hr");
	
	span.appendChild(imgChannelLogo);
	span.appendChild(spanChannelName);
	span.appendChild(inputCheckbox);
	
	div.appendChild(span);
	div.appendChild(hr);
	
	return div;	
}

function changeChecked(obj){
	var elements=obj.getElementsByTagName("span");
	var checkbox=elements[0].getElementsByClassName("checkbox")[0];
	if(checkbox.checked){
		checkbox.checked=false;
	}else{
		checkbox.checked=true;
	}
	obj=null;
}

function changeItemBackground(obj,setBgColor){
	if(setBgColor){
		obj.style.backgroundColor="#39F";	
	}else{
		obj.style.backgroundColor="";	
	}
}

function editMode(){
	var listItems=document.getElementsByClassName("listItem");
	var listItem;
	var checkbox;
	if(listItems.length>0){
		listItem=listItems[0];
		var btnDelChannel=document.getElementById("deleteChannel");
		checkbox=listItem.getElementsByClassName("checkbox")[0];
		if(checkbox.style.display=="block"){
			for(var i=0;i<listItems.length;i++){
				listItem=listItems[i];
				checkbox=listItem.getElementsByClassName("checkbox")[0];
				checkbox.style.display="none";
			}
			btnDelChannel.style.display="none";
		}else{
			for(var i=0;i<listItems.length;i++){
				listItem=listItems[i];
				checkbox=listItem.getElementsByClassName("checkbox")[0];
				checkbox.style.display="block";
				checkbox.checked=false;
			}
			btnDelChannel.style.display="block";
		}
		
	}
	
}
function deleteChannel(){
	var listItems=document.getElementsByClassName("listItem");
	var listBody=document.getElementById("listBody");
	var listItem;
	var checkbox;
	for(var i=0;i<listItems.length;i++){
		listItem=listItems[i];
		checkbox=listItem.getElementsByClassName("checkbox")[0];
		if(checkbox.checked){
			listBody.removeChild(listItem);
		}
	}
	for(var i=0;i<listItems.length;i++){
		listItem=listItems[i];
		checkbox=listItem.getElementsByClassName("checkbox")[0];
		checkbox.style.display="none";
	}
	document.getElementById("deleteChannel").style.display="none";
}