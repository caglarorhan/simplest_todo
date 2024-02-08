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
// TODO: Material type dependency adding
// TODO: Visual representation of dependency relations
// TODO: Remove dependency relations

import conf from '../json/config.json' assert {type: 'json'};

let simToDo = {
    name: 'SimplestToDo',
    version: "2024.0.2",
    autoSaveTime: conf.autoSaveTime,
    minInputLength: conf.minInputLength,
    timeLineDayLengthBack: 15,
    timeLineDayLengthForth: 15,
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
    dependencyTypes:{
        todo:"todo", // {dependencyType: "todo", uuid: string}
        material:"material" // {dependencyType: "material", obtained: boolean}
    },
    materialTypes: [
        { typeName: "Groceries", values: [{materialName:'Roman tomato', unit:'kg', amount:1},{materialName:'Beef tomato', unit:'kg', amount:1},{materialName:'Grape tomato', unit:'kg', amount:1}]},
        { typeName: "Household Supplies", values: [] },
        { typeName: "Personal Care", values: [] },
        { typeName: "Home Maintenance", values: [] },
        { typeName: "Office/Work Supplies", values: [] },
        { typeName: "Clothing and Accessories", values: [] },
        { typeName: "Technology and Electronics", values: [] },
        { typeName: "Home Decor", values: [] },
        { typeName: "Health and Wellness", values: [] },
        { typeName: "Pet Supplies", values: [] },
        { typeName: "Uncategorized", values: [] }
    ],
        materialUnits: [
            { unitName: "Bag", shortHand: "bag" },
            { unitName: "Bar", shortHand: "bar" },
            { unitName: "Bottle", shortHand: "bt" },
            { unitName: "Box", shortHand: "box" },
            { unitName: "Bundle", shortHand: "bdl" },
            { unitName: "Bunch", shortHand: "bch" },
            { unitName: "Bowl", shortHand: "bw" },
            { unitName: "Can", shortHand: "cn" },
            { unitName: "Carton", shortHand: "ctn" },
            { unitName: "Case", shortHand: "cs" },
            { unitName: "Centimeter", shortHand: "cm" },
            { unitName: "Crate", shortHand: "crt" },
            { unitName: "Cup", shortHand: "cp" },
            { unitName: "Cylinder", shortHand: "cyl" },
            { unitName: "Doily", shortHand: "doz" },
            { unitName: "Dozen", shortHand: "dz" },
            { unitName: "Each", shortHand: "ea" },
            { unitName: "Gram", shortHand: "gr" },
            { unitName: "Gallon", shortHand: "gal" },
            { unitName: "Inch", shortHand: "in" },
            { unitName: "Jar", shortHand: "jr" },
            { unitName: "Kilogram", shortHand: "kg" },
            { unitName: "Libre", shortHand: "lb" },
            { unitName: "Meter", shortHand: "m" },
            { unitName: "Oz", shortHand: "oz" },
            { unitName: "Packet", shortHand: "pkt" },
            { unitName: "Piece", shortHand: "pc" },
            { unitName: "Pint", shortHand: "pt" },
            { unitName: "Pound", shortHand: "lb" },
            { unitName: "Quart", shortHand: "qt" },
            { unitName: "Roll", shortHand: "rl" },
            { unitName: "Sachet", shortHand: "sacht" },
            { unitName: "Scoop", shortHand: "sc" },
            { unitName: "Slice", shortHand: "sl" },
            { unitName: "Stick", shortHand: "stk" },
            { unitName: "Tray", shortHand: "tr" },
        ],
    filterParameters: {},
    init() {
        document.title=`${this.name} : ${this.version}`;
        this.storageToState();
        this.autoSave();
        this.createAndLoadCSSFiles();
        this.createToDoElements();
        this.createTimeLine();
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

        let toDoTimeLineContainer = this.createElm('div');
        toDoTimeLineContainer.id = conf.toDoTimeLineContainerId;
        containersObj["toDoTimeLineContainer"]=toDoTimeLineContainer;
        toDoTimeLineContainer.classList.add(conf.toDoTimeLineContainerStyleClass);


        let headerText = this.createElm('h2');
        let toDoInputTextarea = this.createElm('textarea');
        let toDoDateTimeInputTitle = this.createElm('span');
        toDoDateTimeInputTitle.textContent = conf.textLabels[conf.defaultLang].intendedDateTitle
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
            //console.log(uiStructure);
            //console.log(containersObj);
            Object.keys(uiStructure).forEach(key=>{
                if(!document.getElementById(uiStructure[key])){
                    console.log(`The id of ${uiStructure[key]} couldn't found in the page`)
                }else{
                   // console.log(containersObj[key]);
                    document.getElementById(uiStructure[key]).appendChild(containersObj[key])
                }

            })

        }

        saveToDoButton.textContent = conf.textLabels[conf.defaultLang].saveButton;
        headerText.textContent = conf.textLabels[conf.defaultLang].headerText;
        toDoInputContainer.appendChild(headerText);
        toDoInputContainer.appendChild(toDoInputTextarea);
        toDoInputContainer.appendChild(this.createElm('br'));
        toDoInputContainer.appendChild(toDoDateTimeInputTitle);
        toDoInputContainer.appendChild(toDoDateTimeInput);
        toDoInputContainer.appendChild(saveToDoButton);
        saveToDoButton.addEventListener('click', this.prepareNewToDoObject.bind(this));
    },
    prepareNewToDoObject() {
        let toDoInputTextarea = document.getElementById(conf.toDoInputTextareaId);
        //console.log(toDoInputTextarea);
        let toDoDateTimeInput = document.getElementById(conf.toDoDateTimeInputId);
        if (!toDoInputTextarea.value || toDoInputTextarea.value.length<this.minInputLength) {
            this.giveMessage({
                type: 'error',
                message: `ToDo input must be at least ${this.minInputLength} characters long!`
            })
            toDoInputTextarea.focus();
            return false;
        }
        if(!toDoDateTimeInput.value){
            this.giveMessage({
                type: 'error',
                message: `ToDo date-time must be entered!`
            })
            toDoDateTimeInput.focus();
            return false;
        }
        let newToDoObject = {
            uuid: this.createUID(),
            body: toDoInputTextarea.value,
            intended: (new Date(toDoDateTimeInput.value)).getTime(),
            created: Date.now(),
            updated: Date.now(),
            dependencies: [],
            done: false
        }
        //console.log(newToDoObject);
        this.saveNewToDo(newToDoObject);
    },
    saveNewToDo(newToDo) {
        //console.log(newToDo);
        this.activeState.todos.push(newToDo);
        this.clearToDoInputs();
        this.drawToDos();
        this.stateToStorage();
    },
    clearToDoInputs() {
        //console.log(conf.toDoInputTextareaId)
        document.getElementById(conf.toDoDateTimeInputId).value ='';
        document.getElementById(conf.toDoInputTextareaId).value = '';
        document.getElementById(conf.toDoInputTextareaId).focus();
    },
    updateFilters(filterUpdateObj = {}) {
        Object.keys(filterUpdateObj).forEach(key => {
            this.filterParameters[key] = filterUpdateObj[key];
        })
        this.drawToDos(1, this.filterParameters);
    },
    drawToDos(pageNo = 1, filterParams = {}) {
        //console.log(filterParams);
        let toDoListContainer = document.getElementById(conf.toDoListContainerId);
        toDoListContainer.classList.add(conf.toDoListContainerStyleClass);
        let firstItemIndex = (pageNo - 1) * this.activeState.itemPerPage;
        let lastItemIndex = (pageNo * this.activeState.itemPerPage) - 1;
        let toDos = this.activeState.todos;

        let sortedToDoList = toDos.sort((a, b) => b.created - a.created);
        sortedToDoList = this.filterTheList({filterParams: filterParams, theList: sortedToDoList});
        //console.log(sortedToDoList);

        let sortedToDoListLength = sortedToDoList.length;
        lastItemIndex = (lastItemIndex < sortedToDoListLength) ? lastItemIndex : sortedToDoListLength - 1;

        toDoListContainer.innerHTML = '';
        toDoListContainer.innerHTML += `<span style="font-weight: bold">${conf.textLabels[conf.defaultLang].totalEntriesTitle} ${sortedToDoListLength.toString()}</span>`;

        //console.log(`First item index: ${firstItemIndex}, last item index: ${lastItemIndex}`)
        for (let j = firstItemIndex; j <= lastItemIndex; j++) {
            let newToDoBox = this.printToDo({theToDo:sortedToDoList[j], rules:{update:true, dependencyButton:true, draggable:true}});
            //console.log(newToDoBox);
            toDoListContainer.appendChild(newToDoBox);
        }
        let pagingButtonElements = this.createPagination({currentPageNo: pageNo, toDoCount: sortedToDoListLength})
        toDoListContainer.insertAdjacentElement('afterbegin', pagingButtonElements);
    },
    getDependencyTree(targetToDoObject){
        let dependencyTree = document.getElementById(conf.toDoDependencyTreeId);
        dependencyTree.innerHTML='';
        let theToDoBox = this.printToDo({theToDo:targetToDoObject, rules:{treeNodeMode:true, draggable:true, droppable:true}})
        dependencyTree.append(theToDoBox);

    },
    getCoordinationData(element){
        let rect = element.getBoundingClientRect();
        return {
                    top: rect.top,
                    bottom: rect.bottom,
                    left: rect.left,
                    right: rect.right,
                    width: rect.width,
                    height: rect.height
                }
    },
    printToDo(toDoJob={}){
        /*
        toDoJob.rules = {
        update: // if updatable
        dependencyButton: // id can be used to add some dependency
        treeNodeMode: //if open to be in a treeMode
        draggable: // if it can be dragged
        droppable: if you can drop something
        }

         */
        let theToDo = toDoJob.theToDo;
        console.log(toDoJob);
        console.log(toDoJob.rules);
        let toDoBox = this.createElm('div');
        toDoBox.id = toDoJob.theToDo.uuid;
        let readableDateData = this.createReadableDate(theToDo.created);
        let dependencies = theToDo.dependencies.length?'Has dependencies':'No dependency';
        let intendedDate = theToDo.intended ?? "Any time from now" ;
        let doneStatus = `${theToDo.done.toString() === `true` ? " done" : "not yet"}`

        toDoBox.classList.add(conf.toDoBoxInListStyleClass);
        toDoBox.innerHTML += theToDo.body;
        toDoBox.innerHTML += '<br>UUID: ' + theToDo.uuid;
        toDoBox.innerHTML += '<br>Intended: ' + intendedDate; //Date.parse()
        toDoBox.innerHTML += '<br>Dependencies: ' + dependencies;
        toDoBox.innerHTML += '<br>Created: ' + readableDateData;
        toDoBox.innerHTML += `<br>Is it done: ${doneStatus}`

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
            dependButton.textContent='ReCall';
            dependButton.style.float='right';
            dependButton.addEventListener("click", () => {
                this.getDependencyTree(theToDo);
            })
            toDoBox.appendChild(dependButton);
        }

        if(toDoJob.rules.treeNodeMode){
            toDoBox.style.width=`20vw`;
            toDoBox.style.margin='auto';
            toDoBox.style.position='relative';
            toDoBox.style.top = '20vh';

            let topButton = this.createElm('button');
            topButton.id = `button-top-${toDoJob.theToDo.uuid}`;
            topButton.classList.add('connectionButton','cB_top');
            toDoBox.insertAdjacentElement('afterbegin',topButton);
            topButton.title = 'This todo is not a dependency of any!';


            let bottomButton = this.createElm('button');
            bottomButton.id = `button-bottom-${toDoJob.theToDo.uuid}`;
            bottomButton.classList.add('connectionButton','cB_bottom');
            bottomButton.title = 'No dependencies here!'
            toDoBox.insertAdjacentElement('beforeend',bottomButton);
            let todoDependencies = toDoJob.theToDo.dependencies.filter(dependency=>dependency.dependencyType==='todo');
            if(todoDependencies.length) {
                bottomButton.classList.add('hasDependencies');
                bottomButton.textContent = todoDependencies.length;
                bottomButton.title = `To see ${todoDependencies.length} dependencies click here!`
            }else{
                bottomButton.textContent=0;
            }

            let rightBottomButton = this.createElm('button');
            rightBottomButton.id = `button-rightbottom-${toDoJob.theToDo.uuid}`;
            rightBottomButton.classList.add('connectionButton','cB_rightBottom');
            toDoBox.insertAdjacentElement('beforeend',rightBottomButton);
            let materialDependencies = toDoJob.theToDo.dependencies.filter(dependency => dependency.dependencyType==='material');
            rightBottomButton.title = 'Add material dependency to this todo!';
            if(materialDependencies.length){
                rightBottomButton.classList.add('hasDependencies');
                rightBottomButton.textContent = materialDependencies.length;
            }else{
                rightBottomButton.textContent=0;

            }
            rightBottomButton.addEventListener('click', (event)=>{
                this.createMaterialAddingForm(event,toDoJob.theToDo.uuid)
            })




            if(toDoJob.theToDo.dependencies.length){
                console.log(this.activeState.todos)
            }
        }


        if(toDoJob.rules.draggable){
            toDoBox.draggable = true;
            toDoBox.style.cursor = 'grab';
            toDoBox.addEventListener('dragstart', this.dragStartHandler.bind(this));
            toDoBox.addEventListener('dragover', this.dragOverHandler.bind(this));
            //toDoBox.addEventListener('dragleave', this.dragLeaveHandler.bind(this));
            //toDoBox.addEventListener('dragend', this.dragEndHandler.bind(this));
            // toDoBox.addEventListener('dragenter', this.dragEnterHandler.bind(this));
            //toDoBox.addEventListener('drag', this.dragHandler.bind(this));
        }
        if(toDoJob.rules.droppable){
            toDoBox.droppable = true;
            toDoBox.addEventListener('drop', this.dropHandler.bind(this));
            toDoBox.addEventListener('dragenter', this.dragEnterHandler.bind(this));
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
    createTimeLineDay(movementObj={beginningDate: new Date(),by: 'day', amount:1}){
        let newDay = this.createElm('div');
        newDay.classList.add('day');
        //let toDay = new Date();
        let movedDate = this.moveDateBy(movementObj);
        let readableDateOfThatDay = this.createReadableDate(movedDate);
        newDay.innerHTML = readableDateOfThatDay;
        //console.log((new Date(`${movedDate}`)).toIsoString());
        newDay.id = `day-${readableDateOfThatDay.toString().replaceAll('.','')}`;
        let todoJobOnThisDay = this.filterTheList({filterParams:{dayId:newDay.id},theList:this.activeState.todos});
        //console.log('DAYJOB:'+(todoJobOnThisDay));
        if(todoJobOnThisDay.length){
            todoJobOnThisDay.forEach(todo=>{
                let toDoReCallButton = this.createElm('button');
                toDoReCallButton.textContent='ReCall';
                toDoReCallButton.addEventListener('click',()=>{
                    this.getDependencyTree(todo);
                })
                newDay.appendChild(toDoReCallButton);
            })
        }

        return newDay;
    },
    createTimeLine(){
        let timeLine = document.getElementById(conf.toDoTimeLineContainerId);
        for(let x=-this.timeLineDayLengthBack; x<this.timeLineDayLengthForth; x++){
            let toDay = new Date();
            let movementObj = {beginningDate: toDay, by:"day", amount:x};
            //console.log(movementObj);
            let newDay = this.createTimeLineDay(movementObj);
            timeLine.appendChild(newDay);
        }
        setTimeout(()=>{
            let readableDateOfToday = this.createReadableDate(new Date().getTime());
            let toDaysId = `day-${readableDateOfToday.toString().replaceAll('.','')}`;
            console.log(toDaysId);
            document.querySelector(`#${toDaysId}`).scrollIntoView({
                behavior: "smooth", // Optional: for smooth scrolling animation
                block: "nearest",    // Scroll to center horizontally
                inline: "center", // Scroll to center
            });
        },500)
        timeLine.addEventListener("wheel",(event)=>{
            event.preventDefault();
            timeLine.scrollLeft += 3*event.deltaY;
            if(event.deltaY>0){
                //console.log('saga donduruldu');
                let nextDay = this.createTimeLineDay({beginningDate: new Date(),by: 'day',amount:this.timeLineDayLengthForth+1});
                this.timeLineDayLengthForth++;
                timeLine.insertAdjacentElement('beforeend',nextDay);
                this.timeLineDayLengthBack--;
                timeLine.querySelector('.day:first-of-type').remove();
            }else if(event.deltaY<0){
                //console.log('sola donduruldu');
                let prevDay = this.createTimeLineDay({beginningDate: new Date(),by: 'day',amount:-(this.timeLineDayLengthBack+1)});
                this.timeLineDayLengthBack++;
                timeLine.insertAdjacentElement('afterbegin',prevDay);
                this.timeLineDayLengthForth--;
                timeLine.querySelector('.day:last-of-type').remove();
            }
        },{passive:false})
    },
    filterTheList(filterJob={filterParams:{}, theList:[]}){
        //console.log(filterJob.filterParams)
        let resultList=[];
        let filterParams = filterJob.filterParams;
        if (Object.keys(filterJob.filterParams).length) {
            //console.log('Parametre gelmis filter calisacak')
            resultList = filterJob.theList.filter(item => {
                let result = true;
                Object.keys(filterParams).forEach(paramKey => {
                        if(paramKey==="dayId"){
                            let slicedDate = new Date(item.intended).toISOString().split('T')[0].split('-');
                            let targetDayDivId = `day-${slicedDate[1].toString()}${slicedDate[2].toString()}${slicedDate[0].toString()}`;
                            if(filterParams.dayId===targetDayDivId){
                                console.log(filterParams.dayId," | ",targetDayDivId)
                                result = result && true;
                            }else{
                                result = false;
                            }
                        }
                        if(paramKey==='done'){
                            if(filterParams[paramKey]!==null){
                                result = result && item[paramKey].toString()===filterParams[paramKey].toString();
                            }
                        }

                        if(paramKey==='body'){
                            result = result && item[paramKey].toString().includes(filterParams[paramKey],0);
                        }
                        if(paramKey==='uuid'){
                            result = result && item[paramKey].toString()===filterParams[paramKey].toString();
                        }
                })
                return result;
            });
        }else{
            resultList = filterJob.theList;
        }
        //console.log(resultList);
        return resultList;
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
           // console.log(searchInput.value);
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
        return ((theDate.getMonth()+1)).toString().padStart(2,"0") + '.' + (theDate.getDate()).toString().padStart(2,"0") + '.' + theDate.getUTCFullYear();
    },
    createUID() {
        let uuid = self.crypto.randomUUID();
        while (this.activeState.todos.filter(todo => todo.uuid === uuid).length > 0) {
            uuid = self.crypto.randomUUID();
        }
        return uuid;
    },
    moveDateBy(movement={beginningDate: new Date(), by:"day", amount:1}){
        //console.log(movement)
        let dayAmount = "day";
        switch (movement.by){
            case "day":
                dayAmount = movement.amount;
            break;
            case "month":
                dayAmount = movement.amount*30; // buggy !!!
            break;
            default:
                dayAmount = movement.amount;
        }
        let currentTime = movement.beginningDate.getTime();
        return currentTime + (24*60*60*1000*dayAmount);
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
    },
    dragHandler(ev){
        ev.preventDefault();
        let offsetX;
        let offsetY;
        let target = ev.target;
        target.style.left = (ev.clientX - offsetX) + "px";
        target.style.top = (ev.clientY - offsetY) + "px";
        console.log(`Drag basladi ve aktif...`)

    },
    dragStartHandler(ev){
        let target = ev.target;
        target.style.cursor= 'grabbing';
        console.log(`${target.id} nesnesinin dragStart olayi basladi`);
        let transferredData = {dependencyType: "todo", uuid: ev.target.id}
        ev.dataTransfer.setData("application/json", JSON.stringify(transferredData));
        //ev.dataTransfer.effectAllowed = "move";
    },
    dragOverHandler(ev){
        ev.preventDefault();
        let target = ev.target;
        target.style.border = '1px dotted #ccc solid';
        //console.log(`${target.id} nesnesi bir drop alaninda dragOver tetiklendi`)
        //ev.dataTransfer.dropEffect = "move";
    },
    dragEnterHandler(ev){
        // hedef droppable nesneye ait bir event
        let target = ev.target;
        console.log(`${target.id} nesnesi bir drop alanina girdi dragEnter tetiklendi.`);
        target.classList.add('dropZone');
    },
    dragLeaveHandler(ev){
        let target = ev.target;
        console.log(`${target.id} nesnesi bir drop alanindan cikti dragLeave tetiklendi.`);

    },
    dropHandler(ev){
        ev.preventDefault();
        let target = ev.target;
        console.log(`${target.id} nesnesi drop oldu. drop tetiklendi`);
        let transferredData = ev.dataTransfer.getData("application/json");
        transferredData = JSON.parse(transferredData);
        let dependencyObj ={targetUUID:target.id.toString(), dependentData:transferredData};
        this.addDependencyToToDo(dependencyObj);

    },
    dragEndHandler(ev){
        // suruklenen nesneye ait bir event
        ev.preventDefault();
        let target = ev.target;
        target.classList.add('dragging');
        console.log(`${target.id} nesnesine ait suruklenme sona erdi dragEnd tetiklendi`);

    },
    addDependencyToToDo(dependencyObj={targetUUID:'', dependentData:{}}){
        //console.log(dependencyObj.targetUUID,':', dependencyObj.dependentData.uuid)
        let dependencyType = dependencyObj.dependentData.dependencyType;
        let targetUUID = dependencyObj.targetUUID;

        if(dependencyType==='todo'){
            // {dependencyType: "todo", uuid: ev.target.id}
            let targetToDo = this.activeState.todos.filter(item => item.uuid === targetUUID);
            let dependencies = targetToDo[0].dependencies;
            let foundIndexNoInDependencies = dependencies.findIndex(dependence => {
               return dependence.dependencyType==='todo' && dependence.uuid===dependencyObj.dependentData.uuid
            })
            if(foundIndexNoInDependencies===-1){
                dependencies.push(dependencyObj.dependentData);
                this.saveTheState();
            }else{
                alert('This dependency has already added to this todo!');
                return false;
            }
        }else if(dependencyType==='material'){

        }

    },
    refreshMaterialList(dataObj={uuid:null}){
        console.log('DATa OBJ: ',dataObj.uuid);
        if(!dataObj.uuid) return false;
        document.getElementById(`material-list-${dataObj.uuid}`).innerHTML = this.getTemplate["material-in-list"](this.giveDependentMaterialList({uuid:dataObj.uuid}));
    },
    createMaterialAddingForm(event,uuid){
        let triggerButton = event.target;
        let coords = this.getCoordinationData(triggerButton);
        let materialFormDiv = this.createElm('div');
        materialFormDiv.id =`material-add-${uuid}`;
        materialFormDiv.classList.add('material-adding-form');
        materialFormDiv.style.position = 'absolute';
        materialFormDiv.style.left = coords.left + 'px';
        materialFormDiv.style.top = coords.top + 'px';
console.log(this);
        materialFormDiv.innerHTML=this.getTemplate["material-form"]({uuid:uuid, materialTypes:this.materialTypes, materialUnits:this.materialUnits});
        document.body.insertAdjacentElement('beforeend',materialFormDiv);
        this.refreshMaterialList({uuid:uuid});



        document.querySelector(`#material-type-${uuid}`).selectedIndex =0;

        document.getElementById(`close-button-${uuid}`).addEventListener('click',()=>{
            document.getElementById(`material-add-${uuid}`).remove();
        })
        document.getElementById(`material-type-${uuid}`).addEventListener('change',()=>{

        })
        document.getElementById(`material-save-button-${uuid}`).addEventListener('click',()=>{
                // TODO: Tum material verisi todo nun dependencies kismina kaydolacak.
            let materialType = document.getElementById(`material-type-${uuid}`).value;
            let materialName = document.getElementById(`material-search-${uuid}`).value;
            let materialAmount = document.getElementById(`material-amount-${uuid}`).value
            let materialUnit = document.getElementById(`material-unit-${uuid}`).value
            let newMaterial = {dependencyType:"material", materialType:materialType, materialName:materialName, unit:materialUnit, amount:materialAmount, addTime: new Date().getTime(), obtainedTime: null, isObtained: false}
            // Bu materialType daha onceden kayitli mi
            let filteredByType = this.materialTypes.filter(eachType=>{
                return eachType.typeName===materialType;
            })

            let filteredByMaterial = filteredByType[0].values.filter(material=>{
                console.log(material.materialName,":",materialName)
                return material.materialName===materialName;
            })
            if(!filteredByMaterial.length){
                filteredByType[0].values.push({materialName:materialName, unit:materialUnit, amount:materialAmount})
            }else{
                filteredByMaterial[0]={materialName:materialName, unit:materialUnit, amount:materialAmount};
            }

            this.activeState.todos.filter(todo=>todo.uuid ===uuid)[0].dependencies.push(newMaterial);
            this.saveTheState();
            resetMaterialForm();
            this.refreshMaterialList({uuid:uuid});

            function resetMaterialForm(){
                document.getElementById(`material-type-${uuid}`).selectedIndex = 0;
                materialName = '';
                materialAmount = '';
                document.getElementById(`material-unit-${uuid}`).selectedIndex=0;
            }
        })

        document.getElementById(`material-search-${uuid}`).addEventListener('keyup',(event)=>{
            let positioningTarget = document.getElementById(`material-search-${uuid}`);
            let selectedMaterialType = document.getElementById(`material-type-${uuid}`).value;
            let typedSearchPart = positioningTarget.value;

            let suggestedMaterials = this.materialTypes.filter(materialType=>materialType.typeName===selectedMaterialType)[0].values.map(material=> material.materialName).filter(materialName=>materialName.includes(typedSearchPart));
            console.log(suggestedMaterials);
            this.createSuggestions({event: event, positioningTarget: positioningTarget, inputSource: positioningTarget, suggestions:suggestedMaterials })
        })


    },
    giveDependentMaterialList(dataObj={uuid:null}){
        if(!dataObj.uuid){ return false;}
        let theToDo = this.activeState.todos.filter(todo=>todo.uuid ===dataObj.uuid)[0];
        console.log('theToDo:', theToDo);
        let theDependencies = theToDo.dependencies;
        console.log('theDependencies:', theDependencies);
        return theDependencies.filter(dependency=>dependency.dependencyType==="material");
    },
    getTemplate:{
        "material-in-list":(dataObj)=>{
            console.log(dataObj);
            let listOfMaterials=''
            listOfMaterials+='';
            dataObj.forEach(materialData=>{
                listOfMaterials+=`<div>${materialData.materialType} : ${materialData.materialName}, ${materialData.amount},  ${materialData.unit}</div>`
            })
            return listOfMaterials;
        },
        "material-form": (dataObj={})=>{
            let materialTypeOptions = dataObj.materialTypes.map(type=>`<option value="${type.typeName}">${type.typeName}</option>`).join('');
            let materialUnits = dataObj.materialUnits.map(unit=>`<option value="${unit.shortHand}">${unit.unitName}</option>`).join('');

            return `
                    <div>
                        <div><span class="info" title="TODO: ${dataObj.uuid}">ⓘ</span><button id="close-button-${dataObj.uuid}" style="cursor:pointer; position: absolute; top:2px; right:2px; border-radius: 5px;" title="Close material adding form">X</button></div>
                        <div>
                        Material Type:<select id="material-type-${dataObj.uuid}">${materialTypeOptions}</select>
                        </div>
                        <div>
                        Material: <input type="search" id="material-search-${dataObj.uuid}"> 
                        </div>
                        <div style="display:flex; flex-direction: row; justify-content: space-between;">
                            <div style="flex-grow: 1">Amount:<input id="material-amount-${dataObj.uuid}" type="number" step="0.1" min="0" width="30px"></div>
                            <div style="flex-grow: 1"><select id="material-unit-${dataObj.uuid}">${materialUnits}</select></div>
                        </div>
                        <div>
                        <button id="material-save-button-${dataObj.uuid}">ADD AS DEPENDENCY</button>
                        </div>
                        <div id="material-list-${dataObj.uuid}">List of materials</div>
                    </div>
            `;
        }
    },
    createSuggestions(dataObj={event: {}, positioningTarget:document.body, inputSource:document.body,suggestions:[]}){
        let positioningTarget = dataObj.positioningTarget;
        let heightOfASuggestionDiv = 25;
        let ev = dataObj.event;
        if(!dataObj.inputSource.value || dataObj.inputSource.value.trim()==='' || dataObj.inputSource.value.trim().length<3){
            removeAllSuggestions();
            return;
        }
        let moveOnSuggestions = (move)=>{
            console.log(move)
            // up, down, enter
            let suggestionOptions = document.querySelectorAll('.material-suggestions');
            let suggestionFocusedOptions = document.querySelectorAll('.material-suggestions.focused');
            if(suggestionFocusedOptions.length){
                console.log('bir secenek seciliymis');
                if(move==='enter'){
                    dataObj.inputSource.value = [...suggestionFocusedOptions][0].innerText;
                    suggestionOptions.forEach(s=>s.remove());
                }else{
                    for(let i=0; i<suggestionOptions.length; i++){
                        let theSuggestionOption = [...suggestionOptions][i];
                        if(theSuggestionOption.classList.contains('focused')){
                            theSuggestionOption.classList.remove('focused');
                            let moveSide = (move==='down')? 1: -1;
                            let nextIndex = ((i+moveSide)+suggestionOptions.length) % suggestionOptions.length;

                            [...suggestionOptions][nextIndex].classList.add('focused');
                            break;
                        }
                    }
                }

            }else{
                [...suggestionOptions][0].classList.add('focused');
            }
        }
        //
        function removeAllSuggestions(){
            document.querySelectorAll('.material-suggestions').forEach(suggestionDiv=>suggestionDiv.remove());
        }
        //
        if(["ArrowUp", "ArrowDown", "Enter"].includes(ev.key)){
            switch(ev.key){
                case 'ArrowUp':
                    ev.preventDefault();
                    moveOnSuggestions('up');

                    break;
                case 'ArrowDown':
                    ev.preventDefault();
                    moveOnSuggestions('down');
                    break;
                case 'Enter':
                    ev.preventDefault();
                    moveOnSuggestions('enter');
                    break;
            }
            //
        }else{
            removeAllSuggestions();
            dataObj.suggestions.forEach(suggestion=>{
                console.log(suggestion + ' yazildi')
                let newDiv = this.createElm('div');
                let positionStartLeft = this.getCoordinationData(positioningTarget).left;
                let positionStartTop = this.getCoordinationData(positioningTarget).top;
                newDiv.innerText = suggestion;
                newDiv.style.width =200 + 'px';
                newDiv.classList.add('material-suggestions');
                newDiv.style.left = positionStartLeft + 'px';
                newDiv.style.top = (positionStartTop+ heightOfASuggestionDiv) + 'px';
                positioningTarget.insertAdjacentElement('afterend',newDiv);
                positioningTarget=newDiv;
                newDiv.addEventListener('click',()=>{
                    dataObj.inputSource.value = newDiv.textContent;
                    removeAllSuggestions();
                })
            })
        }

    }
};

window.addEventListener('DOMContentLoaded', () => {
    simToDo.init();
})
