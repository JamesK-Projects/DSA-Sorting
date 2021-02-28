class _Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insertFirst(item){
        this.head = new _Node(item, this.head);
    }

    insertLast(item){
        if(this.head == null){
            this.insertFirst(item)
        }
        else {
            let tempNode = this.head;
            while (tempNode.next !== null){
                tempNode = tempNode.next
            }
            tempNode.next = new _Node(item, null)
        }
    }

    find(item){
        let currNode = this.head;
        if(!this.head){
            return null;
        }
        while(currNode.value !== item){
            if(currNode.next === null){
                return null;
            }
            else {
                currNode = currNode.next;
            }
        }
        return currNode;
    }

    remove(item){
        if(!this.head){
            return null;
        }
        if(this.head.value === item){
            this.head = this.head.next;
            return;
        }
        let currNode = this.head;
        let previousNode = this.head;
        while((currNode !== null) && (currNode.value !== item)){
            previousNode = currNode;
            currNode = currNode.next;
        }
        if(currNode === null){
            console.log('Item not found');
            return;
        }
        previousNode.next = currNode.next;
    }

    insertBefore(node, newItem){
        if(this.head == null){
            this.insertFirst(newItem)
        }
        else{
            let currNode = this.head;
            while(currNode.next.value !== node){
                currNode = currNode.next;
            }
            currNode.next = new _Node(newItem, currNode.next)
        }
        
    }

    insertAfter(node, newItem){
        if(this.head == null){
            this.insertFirst(newItem)
        }
        else{
            let currNode = this.head;
            while(currNode.value !== node){
                currNode = currNode.next;
            }
            currNode.next = new _Node(newItem, currNode.next)
        }
    }

    insertAt(item, position){
        if(this.head == null){
            this.insertFirst(item)
        }
        if(position === 0){
            this.insertFirst(item)
        }
        else{
            let currNode = this.head;
            let counter = 1;
            while(counter !== position-1){
                currNode = currNode.next;
                counter ++;
            }
            currNode.next = new _Node(item, currNode.next)
        }
    }
};

module.exports = LinkedList;