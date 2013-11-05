package com.hedgehog.hybriddemo;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;

import org.apache.http.util.EncodingUtils;

import android.os.Environment;

public class Util {

	private static Util instance;
	private ArrayList<Logo> logos;

/*****************************************public methods****************************************************/

	public static Util getObj() {
		if (instance == null) {
			instance = new Util();
		}
		return instance;
	}

	
	public void initLogo() {
		InputStream input = getClass().getResourceAsStream(
				"/assets/channel_logo.xml");
		try {
			logos = XmlPullHelper.getlogos(input);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void loadServiceFromFile() {
		int svcSize = 0;
		InputStream is = null;
		try {
			is = new FileInputStream(Environment.getExternalStorageDirectory()+"/chlist.dat");
			is.skip(4);
			byte[] buffer = new byte[2];
			if (is.read(buffer) == -1) {// read svc count
				return;
			}
			is.skip(2);
			int svcCount = bytesToInt(buffer, 0, 2);
			byte[] b = null;
			ArrayList<Channel> list = new ArrayList<Channel>();
			for (int i = 0; i < svcCount; i++) {
				if (is.read(buffer) == -1) {// read svc size
					break;
				}
				svcSize = Util.getObj().bytesToInt(buffer, 0, 2);
				b = new byte[svcSize - 2];
				if (is.read(b) < svcSize - 2) {
					break;
				}
				int serviceId = bytesToInt(b, 6, 4);
				String channelName = EncodingUtils.getString(b, 16, 28,
						"iso-8859-1").trim();
				int networkId = bytesToInt(b, 112, 2);
				int tsId = bytesToInt(b, 114, 2);
				int lcn=bytesToInt(b,108,2);
				if(channelName==null||channelName.equals("")){
					channelName="NONAME("+serviceId+")";
				}
				Channel channel = new Channel(networkId, tsId, serviceId);
				channel.setChannelName(channelName);
				channel.setLogo(getChannelLogo(channel));
				channel.setLcn(lcn);
				list.add(channel);
				b = null;
			}
			File outFile = new File(Environment.getExternalStorageDirectory()
					+ "/channelList.xml");
			if (outFile.exists()) {
				outFile.delete();
			}
			outFile.createNewFile();
			XmlPullHelper.saveToXML(list, new FileOutputStream(outFile));

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (is != null) {
				try {
					is.close();
					is = null;
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
/*****************************************private methods****************************************************/
	private Util() {
	}
	
	private int bytesToInt(byte[] b, int offset, int len) {
		int res = -1;
		if (b != null && b.length >= len + offset) {
			switch (len) {
			case 1:
				res = b[offset];
				break;
			case 2:
				res = ((b[offset] & 0xff)) | ((b[offset + 1] & 0xff) << 8);
				break;
			case 4:
				res = ((b[offset] & 0xff)) | ((b[offset + 1] & 0xff) << 8)
						| ((b[offset + 2] & 0xff) << 16)
						| ((b[offset + 3] & 0xff) << 24);
				break;
			}
		}

		return res;
	}

	private String getChannelLogo(Channel channel) {
		String logoName = null;
		String temp = channel.getChannelName()
				+ String.format("_%04X", channel.getServiceId());
		if (channel.getNetworkId() > 0 && channel.getTsId() > 0)
			temp = channel.getTripletIdStr();
		try {
			for (Logo logo : logos) {
				if (logo.getId().equals(temp)) {
					logoName = logo.getName() + ".png";
					break;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (logoName == null) {
			logoName = "video.png";
		}
		return logoName;
	}


}
