let cols, linhas;
let escala = 20; // Tamanho das células
let w = 600, h = 400;
let terrenoNoise = [];
let terrenoRandom = [];
let voo = 0; // Para animar o relevo

function setup() {
  createCanvas(w, h, WEBGL);
  cols = w / escala;
  linhas = h / escala;
}

function draw() {
  background(135, 206, 250); // Céu azul claro
  rotateX(PI / 3); // Inclinação da visão
  translate(-w / 2, -h / 2 - 50); // Centraliza o terreno

  let yOff = voo; // Movimento do relevo ao longo do tempo
  for (let y = 0; y < linhas; y++) {
    let xOff = 0;
    terrenoNoise[y] = [];
    terrenoRandom[y] = [];
    for (let x = 0; x < cols; x++) {
      // Lado esquerdo: Perlin Noise (relevo suave)
      terrenoNoise[y][x] = map(noise(xOff, yOff), 0, 1, -100, 100);

      // Lado direito: Totalmente aleatório (relevo caótico)
      terrenoRandom[y][x] = random(-100, 100);

      xOff += 0.1;
    }
    yOff += 0.1;
  }

  // Função para definir cores do relevo
  function pegaCorTerreno(height) {
    if (height < -50) return color(0, 100, 200); // Água profunda
    if (height < -20) return color(0, 150, 255); // Água rasa
    if (height < 20) return color(34, 139, 34); // Grama
    if (height < 60) return color(139, 69, 19); // Montanha
    return color(255, 255, 255); // Neve
  }

  // Desenha o relevo Perlin Noise (lado esquerdo)
  for (let y = 0; y < linhas - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols / 2; x++) {
      let height1 = terrenoNoise[y][x];
      let height2 = terrenoNoise[y + 1][x];

      fill(pegaCorTerreno(height1));
      stroke(0);

      vertex(x * escala, y * escala, height1);
      vertex(x * escala, (y + 1) * escala, height2);
    }
    endShape();
  }

  // Desenha o relevo Aleatório (lado direito)
  for (let y = 0; y < linhas - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = cols / 2; x < cols; x++) {
      let height1 = terrenoRandom[y][x];
      let height2 = terrenoRandom[y + 1][x];

      fill(pegaCorTerreno(height1));
      stroke(0);

      vertex(x * escala, y * escala, height1);
      vertex(x * escala, (y + 1) * escala, height2);
    }
    endShape();
  }

  voo -= 0.05; // Move o ruído para criar a animação
}
