import { ref, watch } from "vue";

export default function useSessionMixin() {
    const storedFlightsData =
        JSON.parse(sessionStorage.getItem("flightsData")) || {};

    const flightData = ref({
        flights: storedFlightsData.flights || [],
        passenger: storedFlightsData.passenger || [],
        isDirect:
            storedFlightsData.isDirect !== undefined
                ? storedFlightsData.isDirect
                : true,
        values: storedFlightsData.values || [],
    });

    const updateSessionStorage = (newFlightData) => {
        sessionStorage.setItem("flightsData", JSON.stringify(newFlightData));
    };

    watch(
        flightData,
        (newValue) => {
            updateSessionStorage(newValue);
        },
        { deep: true }
    );

    return {
        flightData,
    };
}
