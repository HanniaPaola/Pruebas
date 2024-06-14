import LinkedList from "./LinkedList.mjs";
import Rutas from "./Rutas.js";

export default class Graph {
    #matrizAdyacencia = []
    #listaAdyacencia = new Map()
    #map = new Map()

    constructor() {}

    addVertices(...vertices) {
        for (let value of vertices) {
            this.#matrizAdyacencia.push([])
            this.#map.set(value, this.#matrizAdyacencia.length - 1)
            this.#listaAdyacencia.set(value, new LinkedList())
        }
    }

    addV(value) {
        this.#matrizAdyacencia.push([])
        this.#map.set(value, this.#matrizAdyacencia.length - 1)
        this.#listaAdyacencia.set(value, new LinkedList())
    }

    addConexion(start, end, weight = 1) {
        if (this.#map.has(start) && this.#map.has(end)) {
            this.#matrizAdyacencia[this.#map.get(start)][this.#map.get(end)] = weight
            this.#listaAdyacencia.get(start).push(new Rutas(end, weight))
            return true
        }
        return false
    }

    bfs(callback) {
        let queue = []
        let list = []
        const entries = [...structuredClone(this.#map)]
        for (let i = 0; i < this.#matrizAdyacencia.length; i++)
            list[i] = false

        let [key] = entries[0]
        queue.push(key)

        while (queue.length > 0) {
            let val = queue.shift() //Sacamos el primer elemento de la cola
            callback(val) //Imprimimos el valor
            list[this.#map.get(val)] = true //Marcamos de visitado
            for (let i = 0; i < this.#matrizAdyacencia[this.#map.get(val)].length; i++) {
                if (this.#matrizAdyacencia[this.#map.get(val)][i]) {
                    let [key] = entries[i]
                    if (!list[this.#map.get(key)] && !queue.includes(key))
                        queue.push(key) //Agregamos los vecinos a la cola
                }
            }
        }
    }

    dfs(start) {
        const visited = new Set()
        const result = []

        const dfsHelper = (vertex) => {
            if (!vertex) return
            visited.add(vertex)
            result.push(vertex)

            for (const neighbor of this.#listaAdyacencia.get(vertex)) {
                if (!visited.has(neighbor.name)) {
                    dfsHelper(neighbor.name)
                }
            }
        }

        dfsHelper(start)
        return result
    }

    shortestPath(start, end) {
        const distances = {}
        const previous = {}
        const queue = []

        this.#listaAdyacencia.forEach((_, vertex) => {
            distances[vertex] = Infinity
            previous[vertex] = null
            queue.push(vertex)
        })

        distances[start] = 0

        while (queue.length) {
            const current = queue.sort((a, b) => distances[a] - distances[b]).shift()

            if (current === end) {
                const path = []
                let step = current
                while (step) {
                    path.push(step)
                    step = previous[step]
                }
                return path.reverse()
            }

            for (const neighbor of this.#listaAdyacencia.get(current)) {
                const distance = distances[current] + neighbor.distance
                if (distance < distances[neighbor.name]) {
                    distances[neighbor.name] = distance
                    previous[neighbor.name] = current
                }
            }
        }

        return null
    }
}

