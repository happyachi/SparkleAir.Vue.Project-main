import useSessionMixin from "@/mixins/sessionMixin.js"
const flightMixin = useSessionMixin()
const values = flightMixin.flightData.value.values
const flights = flightMixin.flightData.value.flights
export function updateFlight(array) {
    const updatedFlight = {
        id: array.id || "",
        departure: {
            dateTime: array.scheduledDeparture || "",
            airport: array.departureAirport || "",
            terminal: array.departureTerminal || "",
            timeZone: array.departureTimeZone || 0
        },
        arrival: {
            dateTime: array.scheduledArrival || "",
            airport: array.arrivalAirport || "",
            terminal: array.arrivalTerminal || "",
            timeZone: array.arrivalTimeZone || 0
        },
        flightCode: array.flightCode || "",
        flightModel: array.flightModel || "",
        seatNum: array.seatNum || "",
        registrationNum: array.registrationNum || "",
        operatingAirlineName: "SPARKLE AIRLINES",
        price: 0,
        cabin: array.cabin || "",
        cabinCode: array.cabinClde || "",
        mile: array.mile || 0,
        fareProduct: {
            mileageAccumulate: {
                amount: 0,
                percentage: 0
            },
            mileageUpgrade: ""
        },
        ticketRef: array.ticketRef || "",
        isPendingApproval: false,
        QRCodeUrl: array.QRCodeUrl || "",
        
    }
    return updatedFlight
}

export function createFlight() {
    return {
        departure: {
            dateTime: "",
            airport: "",
            terminal: ""
        },
        arrival: {
            dateTime: "",
            airport: "",
            terminal: ""
        },
        flightCode: "",
        flightModel: "",
        seatNum: "",
        registrationNum: "",
        operatingAirlineName: "SPARKLE AIRLINES",
        bookingClass: "",
        cabin: "",
        cabinCode: "",
        mile: "",
        fareProduct: {
            mileageAccumulate: {
                amount: "0",
                percentage: ""
            },
            mileageUpgrade: ""
        },
        isPendingApproval: false
    }
}
export function CreatePassenger() {
    return {
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        phone: "",
        email: "",
        passportNum: "",
        passportExpirationDate: "",
        flight1Seat: "",
        flight2Seat: ""
    }
}
export function GetDatas(array) {
    const data = {
        selectedDeptAirLata: array.selectedDeptAirLata,
        selectedArriAirLata: array.selectedArriAirLata,
        departureTime: array.departureTime,
        arrivalTime: array.arrivalTime,
        adultCount: array.adultCount,
        childCount: array.childCount,
        babyCount: array.babyCount,
        passengeTotalCount: array.passengeTotalCount,
        cabin: array.cabin,
        cabinCode: array.cabinCode || "",
        totalPrice: array.totalPrice || 0,
        way: array.way
    }
    return data
}

export function updateFlightSeatNum(flightId, seatNum) {
    flights.forEach((element) => {
        if (element.id == flightId) {
            element.seatNum = seatNum
        }
    })
}
