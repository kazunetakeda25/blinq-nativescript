/* AUTO-GENERATED FILE. DO NOT MODIFY.
 * This class was automatically generated by the
 * static binding generator from the resources it found.
 * Please do not modify by hand.
 */
package com.tns.gen.android.view;

public class TextureView_SurfaceTextureListener extends java.lang.Object
    implements com.tns.NativeScriptHashCodeProvider,
        android.view.TextureView.SurfaceTextureListener {
  public TextureView_SurfaceTextureListener() {
    super();
    com.tns.Runtime.initInstance(this);
  }

  public void onSurfaceTextureAvailable(
      android.graphics.SurfaceTexture param_0, int param_1, int param_2) {
    java.lang.Object[] args = new java.lang.Object[3];
    args[0] = param_0;
    args[1] = param_1;
    args[2] = param_2;
    com.tns.Runtime.callJSMethod(this, "onSurfaceTextureAvailable", void.class, args);
  }

  public void onSurfaceTextureSizeChanged(
      android.graphics.SurfaceTexture param_0, int param_1, int param_2) {
    java.lang.Object[] args = new java.lang.Object[3];
    args[0] = param_0;
    args[1] = param_1;
    args[2] = param_2;
    com.tns.Runtime.callJSMethod(this, "onSurfaceTextureSizeChanged", void.class, args);
  }

  public boolean onSurfaceTextureDestroyed(android.graphics.SurfaceTexture param_0) {
    java.lang.Object[] args = new java.lang.Object[1];
    args[0] = param_0;
    return (boolean)
        com.tns.Runtime.callJSMethod(this, "onSurfaceTextureDestroyed", boolean.class, args);
  }

  public void onSurfaceTextureUpdated(android.graphics.SurfaceTexture param_0) {
    java.lang.Object[] args = new java.lang.Object[1];
    args[0] = param_0;
    com.tns.Runtime.callJSMethod(this, "onSurfaceTextureUpdated", void.class, args);
  }

  public int hashCode__super() {
    return super.hashCode();
  }

  public boolean equals__super(java.lang.Object other) {
    return super.equals(other);
  }
}