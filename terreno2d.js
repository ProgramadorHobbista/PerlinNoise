function setup() {
  createCanvas(800, 400);
  noLoop(); // Executa o draw apenas uma vez
}

function draw() {
  // Textura com random() - lado esquerdo
  for (let x = 0; x < width/2; x++) {
    for (let y = 0; y < height; y++) {
      let bright = random(255); // Valor aleatório entre 0 e 255
      stroke(bright);
      point(x, y);
    }
  }
  
  // Textura com noise() - lado direito
  let noiseScale = 0.02; // Controla a "suavidade" do noise
  for (let x = width/2; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let noiseVal = noise(x * noiseScale, y * noiseScale);
      let bright = noiseVal * 255; // Mapeia o noise (0-1) para 0-255
      stroke(bright);
      point(x, y);
    }
  }
  
  // Linha divisória central
  stroke(255, 0, 0);
  line(width/2, 0, width/2, height);
}
