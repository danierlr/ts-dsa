export class Queue<T extends {} | null> {
	private elems: T[] = []
	private start: number = 0
	private end: number = 0

	public enqueue(element: T){
		this.elems[this.end] = element
		this.end += 1
	}

	public dequeue(): T | undefined {
		if(this.start === this.end){
			return undefined
		}

		const element = this.elems[this.start]!

		this.start += 1

		return element
	}

	public get size(): number {
		return this.end - this.start
	}
}