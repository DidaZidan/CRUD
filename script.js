let title = document.getElementById('title') 
let price=document.getElementById('price') 
let taxes=document.getElementById('taxes') 
let ads=document.getElementById('ads') 
let discount=document.getElementById('discount') 
let total=document.getElementById('total')

let category=document.getElementById('category') 
let create=document.getElementById('create')

let mood = 'create'
let temp;
function calculateTotal(){
    if(price.value!==''&&price.value>0){
            let result =(Number(price.value) +Number(taxes.value) +Number(ads.value))-Number(discount.value)
            total.innerHTML=`total: ${ String(result)}`
            total.style.backgroundColor='green'
    }

    else{
        total.style.backgroundColor='rgb(147, 41, 41)'
        result=''
        total.innerHTML=`total: ${ String(result)}`
    }

    
}
let dataproducts;
if(localStorage.newProduct!=null){
dataproducts=JSON.parse(localStorage.newProduct)    
}else{
    dataproducts=[]
}


create.onclick=function(event){
    event.preventDefault();
    var newitem={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        
        category:category.value
    }
    if(mood==='create'){
        
            
    
                dataproducts.push(newitem)
            
        
        
    }
    else{
        dataproducts[temp]=newitem
        mood='create'
        create.innerText='create'
        
        calculateTotal()
    }
    

    localStorage.setItem('newProduct',      JSON.stringify(dataproducts))
    clearInputs();
    showresult();
    
}
function clearInputs(){
    title.value=''
    price.value=''
    taxes.value=''
    ads.value=''
    discount.value=''
    total.innerText=`total:`
    
    category.value=''
}
function showresult(){
let tabel=''
for(i=0;i<dataproducts.length;i++){
    tabel+=`
    <tr>
        <td>${i}</td>
        <td>${dataproducts[i].title}</td>
        <td>${dataproducts[i].price}</td>
        <td>${dataproducts[i].ads}</td>
        <td>${dataproducts[i].taxes}</td>
        <td>${dataproducts[i].discount}</td>
        <td>${dataproducts[i].total}</td>
        <td>${dataproducts[i].category}</td>
        <td><button onclick="updatedata(${i})" class="update-delete-table">Update</button></td>
        <td><button onclick="deleteitem(${i})" class="update-delete-table">Delete</button></td>
                
    </tr>
    `
}
document.querySelector('tbody').innerHTML=tabel
}
showresult();
calculateTotal();

function deleteitem(i){
    
    dataproducts.splice(i,1);
    localStorage.newProduct=JSON.stringify(dataproducts);
    showresult();
}

    let btn = document.getElementById('delal')
    if(dataproducts.length>0){
        btn.innerHTML=`<button onclick="deleteall()">Delete All (${dataproducts.length})</button>`
    }
function deleteall(){
localStorage.clear()
dataproducts.splice(0)
showresult()
}

function updatedata(i){
    title.value=dataproducts[i].title
    price.value=dataproducts[i].price
    taxes.value=dataproducts[i].taxes
    ads.value=dataproducts[i].ads
    discount.value=dataproducts[i].discount
    calculateTotal()
    
    create.innerText='update'
    mood='update'
    temp=i;
    scroll({
        top:0,
        behavior:'smooth'
    })
    
}