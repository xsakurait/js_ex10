window.addEventListener(
  "load",
  function () {
    cgStart();
  },
  false
);

function cgStart() {
  // 1.レンダラー(CGの描画)オブジェクト生成
  //（復習）　newはオブジェクト生成のJavaScriptの命令
  let rendererObj = new THREE.WebGLRenderer();

  //レンダラーのプロパティ（色、サイズ）を設定
  rendererObj.setClearColor(new THREE.Color(0xeeeeee)); //描画空間の色を設定しておく
  rendererObj.setSize(window.innerWidth, window.innerHeight); //描画空間サイズ指定

  //id-cg-frameのタグをオブジェクト化し、その中に描画オブジェクト（renderer）を追加(append)
  document.getElementById("cg-frame").appendChild(rendererObj.domElement);
  //オブジェクト化されたdivタグ　そのオブジェクトの中(Child)

  // 2.シーン・オブジェクト生成：舞台を作成するイメージ
  //(3次元空間オブジェクトを生成：この中に物体を配置、描画)
  let sceneObj = new THREE.Scene();

  //以後に空間に配置する物体、物体の色などをレンダリングする情報を指定していく

  // 3.0. 物体0(空間を見牛わないために、座標軸を描く)
  // 軸オブジェクト生成（チェック用）　（デフォルト）x軸：赤、y軸：緑、z軸：青
  let axesObj = new THREE.AxesHelper(50);
  
  // 作成したシーン（空間）に字句オブジェクトを追加
  sceneObj.add(axesObj);

  //以後、空間に描画したい物体オブジェクトを作成、空間に追加の形式となる

  //3-1.　物体１：床
  // (1)まず、形！　平面（plane)の形状(Geometry)オブジェクトを横６０、縦２０で生成
  // とにかく、形状を準備するだけで、何も起こらない！
  let planeGeo = new THREE.PlaneGeometry(50, 20);
  // (2)次に表面材質（Material）の状態！
  // 様々な指定ができるが、ここではメッシュ（格子）で区切る、基本色を指定する
  let planeMat = new THREE.MeshBasicMaterial({ color: 0xcccccc });

  //別々に作成した形状と表面の状態を統合して、１つのオブジェクト（平面オブジェクト）にする
  let planeObj = new THREE.Mesh(planeGeo, planeMat); //形状、材質を統合して１つの物体にする

  // 作成した平面オブジェクトを作成しておいた空間（舞台）に配置場所を指定

  // xy平面に張り付いている平面を、床となるxy平面に寝かせる
  // x軸を中心に1 / 2π(rad)回転
  planeObj.rotation.x = 0.1111; /*0.0 試してみよ！*/ /*-0.5 * Math.Pi*/
  planeObj.rotation.y = 0.1111; /*0.0 試してみよ！*/ /*-0.5 * Math.Pi*/
  planeObj.rotation.z = 0.5; /*0.0 試してみよ！*/ /*-0.5 * Math.Pi*/

  //軸を中心とした回転を判別するために、こぶし握り、親指を座標軸正方向に合わせ、手首回転が軸の回転の正方向
  // 平面の中心座標をx,y,z個別に指定
  planeObj.position.x = 15;
  planeObj.position.y = 0;
  planeObj.position.z = 0;

  // 上記で指定した平面をシーン（舞台）に追加（配置）
  sceneObj.add(planeObj);

  // 3.2.物体２：球
  //球オブジェクト作成
  let sphereGeo = new THREE.SphereGeometry(4, 20, 20); //半径、経度分別、緯度分別
  // 表面材質設定
  let sphereMat = new THREE.MeshBasicMaterial({
    color: 0x7777ff,
    wireframe: true,
  });
  //形状と表面材質を組み合わせる
  let sphereObj = new THREE.Mesh(sphereGeo, sphereMat);
  // 配置位置（座標セットの別表記）
  sphereObj.position.set(20, 4, 2); //sphereObj.position.x=20,sphereObj.position.y=4,sphereObj.position.z=2を一度に設定できる

  //シーンに追加
  sceneObj.add(sphereObj);

  // 3 - 3.物体3立体体
  let cubeGeo = new THREE.BoxGeometry(4, 4, 4);
  let cubeMat = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  });
  let cubeObj = new THREE.Mesh(cubeGeo, cubeMat);
  cubeObj.position.set(10, 10, 0); //(10,10,0) (x,y,z)
  sceneObj.add(cubeObj);
  // 5.カメラ・オブジェクト生成（透視投影カメラ）
  let cameraObj = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // カメラの位置、視線方向を設定
  cameraObj.position.x = -30;
  cameraObj.position.y = 40;
  cameraObj.position.z = 30;
  // cameraObj.position.set(-30, 40, 30);
  cameraObj.lookAt(sceneObj.position); //scene.positionはデフォルトで減点カメラを向ける方向を指定
  // 6.シーンとカメラをレンダラーに追加
  rendererObj.render(sceneObj, cameraObj);
}
//課題
// 床を自在に回転させる
// 物体の位置を指定してそれが正しいか確認
