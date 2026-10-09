let musicas = [
    {titulo: 'Música do JJ', artista: '????', src:'musics/MÚSICA QUE JJ USAR NO FINAL DOS VÍDEOS 🎵. [b4Fdpl5g5ys].mp3', img:'https://i.ytimg.com/vi/b4Fdpl5g5ys/hqdefault.jpg?sqp=-oaymwEnCPYBEIoBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAj1tDcRkpf1f6HRPT-1gwnUNdOrA'},
    {titulo: 'Ghost Of Andromeda', artista: 'Blue Deer Studio', src:'musics/Ghost Of Andromeda - Blue Deer Studio.mp3', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmr5lYHiDcULVOK9eNUkfTlzXgVwyOA18KsrgnfK1Blq3KsC4c3UVmz_ni&s=10'},
    {titulo: 'Push Thru', artista: 'The Grey Room', src:'musics/Push Thru - The Grey Room _ Golden Palms.mp3', img:'https://i.pinimg.com/1200x/19/37/c6/1937c631f87b36cdab243f6fe4d0bc07.jpg'},
    {titulo: 'Aquatic Ambience', artista: 'Donkey Kong Country', src:'musics/Donkey Kong Country - Aquatic Ambience [Restored] [-5rAjOjTGtc].mp3', img:'https://i.pinimg.com/736x/a9/fe/a4/a9fea4d027cbfbf211ee5e5bdb13eabb.jpg'}
];



let musica = document.querySelector('audio');
let indexMusica = 0;

let containerBarra = document.querySelector('.barra')
let arrastando = false;

function pularPara(e) {
    let retangulo = containerBarra.getBoundingClientRect();
    let proporcao = (e.clientX - retangulo.left) / retangulo.width;
    proporcao = Math.max(0, Math.min(1, proporcao));
    musica.currentTime = proporcao * musica.duration;
}

containerBarra.addEventListener('mousedown', (e) => {
    arrastando = true;
    pularPara(e);
});

document.addEventListener('mousemove', (e) => {
    if (arrastando) pularPara(e);
});
document.addEventListener('mouseup', () => {
    arrastando = false;
});


let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('.img');
let nomeMusica = document.querySelector('.musicName')
let nomeArtista = document.querySelector('.singerName')


/* duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));    */

// eventos 

document.querySelector('.botaoPlay').addEventListener('click', tocarMusica)

document.querySelector('.botaoPause').addEventListener('click', pausarMusica)

musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = 3;
    }
        
    renderizarMusica(indexMusica);
});

document.querySelector('.proximo').addEventListener('click', () => {
    indexMusica++;
    if (indexMusica > 3) {
        indexMusica = 0
    }
    renderizarMusica(indexMusica);
});

//funcoes


function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));   
    });
}

function tocarMusica() {
    musica.play();
    document.querySelector('.botaoPause').style.display = 'block';
    document.querySelector('.botaoPlay').style.display = 'none';
}

function pausarMusica() {
    musica.pause();
    document.querySelector('.botaoPause').style.display = 'none';
    document.querySelector('.botaoPlay').style.display = 'block';   
}

function atualizarBarra() {
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos) {
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10){
        campoSegundos = '0' + campoSegundos;
    }

    return campoMinutos+ ':' +campoSegundos;
}
