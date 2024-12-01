let ticketsData = [];

axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json')
    .then(function (response) {
        ticketsData = response.data;
        renderTickets();
    })
    .catch(function (err) {
        console.log(err);
    });

const ticketContainer = document.querySelector('.ticketCard-area');

function renderTickets(){
    let ticketsItem = "";
    const dataToRender = filteredTicketsData.length === 0 ? ticketsData : filteredTicketsData ;
    dataToRender.forEach(ticketItem =>{
        ticketsItem += `
        <li class="ticketCard">
            <div class="ticketCard-img">
                <a href="#">
                    <img src="${ticketItem.imgUrl}" alt="">
                </a>
                <div class="ticketCard-region">${ticketItem.area}</div>
                <div class="ticketCard-rank">${ticketItem.rate}</div>
            </div>
            <div class="ticketCard-content">
                <div>
                    <h3>
                        <a href="#" class="ticketCard-name">${ticketItem.name}</a>
                    </h3>
                    <p class="ticketCard-description">
                    ${ticketItem.description}
                    </p>
                </div>
                <div class="ticketCard-info">
                    <p class="ticketCard-num">
                        <span><i class="fas fa-exclamation-circle"></i>
                        </span> 剩下最後 <span id="ticketCard-num"> ${ticketItem.group} </span> 組
                    </p>
                    <p class="ticketCard-price">
                        TWD <span id="ticketCard-price">${ticketItem.price}</span>
                    </p>
                </div>
            </div>
        </li>`;
    });
    ticketContainer.innerHTML = ticketsItem;
    searchResultNum();
};

const resultTextNum = document.getElementById('searchResult-text');

function searchResultNum(){
    let textNum = filteredTicketsData.length === 0 ? ticketsData.length : filteredTicketsData.length;
    resultTextNum.textContent = `本次搜尋 ${textNum} 筆資料`;
};

let filteredTicketsData = [];
const dropdownFilterBtn = document.querySelector('.regionSearch');
dropdownFilterBtn.addEventListener('change', (event) =>{
    const selectedValue = event.target.value;
    filteredTicketsData = [];
    if(selectedValue === "全部地區"){
        filteredTicketsData = ticketsData;
    }else{
        filteredTicketsData = ticketsData.filter(item => item.area === selectedValue);
    }
    renderTickets();
    searchResultNum();
});

const errorMessage = `<i class="fas fa-exclamation-circle"></i><span>必須!</span>`;
document.querySelector('.addTicket-btn').addEventListener('click', function(){
    const form = document.querySelector('.addTicket-form');
    const fields = [
        { inputId: 'ticketName', messageId: 'ticketName-message'},
        { inputId: 'ticketImgUrl', messageId: 'ticketImgUrl-message'},
        { inputId: 'ticketRegion', messageId: 'ticketRegion-message'},
        { inputId: 'ticketPrice', messageId: 'ticketPrice-message'},
        { inputId: 'ticketNum', messageId: 'ticketNum-message'},
        { inputId: 'ticketRate', messageId: 'ticketRate-message'},
        { inputId: 'ticketDescription', messageId: 'ticketDescription-message'}
    ];
    let isValid = true;
    fields.forEach(field =>{
        const inputElement = document.getElementById(field.inputId);
        const messageElement = document.getElementById(field.messageId);
        if(!inputElement.value.trim()){
            messageElement.innerHTML = errorMessage;
            isValid = false;
        }else{
            messageElement.innerHTML = '';
        }
    });
    if(isValid){
        const newTicket = {
            id: ticketsData.length,
            name: document.getElementById('ticketName').value.trim(),
            imgUrl: document.getElementById('ticketImgUrl').value.trim(),
            area: document.getElementById('ticketRegion').value.trim(),
            group: Number(document.getElementById('ticketNum').value.trim()),
            price: Number(document.getElementById('ticketPrice').value.trim()),
            rate: Number(document.getElementById('ticketRate').value.trim()),
            description: document.getElementById('ticketDescription').value.trim()
        };
        ticketsData.push(newTicket);
        form.reset();
        renderTickets();
    }
});