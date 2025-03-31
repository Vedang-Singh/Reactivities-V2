import {makeAutoObservable} from "mobx";

export default class CounterStore {
    title = 'Counter Store';
    count = 42;
    events: string[] = [
        "Initial Count is " + this.count,
    ]

    constructor() {
        makeAutoObservable(this);
    }

    // Actions
    increment = (amount = 1) => {
        this.count += amount;
        this.events.push(`Incremented by ${amount} - Count is now ${this.count}`);
    }

    decrement = (amount = 1) => {
        this.count -= amount;
        this.events.push(`Decremented by ${amount} - Count is now ${this.count}`);
    }

    // Computed Property
    get eventCount(){
        return this.events.length;
    }
}