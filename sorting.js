const LinkedList = require('./LinkedList')

// #1 Understanding Merge sort
// Given list of numbers: 21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40

// 1) What is the resulting list that will be sorted after 3 recursive calls to mergesort?
// -- 1st call: (0, 7)
// -- 2nd call: (0, 3)
// -- 3rd call: (0,1) => [21, 1]

// 2) What is the resulting list that will be sorted after 16 recursive calls to mergesort?
// -- 1st call: (0,7)
// -- 2nd call: (0,3)
// -- 3rd call: (0,1)
// -- 4th call: (0,0) => [21]
// -- 5th call: (1,1) => [1]
// -- 6th call: (2,3)
// -- 7th call: (2,2) => [26]
// -- 8th call: (3,3) => [45]
// -- 9th call: (4,7)
// -- 10th call: (4,5)
// -- 11th call: (4,4) => [29]
// -- 12th call: (5,5) => [28]
// -- 13th call: (6,7)
// -- 14th call: (6,6) => [2]
// -- 15th call: (7,7) => [9]
// -- 16th call: (8,15)
// The resulting list is from (8,15) => [16, 49, 39, 27, 43, 34, 46, 40]

// 3) What are the first two lists to be merged?
// [21] and [1]

// 4) Which two lists would be merged on the 7th merge?
// -- 1st merge: [21], [1]
// -- 2nd merge: [26], [45]
// -- 3rd merge: [29], [28]
// -- 4th merge: [2], [9]
// -- 5th merge: [1,21], [26,45]
// -- 6th merge: [28,29], [2,9]
// -- 7th merge: => [1,21,26,45], [2,9,28,29]


// #2 Understanding quicksort

// 1) After first partition step, resulting array is [3, 9, 1, 14, 17, 24, 22, 20]. What was the pivot?
// -- The pivot could have been either 14 or 17 because everything to the left of either number is less than it, and everything to 
// the right of either number is greater than it.

// 2) Given list of numbers: 14, 17, 13, 15, 19, 10, 3, 16, 9, 12. Show the resulting list after the 2nd partitioning according to the 
// quicksort algorithm A) when using the last item on the list as the pivot and B) when using the first item as the pivot
// -- A) 10,3,9,12,14,13,15,16,17,19
// -- B) 10,3,9,12,13,14,17,15,19,16


// #3 Implementing quicksort
const dataset = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5]

function qsort(arr, start = 0, end = arr.length){
    if(start >= end){
        return Array;
    }
    const middle = partition(arr, start, end);
    arr = qsort(arr, start, middle);
    arr = qsort(arr, middle + 1, end);
    return arr;
}

function partition(arr, start, end){
    const pivot = arr[end - 1];
    let j = start;
    for(let i = start; i < end - 1; i++){
        if(arr[i] <= pivot){
            swap(arr, i, j);
            j++;
        }
    }
    swap(arr, end - 1, j);
    return j;
};

function swap(arr, i, j){
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

//console.log(qsort(dataset))


// #4 Implementing merge sort
function mSort(array){
    if(array.length <= 1){
        return array;
    }
    const middle = Math.floor(array.length/2)
    let left = array.slice(0, middle)
    let right = array.slice(middle, array.length)
    left = mSort(left);
    right = mSort(right);
    return merge(left, right, array);
}

function merge(left, right, array){
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while(leftIndex < left.length && rightIndex < right.length){
        if(left[leftIndex] < right[rightIndex]){
            array[outputIndex++] = left[leftIndex++];
        }
        else{
            array[outputIndex++] = right[rightIndex++]
        }
    }
    for(let i = leftIndex; i < left.length; i++){
        array[outputIndex++] = left[i];
    }
    for(let i = rightIndex; i < right.length; i++){
        array[outputIndex++] = right[i]
    }
    return array;
}

//console.log(mSort(dataset))


// #5 Sorting a linked list using merge sort
function createLL(){
    const list = new LinkedList();
    list.insertFirst(5);
    list.insertLast(3);
    list.insertLast(1);
    list.insertLast(2);
    list.insertLast(9);
    list.insertLast(4);
    list.insertLast(7);
    list.insertLast(8);
    list.insertLast(6);

    return list.head;
}

function sortLL(head){
    console.log(head)
    if(head === null || head.next === null){
        return head;
    }

    let prev = null;
    let slow = head;
    let fast = head;

    while(fast !== null && fast.next !== null){
        fast = fast.next.next;
        prev = slow;
        slow = slow.next;
    }

    prev.next = null;

    const list1 = sortLL(head);
    const list2 = sortLL(slow);
    return merge(list1, list2)
};

function merge(list1, list2){
    const head = new LinkedList();
    let current = head;

    while(list1 !== null && list2 !== null){
        if(list1.val < list2.val){
            current.next = list1;
            list1 = list1.next;
        }
        else{
            current.next = list2;
            list2 = list2.next;
        }

        current = current.next;
    }

    current.next = (list1 === null) ? list2 : list1;

    return head.next;
}

//console.log(sortLL(createLL()))


// #6 Bucket Sort
// Assume all integers are 1 apart, the lowest is 0, and there are no repeats

const bucket = function(arr){
    let buckets = []
    
    for(let i=0;i<arr.length;i++){            
        buckets[arr[i]]=arr[i]
    }
    
    return buckets
}

let arr = [1,0,5,2,6,3,4]

//console.log(bucket(arr))


// #7 Sort in place
function shuffle(arr){
    let randomIndex = 0;
    let temp = 0;
    for(let i = 0; i < arr.length; i++){
        randomIndex = Math.floor(Math.random()*arr.length)
        temp = arr[i];
        arr[i] = arr[randomIndex];
        arr[randomIndex] = temp;
    }
    return arr
}

//console.log(shuffle(arr))


// #8 Sorting books
function bookSort(books){
    let prev1 = books[0-1]
    let prev2
    let current
    for(let i = 1; i < books.length; i++){
        current = books[i]
        console.log('current', current)
        prev2 = books[i - 1]
        console.log('previous', prev2)
        prev1 = books[i - 2]
        if(current < prev2){
            console.log('swap')
            books[i-1] = current
            books[i] = prev2
            if(prev2 > prev1){
                bookSort(books)
            }
        }
    }

    return books
}

let books = ['A book about dinosaurs', 'Harry Potter', 'Childrens book', 'Quantum physics for dummies','Book about books']

//console.log(bookSort(books))