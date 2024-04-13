export function GetCheapestPrice(array) {
    let cheapestPrice = array[0].price

    array.forEach((element) => {
        if (element.price < cheapestPrice) {
            cheapestPrice = element.price
        }
    })

    return PriceFormat(cheapestPrice)
}

export function GetCabin(array){
    const cabin = [];
    const cabinId = new Set();
    array.forEach((element) => {
        if (!cabinId.has(element.cabinName
            )) {
            cabin.push(element.cabinName
                );
            cabinId.add(element.cabinName
                );
        }
    })
    return cabin
}

export function  groupedFlightTicketPrice(array) {
    const grouped = {};
    array.forEach(element => {
        if (!grouped[element.cabinName]) {
        grouped[element.cabinName] = [];
        }
        grouped[element.cabinName].push(element);
    });
    return grouped;
}

export function PriceFormat(price){
    return price.toLocaleString('zh-TW', {
        maximumFractionDigits: 0
    })
}

export function CabinCodeChange(cabinCode) {
    switch (cabinCode) {
            case "D":
            case "L":
            case "V":
            case "A":
                return '超值'
            case "J":
            case "T":
            case "Y":
            case "S":
                return '基本'
            case "C":
            case "K":
            case "B":
            case "W":
                return '全額'        
    }
}

export function MileCalculater(mile,percent)
{
    return (mile*percent)
}