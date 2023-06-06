export const Queque = () => {
    const queque = {}
    let rear = 0
    let front = 0

    const isEmpty = () => rear - front <= 0

    const enqueque = (element) => {
        queque[rear] = element
        rear++
    }

    const dequeque = () => {
        const element = queque[front]
        delete queque[front]
        front++
        if (isEmpty()) {
            front = 0
            rear = 0
        }
        return element
    }

    return {
        isEmpty,
        enqueque,
        dequeque
    }
}
