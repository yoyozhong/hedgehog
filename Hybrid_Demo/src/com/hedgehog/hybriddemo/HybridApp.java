package com.hedgehog.hybriddemo;

import android.app.Application;

public class HybridApp extends Application {
	@Override
	public void onCreate() {
		// TODO Auto-generated method stub
		super.onCreate();
		Util.getObj().initLogo();
		Util.getObj().loadServiceFromFile();
	}
}
