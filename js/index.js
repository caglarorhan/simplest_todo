//SimplestToDo //simToDo
// TODO: Paging for saved todos // DONE
// TODO: config.json file applying // DONE
// TODO: save filter parameters // DONE
// TODO: Search from saved todos // DONE
// TODO: Add estimated completing date and time to TODOs
// TODO: To set dependency relations (prerequest-postrequest)
// TODO: Login with & Save to firebase
// TODO: Share todos with connected friends or assign todos to them
// TODO: Styles out to css file // DONE

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
    filterParameters: {},
    init() {
        this.storageToState();
        this.autoSave();
        this.createAndLoadCSSFiles();
        this.createUISkeleton();
        this.createToDoElements();
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

    },
    createToDoElements() {
        let containersObj = {};
        let toDoInputContainer = this.createElm('div');
        toDoInputContainer.id = conf.toDoInputContainerId;
        containersObj["toDoInputContainer"]=toDoInputContainer;
        toDoInputContainer.classList.add(conf.todoInputContainerStyleClass);

        let toDoFilterContainer = this.createFilterOptionsContainer();
        toDoFilterContainer.id = conf.toDoFilterContainerId;
        containersObj["toDoFilterContainer"]=toDoFilterContainer;
        toDoFilterContainer.classList.add(conf.toDoFilterContainerStyleClass)

        let toDoSearchContainer = this.createSearchContainer();
        toDoSearchContainer.id = conf.toDoSearchContainerId;
        containersObj["toDoSearchContainer"]=toDoSearchContainer;
        toDoSearchContainer.classList.add(conf.toDoSearchContainerStyleClass);

        let toDoListContainer = this.createElm('div');
        toDoListContainer.id = conf.toDoListContainerId;
        containersObj["toDoListContainer"]=toDoListContainer;
        toDoListContainer.classList.add(conf.toDoListContainerStyleClass);

        let headerText = this.createElm('h2');
        let toDoInputTextarea = this.createElm('textarea');
        let toDoDateTimeInput = this.createElm('input');
        toDoDateTimeInput.id = conf.toDoDateTimeInputId;
        toDoDateTimeInput.type = "datetime-local";
        toDoInputTextarea.id = conf.toDoInputTextareaId;
        toDoInputTextarea.classList.add(conf.todoInputTextareaStyleClass);
        let saveToDoButton = this.createElm('button');
        //
        let toDoDependencyTree = this.createElm('div');
        toDoDependencyTree.id = conf.toDoDependencyTreeId;
        containersObj["toDoDependencyTree"]=toDoDependencyTree;
        toDoDependencyTree.classList.add(conf.toDoDependencyTreeStyleClass);
        toDoDependencyTree.innerHTML='The DependencyTree';

        if(conf.ui_container_structure.isTargetIntegrated.toString()==="true"){
            this.targetContainer = document.querySelector(`#${conf.mainContainerId}`) ?? document.body;
            this.targetContainer.classList.add(conf.mainContainerStyleClass);
            Object.keys(containersObj).forEach(key=>{
                this.targetContainer.appendChild(containersObj[key])
            })
        }else{
            let uiStructure = conf.ui_container_structure.ui_structure;
            console.log(uiStructure);
            console.log(containersObj);
            Object.keys(uiStructure).forEach(key=>{
                if(!document.getElementById(uiStructure[key])){
                    console.log(`The id of ${uiStructure[key]} couldn't found in the page`)
                }else{
                    console.log(containersObj[key]);
                    document.getElementById(uiStructure[key]).appendChild(containersObj[key])
                }

            })

        }


        saveToDoButton.textContent = conf.textLabels[conf.defaultLang].saveButton;
        headerText.textContent = conf.textLabels[conf.defaultLang].headerText;
        toDoInputContainer.appendChild(headerText);
        toDoInputContainer.appendChild(toDoInputTextarea);
        toDoInputContainer.appendChild(this.createElm('br'));
        toDoInputContainer.appendChild(toDoDateTimeInput);
        toDoInputContainer.appendChild(saveToDoButton);
        saveToDoButton.addEventListener('click', this.prepareNewToDoObject.bind(this));
    },
    prepareNewToDoObject() {
        let toDoInputTextarea = document.getElementById(conf.toDoInputTextareaId);
        console.log(toDoInputTextarea);
        if (!toDoInputTextarea.value || toDoInputTextarea.value.length<this.minInputLength) {
            this.giveMessage({
                type: 'error',
                message: `ToDo input must be at least ${this.minInputLength} characters long!`
            })
            toDoInputTextarea.focus();
            return false;
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
    updateFilters(filterUpdateObj = {}) {
        Object.keys(filterUpdateObj).forEach(key => {
            this.filterParameters[key] = filterUpdateObj[key];
        })
        this.drawToDos(1, this.filterParameters);
    },
    drawToDos(pageNo = 1, filterParams = {}) {
        console.log(filterParams);
        let toDoListContainer = document.getElementById(conf.toDoListContainerId);
        toDoListContainer.classList.add(conf.toDoListContainerStyleClass);
        let firstItemIndex = (pageNo - 1) * this.activeState.itemPerPage;
        let lastItemIndex = (pageNo * this.activeState.itemPerPage) - 1;
        let toDos = this.activeState.todos;

        let sortedToDoList = toDos.sort((a, b) => b.created - a.created);

        if (Object.keys(filterParams).length) {
            sortedToDoList = sortedToDoList.filter(item => {
                let result = true;
                Object.keys(filterParams).forEach(paramKey => {
                    if(filterParams[paramKey]!==null){
                        if (!(item[paramKey].toString().includes(filterParams[paramKey].toString()))) {
                            result = false;
                        }
                    }
                })
                return result;
            });

        }
        let sortedToDoListLength = sortedToDoList.length;
        lastItemIndex = (lastItemIndex < sortedToDoListLength) ? lastItemIndex : sortedToDoListLength - 1;

        toDoListContainer.innerHTML = '';
        toDoListContainer.innerHTML += `<span style="font-weight: bold">TOTAL ENTRIES: ${sortedToDoListLength.toString()}</span>`;

        for (let j = firstItemIndex; j <= lastItemIndex; j++) {
            let newToDoBox = this.printToDo({theToDo:sortedToDoList[j], rules:{update:true, dependencyButton:true}});
            toDoListContainer.appendChild(newToDoBox);
        }
        let pagingButtonElements = this.createPagination({currentPageNo: pageNo, toDoCount: sortedToDoListLength})
        toDoListContainer.insertAdjacentElement('afterbegin', pagingButtonElements);
    },
    getDependencyTree(targetToDoObject){
        let dependencyTree = document.getElementById(conf.toDoDependencyTreeId);
        dependencyTree.innerHTML='';
        dependencyTree.append(this.printToDo({theToDo:targetToDoObject, rules:{}}));
    },
    printToDo(toDoJob={}){
        let theToDo = toDoJob.theToDo;
        let toDoBox = this.createElm('div');
        let readableDateData = this.createReadableDate(theToDo.created);

        toDoBox.classList.add(conf.toDoBoxInListStyleClass);
        toDoBox.innerHTML += theToDo.body;
        toDoBox.innerHTML += '<br>UUID: ' + theToDo.uuid;
        toDoBox.innerHTML += '<br>Dependencies: ' + theToDo.dependencies.toString();
        toDoBox.innerHTML += '<br>Created: ' + readableDateData;
        toDoBox.innerHTML += `<br>Is it done: ${theToDo.done.toString() === `true` ? " done" : "not yet"}`

        if(toDoJob.rules.update){
            toDoBox.innerHTML += '<br>Done:';
            let theCheckBox = this.createElm('input');
            theCheckBox.value = theToDo.uuid;
            theCheckBox.type = "checkbox";
            theCheckBox.checked = theToDo.done.toString() === `true`;
            theCheckBox.addEventListener("click", () => {
                this.updateToDo({uuid: theToDo.uuid, job: 'update', data: {done: theCheckBox.checked}})
            })
            toDoBox.appendChild(theCheckBox);
        }

        if(toDoJob.rules.dependencyButton){
            let dependButton = this.createElm('button');
            dependButton.textContent='Dependency';
            dependButton.style.float='right';
            dependButton.addEventListener("click", () => {
                this.getDependencyTree(theToDo);
            })
            toDoBox.appendChild(dependButton);
        }

        return toDoBox;
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
        typeRangeInput.value = 0;
        typeRangeInput.addEventListener('change', () => {
            document.querySelector('#filterTypeTitle').textContent = Object.values(filterData)[typeRangeInput.value];
            let filterSelection = Object.keys(filterData)[typeRangeInput.value];
            let filterUpdateObj = {};
            switch (filterSelection) {
                case "done":
                    filterUpdateObj.done = true;
                    break;
                case "notYet":
                    filterUpdateObj.done = false;
                    break;
                default:
                    filterUpdateObj.done = null;
            }
            this.updateFilters(filterUpdateObj);
        });


        filterOptionsContainer.appendChild(typeRangeInput);
        filterOptionsContainer.appendChild(typeList);


        return filterOptionsContainer;
    },
    createSearchContainer(){
        let searchContainer = this.createElm('div');
        let title = this.createElm('span');
        title.textContent = conf.textLabels[conf.defaultLang].searchTitle;

        let searchInput = this.createElm('input');
        searchInput.setAttribute('type', 'search');
        searchInput.addEventListener('input',()=>{
            console.log(searchInput.value);
            let filterUpdateObj = {body: searchInput.value};
            this.updateFilters(filterUpdateObj);
        })

        searchContainer.appendChild(title);
        searchContainer.appendChild(searchInput);
        return searchContainer;
    },
    createPagination(pagingParamObj = {currentPageNo: 1, toDoCount: this.activeState.todos.length}) {
        let paginationContainer = this.createElm('div');
        let firstPageNo = 1;
        if (pagingParamObj.currentPageNo > Math.floor(this.activeState.maxPagingButton / 2)) {
            firstPageNo = pagingParamObj.currentPageNo - Math.floor(this.activeState.maxPagingButton / 2);
        }
        let lastPageNo = firstPageNo + this.activeState.maxPagingButton - 1;
        if (lastPageNo > Math.ceil(pagingParamObj.toDoCount / this.activeState.itemPerPage)) {
            lastPageNo = Math.ceil(pagingParamObj.toDoCount / this.activeState.itemPerPage);
        }

        for (let pageNo = firstPageNo; pageNo <= lastPageNo; pageNo++) {
            let newPageButton = this.createElm('button');
            newPageButton.addEventListener('click', () => {
                this.drawToDos(pageNo, this.filterParameters)
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
