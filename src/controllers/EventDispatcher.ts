export class EventDispatcher {

    private listeners: Function[] = [];

    public addListener(listener: Function) {
        for (let item of this.listeners) {
            if (item === listener) {
                return;
            }
        }

        this.listeners.push(listener);
    }


    public removeListener(listener: Function) {
        for (let i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i] === listener) {
                this.listeners.splice(i, 1);
                return;
            }
        }
    }

    public dispatch(event?: any) {
        for (let item of this.listeners) {
            item(event);
        }
    }
}