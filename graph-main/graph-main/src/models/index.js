import { addConexion, bfs, shortestPath } from './controllers/script.mjs';

const rutaAInput = document.getElementById('rutaA');
const rutaBInput = document.getElementById('rutaB');
const pesoInput = document.getElementById('peso');
const addConexionButton = document.getElementById('addConexion');
const bfsButton = document.getElementById('bfs');
const shortestPathButton = document.getElementById('shortestPath');
const outputInput = document.getElementById('output');

addConexionButton.addEventListener('click', () => {
    const rutaA = rutaAInput.value;
    const rutaB = rutaBInput.value;
    const peso = parseInt(pesoInput.value);
    addConexion(rutaA, rutaB, peso);
});

bfsButton.addEventListener('click', () => {
    const callback = (val) => {
    outputInput.value = val;
};
bfs(callback);
});

shortestPathButton.addEventListener('click', () => {
    const rutaA = rutaAInput.value;
    const rutaB = rutaBInput.value;
    const shortestPath = shortestPath(rutaA, rutaB);
    outputInput.value = shortestPath.join(' -> ');
});