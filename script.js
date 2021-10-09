const features = Object.keys(data)
let currentIndex = 0

const main = document.querySelector('main')

const anitationTimeout = 100

function select(featureIndex){
    const featureName = features[featureIndex]
    data[featureName].points ++
    currentIndex ++
    if(currentIndex < data.influente.values.length){
    // if(currentIndex < 2){
        nextCard()
    }else{
        const divcard = document.querySelector('.divcard')
        divcard.classList.remove('show')
        divcard.classList.add('close')

        let equalFeatures = []
        let maxPoint = -1
        for(let tempFeature in data){
            const point = data[tempFeature].points
            console.log(point, tempFeature)
            if(point > maxPoint){
                maxPoint = point
                equalFeatures = [tempFeature]
            }else if(point === maxPoint){
                equalFeatures.push(tempFeature)
            }
        }

        setTimeout(()=>{
            main.innerHTML = `
            <div class="divcard show">
                <div class="titles">
                    <h2>Sua personalidade é:</h2>
                    <div class='yourFeatureIs'>${equalFeatures}</div>    
                </div>
                   
            </div>
            `
        },anitationTimeout)
    }
}

function nextCardinstructions(){
    const divcard = document.querySelector('.divcard')
    divcard.classList.remove('show')
    divcard.classList.add('close')

    setTimeout(()=>{
        main.innerHTML = `
        <div class="divcard show" onclick='nextCard()'>
            <div class="titles">
                <h2>Responda como melhor você se descreve</h2>     
            </div>
            <div class="nextMessage">
                clique para avançar
            </div>
            
        </div>
        `
    },anitationTimeout)
}

function nextCard(){
    const divcard = document.querySelector('.divcard')
    divcard.classList.remove('show')
    divcard.classList.add('close')

    setTimeout(()=>{
        main.innerHTML = `
        ${createDivcard()}
        `
    },anitationTimeout)

}

function startScreen(){
    
    main.innerHTML = `
    <div class="divcard show" onclick='nextCardinstructions()'>
        <div class="titles">
            <h1>Teste PI</h1>
            <h2>Descubra sua personalidade</h2>         
        </div>
        <div class="nextMessage">
            clique para avançar
        </div>
        
    </div>
    `
}

function createDivcard(){
    
    return`
    <div class="divcard show">
        
        <div class="selectRespost">
            ${createRandomFeatureButtons()}
        </div>
        <div class="countdiv">
            <span class="countspan">${currentIndex+1}</span> /40
        </div>
    </div>
    `
        
    function createRandomFeatureButtons(){
        const tempArrayFeature = [...features]
        return features.map(_=>{
            const randomfeature = Math.floor(Math.random() * tempArrayFeature.length)
            const feature = data[ tempArrayFeature[randomfeature]]
            const value = feature.values[currentIndex]

            const nameFeature = tempArrayFeature[randomfeature]

            const btndiv = `
            <button onclick="select(${features.indexOf(nameFeature)})">${value}</button>
            `
            
            tempArrayFeature.splice(randomfeature , 1)
            
            return btndiv
        }).join('')
}
}
