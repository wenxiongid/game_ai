class C2DMatrix{
  constructor() {
    this.identity();
  }
  identity(){
    this._11 = 1; this._12 = 0; this._13 = 0;
    this._21 = 0; this._22 = 1; this._23 = 0;
    this._31 = 0; this._32 = 0; this._33 = 1;
  }
  multiply(mIn){
    let tempM = new C2DMatrix();
    //first row
    tempM._11 = (this._11*mIn._11) + (this._12*mIn._21) + (this._13*mIn._31);
    tempM._12 = (this._11*mIn._12) + (this._12*mIn._22) + (this._13*mIn._32);
    tempM._13 = (this._11*mIn._13) + (this._12*mIn._23) + (this._13*mIn._33);

    //second
    tempM._21 = (this._21*mIn._11) + (this._22*mIn._21) + (this._23*mIn._31);
    tempM._22 = (this._21*mIn._12) + (this._22*mIn._22) + (this._23*mIn._32);
    tempM._23 = (this._21*mIn._13) + (this._22*mIn._23) + (this._23*mIn._33);

    //third
    tempM._31 = (this._31*mIn._11) + (this._32*mIn._21) + (this._33*mIn._31);
    tempM._32 = (this._31*mIn._12) + (this._32*mIn._22) + (this._33*mIn._32);
    tempM._33 = (this._31*mIn._13) + (this._32*mIn._23) + (this._33*mIn._33);

    this._11 = tempM._11;
    this._12 = tempM._12;
    this._13 = tempM._13;

    this._21 = tempM._21;
    this._22 = tempM._22;
    this._23 = tempM._23;

    this._31 = tempM._31;
    this._32 = tempM._32;
    this._33 = tempM._33;
  }
  transformVector2D(vec){
    let tempX = this._11 * vec.x + this._21 * vec.y + this._31;
    let tempY = this._12 * vec.x + this._22 * vec.y + this._32;
    vec.x = tempX;
    vec.y = tempY;
  }
  transformVector2Ds(vecs){
    for(let i = 0; i < vecs.length; i++){
      this.transformVector2D(vecs[i]);
    }
  }
  translate(x, y){
    let mat = new C2DMatrix();
    mat._11 = 1; mat._12 = 0; mat._13 = 0;
    mat._21 = 0; mat._22 = 1; mat._23 = 0;
    mat._31 = x; mat._32 = y; mat._33 = 1;
    this.multiply(mat);
  }
  scale(xScale, yScale){
    let mat = new C2DMatrix();
    mat._11 = xScale || 1; mat._12 = 0; mat._13 = 0;
    mat._21 = 0; mat._22 = yScale || 1; mat._23 = 0;
    mat._31 = 0; mat._32 = 0; mat._33 = 1;
    this.multiply(mat);
  }
  rotate(fwd, side){
    let mat = new C2DMatrix();
    if(typeof side == 'undefined'){
      let sin = Math.sin(fwd);
      let cos = Math.cos(fwd);
      mat._11 = cos; mat._12 = sin; mat._13 = 0;
      mat._21 = -sin; mat._22 = cos; mat._23 = 0;
      mat._31 = 0; mat._32 = 0; mat._33 = 1;
    }else{
      mat._11 = fwd.x; mat._12 = fwd.y; mat._13 = 0;
      mat._21 = side.x; mat._22 = side.y; mat._23 = 0;
      mat._31 = 0; mat._32 = 0; mat._33 = 1;
    }
    this.multiply(mat);
  }
}

export default C2DMatrix;