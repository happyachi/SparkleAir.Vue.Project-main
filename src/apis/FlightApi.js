import httpInstance from '@/utils/http';

export function GetAirpotLata() {
    return httpInstance({
        url: 'Airport/GetAll',
    });
}
export function GetScheduleFlight() {
    return httpInstance({
        url: 'AirFlights/GetScheduleFlights',
    });
}

export function SearchFlight(datas) {
    return httpInstance({
        url: `AirFlights/SearchFlight?${datas.toString()}`,
    });
}

export function GetFlightPrice(id, flightModel) {
    return httpInstance({
        url: `AirFlights/GetTicketPrice?id=${id}&flightModel=${flightModel}`,
    });
}

export function GetCabinRule() {
    return httpInstance({
        url: 'CabinRules/GetAll',
    });
}

export function GetFlight(id) {
    return httpInstance({
        url: `AirFlights/GetFlight?id=${id}`,
    });
}
