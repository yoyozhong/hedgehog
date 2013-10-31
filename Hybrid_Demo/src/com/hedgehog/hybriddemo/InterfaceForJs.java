package com.hedgehog.hybriddemo;

import android.os.Environment;

public class InterfaceForJs {
	public String getChannelXml() {
		return Environment.getExternalStorageDirectory() + "/channelList.xml";
	}

}
