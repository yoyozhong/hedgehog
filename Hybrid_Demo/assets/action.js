// JavaScript Document

function Channel(channelName,channelLogo,channelLcn){
	this.channelName=channelName==null? "NONAME" : channelName;
	this.channelLogo=channelLogo==null? "../android_res/drawable/icon.png" : channelLogo;
	this.channelLcn=channelLcn==null? " ":channelLcn;
}

function parseChannelFromXML(xmlFile){
	var channelList = null;
	var channelLcn = null;
	var xmlDoc = loadXML(xmlFile);
    if(xmlDoc != null){
		channelList = new Array();
		var elements = xmlDoc.getElementsByTagName("Channel");
		var channelName, channelLogo, channelLcn, channel;
		for(var i = 0; i < elements.length; i++){
			 channelName = elements[i].getElementsByTagName("ChannelName")[0].firstChild.nodeValue;
             channelLogo = elements[i].getElementsByTagName("ChannelLogo")[0].firstChild.nodeValue; 
             channelLcn = elements[i].getElementsByTagName("ChannelLcn")[0].firstChild.nodeValue;
			 channel = new Channel(channelName, channelLogo, channelLcn);
			 channelList[i] = channel;
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
	var channel;
	for(var i=0;i<channelList.length;i++){
		channel=channelList[i];
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
	imgChannelLogo.onerror = function(){
		imgChannelLogo.src = "../android_res/drawable/icon.png"
		imgChannelLogo.onerror = null;
	}
	
	var spanChannelLcn=document.createElement("span");
	spanChannelLcn.className="channelLcn";
	spanChannelLcn.innerHTML=channel.channelLcn;
	
	var spanChannelName=document.createElement("span");
	spanChannelName.className="channelName";
	spanChannelName.innerHTML=channel.channelName;
	
	var inputCheckbox=document.createElement("input");
	inputCheckbox.className="checkbox";
	inputCheckbox.type="checkbox";
	
	var hr=document.createElement("hr");
	
	span.appendChild(imgChannelLogo);
	span.appendChild(spanChannelLcn);
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
			for(i=0;i<listItems.length;i++){
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
	for(i=0;i<listItems.length;i++){
		listItem=listItems[i];
		checkbox=listItem.getElementsByClassName("checkbox")[0];
		checkbox.style.display="none";
	}
	document.getElementById("deleteChannel").style.display="none";
}