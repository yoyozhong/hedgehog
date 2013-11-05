package com.hedgehog.hybriddemo;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserFactory;
import org.xmlpull.v1.XmlSerializer;

import android.util.Xml;

public class XmlPullHelper {
	/**
	 * 用PULL技术构建XML文件
	 * 
	 * @param channelList
	 * @param outStream
	 * @throws IOException
	 * @throws IllegalStateException
	 * @throws IllegalArgumentException
	 */
	public static void saveToXML(List<Channel> channelList, OutputStream outStream)
			throws Exception {
		// 构建XML序列化对象
		XmlSerializer serializer = Xml.newSerializer();
		// 设置文件输出
		serializer.setOutput(outStream, "utf-8");
		// 文档开始
		serializer.startDocument("utf-8", true);
		// 节点开始
		serializer.startTag(null, "ChannelList");
		// 创建子节点
		for (Channel channel : channelList) {
			serializer.startTag(null, "Channel");
			
			serializer.startTag(null, "ChannelName");
			serializer.text(channel.getChannelName());
			serializer.endTag(null, "ChannelName");
			
			serializer.startTag(null, "ChannelLogo");
			serializer.text(channel.getLogoPath());
			serializer.endTag(null, "ChannelLogo");
			
			serializer.startTag(null, "ChannelLcn");
			serializer.text(String.valueOf(channel.getLcn()));
			serializer.endTag(null, "ChannelLcn");
			
			serializer.startTag(null, "TripletId");
			serializer.text(channel.getTripletIdStr());
			serializer.endTag(null, "TripletId");
			
			serializer.endTag(null, "Channel");
		}
		// 节点结束
		serializer.endTag(null, "ChannelList");
		// 文档结束
		serializer.endDocument();
		outStream.close();
	}
	
	 public static ArrayList<Logo> getlogos(InputStream inputStream) throws Exception{
		 	ArrayList<Logo> logos = null;
	        Logo logo = null;
	        XmlPullParser parser = XmlPullParserFactory.newInstance().newPullParser();
	        parser.setInput(inputStream, "UTF-8");
	        
	        int event = parser.getEventType();
	        while(event!=XmlPullParser.END_DOCUMENT){
	            switch(event){
	            case XmlPullParser.START_DOCUMENT:
	                logos = new ArrayList<Logo>();
	                break;
	            case XmlPullParser.START_TAG:
	                if("entry".equals(parser.getName())){
	                    logo = new Logo();
	                    logo.setId(parser.getAttributeValue(0));
	                    logo.setName(parser.getAttributeValue(1));
	                }
	                break;
	            case XmlPullParser.END_TAG:
	                if("entry".equals(parser.getName())){
	                    logos.add(logo);
	                    logo = null;
	                }
	                break;
	            }
	            event = parser.next();
	        }//end while
	        return logos;
	    }
}
