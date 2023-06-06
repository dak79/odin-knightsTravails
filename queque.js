/**
 * Queque.
 * Factory for queque.
 */
export const Queque = () => {
    const queque = {}
    let rear = 0
    let front = 0

    /**
     * isEmpty.
     * Check if the queque is empty.
     * @returns {Boolean}
     */
    const isEmpty = () => rear - front <= 0

    /**
     * enqueque.
     * Add element in the back.
     * @param {} element
     */
    const enqueque = (element) => {
        queque[rear] = element
        rear++
    }

    /**
     * dequeque.
     * Remove element from front.
     * @returns {} removed element
     */
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
