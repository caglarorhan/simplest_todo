//SimplestToDo //simToDo
// TODO: Paging for saved todos // DONE
// TODO: config.json file applying // DONE
// TODO: save filter parameters // DONE
// TODO: Search from saved todos // DONE
// TODO: Edit old todos
// TODO: Archiving todos
// TODO: weekly and monthly summaries
// TODO: Add estimated completing date and time to TODOs
// TODO: To set dependency relations (prerequest-postrequest)
// TODO: Login with & Save to firebase
// TODO: Share todos with connected friends and sharing, passing, assigning todos to each other
// TODO: Styles out to css file // DONE
// TODO: Material type dependency adding
// TODO: Visual representation of dependency relations
// TODO: Remove dependency relations
// TODO: Adding r auto creating tags for ToDos
// TODO: Manage all functions with audio directions
// TODO: Challenging and gamification adding

//import conf from '../json/config.json' assert {type: 'json'};
let conf = {
    "defaultLang": "en",
    "defaultStyleFile": "./css/index.css",
    "alternateStyleFile": "simToDo_alternate.css",
    "autoSaveTime": 10,
    "minInputLength": 3,
    "itemPerPage": 5,
    "maxPagingButton": 10,
    "textLabels": {
        "tr": {
            "saveButton": "TODO kaydet",
            "headerText": "Simplest TODO Uygulamasi",
            "searchTitle": "TODO Ara: ",
            "searchPlaceHolder": "Anahtar kelime girin",
            "totalEntriesTitle": "TOPLAM TODO SAYISI:",
            "intendedDateTitle": "Hedef Tarih"
        },
        "en": {
            "saveButton": "Save TODO",
            "headerText": "Simplest TODO Application",
            "searchTitle": "Search ToDo: ",
            "searchPlaceHolder": "Search for a keyword",
            "totalEntriesTitle": "TOTAL ENTRIES:",
            "intendedDateTitle": "Intended Date"
        }
    },
    "mainContainerId": "mainToDoContainer",
    "mainContainerStyleClass": "mainToDoContainer",
    "toDoInputContainerId": "toDoInputContainer",
    "todoInputContainerStyleClass": "toDoInputContainer",
    "toDoInputTextareaId": "toDoInputTextarea",
    "todoInputTextareaStyleClass": "toDoInputTextarea",
    "toDoDateTimeInputId": "toDoDateTimeInput",
    "toDoDateTimeInputStyleClass": "toDoDateTimeInput",
    "toDoListContainerId": "toDoListContainer",
    "toDoListContainerStyleClass": "toDoListContainer",
    "toDoBoxInListStyleClass": "toDoBoxInList",
    "toDoFilterContainerId": "toDoFilterContainer",
    "toDoFilterContainerStyleClass": "toDoFilterContainer",
    "toDoSearchContainerId": "toDoSearchContainer",
    "toDoSearchContainerStyleClass": "toDoSearchContainer",
    "toDoDependencyTreeId": "toDoDependencyTree",
    "toDoDependencyTreeStyleClass": "toDoDependencyTree",
    "toDoTimeLineContainerId": "toDoTimeLineContainer",
    "toDoTimeLineContainerStyleClass": "toDoTimeLineContainer",
    "ui_container_structure": {
        "isTargetIntegrated": false,
        "ui_structure": {
            "toDoInputContainer": "newToDoFromHere",
            "toDoFilterContainer": "filtersHere",
            "toDoSearchContainer": "searchHere",
            "toDoDependencyTree": "seeDependenciesHere",
            "toDoListContainer": "toDoListHere",
            "toDoTimeLineContainer": "toDoTimeLineHere"
        }
    }
};
let simToDo = {
    name: 'SimplestToDo',
    version: "2024.0.3",
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
        { typeName: "Groceries", values: [{uuid:'', materialName:'Roman tomato', unit:'kg', amount:1},{uuid:'', materialName:'Beef tomato', unit:'kg', amount:1},{uuid:'', materialName:'Grape tomato', unit:'kg', amount:1}]},
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
    permissions:{
        speechRecognition: null,
        position:{}
    },
    filterParameters: {},
    init() {
        document.title=`${this.name} : ${this.version}`;
        this.storageToState();
        this.getPermissions();
        this.autoSave();
        this.createAndLoadCSSFiles();
        this.createToDoElements();
        this.createTimeLine();
        this.drawToDos();

    },
    getPermissions(){
        // asking permission for speech recognition
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            // Create an instance of SpeechRecognition
            this.permissions.speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        } else {
            console.log('Sorry, your browser does not support speech recognition.');
        }

        //asking for geolocation
        // if ("geolocation" in navigator) {
        //     navigator.geolocation.getCurrentPosition((position)=> {
        //            this.position = position;
        //             //var latitude = position.coords.latitude;
        //             //var longitude = position.coords.longitude;
        //              },(error)=> {
        //             switch(error.code) {
        //                 case error.PERMISSION_DENIED:
        //                     console.error("User denied the request for Geolocation.");
        //                     break;
        //                 case error.POSITION_UNAVAILABLE:
        //                     console.error("Location information is unavailable.");
        //                     break;
        //                 case error.TIMEOUT:
        //                     console.error("The request to get user location timed out.");
        //                     break;
        //                 case error.UNKNOWN_ERROR:
        //                     console.error("An unknown error occurred.");
        //                     break;
        //             }
        //         }
        //     );
        // } else {
        //     console.error("Sorry, Geolocation is not supported by this browser.");
        // }
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
    createSVGorPATH(dataObj = {givenId:String, qualifiedName:String, attributes:[{attributeName:'', value:''}]}) {
        // {givenId:'', qualifiedName:'', attributes:[{attributeName:'', value:''}]}
        //console.log(dataObj);
        let nameSpaceURI ='http://www.w3.org/2000/svg';
        let newNSElement = document.createElementNS(nameSpaceURI, dataObj.qualifiedName);
                newNSElement.id = dataObj.givenId;
                if(dataObj.attributes.length > 0){
                    dataObj.attributes.forEach(theAttributeObject=>{
                      //  console.log(theAttributeObject);
                        newNSElement.setAttribute(theAttributeObject.attributeName, theAttributeObject.value);
                    })
                }
        return newNSElement;
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

        let speechToTextSVG = this.createSVGorPATH({
            givenId:'speechToTextSVG', qualifiedName:'svg', attributes:[
                {attributeName:'aria-hidden', value:'true'},
                {attributeName:'viewbox', value:'0 0 24 24'},
                {attributeName:'width', value:'24px'},
                {attributeName:'height', value:'24px'},
                {attributeName:'class', value:'svg-icon'},
            ]})
        let path1 = this.createSVGorPATH({
            givenId:'path1', qualifiedName:'path', attributes:[
                {attributeName:'d', value:'M 10.273438 20.503906 L 4.453125 20.503906 L 4.453125 19.378906 L 9.144531 19.378906 L 9.144531 17.5625 L 6.976562 16.015625 C 6.78125 15.878906 6.664062 15.65625 6.664062 15.417969 C 6.660156 15.179688 6.773438 14.953125 6.960938 14.8125 L 9.144531 13.183594 L 9.144531 10.730469 L 10.890625 10.589844 L 7.121094 3.605469 L 8.113281 3.070312 L 12.707031 11.578125 L 10.273438 11.773438 L 10.273438 13.375 C 10.273438 13.609375 10.160156 13.832031 9.972656 13.972656 L 8.058594 15.402344 L 9.960938 16.757812 C 10.15625 16.898438 10.273438 17.125 10.273438 17.363281 Z M 4.066406 6.617188 C 4.066406 7.1875 4.53125 7.648438 5.097656 7.648438 C 5.667969 7.648438 6.128906 7.1875 6.128906 6.617188 C 6.128906 6.050781 5.667969 5.585938 5.097656 5.585938 C 4.53125 5.585938 4.066406 6.050781 4.066406 6.617188 Z M 13 17.136719 C 12.753906 17.136719 12.527344 16.972656 12.457031 16.722656 C 12.375 16.421875 12.550781 16.113281 12.851562 16.027344 C 13.136719 15.949219 13.335938 15.6875 13.335938 15.390625 C 13.335938 15.097656 13.148438 14.84375 12.867188 14.761719 C 12.570312 14.667969 12.402344 14.355469 12.492188 14.058594 C 12.582031 13.757812 12.898438 13.589844 13.195312 13.679688 C 13.953125 13.910156 14.460938 14.597656 14.460938 15.390625 C 14.460938 16.191406 13.925781 16.902344 13.152344 17.117188 C 13.101562 17.128906 13.050781 17.136719 13 17.136719 Z M 13 17.136719 '},
                {attributeName:'fill', value:'none'},
                {attributeName:'style', value:`stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;`}
            ]
        })
        let path2 = this.createSVGorPATH({
            givenId:'path2', qualifiedName:'path', attributes:[
                {attributeName:'style', value:`stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;`},
                {attributeName:'d', value:'M 14.664062 19.230469 C 14.460938 19.230469 14.265625 19.121094 14.164062 18.929688 C 14.019531 18.652344 14.125 18.3125 14.398438 18.167969 C 15.4375 17.621094 16.082031 16.554688 16.082031 15.382812 C 16.082031 14.230469 15.453125 13.171875 14.4375 12.621094 C 14.164062 12.472656 14.0625 12.128906 14.214844 11.855469 C 14.363281 11.582031 14.703125 11.480469 14.976562 11.628906 C 16.355469 12.378906 17.210938 13.816406 17.210938 15.382812 C 17.210938 16.976562 16.335938 18.425781 14.925781 19.167969 C 14.84375 19.207031 14.753906 19.230469 14.664062 19.230469 Z M 14.664062 19.230469 '}
            ]
        })
        let path3 = this.createSVGorPATH({
            givenId:'path2', qualifiedName:'path', attributes:[
                {attributeName:'style', value:`stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;`},
                {attributeName:'d', value:'M 16.351562 20.929688 C 16.148438 20.929688 15.953125 20.820312 15.851562 20.628906 C 15.707031 20.351562 15.8125 20.011719 16.089844 19.867188 C 17.765625 18.988281 18.804688 17.265625 18.804688 15.378906 C 18.804688 13.515625 17.789062 11.808594 16.152344 10.921875 C 15.878906 10.773438 15.777344 10.429688 15.925781 10.15625 C 16.074219 9.882812 16.417969 9.78125 16.691406 9.929688 C 18.691406 11.015625 19.933594 13.105469 19.933594 15.378906 C 19.933594 17.6875 18.660156 19.789062 16.613281 20.867188 C 16.535156 20.90625 16.445312 20.929688 16.351562 20.929688 Z M 16.351562 20.929688 '}
            ]
        })

        speechToTextSVG.appendChild(path1);
        speechToTextSVG.appendChild(path2);
        speechToTextSVG.appendChild(path3);

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
        toDoInputContainer.appendChild(speechToTextSVG);
        this.trackSpeechButton();
        saveToDoButton.addEventListener('click', this.prepareNewToDoObject.bind(this));
    },
    trackSpeechButton(){
        let isPressed = false;
        let speechButton = document.getElementById('speechToTextSVG');
        let recognition = new this.permissions.speechRecognition();
        recognition.continuous = true;
        recognition.lang = 'tr-TR';
        recognition.onresult = (event)=> {
            let transcript = event.results[0][0].transcript;
            console.log(transcript);
            document.getElementById(conf.toDoInputTextareaId).value= transcript;
        };

        speechButton.addEventListener('mousedown',()=>{
            isPressed = true;
            recognition.start();
        });
        speechButton.addEventListener('mouseup',()=>{
            isPressed = false;
            recognition.stop();
        });
        speechButton.addEventListener('mouseleave',()=>{
            isPressed = false;
            recognition.stop();
        });

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
            uuid: this.createUID({lookupTarget:this.activeState.todos}),
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
            toDoListContainer.appendChild(newToDoBox.theBox);
        }
        let pagingButtonElements = this.createPagination({currentPageNo: pageNo, toDoCount: sortedToDoListLength})
        toDoListContainer.insertAdjacentElement('afterbegin', pagingButtonElements);
    },
    getDependencyTree(targetToDoObject){
        let dependencyTree = document.getElementById(conf.toDoDependencyTreeId);
        dependencyTree.innerHTML='';
        this.removeMaterialAddingForm();
        let theToDoBox = this.printToDo({theToDo:targetToDoObject, rules:{treeNodeMode:true, draggable:true, droppable:true}});

        dependencyTree.append(theToDoBox.theBox);
        theToDoBox.callbacks.forEach(callback=>callback());

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
        let callbacks=[];
        let theToDo = toDoJob.theToDo;
        //console.log(toDoJob);
        //console.log(toDoJob.rules);
        let toDoBox = this.createElm('div');
        toDoBox.id = toDoJob.theToDo.uuid;
        let readableDateData = this.createReadableDate({mSeconds: theToDo.created, plusHourMinute: false});
        let dependencies = theToDo.dependencies.length?'Has dependencies':'No dependency';
        let intendedDate;
        if(theToDo.intended){
            intendedDate = this.createReadableDate({mSeconds:theToDo.intended, plusHourMinute:true});
        }else{
            intendedDate = "Any time from now";
        }

        let doneStatus = `${theToDo.done.toString() === `true` ? " done" : "not yet"}`

        toDoBox.classList.add(conf.toDoBoxInListStyleClass);
        toDoBox.innerHTML += theToDo.body;
        toDoBox.innerHTML += '<br>UUID: ' + theToDo.uuid;
        toDoBox.innerHTML += '<br>Intended: ' + intendedDate;
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
            toDoBox.insertAdjacentElement('beforeend',bottomButton);
            callbacks.push(()=>{this.findDependencyCount({type: 'todo', toDoUUID:toDoJob.theToDo.uuid, targetId:bottomButton.id, titleTemplate:'dependency-todo-count'})});
            bottomButton.addEventListener('click',()=>{
                this.drawDependencyTree({toDoUUID:toDoJob.theToDo.uuid})
            })

            let rightBottomButton = this.createElm('button');
            rightBottomButton.id = `button-rightbottom-${toDoJob.theToDo.uuid}`;
            rightBottomButton.classList.add('connectionButton','cB_rightBottom');
            toDoBox.insertAdjacentElement('beforeend',rightBottomButton);
            callbacks.push(()=>{this.findDependencyCount({type: 'material', toDoUUID:toDoJob.theToDo.uuid, targetId:rightBottomButton.id, titleTemplate:'dependency-material-count'})});
            rightBottomButton.addEventListener('click', (event)=>{
                this.createMaterialAddingForm(event,toDoJob.theToDo.uuid)
            })
            if(toDoJob.rules.droppable){
                toDoBox.droppable = true;
                toDoBox.addEventListener('drop', this.dropHandler.bind(this));
                toDoBox.addEventListener('dragenter', this.dragEnterHandler.bind(this));
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
        // if(toDoJob.rules.droppable){
        //     toDoBox.droppable = true;
        //     toDoBox.addEventListener('drop', this.dropHandler.bind(this));
        //     toDoBox.addEventListener('dragenter', this.dragEnterHandler.bind(this));
        // }

console.log(callbacks);
        return {theBox: toDoBox, callbacks:callbacks};
    },
    findDependencyCount(dataObj={type:String, toDoUUID:String, targetId:String, titleTemplate:String}){
        // type would be 'todo', 'material'
        //console.log(dataObj)
        let theCount=0;
        theCount = this.activeState.todos.find(theToDo=>theToDo.uuid===dataObj.toDoUUID).dependencies.filter(dependency=>dependency.dependencyType===dataObj.type).length;

        if(document.getElementById(`${dataObj.targetId}`)){
            console.log('Target var')
            let targetElement = document.getElementById(dataObj.targetId);
            targetElement.textContent= theCount.toString();
            if(!targetElement.classList.contains('hasDependencies')){
                targetElement.classList.add('hasDependencies');
            }
            targetElement.title = this.getTemplate[dataObj.titleTemplate]({count:theCount})
        }
        return theCount;
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
        let readableDateOfThatDay = this.createReadableDate({mSeconds: movedDate, plusHourMinute: false});
        newDay.innerHTML = readableDateOfThatDay;
        //console.log((new Date(`${movedDate}`)).toIsoString());
        newDay.id = `day-${readableDateOfThatDay.toString().replaceAll('.','')}`;
        let todoJobOnThisDay = this.filterTheList({filterParams:{dayId:newDay.id},theList:this.activeState.todos});
        //console.log(`DAYJOB ID: ${newDay.id},  TODO LIST: ${todoJobOnThisDay}`);
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
            let readableDateOfToday = this.createReadableDate({mSeconds: new Date().getTime(), plusHourMinute: false});
            let toDaysId = `day-${readableDateOfToday.toString().replaceAll('.','')}`;
            //console.log(toDaysId);
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
        // console.log('Listedeki gun sayisi:',filterJob.theList);
        let resultList=[];
        let filterParams = filterJob.filterParams;
        if (Object.keys(filterJob.filterParams).length && filterJob.theList.length) {
            //console.log('Parametre gelmis filter calisacak')
            resultList = filterJob.theList.filter(item => {
                let result = true;
                Object.keys(filterParams).forEach(paramKey => {
                        if(paramKey==="dayId" && item.intended){
                            //console.log(`item: `,item)
                            let slicedDate = new Date(item.intended).toISOString().split('T')[0].split('-');
                            let targetDayDivId = `day-${slicedDate[1].toString()}${slicedDate[2].toString()}${slicedDate[0].toString()}`;
                            if(filterParams.dayId===targetDayDivId){
                                //console.log(filterParams.dayId," | ",targetDayDivId)
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
    createReadableDate(dataObj={mSeconds:Number, plusHourMinute:false}) {
        let theDate = new Date(dataObj.mSeconds);
        let readableDate = ((theDate.getMonth()+1)).toString().padStart(2,"0") + '.' + (theDate.getDate()).toString().padStart(2,"0") + '.' + theDate.getUTCFullYear();
        if(dataObj.plusHourMinute){
            readableDate+=' '+ theDate.getHours() + ':' + theDate.getMinutes();
        }
        return readableDate;
    },
    createUID(dataObj={lookupTarget:[]}) {
        let uuid = self.crypto.randomUUID();
        while (dataObj.lookupTarget.filter(todo => todo.uuid === uuid).length > 0) {
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
        console.log(`${target.id} nesnesine birsey drop oldu. drop tetiklendi`);
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
            if(dependencyObj.dependentData.uuid===dependencyObj.targetUUID){
                alert('A todo can not be a dependent of itself!');
                return false;
            }
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
    refreshMaterialList(dataObj={uuid:String}){
        console.log('DATa OBJ: ',dataObj.uuid);
        if(!dataObj.uuid) return false;

        document.getElementById(`material-list-${dataObj.uuid}`).innerHTML= this.getTemplate["material-in-list"]({uuid:dataObj.uuid, dependentMaterials: this.giveDependentMaterialList({uuid:dataObj.uuid})});

        document.getElementById(`material-list-${dataObj.uuid}`).addEventListener('click',(event)=>{
            let srcElm = event.target;
            if(srcElm.id.includes('material-for-')){
                let materialUUID = srcElm.id.replace('material-for-','');
                this.checkMaterialObtained({todoUUID:dataObj.uuid, materialUUID:materialUUID, isObtained: srcElm.checked})
            }
        })

        document.querySelectorAll('.material-action.pass').forEach(materialPass=>{
            materialPass.addEventListener('click',(event)=>{
                let materialUUID = event.target.parentNode.dataset.materialUuid;
                console.log(materialUUID);
                this.materialDeleteOrPass({type:'pass',toDoUUID:dataObj.uuid, materialUUID:materialUUID})
            })
        })
        document.querySelectorAll('.material-action.delete').forEach(materialDelete=>{
            materialDelete.addEventListener('click',(event)=>{
                let materialUUID = event.target.parentNode.dataset.materialUuid;
                console.log(materialUUID);
                this.materialDeleteOrPass({type: 'delete', toDoUUID: dataObj.uuid, materialUUID: materialUUID})
            })
        })
        this.findDependencyCount({type:'material', toDoUUID: dataObj.uuid, targetId:`button-rightbottom-${dataObj.uuid}`, titleTemplate:'dependency-material-count'})
    },
    materialDeleteOrPass(dataObj={type:String,toDoUUID:String, materialUUID:String}){
        if(!dataObj.type || !dataObj.toDoUUID || !dataObj.materialUUID) return false;
        switch(dataObj.type){
            case "pass":
                let passValue = this.activeState.todos.filter(theTodo=>theTodo.uuid===dataObj.toDoUUID)[0].dependencies.filter(dependency=>dependency.uuid===dataObj.materialUUID)[0]?.pass;
                this.activeState.todos.filter(theTodo=>theTodo.uuid===dataObj.toDoUUID)[0].dependencies.filter(dependency=>dependency.uuid===dataObj.materialUUID)[0].pass=!passValue;
                break;
            case "delete":
                if(!confirm('Do you want to delete this material?')) return false;
                let targetDependencyIndex = this.activeState.todos.filter(theTodo=>theTodo.uuid===dataObj.toDoUUID)[0].dependencies.findIndex(dependency=>dependency.uuid===dataObj.materialUUID);
                this.activeState.todos.filter(theTodo=>theTodo.uuid===dataObj.toDoUUID)[0].dependencies.splice(targetDependencyIndex,1);
                break;
        }
        this.saveTheState();
        this.refreshMaterialList({uuid: dataObj.toDoUUID})
    },
    checkMaterialObtained(dataObj={todoUUID:Number, materialUUID:Number, isObtained: Boolean}){
        //console.log(dataObj);
        if(dataObj.todoUUID===0 || dataObj.materialUUID===0) return false;
        console.log(dataObj.isObtained);
        this.activeState.todos.filter(theTodo=>theTodo.uuid===dataObj.todoUUID)[0].dependencies.filter(dependency=>dependency.uuid===dataObj.materialUUID)[0].isObtained = dataObj.isObtained;
        this.activeState.todos.filter(theTodo=>theTodo.uuid===dataObj.todoUUID)[0].dependencies.filter(dependency=>dependency.uuid===dataObj.materialUUID)[0].obtainedTime = new Date().getTime();
        this.saveTheState();
        this.refreshMaterialList({uuid:dataObj.todoUUID});
    },
    removeMaterialAddingForm(){
        document.querySelector('[id^="material-add-"]')?.remove();
    },
    createMaterialAddingForm(event,uuid){
        if(document.getElementById(`material-add-${uuid}`)) return false;
        let triggerButton = event.target;
        let coords = this.getCoordinationData(triggerButton);
        let materialFormDiv = this.createElm('div');
        materialFormDiv.id =`material-add-${uuid}`;
        materialFormDiv.classList.add('material-adding-form');
        materialFormDiv.style.left = coords.left + 'px';
        materialFormDiv.style.top = coords.top + 'px';
console.log(this);
        materialFormDiv.innerHTML=this.getTemplate["material-form"]({uuid:uuid, materialTypes:this.materialTypes, materialUnits:this.materialUnits});
        document.body.insertAdjacentElement('beforeend',materialFormDiv);
        this.refreshMaterialList({uuid:uuid});



        document.querySelector(`#material-type-${uuid}`).selectedIndex =0;

        document.getElementById(`close-button-${uuid}`).addEventListener('click',()=>{
            this.removeMaterialAddingForm();
        })
        document.getElementById(`material-type-${uuid}`).addEventListener('change',()=>{

        })
        document.getElementById(`material-save-button-${uuid}`).addEventListener('click',()=>{
                // TODO: Tum material verisi todo nun dependencies kismina kaydolacak.
            let materialType = document.getElementById(`material-type-${uuid}`).value;
            let materialName = document.getElementById(`material-search-${uuid}`).value;
            let materialAmount = document.getElementById(`material-amount-${uuid}`).value;
            let materialUnit = document.getElementById(`material-unit-${uuid}`).value;
            let newMaterialUUID = this.createUID({
                lookupTarget:this.activeState.todos.filter(theToDo=>theToDo.uuid===uuid)[0].dependencies.filter(dp=>dp.dependencyType==='material')
            })
            let newMaterial = {uuid:newMaterialUUID, dependencyType:"material", materialType:materialType, materialName:materialName, unit:materialUnit, amount:materialAmount, addTime: new Date().getTime(), obtainedTime: null, isObtained: false}
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
                console.log('resetMaterialForm calisti');
                document.getElementById(`material-type-${uuid}`).selectedIndex = 0;
                document.getElementById(`material-search-${uuid}`).value='';
                document.getElementById(`material-amount-${uuid}`).value='';
                document.getElementById(`material-unit-${uuid}`).selectedIndex=0;
                document.getElementById(`material-search-${uuid}`).focus();
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
        let theDependencies = theToDo.dependencies;
        return theDependencies.filter(dependency=>dependency.dependencyType==="material");
    },
    drawDependencyTree(dataObj={toDoUUID:String}){
        let targetDrawArea = document.getElementById(conf.toDoDependencyTreeId);
        let targetDrawAreaDimensions = this.getCoordinationData(targetDrawArea);
        let positionShiftAmount = 100;
        let boxLayerShiftAmount = 450;
        let lineCarrier = this.createSVGorPATH({
            givenId:'lineCarrier', qualifiedName:'svg', attributes:[
                {attributeName:'viewBox', value: `0 0 ${targetDrawAreaDimensions.width} ${targetDrawAreaDimensions.height}`},
                {attributeName:'top', value: targetDrawAreaDimensions.top},
                {attributeName:'left', value: targetDrawAreaDimensions.left}
            ]})
        let dependencyToDos = this.giveTheseDependenciesOfToDo({toDoUUID:dataObj.toDoUUID, dependencyType:'todo'});
        positionShiftAmount = this.getCoordinationData(targetDrawArea).height / dependencyToDos.length;
        dependencyToDos.forEach(dependentToDo=>{
            let callbacks=[];
            let theToDo = this.activeState.todos.filter(todo=>todo.uuid===dependentToDo.uuid)[0];

            callbacks.push(()=>{this.findDependencyCount({
                type: 'material',
                toDoUUID:theToDo.uuid,
                targetId:`button-bottom-${theToDo.uuid}`,
                titleTemplate:'dependency-material-count'})})

            let newToDoBoxObj = this.printToDo({
                theToDo:theToDo,
                rules:{update:false, dependencyButton:true, draggable:false, treeNodeMode: true},
                callbacks: callbacks
            });
            newToDoBoxObj.theBox.classList.add('toDoBoxInListSmall');
            newToDoBoxObj.theBox.style.left = positionShiftAmount + 'px';
            newToDoBoxObj.theBox.style.top = boxLayerShiftAmount+ 'px';
            positionShiftAmount+=300;

            targetDrawArea.appendChild(newToDoBoxObj.theBox);
            newToDoBoxObj.callbacks.forEach(callback=>callback());

            this.showConnection({firstToDoUUID: dataObj.toDoUUID, secondToDoUUID: dependentToDo.uuid, targetDrawArea: targetDrawArea, lineCarrier:lineCarrier})
        })
    },
    showConnection(dataObj={firstToDoUUID:String, secondToDoUUID:String, targetDrawArea:HTMLElement, lineCarrier: SVGElement}) {
        let targetDrawAreaDimensions = this.getCoordinationData(dataObj.targetDrawArea);
        let mainToDosConnectionPoint = document.getElementById(`button-bottom-${dataObj.firstToDoUUID}`);
        let mainToDosConnectionPointDimensions = this.getCoordinationData(mainToDosConnectionPoint);
        let dependentToDosConnectionPoint = document.getElementById(`button-top-${dataObj.secondToDoUUID}`);
        let dependentToDosConnectionPointDimensions = this.getCoordinationData(dependentToDosConnectionPoint);

        this.drawLine({
            from:{
                x:mainToDosConnectionPointDimensions.left - targetDrawAreaDimensions.left+10,
                y:mainToDosConnectionPointDimensions.top - targetDrawAreaDimensions.top+10},
            to:{
                x:dependentToDosConnectionPointDimensions.left - targetDrawAreaDimensions.left+10,
                y:dependentToDosConnectionPointDimensions.top - targetDrawAreaDimensions.top+10},
            strikeColor:'black',
            lineCarrier: dataObj.lineCarrier,
            targetDrawArea: dataObj.targetDrawArea
        })
    },
    drawLine(dataObj={from:{x:Number, y:Number}, to:{x:Number, y:Number}, strikeColor: String, lineCarrier: SVGElement, targetDrawArea:HTMLElement}){
        let line = this.createSVGorPATH({
            givenId: 'line_1',
            qualifiedName: 'line',
            attributes: [
                {attributeName:"x1", value: dataObj.from.x},
                {attributeName:"y1", value: dataObj.from.y},
                {attributeName:"x2", value: dataObj.to.x},
                {attributeName:"y2", value: dataObj.to.y},
                {attributeName:"stroke", value: dataObj.strikeColor},
            ]
        })
        dataObj.lineCarrier.appendChild(line);
        dataObj.targetDrawArea.insertAdjacentElement('beforeEnd', dataObj.lineCarrier);
    },
    getTemplate:{
        "dependency-material-count":(dataObj={count:0})=>{
            if(dataObj.count===0){
                return 'Add material dependency to this todo!'
            }else{
                return `${dataObj.count} added, click to add more!`;
            }
},
        "dependency-todo-count":(dataObj={count:0})=>{
            if(dataObj.count===0){
                return 'Add todo dependency to this todo by dragging from left!'
            }else{
                return `To see ${dataObj.count} dependencies click here!`;
            }
},
        "material-in-list":(dataObj={uuid:null, dependentMaterials:[]})=>{
            console.log(dataObj);
            let listOfMaterials=''
            listOfMaterials+='<h5 class="material-list-header">List of Materials</h5>';
            dataObj.dependentMaterials.forEach(materialData=>{
                listOfMaterials+=`<div class="dependent-material ${materialData.isObtained?'obtained-material':''} ${materialData.pass?'passed':''}" data-material-uuid="${materialData.uuid}"><input type="checkbox" ${materialData.isObtained?'checked':''} id="material-for-${materialData.uuid}">${materialData.materialType} : ${materialData.materialName}, ${materialData.amount},  ${materialData.unit}<span class="material-action delete" title="Delete the material">🗑</span> <span class="material-action pass" title="Pass the material">🔜</span></div>`
            })
            return listOfMaterials;
        },
        "material-form": (dataObj={})=>{
            let materialTypeOptions = dataObj.materialTypes.map(type=>`<option value="${type.typeName}">${type.typeName}</option>`).join('');
            let materialUnits = dataObj.materialUnits.map(unit=>`<option value="${unit.shortHand}">${unit.unitName}</option>`).join('');

            return `
                    <div>
                        <div><button class="connectionButton cB_leftTop" id="close-button-${dataObj.uuid}" title="TODO: ${dataObj.uuid}">X</button></div>
                        <div>
                        Material Type:<select id="material-type-${dataObj.uuid}">${materialTypeOptions}</select>
                        </div>
                        <div>
                        Material: <input type="search" id="material-search-${dataObj.uuid}"> 
                        </div>
                        <div style="display:flex; flex-direction: row; justify-content: space-between;">
                            <div style="flex-grow: 1;">Amount:<input style="width:130px;" id="material-amount-${dataObj.uuid}" type="number" step="0.1" min="0" width="30px"></div>
                            <div style="flex-grow: 1"><select id="material-unit-${dataObj.uuid}">${materialUnits}</select></div>
                        </div>
                        <div>
                        <button id="material-save-button-${dataObj.uuid}">ADD AS DEPENDENCY</button>
                        </div>
                        <div class="list-of-materials" id="material-list-${dataObj.uuid}">List of materials</div>
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

    },
    giveThatToDo(dataObj={toDoUUID:String}){
        if(!dataObj.toDoUUID) return 'uuid bulunamadi';
        //console.log(this.activeState.todos.filter(theTodo=>theTodo.uuid===dataObj.toDoUUID)[0]);
        return this.activeState.todos.filter(theTodo=>theTodo.uuid===dataObj.toDoUUID)[0];
    },
    giveTheseDependenciesOfToDo(dataObj={toDoUUID:String ,dependencyType:String}){
        if(!dataObj.toDoUUID) return 'uuid bulunamadi';
        if(!dataObj.dependencyType){
            return this.giveThatToDo({toDoUUID:dataObj.toDoUUID}).dependencies
        }else{
            return this.giveThatToDo({toDoUUID:dataObj.toDoUUID}).dependencies.filter(dependency=>dependency.dependencyType===dataObj.dependencyType);
        }
    }


};

window.addEventListener('DOMContentLoaded', () => {
    simToDo.init();
})
