//SimplestToDo //simToDo
// TODO: Paging for saved todos // DONE
// TODO: config.json file applying // DONE
// TODO: Search from saved todos
// TODO: To set dependency relations (prerequest-postrequest)
// TODO: Login to firebase
// TODO: Share todos with connected friends
// TODO: Styles out to css file

import conf from '../json/config.json' assert {type: 'json'};

let simToDo = {
    version: "2024.0.1",
    autoSaveTime: conf.autoSaveTime,
    minInputLength: conf.minInputLength,
    activeState: {
        todos: [],
        lang: 'tr',
        currentPage: 1,
        itemPerPage: conf.itemPerPage,
        maxPagingButton: conf.maxPagingButton
    },
    messageTypes: {
        message: `message`,
        error: `error`,
        success: `success`
    },
    init() {
        this.storageToState();
        this.autoSave();
        this.createAndLoadCSSFiles();
        this.createUISkeleton();
        this.createToDoElements();
        this.drawFilters();
        this.drawToDos();

    },
    storageToState() {
        if (localStorage.getItem("activeState") && localStorage.getItem("activeState") !== 'null') {
            this.activeState = JSON.parse(localStorage.getItem("activeState"));
        }
    },
    stateToStorage() {
        localStorage.setItem("activeState", JSON.stringify(this.activeState));
    },
    createAndLoadCSSFiles() {
        let defaultCSSFile = this.createElm('link', {
            rel: "stylesheet",
            href: `${conf.defaultStyleFile}`,
            type: "text/css",
            media: "all"
        });
        document.head.appendChild(defaultCSSFile);
    },
    createElm(tag, opts = {}) {
        let newElement = document.createElement(tag);
        Object.keys(opts).forEach(key => {
            newElement.setAttribute(key, opts[key]);
        })
        return newElement;
    },
    removeElm(id) {
        document.getElementById(id).remove();
    },
    reloadState() {
        if (this.activeState.todos.length) {
            this.storageToState();
        }
    },
    saveTheState() {
        this.stateToStorage();
    },
    autoSave() {
        setInterval(this.saveTheState.bind(this), this.autoSaveTime * 1000);
    },
    createUISkeleton() {
        this.targetContainer = document.querySelector(`#${conf.mainContainerId}`) ?? document.body;
        this.targetContainer.classList.add(conf.mainContainerStyleClass);
    },
    createToDoElements() {
        let toDoInputContainer = this.createElm('div');
        toDoInputContainer.id = conf.toDoInputContainerId;
        toDoInputContainer.classList.add(conf.todoInputContainerStyleClass);

        let toDoListContainer = this.createElm('div');
        toDoListContainer.id = conf.toDoListContainerId;
        toDoListContainer.classList.add(conf.toDoListContainerStyleClass);

        let headerText = this.createElm('h2');
        let toDoInputTextarea = this.createElm('textarea');
        toDoInputTextarea.id = conf.toDoInputTextareaId;
        toDoInputTextarea.classList.add(conf.todoInputTextareaStyleClass);
        let saveToDoButton = this.createElm('button');
        //

        this.targetContainer.appendChild(toDoInputContainer);
        this.targetContainer.appendChild(toDoListContainer);

        saveToDoButton.textContent = conf.textLabels[conf.defaultLang].saveButton;
        headerText.textContent = conf.textLabels[conf.defaultLang].headerText;
        toDoInputContainer.appendChild(headerText);
        toDoInputContainer.appendChild(toDoInputTextarea);
        toDoInputContainer.appendChild(saveToDoButton);
        saveToDoButton.addEventListener('click', this.prepareNewToDoObject.bind(this));
    },
    prepareNewToDoObject() {
        let toDoInputTextarea = document.getElementById(conf.toDoInputTextareaId);
        console.log(toDoInputTextarea);
        if (!toDoInputTextarea.value) {
            this.giveMessage({
                type: 'error',
                message: `ToDo input must be at least ${this.minInputLength} characters long!`
            })
        }
        let newToDoObject = {
            uuid: this.createUID(),
            body: toDoInputTextarea.value,
            created: Date.now(),
            updated: Date.now(),
            dependencies: [],
            done: false
        }
        console.log(newToDoObject);
        this.saveNewToDo(newToDoObject);
    },
    saveNewToDo(newToDo) {
        console.log(newToDo);
        this.activeState.todos.push(newToDo);
        this.clearToDoInput();
        this.drawToDos();
        this.stateToStorage();
    },
    clearToDoInput() {
        console.log(conf.toDoInputTextareaId)
        document.getElementById(conf.toDoInputTextareaId).value = '';
    },
    drawFilters() {
        let filterOptionsContainer = this.createFilterOptionsContainer(conf.filterContainerId);

    },
    drawToDos(pageNo = 1) {
        let toDoListContainer = document.getElementById(conf.toDoListContainerId);
        toDoListContainer.classList.add(conf.toDoListContainerStyleClass);
        let firstItemIndex = (pageNo - 1) * this.activeState.itemPerPage;
        let lastItemIndex = (pageNo * this.activeState.itemPerPage) - 1;
        lastItemIndex = (lastItemIndex < this.activeState.todos.length) ? lastItemIndex : this.activeState.todos.length - 1;

        let sortedToDoList = this.activeState.todos.sort((a, b) => b.created - a.created);
        //let filteredToDoList = sortedToDoList.filter(item=>{});
        // TODO: burada  listeyi lastList seklinde asagidaki fonksiyonlara sunmaliyiz, ister sorted olsun ister filtered.
        let printToDo = (indexNo) => {
            let theToDo = sortedToDoList[indexNo];
            let todoBox = this.createElm('div');
            let readableDateData = this.createReadableDate(theToDo.created);
            let theCheckBox = this.createElm('input');
            theCheckBox.value = theToDo.uuid;
            theCheckBox.type = "checkbox";
            theCheckBox.checked = theToDo.done.toString() === `true`;
            theCheckBox.addEventListener("click", () => {
                this.updateToDo({uuid: theToDo.uuid, job: 'update', data: {done: theCheckBox.checked}})
            })
            todoBox.classList.add(conf.toDoBoxInListStyleClass);
            todoBox.innerHTML += theToDo.body;
            todoBox.innerHTML += '<br>indexNO: ' + indexNo;
            todoBox.innerHTML += '<br>UUID: ' + theToDo.uuid;
            todoBox.innerHTML += '<br>Created: ' + readableDateData;
            todoBox.innerHTML += '<br>Done:';
            todoBox.appendChild(theCheckBox);
            toDoListContainer.appendChild(todoBox);
        }
        toDoListContainer.innerHTML = '';
        toDoListContainer.innerHTML += `<span style="font-weight: bold">TOTAL ENTRIES: ${this.activeState.todos.length.toString()}</span>`;

        for (let j = firstItemIndex; j <= lastItemIndex; j++) {
            printToDo(j);
        }
        let pagingButtonElements = this.createPagination({currentPageNo: pageNo})
        toDoListContainer.insertAdjacentElement('afterbegin', pagingButtonElements);
    },
    updateToDo(command = {uuid: '', job: 'show', data: {}}) {
        if (!command.uuid) {
            this.giveMessage({type: this.activeState.messageTypes.error, message: 'No uuid provided!'});
            return false;
        }
        switch (command.job) {
            case 'show':
                break;
            case 'update':
                //console.log(command);
                let theTargetIndex = this.activeState.todos.findIndex(todo => todo.uuid === command.uuid);
                Object.entries(command.data).forEach(([k, v]) => {
                    //console.log(this.activeState.todos[theTargetIndex][k]);
                    this.activeState.todos[theTargetIndex][k] = v;
                    //console.log(this.activeState.todos[theTargetIndex][k]);
                })
                this.activeState.todos[theTargetIndex].updated = Date.now();
                this.saveTheState();
                //console.table(JSON.parse(localStorage.activeState).todos)
                break;

        }
    },
    createFilterOptionsContainer() {
        let filterOptionsContainer = this.createElm('div');
        let titleSpan = this.createElm('div');
        titleSpan.textContent = `Filter ToDos:`;
        let filterTypeTitle = this.createElm('span');
        filterTypeTitle.id = 'filterTypeTitle';
        titleSpan.appendChild(filterTypeTitle);
        filterOptionsContainer.appendChild(titleSpan);

        let typeRangeInput = this.createElm('input');
        let filterData = {all: "All", done: "Done", notYet: "Not Yet"};
        let typeList = this.createElm('datalist');
        typeList.id = 'filterValues';
        Object.keys(filterData).forEach(key => {
            let newOption = new Option(key, filterData[key]);
            newOption.label = filterData[key];
            typeList.appendChild(newOption);
        })
        typeRangeInput.type = 'range';

        typeRangeInput.id = 'typeRangeInput';
        typeRangeInput.min = 0;
        typeRangeInput.max = Object.keys(filterData).length - 1;
        typeRangeInput.step = 1;
        typeRangeInput.setAttribute('list', 'filterValues');
        typeRangeInput.value = Object.keys(filterData)[0];
        typeRangeInput.addEventListener('change', () => {
            document.querySelector('#filterTypeTitle').textContent = Object.values(filterData)[typeRangeInput.value];
        });


        filterOptionsContainer.appendChild(typeRangeInput);
        filterOptionsContainer.appendChild(typeList);


        return filterOptionsContainer;
    },
    createPagination(conf = {currentPageNo: 1}) {
        let paginationContainer = this.createElm('div');
        let firstPageNo = 1;
        if (conf.currentPageNo > Math.floor(this.activeState.maxPagingButton / 2)) {
            firstPageNo = conf.currentPageNo - Math.floor(this.activeState.maxPagingButton / 2);
        }
        let lastPageNo = firstPageNo + this.activeState.maxPagingButton - 1;
        if (lastPageNo > Math.ceil(this.activeState.todos.length / this.activeState.itemPerPage)) {
            lastPageNo = Math.ceil(this.activeState.todos.length / this.activeState.itemPerPage);
        }

        for (let pageNo = firstPageNo; pageNo <= lastPageNo; pageNo++) {
            let newPageButton = this.createElm('button');
            newPageButton.addEventListener('click', () => {
                this.drawToDos(pageNo)
            })
            newPageButton.textContent = pageNo;
            paginationContainer.appendChild(newPageButton);
        }

        return paginationContainer
    },
    createReadableDate(mSeconds) {
        let theDate = new Date(mSeconds);
        return this.addTo2Digit(theDate.getUTCMonth() + 1) + '.' + this.addTo2Digit(theDate.getUTCDay()) + '.' + theDate.getUTCFullYear();
    },
    addTo2Digit(input) {
        return (input < 10) ? `0${input.toString()}` : input.toString();
    },
    createUID() {
        let uuid = self.crypto.randomUUID();
        while (this.activeState.todos.filter(todo => todo.uuid === uuid).length > 0) {
            uuid = self.crypto.randomUUID();
        }
        return uuid;
    },
    giveMessage(messageObject = {type: 'message', message: 'Alright!'}) {
        switch (messageObject.type) {
            case 'message':
                console.log(messageObject.message);
                break;
            case 'error':
                console.log(messageObject.message);
                alert(messageObject.message);
                break;
            case 'success':
                console.log(messageObject.success);
                break;
        }
    }


};

window.addEventListener('DOMContentLoaded', () => {
    simToDo.init();
})
