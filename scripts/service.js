// // logics of CRUD operations

// const todoOperations = {
//     tasks:[],
//     getTotal(){
//         return this.tasks.length;
//     },
//     addTask(task){
//         task.isMarked = false;
//         this.tasks.push(task);
//     },
//     toggleTask(id){
//         const taskObject = this.tasks.find(task => task.id === id);
//         taskObject.isMarked = !taskObject.isMarked;
//     },
//     markCount(){
//         return this.tasks.filter(task => task.isMarked).length;
//     },
//     unmarkCount(){
//         return this.tasks.length - this.markCount();
//     },
//     removeTask(){
//         this.tasks = this.tasks.filter(task => !task.isMarked);
//     },
//     searchTask(){

//     },
//     updateTask(){
        
//     },
//     sortTask(){

//     }
// }

// export default todoOperations;




// const todoOperations = {
//     tasks: [],
    
//     addTask(task) {
//         task.isMarked = false;
//         this.tasks.push(task);
//     },

//     getTotal() {
//         return this.tasks.length;
//     },

//     toggleTask(id) {
//         const task = this.tasks.find(task => task.id == id);
//         if (task) task.isMarked = !task.isMarked;
//     },

//     markCount() {
//         return this.tasks.filter(task => task.isMarked).length;
//     },

//     unmarkCount() {
//         return this.tasks.length - this.markCount();
//     },

//     removeTask() {
//         this.tasks = this.tasks.filter(task => !task.isMarked);
//     },

//     updateTask(updatedTask) {
//         const index = this.tasks.findIndex(task => task.id == updatedTask.id);
//         if (index !== -1) {
//             this.tasks[index] = { ...this.tasks[index], ...updatedTask };
//         }
//     },

//     searchTask(keyword) {
//         return this.tasks.filter(task =>
//             task.name.toLowerCase().includes(keyword.toLowerCase()) ||
//             task.desc.toLowerCase().includes(keyword.toLowerCase())
//         );
//     }
// };

// export default todoOperations;



const todoOperations = {
    tasks: [],

    addTask(task) {
        task.isMarked = false;
        this.tasks.push(task);
    },

    toggleTask(id) {
        const task = this.tasks.find(task => task.id == id);
        if (task) task.isMarked = !task.isMarked;
    },

    markCount() {
        return this.tasks.filter(task => task.isMarked).length;
    },

    unmarkCount() {
        return this.tasks.length - this.markCount();
    },

    getTotal() {
        return this.tasks.length;
    },

    removeTask() {
        this.tasks = this.tasks.filter(task => !task.isMarked);
    },

    updateTask(updatedTask) {
        const index = this.tasks.findIndex(task => task.id == updatedTask.id);
        if (index !== -1) {
            this.tasks[index] = { ...this.tasks[index], ...updatedTask };
        }
    },

    sortTask(field, asc = true) {
        this.tasks.sort((a, b) => {
            if (field === 'date') {
                return asc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
            }
            return asc
                ? a[field].localeCompare(b[field])
                : b[field].localeCompare(a[field]);
        });
    },

    saveToStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    searchTask(keyword) {
    return this.tasks.filter(task =>
        task.name.toLowerCase().includes(keyword.toLowerCase()) ||
        task.desc.toLowerCase().includes(keyword.toLowerCase())
    );
},

    loadFromStorage() {
        const data = localStorage.getItem('tasks');
        if (data) {
            this.tasks = JSON.parse(data);
        }
    }
};

export default todoOperations;
