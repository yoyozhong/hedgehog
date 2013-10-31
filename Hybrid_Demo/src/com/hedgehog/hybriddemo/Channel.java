package com.hedgehog.hybriddemo;

public class Channel {
	private int serviceId;
	private int networkId;
	private int tsId;
	private String logo;
	private String channelName;
	
	public Channel(int networkId,int tsId,int serviceId){
		this.networkId=networkId;
		this.tsId=tsId;
		this.serviceId=serviceId;
	}
	
	public void setLogo(String logo){
		this.logo=logo;
	}
	
	public String getLogoPath(){
		return "../android_res/drawable/"+logo;
	}
	
	public String getTripletIdStr(){
		return String.format("%04X%04X%04X", networkId, tsId, serviceId);		
	}
	
	public String getChannelName(){
		return channelName;
	}
	
	public void setChannelName(String channelName){
		this.channelName=channelName;
	}
	
	public int getNetworkId(){
		return this.networkId;
	}
	
	public int getTsId(){
		return this.tsId;
	}
	
	public int getServiceId(){
		return this.serviceId;
	}

}
