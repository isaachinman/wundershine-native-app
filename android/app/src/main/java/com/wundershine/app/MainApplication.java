package com.wundershine.app;

import android.app.Application;
import android.content.Context;
import android.support.multidex.MultiDex;

import com.reactnativenavigation.NavigationApplication;
import com.microsoft.codepush.react.CodePush;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import io.sentry.RNSentryPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.wix.interactable.Interactable;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactApplication;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.alinz.parkerdan.shareextension.SharePackage;
import com.vydia.RNUploader.UploaderReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
  // implements ReactInstanceHolder {

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }

    @Override
    public String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
          new CodePush(BuildConfig.ANDROID_CODEPUSH_DEPLOYMENT_KEY, MainApplication.this, BuildConfig.DEBUG),
          new ReactNativeConfigPackage(),
          new RNSentryPackage(MainApplication.this),
          new BlurViewPackage(),
          new LinearGradientPackage(),
          new SharePackage(),
          new UploaderReactPackage(),
          new RNFetchBlobPackage(),
          new Interactable()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    // @Override
    // public ReactInstanceManager getReactInstanceManager() {
    //     return getReactNativeHost().getReactInstanceManager();
    // }
}
