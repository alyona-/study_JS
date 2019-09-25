const  startphone = {
  brand: 'samsung',
  screen: 5.5,
  rom: 128,
  ram: 4,
  cps: true,
  sensor: [
     'Accelometer', 'E-compass',  'Fingerprint sensor', 'Gyroscope'
  ],
  camera: {
      back: [32,5,8 ],
      front: 16
  }
};


const jsonSmart = (() => {
    let test = JSON.stringify(startphone);
    console.log(test);
    console.log("typeOf test: "+ typeof test);

    let test2 =JSON.parse(test);
    console.log("test2 : "+test2);
    console.log("typeOf test: "+typeof test2);
})();



